# Krisly Beauty Backend

Backend API para la tienda de belleza de Krisly Ramirez, construido con FastAPI + SQLite.

## Estructura del Proyecto

```
backend/
├── app/
│   ├── main.py           # Aplicación principal de FastAPI
│   ├── database.py       # Configuración de SQLite
│   ├── models.py         # Modelos de datos (Product, Cart, Order, etc.)
│   ├── schemas.py        # Esquemas de validación Pydantic
│   ├── routes/
│   │   ├── products.py   # Rutas de productos
│   │   └── cart.py       # Rutas del carrito
│   └── __init__.py
├── requirements.txt      # Dependencias Python
├── .env                  # Variables de entorno
└── README.md            # Este archivo
```

## Instalación

### 1. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 2. Ejecutar el servidor

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

El servidor estará disponible en: `http://localhost:8000`

## Documentación de la API

Una vez que el servidor esté corriendo, accede a:

- **Documentación interactiva (Swagger)**: http://localhost:8000/docs
- **Documentación alternativa (ReDoc)**: http://localhost:8000/redoc

## Endpoints Disponibles

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/{id}` - Actualizar un producto
- `DELETE /api/products/{id}` - Eliminar un producto

### Carrito

- `GET /api/cart/{user_id}` - Obtener el carrito de un usuario
- `POST /api/cart/{user_id}/items` - Agregar producto al carrito
- `PUT /api/cart/{user_id}/items/{item_id}` - Actualizar cantidad en el carrito
- `DELETE /api/cart/{user_id}/items/{item_id}` - Eliminar producto del carrito
- `DELETE /api/cart/{user_id}/clear` - Vaciar el carrito

## Ejemplo de uso

### Agregar producto al carrito

```bash
curl -X POST "http://localhost:8000/api/cart/user123/items" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 2
  }'
```

### Obtener carrito

```bash
curl "http://localhost:8000/api/cart/user123"
```

## Base de Datos

El proyecto usa SQLite, que crea automáticamente un archivo `krisly_beauty.db` en la carpeta del backend.

### Tablas principales

- **products** - Productos disponibles
- **carts** - Carritos de usuarios
- **cart_items** - Items en los carritos
- **orders** - Órdenes de compra
- **order_items** - Items en las órdenes

## Próximos pasos

1. Integración con Stripe para pagos
2. Autenticación de usuarios
3. Panel de administración
4. Notificaciones por email
5. Historial de órdenes

## Notas

- El servidor usa SQLite por simplicidad. Para producción, considera usar PostgreSQL.
- CORS está habilitado para todos los orígenes (`*`). En producción, especificar dominios permitidos.
- Las contraseñas y datos sensibles deben manejarse con seguridad.
