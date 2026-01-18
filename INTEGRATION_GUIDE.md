# Guía de Integración Frontend-Backend

## Descripción General

El frontend (React) ahora está conectado con el backend (FastAPI) para gestionar el carrito de compras. Los datos se guardan en una base de datos SQLite en el servidor.

## Arquitectura

```
Frontend (React)
    ↓
CartContext (gestiona estado)
    ↓
api.ts (funciones HTTP)
    ↓
Backend (FastAPI)
    ↓
SQLite (base de datos)
```

## Componentes Clave

### 1. `client/src/lib/api.ts`

Archivo que contiene:
- **API_ENDPOINTS**: URLs de todos los endpoints del backend
- **apiGet, apiPost, apiPut, apiDelete**: Funciones para hacer peticiones HTTP
- **getUserId()**: Genera un ID único para cada usuario

**Ejemplo:**
```typescript
import { apiPost, API_ENDPOINTS, getUserId } from '@/lib/api';

const userId = getUserId(); // "user_1234567890_abc123"
const response = await apiPost(
  API_ENDPOINTS.CART_ADD_ITEM(userId),
  { product_id: 1, quantity: 2 }
);
```

### 2. `client/src/contexts/CartContext.tsx`

Contexto actualizado que ahora:
- Carga el carrito del backend al abrir la página
- Sincroniza cambios con el backend
- Mantiene fallback a localStorage si el backend no está disponible

**Funciones principales:**
- `addItem()` - Agrega producto al carrito (backend + localStorage)
- `removeItem()` - Elimina producto (backend + localStorage)
- `updateQuantity()` - Cambia cantidad (backend + localStorage)
- `clearCart()` - Vacía el carrito (backend + localStorage)

### 3. `client/src/components/ProductCard.tsx`

Actualizado para:
- Usar `product_id` en lugar de `id`
- Manejar errores de la API
- Mostrar mensajes de éxito/error

## Flujo de Datos

### Agregar Producto al Carrito

```
1. Usuario hace clic en "Agregar al carrito"
   ↓
2. ProductCard.handleAddToCart() se ejecuta
   ↓
3. Llama a CartContext.addItem()
   ↓
4. addItem() hace POST a /api/cart/{userId}/items
   ↓
5. Backend valida y guarda en SQLite
   ↓
6. Backend devuelve carrito actualizado
   ↓
7. Frontend actualiza estado local
   ↓
8. Frontend guarda en localStorage (fallback)
   ↓
9. Carrito se actualiza en la UI
```

## Configuración

### Variables de Entorno

En `client/.env` (si existe):
```
VITE_API_URL=http://localhost:8000
```

Por defecto, usa `http://localhost:8000`

### CORS

El backend tiene CORS habilitado para todos los orígenes. En producción, cambiar a:

```python
# En backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tudominio.com"],  # Solo tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Manejo de Errores

El CartContext tiene:
- `loading`: Indica si hay una petición en curso
- `error`: Mensaje de error si algo falla

**Ejemplo:**
```typescript
const { items, loading, error } = useCart();

if (loading) return <p>Cargando...</p>;
if (error) return <p>Error: {error}</p>;
```

## Base de Datos

### Tablas Principales

**carts** - Carritos de usuarios
```
id: Integer (PK)
user_id: String (único)
created_at: DateTime
updated_at: DateTime
```

**cart_items** - Items en los carritos
```
id: Integer (PK)
cart_id: Integer (FK → carts.id)
product_id: Integer (FK → products.id)
quantity: Integer
```

**products** - Productos disponibles
```
id: Integer (PK)
name: String
description: String
price: Float
category: String
image: String
stock: Integer
created_at: DateTime
```

## Endpoints Disponibles

### Carrito

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cart/{user_id}` | Obtener carrito |
| POST | `/api/cart/{user_id}/items` | Agregar producto |
| PUT | `/api/cart/{user_id}/items/{item_id}` | Actualizar cantidad |
| DELETE | `/api/cart/{user_id}/items/{item_id}` | Eliminar producto |
| DELETE | `/api/cart/{user_id}/clear` | Vaciar carrito |

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos |
| GET | `/api/products/{id}` | Obtener uno |
| POST | `/api/products` | Crear (admin) |
| PUT | `/api/products/{id}` | Actualizar (admin) |
| DELETE | `/api/products/{id}` | Eliminar (admin) |

## Pruebas

### 1. Verificar que el backend está corriendo
```bash
curl http://localhost:8000/health
```

Respuesta esperada:
```json
{"status": "ok"}
```

### 2. Crear un producto
```bash
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Producto Test",
    "description": "Descripción",
    "price": 29.99,
    "category": "Maquillaje",
    "image": "/images/test.jpg",
    "stock": 100
  }'
```

### 3. Agregar al carrito
```bash
curl -X POST http://localhost:8000/api/cart/usuario123/items \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 2
  }'
```

## Troubleshooting

### Error: "Cannot reach backend"
- Verificar que el backend está corriendo: `uvicorn app.main:app --reload`
- Verificar que está en `http://localhost:8000`
- Verificar CORS en `backend/app/main.py`

### Carrito vacío después de recargar
- Verificar que el `user_id` es el mismo
- Verificar que la base de datos SQLite existe: `krisly_beauty.db`
- Verificar logs del backend

### Error 404 en productos
- Verificar que el producto existe en la base de datos
- Crear un producto de prueba en Swagger: `http://localhost:8000/docs`

## Próximos Pasos

1. **Autenticación**: Agregar login/registro
2. **Órdenes**: Crear órdenes de compra
3. **Stripe**: Integrar pagos
4. **Panel Admin**: Gestionar productos
5. **Notificaciones**: Enviar emails

## Recursos

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [React Context API](https://react.dev/reference/react/useContext)
