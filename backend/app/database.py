"""
Database Configuration
Configura la conexión a PostgreSQL o SQLite según la variable de entorno
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# Obtener la URL de la base de datos del entorno o usar SQLite por defecto
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./krisly_beauty.db"
)

# PostgreSQL requiere psycopg2, SQLite no
if DATABASE_URL.startswith("postgresql"):
    # Convertir postgresql:// a postgresql+psycopg2://
    if "postgresql://" in DATABASE_URL:
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://")
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,  # Verificar conexión antes de usar
        pool_recycle=3600  # Reciclar conexiones cada hora
    )
else:
    # SQLite
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
