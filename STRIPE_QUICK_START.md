# Guía Rápida de Configuración de Stripe

## ¿Por qué el checkout no funciona?

El error que ves ocurre porque **Stripe no está configurado**. El servidor intenta procesar pagos pero no tiene las claves de Stripe necesarias.

## Solución Rápida (3 pasos)

### Paso 1: Obtener tus claves de Stripe

1. Ve a [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Inicia sesión (o crea una cuenta gratis)
3. En el menú, ve a **Developers** → **API Keys**
4. Copia estas dos claves:
   - **Publishable Key** (comienza con `pk_`)
   - **Secret Key** (comienza con `sk_`)

### Paso 2: Configurar las claves en Manus

1. En el panel de control de Manus, ve a **Settings** → **Payment**
2. Pega tus claves:
   - `STRIPE_SECRET_KEY` = tu Secret Key
   - `VITE_STRIPE_PUBLISHABLE_KEY` = tu Publishable Key
3. Haz clic en **Save**

### Paso 3: Crear productos en Stripe

1. En el Dashboard de Stripe, ve a **Products**
2. Haz clic en **+ Add product**
3. Crea los productos con estos nombres y precios:

**Ejemplo - Maquillaje:**
- Nombre: "Paleta de Sombras Premium Rose Gold"
- Precio: $45.99
- Moneda: USD

Después de crear cada producto, Stripe te dará un **Price ID** (ej: `price_1QvYzKH68NclpcQ1aBcDeFg0`)

### Paso 4: Actualizar los Price IDs

1. Abre el archivo `server/lib/products.ts` en tu proyecto
2. Reemplaza los `priceId` con los IDs reales de Stripe:

```typescript
'makeup-001': {
  priceId: 'price_1QvYzKH68NclpcQ1aBcDeFg0', // ← Tu Price ID real
  name: 'Paleta de Sombras Premium Rose Gold',
  amount: 4599,
},
```

## Prueba del Checkout

### Usar tarjetas de prueba de Stripe

Stripe proporciona tarjetas de prueba para desarrollo:

**Pago Exitoso:**
- Número: `4242 4242 4242 4242`
- Fecha: Cualquier fecha futura (ej: 12/25)
- CVC: Cualquier número de 3 dígitos

**Pago Rechazado:**
- Número: `4000 0000 0000 0002`
- Fecha: Cualquier fecha futura
- CVC: Cualquier número de 3 dígitos

### Pasos para probar:

1. Ve a `/products`
2. Haz clic en **"Agregar al Carrito"** en cualquier producto
3. Haz clic en el icono del carrito (arriba a la derecha)
4. Haz clic en **"Proceder al Pago"**
5. Rellena el formulario con tu información
6. Haz clic en **"Proceder al Pago"**
7. Usa la tarjeta de prueba `4242 4242 4242 4242`
8. Completa el pago

## Solución de Problemas

### Error: "Stripe no está configurado"

**Solución:** Verifica que hayas configurado las claves en Settings → Payment

### Error: "Producto no encontrado"

**Solución:** Asegúrate de que los Price IDs en `server/lib/products.ts` sean válidos

### El pago se rechaza

**Solución:** Usa la tarjeta de prueba `4242 4242 4242 4242` (no números reales)

### No veo el botón de pago

**Solución:** Asegúrate de que:
- Hay productos en el carrito
- El formulario está completamente relleno
- Las claves de Stripe están configuradas

## Próximos Pasos

Después de configurar Stripe:

1. **Crear una base de datos** para guardar órdenes
2. **Implementar webhooks** para recibir notificaciones de pago
3. **Agregar autenticación** para que los clientes vean su historial
4. **Configurar emails** para confirmaciones de compra

## Recursos

- [Documentación de Stripe](https://stripe.com/docs)
- [Tarjetas de prueba](https://stripe.com/docs/testing)
- [Dashboard de Stripe](https://dashboard.stripe.com)

## ¿Necesitas ayuda?

Si tienes problemas:

1. Revisa la consola del navegador (F12) para ver mensajes de error
2. Revisa los logs del servidor en el panel de Manus
3. Verifica que las claves estén correctamente configuradas en Settings → Payment
4. Contacta al soporte de Stripe en [support.stripe.com](https://support.stripe.com)
