#!/usr/bin/env python3
"""
Script para agregar productos de prueba a la base de datos SQLite
"""

import sys
from pathlib import Path

# Agregar el directorio del proyecto al path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from backend.app.database import SessionLocal, engine, Base
from backend.app.models import Product

# Crear las tablas si no existen
Base.metadata.create_all(bind=engine)

# Crear sesión
db = SessionLocal()

try:
    # Verificar si ya existen productos
    existing_products = db.query(Product).count()
    print(f"Productos existentes: {existing_products}")
    
    if existing_products == 0:
        # Crear 3 productos de prueba
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
        
        # Agregar productos a la sesión
        for product in products:
            db.add(product)
        
        # Guardar cambios
        db.commit()
        print(f"✅ Se agregaron {len(products)} productos exitosamente")
        
        # Verificar que se agregaron
        total_products = db.query(Product).count()
        print(f"Total de productos en la BD: {total_products}")
    else:
        print("⚠️ La base de datos ya contiene productos. No se agregaron nuevos.")
        
except Exception as e:
    print(f"❌ Error al agregar productos: {e}")
    db.rollback()
    sys.exit(1)
finally:
    db.close()
