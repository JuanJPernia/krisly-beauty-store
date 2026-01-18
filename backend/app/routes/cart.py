"""
Cart Routes
Rutas para gestionar el carrito de compras
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Cart, CartItem, Product
from ..schemas import CartItemCreate, CartItemUpdate, CartResponse

router = APIRouter(prefix="/api/cart", tags=["cart"])

def get_or_create_cart(user_id: str, db: Session):
    """Obtener o crear un carrito para un usuario"""
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    
    return cart

@router.get("/{user_id}", response_model=CartResponse)
def get_cart(user_id: str, db: Session = Depends(get_db)):
    """Obtener el carrito de un usuario"""
    cart = get_or_create_cart(user_id, db)
    
    # Calcular total
    total_price = sum(item.product.price * item.quantity for item in cart.items)
    
    return {
        "id": cart.id,
        "user_id": cart.user_id,
        "items": cart.items,
        "total_price": total_price
    }

@router.post("/{user_id}/items", response_model=CartResponse)
def add_to_cart(
    user_id: str,
    item: CartItemCreate,
    db: Session = Depends(get_db)
):
    """Agregar un producto al carrito"""
    
    # Verificar que el producto existe
    product = db.query(Product).filter(Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    # Verificar stock
    if product.stock < item.quantity:
        raise HTTPException(status_code=400, detail="Stock insuficiente")
    
    # Obtener o crear carrito
    cart = get_or_create_cart(user_id, db)
    
    # Verificar si el producto ya está en el carrito
    cart_item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == item.product_id
    ).first()
    
    if cart_item:
        # Si ya existe, sumar cantidad
        cart_item.quantity += item.quantity
    else:
        # Si no existe, crear nuevo
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=item.product_id,
            quantity=item.quantity
        )
        db.add(cart_item)
    
    db.commit()
    db.refresh(cart)
    
    # Calcular total
    total_price = sum(i.product.price * i.quantity for i in cart.items)
    
    return {
        "id": cart.id,
        "user_id": cart.user_id,
        "items": cart.items,
        "total_price": total_price
    }

@router.put("/{user_id}/items/{item_id}", response_model=CartResponse)
def update_cart_item(
    user_id: str,
    item_id: int,
    update: CartItemUpdate,
    db: Session = Depends(get_db)
):
    """Actualizar la cantidad de un producto en el carrito"""
    
    cart = get_or_create_cart(user_id, db)
    
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()
    
    if not cart_item:
        raise HTTPException(status_code=404, detail="Item no encontrado en el carrito")
    
    if update.quantity <= 0:
        # Si la cantidad es 0 o negativa, eliminar el item
        db.delete(cart_item)
    else:
        cart_item.quantity = update.quantity
    
    db.commit()
    db.refresh(cart)
    
    # Calcular total
    total_price = sum(i.product.price * i.quantity for i in cart.items)
    
    return {
        "id": cart.id,
        "user_id": cart.user_id,
        "items": cart.items,
        "total_price": total_price
    }

@router.delete("/{user_id}/items/{item_id}", response_model=CartResponse)
def remove_from_cart(
    user_id: str,
    item_id: int,
    db: Session = Depends(get_db)
):
    """Eliminar un producto del carrito"""
    
    cart = get_or_create_cart(user_id, db)
    
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()
    
    if not cart_item:
        raise HTTPException(status_code=404, detail="Item no encontrado en el carrito")
    
    db.delete(cart_item)
    db.commit()
    db.refresh(cart)
    
    # Calcular total
    total_price = sum(i.product.price * i.quantity for i in cart.items)
    
    return {
        "id": cart.id,
        "user_id": cart.user_id,
        "items": cart.items,
        "total_price": total_price
    }

@router.delete("/{user_id}/clear")
def clear_cart(user_id: str, db: Session = Depends(get_db)):
    """Vaciar el carrito"""
    
    cart = get_or_create_cart(user_id, db)
    
    # Eliminar todos los items
    db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
    db.commit()
    
    return {"message": "Carrito vaciado"}
