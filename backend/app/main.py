"""
FastAPI Main Application
Punto de entrada de la aplicación backend
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes import products, cart

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Crear la aplicación FastAPI
app = FastAPI(
    title="Krisly Beauty API",
    description="API Backend para la tienda de belleza de Krisly Ramirez",
    version="1.0.0"
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
