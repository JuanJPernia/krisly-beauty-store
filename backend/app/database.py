"""
Database Configuration
Configura la conexión a SQLite y las sesiones
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# Ruta de la base de datos SQLite
DATABASE_URL = "sqlite:///./krisly_beauty.db"

# Crear el motor de la base de datos
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Solo para SQLite
)

# Crear sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los modelos
Base = declarative_base()

def get_db():
    """
    Dependencia para obtener la sesión de la base de datos
    Se usa en cada ruta que necesita acceso a la BD
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
