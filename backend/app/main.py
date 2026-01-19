"""
FastAPI Main Application
Punto de entrada de la aplicación backend
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes import products, cart, reviews, contact

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Agregar productos de prueba si la BD está vacía
def seed_initial_products():
    from .database import SessionLocal
    from .models import Product
    
    db = SessionLocal()
    try:
        # Verificar si hay productos
        product_count = db.query(Product).count()
        if product_count == 0:
            # Agregar productos de prueba
            products = [
                Product(
                    name="Sombra Negra Colorida",
                    category="Maquillaje",
                    price=29.99,
                    image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
                    description="Sombra de ojos de alta pigmentación con acabado mate y shimmer",
                    stock=50,
                    rating=4.9,
                    sales_count=125,
                    is_featured=True
                ),
                Product(
                    name="Labial Rojo Intenso",
                    category="Maquillaje",
                    price=24.99,
                    image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
                    description="Labial de larga duración con acabado mate y cremoso",
                    stock=75,
                    rating=4.7,
                    sales_count=89,
                    is_featured=True
                ),
                Product(
                    name="Crema Hidratante Premium",
                    category="Cuidado Personal",
                    price=45.99,
                    image="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
                    description="Crema facial hidratante con ingredientes naturales y antienvejecimiento",
                    stock=30,
                    rating=4.8,
                    sales_count=156,
                    is_featured=True
                )
            ]
            for product in products:
                db.add(product)
            db.commit()
    finally:
        db.close()

seed_initial_products()

# Crear la aplicación FastAPI
app = FastAPI(
    title="Krisly Beauty API",
    description="API Backend para la tienda de belleza de Krisly Ramirez",
    version="1.0.0",
    redirect_slashes=False  # Deshabilitar redirección automática de slashes
)

# Configurar CORS (para que el frontend pueda comunicarse con el backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# Incluir rutas
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(reviews.router)
app.include_router(contact.router)

@app.get("/")
def read_root():
    """Endpoint de prueba"""
    return {
        "message": "Bienvenido a Krisly Beauty API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    """Verificar que el servidor está funcionando"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
