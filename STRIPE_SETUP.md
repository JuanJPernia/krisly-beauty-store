# Configuración de Stripe - Krisly Beauty Store

## Descripción General

El sitio web de Krisly Beauty Store ahora incluye un carrito de compras completamente funcional y un proceso de pago seguro integrado con Stripe.

## Características Implementadas

### 1. Carrito de Compras
- **Contexto Global**: Gestión del estado del carrito usando React Context
- **Persistencia**: El carrito se guarda en localStorage para mantener los productos entre sesiones
- **Drawer Interactivo**: Modal lateral para ver y editar productos
- **Gestión de Cantidades**: Aumentar, disminuir o eliminar productos
- **Resumen de Precios**: Cálculo automático del total

### 2. Página de Checkout
- **Formulario de Envío**: Recopila información de contacto y dirección
- **Resumen de Orden**: Muestra todos los productos y el total
- **Validación**: Verifica que todos los campos requeridos estén completos
- **Integración con Stripe**: Crea sesiones de pago seguras

### 3. Proceso de Pago
- **Stripe Checkout**: Redirección segura a la página de pago de Stripe
- **Métodos de Pago**: Tarjetas de crédito y débito
- **Códigos de Promoción**: Soporte para cupones de descuento
- **Confirmación de Pago**: Página de éxito después del pago

## Configuración de Stripe

### Paso 1: Acceder al Dashboard de Stripe

1. Ve a [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Inicia sesión con tu cuenta de Stripe
3. Si no tienes cuenta, crea una en [https://stripe.com](https://stripe.com)

### Paso 2: Obtener las Claves de API

1. En el Dashboard, ve a **Developers** → **API Keys**
2. Copia tu **Publishable Key** (comienza con `pk_`)
3. Copia tu **Secret Key** (comienza con `sk_`)

### Paso 3: Configurar las Variables de Entorno

Las variables de entorno se configuran automáticamente en Manus:
- `STRIPE_SECRET_KEY` - Tu clave secreta de Stripe
- `VITE_STRIPE_PUBLISHABLE_KEY` - Tu clave pública de Stripe
- `STRIPE_WEBHOOK_SECRET` - Para webhooks (se configura después)

Para actualizar estas claves en Manus:
1. Ve a **Settings** → **Payment** en el panel de control
2. Ingresa tus claves de Stripe
3. Guarda los cambios

### Paso 4: Crear Productos en Stripe

Para que el checkout funcione correctamente, necesitas crear productos y precios en Stripe:

1. En el Dashboard de Stripe, ve a **Products**
2. Haz clic en **Add product**
3. Crea los siguientes productos con sus precios:

**Maquillaje:**
- Paleta de Sombras Premium Rose Gold - $45.99
- Labial Mate Larga Duración - $28.99
- Base de Maquillaje Full Coverage - $38.50
- Delineador Líquido Precision - $22.99
- Máscara de Pestañas Volumen Extremo - $32.99
- Rubor en Polvo Luminoso - $26.99

**Cuidado Personal:**
- Sérum Facial Hidratante Luxury - $52.00
- Crema Facial Antienvejecimiento - $65.00
- Limpiador Facial Suave - $24.99
- Mascarilla Facial Purificante - $38.99
- Tónico Equilibrante - $28.50
- Contorno de Ojos Revitalizante - $42.99

**Herramientas:**
- Set de Brochas de Maquillaje Premium - $68.50
- Esponja de Maquillaje Beauty Blender - $18.99
- Rizador de Pestañas Profesional - $32.99
- Espejo de Maquillaje LED - $55.99
- Pinzas de Precisión para Cejas - $16.99
- Organizador de Maquillaje Premium - $44.99

### Paso 5: Actualizar los Price IDs

Después de crear los productos en Stripe, actualiza los `priceId` en el archivo `server/routes/checkout.ts`:

```typescript
const productPrices: Record<string, { priceId: string; name: string }> = {
  'makeup-001': {
    priceId: 'price_XXXXXXXXXXXX', // Reemplaza con el Price ID de Stripe
    name: 'Paleta de Sombras Premium Rose Gold',
  },
  // ... más productos
};
```

Para obtener los Price IDs:
1. En el Dashboard de Stripe, ve a **Products**
2. Haz clic en cada producto
3. Copia el **Price ID** de la sección de precios

## Prueba del Carrito

### Agregar Productos al Carrito
1. Ve a la página de **Productos**
2. Haz clic en **"Agregar al Carrito"** en cualquier producto
3. Verás una notificación de confirmación
4. El contador del carrito en la navegación se actualizará

### Ver el Carrito
1. Haz clic en el icono del carrito en la navegación superior
2. Se abrirá un panel lateral con los productos
3. Puedes aumentar, disminuir o eliminar productos
4. Haz clic en **"Proceder al Pago"** para ir al checkout

### Completar el Checkout
1. Rellena el formulario con tu información
2. Haz clic en **"Proceder al Pago"**
3. Serás redirigido a Stripe Checkout
4. Usa la tarjeta de prueba: **4242 4242 4242 4242**
5. Ingresa cualquier fecha futura y cualquier CVC

### Tarjetas de Prueba de Stripe

**Pago Exitoso:**
- Número: 4242 4242 4242 4242
- Fecha: Cualquier fecha futura (ej: 12/25)
- CVC: Cualquier número de 3 dígitos

**Pago Rechazado:**
- Número: 4000 0000 0000 0002
- Fecha: Cualquier fecha futura
- CVC: Cualquier número de 3 dígitos

## Configuración de Webhooks (Opcional)

Los webhooks permiten que Stripe notifique a tu servidor sobre eventos de pago:

1. En el Dashboard de Stripe, ve a **Developers** → **Webhooks**
2. Haz clic en **Add endpoint**
3. Ingresa la URL: `https://tu-dominio.com/api/stripe/webhook`
4. Selecciona los eventos: `payment_intent.succeeded`, `checkout.session.completed`
5. Copia el **Signing Secret** y actualiza `STRIPE_WEBHOOK_SECRET`

## Solución de Problemas

### El checkout no funciona
- Verifica que las claves de Stripe estén correctas en Settings → Payment
- Asegúrate de que los Price IDs en `server/routes/checkout.ts` sean válidos
- Revisa la consola del navegador para errores

### Los productos no aparecen en Stripe
- Crea los productos en el Dashboard de Stripe
- Obtén los Price IDs correctos
- Actualiza el archivo `server/routes/checkout.ts`

### El pago no se procesa
- Usa las tarjetas de prueba proporcionadas por Stripe
- Verifica que el monto sea mayor a $0.50 USD
- Revisa el Dashboard de Stripe para ver los eventos de pago

## Próximos Pasos

1. **Crear una base de datos** para almacenar órdenes y historial de compras
2. **Implementar autenticación de usuarios** para guardar órdenes por cliente
3. **Agregar notificaciones por email** cuando se complete una compra
4. **Implementar panel de administración** para gestionar productos y órdenes
5. **Configurar impuestos y envíos** en Stripe

## Recursos Útiles

- [Documentación de Stripe](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com)

## Soporte

Si tienes problemas con la integración de Stripe:
1. Revisa el Dashboard de Stripe para ver los eventos
2. Consulta los logs del servidor
3. Verifica que todas las variables de entorno estén configuradas
4. Contacta al soporte de Stripe en [support.stripe.com](https://support.stripe.com)
