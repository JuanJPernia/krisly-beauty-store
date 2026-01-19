#!/usr/bin/env python3
"""
Script para agregar productos de prueba a la base de datos en Render
Usa la API REST en lugar de acceso directo a la BD
"""

import requests
import json

# URL del backend en Render
BACKEND_URL = "https://krisly-beauty-store.onrender.com"
API_ENDPOINT = f"{BACKEND_URL}/api/products"

# Productos de prueba
products = [
    {
        "name": "Sombra Negra Colorida",
        "category": "Maquillaje",
        "price": 29.99,
        "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
        "description": "Sombra de ojos de alta pigmentación con acabado mate y shimmer",
        "stock": 50,
        "rating": 4.9,
        "sales_count": 125,
        "is_featured": True
    },
    {
        "name": "Labial Rojo Intenso",
        "category": "Maquillaje",
        "price": 24.99,
        "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
        "description": "Labial de larga duración con acabado mate y cremoso",
        "stock": 75,
        "rating": 4.7,
        "sales_count": 89,
        "is_featured": True
    },
    {
        "name": "Crema Hidratante Premium",
        "category": "Cuidado Personal",
        "price": 45.99,
        "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
        "description": "Crema facial hidratante con ingredientes naturales y antienvejecimiento",
        "stock": 30,
        "rating": 4.8,
        "sales_count": 156,
        "is_featured": True
    }
]

def seed_products():
    """Agregar productos a través de la API"""
    print(f"🌱 Agregando productos a {BACKEND_URL}...")
    
    try:
        # Primero verificar si hay productos
        response = requests.get(f"{BACKEND_URL}/api/products", timeout=10)
        existing_products = response.json()
        
        if len(existing_products) > 0:
            print(f"⚠️  La base de datos ya contiene {len(existing_products)} productos.")
            print("No se agregarán nuevos productos.")
            return
        
        # Agregar cada producto
        for i, product in enumerate(products, 1):
            print(f"\n📦 Agregando producto {i}/{len(products)}: {product['name']}")
            
            response = requests.post(
                API_ENDPOINT,
                json=product,
                timeout=10,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                created = response.json()
                print(f"   ✅ Producto creado con ID: {created.get('id')}")
            else:
                print(f"   ❌ Error: {response.status_code}")
                print(f"   Respuesta: {response.text}")
                return False
        
        # Verificar que se agregaron correctamente
        print("\n✅ Verificando productos...")
        response = requests.get(f"{BACKEND_URL}/api/products", timeout=10)
        final_products = response.json()
        print(f"✅ Total de productos en la BD: {len(final_products)}")
        
        return True
        
    except requests.exceptions.Timeout:
        print("❌ Timeout: El servidor tardó demasiado en responder")
        return False
    except requests.exceptions.ConnectionError:
        print("❌ Error de conexión: No se pudo conectar al servidor")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = seed_products()
    exit(0 if success else 1)
