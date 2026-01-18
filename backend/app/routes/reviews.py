"""
Review Routes
Rutas para gestionar reseñas de productos
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models import Review, Product
from ..schemas import ReviewCreate, ReviewResponse

router = APIRouter(prefix="/api/reviews", tags=["reviews"])

@router.get("/product/{product_id}", response_model=list[ReviewResponse])
def get_product_reviews(product_id: int, db: Session = Depends(get_db)):
    """Obtener todas las reseñas de un producto"""
    reviews = db.query(Review).filter(Review.product_id == product_id).all()
    return reviews

@router.post("/", response_model=ReviewResponse)
def create_review(review: ReviewCreate, user_id: str = None, db: Session = Depends(get_db)):
    """Crear una nueva reseña"""
    
    # Validar que el producto existe
    product = db.query(Product).filter(Product.id == review.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    # Validar que la calificación está entre 1 y 5
    if review.rating < 1 or review.rating > 5:
        raise HTTPException(status_code=400, detail="La calificación debe estar entre 1 y 5")
    
    # Crear la reseña
    db_review = Review(
        product_id=review.product_id,
        user_id=user_id or "anonymous",
        rating=review.rating,
        comment=review.comment
    )
    
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    
    # Actualizar el rating promedio del producto
    avg_rating = db.query(func.avg(Review.rating)).filter(
        Review.product_id == review.product_id
    ).scalar()
    
    if avg_rating:
        product.rating = float(avg_rating)
        db.commit()
    
    return db_review

@router.get("/{review_id}", response_model=ReviewResponse)
def get_review(review_id: int, db: Session = Depends(get_db)):
    """Obtener una reseña por ID"""
    review = db.query(Review).filter(Review.id == review_id).first()
    
    if not review:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    
    return review

@router.delete("/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db)):
    """Eliminar una reseña"""
    review = db.query(Review).filter(Review.id == review_id).first()
    
    if not review:
        raise HTTPException(status_code=404, detail="Reseña no encontrada")
    
    product_id = review.product_id
    db.delete(review)
    db.commit()
    
    # Actualizar el rating promedio del producto
    avg_rating = db.query(func.avg(Review.rating)).filter(
        Review.product_id == product_id
    ).scalar()
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        product.rating = float(avg_rating) if avg_rating else 4.5
        db.commit()
    
    return {"message": "Reseña eliminada"}
