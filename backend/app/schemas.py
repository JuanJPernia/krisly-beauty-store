"""
Pydantic Schemas
Define la estructura y validación de datos que recibe/envía la API
"""

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# ============ PRODUCTOS ============

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str
    stock: int
    rating: float = 4.5
    sales_count: int = 0
    is_featured: bool = False

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============ CARRITO ============

class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    product: Product
    
    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    id: int
    user_id: str
    items: List[CartItemResponse]
    total_price: float
    
    class Config:
        from_attributes = True

# ============ ÓRDENES ============

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float
    product: Product
    
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    total_price: float

class OrderResponse(BaseModel):
    id: int
    user_id: str
    total_price: float
    status: str
    created_at: datetime
    items: List[OrderItemResponse]
    
    class Config:
        from_attributes = True

# ============ RESPUESTAS GENERALES ============

class Message(BaseModel):
    message: str

class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
