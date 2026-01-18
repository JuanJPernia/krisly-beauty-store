"""
Product Routes
Rutas para obtener y gestionar productos
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Product
from ..schemas import Product as ProductSchema, ProductCreate

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("/", response_model=list[ProductSchema])
def get_products(
    category: str = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Obtener todos los productos
    Parámetros opcionales:
    - category: Filtrar por categoría
    - skip: Saltar N productos (para paginación)
    - limit: Limitar a N productos
    """
    query = db.query(Product)
    
    if category:
        query = query.filter(Product.category == category)
    
    products = query.offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Obtener un producto por ID"""
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    return product

@router.post("/", response_model=ProductSchema)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """Crear un nuevo producto (solo admin)"""
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=ProductSchema)
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    """Actualizar un producto (solo admin)"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    for key, value in product.dict().items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/featured/by-criteria", response_model=list[ProductSchema])
def get_featured_products(
    criteria: str = "featured",  # featured, rating, sales
    limit: int = 6,
    db: Session = Depends(get_db)
):
    """
    Obtener productos destacados según criterio
    Criterios disponibles:
    - featured: Productos marcados como destacados (is_featured=True)
    - rating: Productos con mejor calificación
    - sales: Productos más vendidos
    """
    query = db.query(Product)
    
    if criteria == "featured":
        # Productos marcados como destacados
        products = query.filter(Product.is_featured == True).limit(limit).all()
    elif criteria == "rating":
        # Productos ordenados por calificación (mayor a menor)
        products = query.order_by(Product.rating.desc()).limit(limit).all()
    elif criteria == "sales":
        # Productos ordenados por número de ventas (mayor a menor)
        products = query.order_by(Product.sales_count.desc()).limit(limit).all()
    else:
        raise HTTPException(status_code=400, detail="Criterio inválido. Use: featured, rating, o sales")
    
    return products

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """Eliminar un producto (solo admin)"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    db.delete(db_product)
    db.commit()
    
    return {"message": "Producto eliminado"}
