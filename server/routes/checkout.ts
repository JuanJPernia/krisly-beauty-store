/**
 * Stripe Checkout Routes
 * 
 * Maneja la creación de sesiones de pago con Stripe
 */

import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { getProductPrice } from '../lib/products.js';

const router = Router();

// Inicializar Stripe solo si la clave secreta está disponible
let stripe: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn('⚠️ STRIPE_SECRET_KEY no está configurada. El checkout no funcionará.');
}

interface CheckoutRequest extends Request {
  body: {
    items: Array<{ id: string; quantity: number }>;
    customerEmail: string;
    customerName: string;
    metadata?: Record<string, string>;
  };
}

// Create checkout session
router.post('/checkout', async (req: CheckoutRequest, res: Response) => {
  try {
    const { items, customerEmail, customerName, metadata } = req.body;

    // Validar que Stripe esté configurado
    if (!stripe) {
      console.error('Stripe no está configurado');
      return res.status(500).json({
        error: 'Stripe no está configurado. Por favor, configura STRIPE_SECRET_KEY en Settings → Payment.',
        checkoutUrl: null,
      });
    }

    // Validar entrada
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    if (!customerEmail || !customerName) {
      return res.status(400).json({ error: 'Missing customer information' });
    }

    // Construir line items para Stripe
    const lineItems: Array<{
      price: string;
      quantity: number;
    }> = [];

    for (const item of items) {
      const product = getProductPrice(item.id);
      if (!product) {
        console.warn(`Product not found: ${item.id}`);
        return res.status(400).json({
          error: `Producto no encontrado: ${item.id}`,
        });
      }
      lineItems.push({
        price: product.priceId,
        quantity: item.quantity,
      });
    }

    if (lineItems.length === 0) {
      return res.status(400).json({ error: 'No valid items in cart' });
    }

    // Obtener origin para URLs de redirección
    const origin = req.headers.origin || 'http://localhost:3000';

    try {
      // Crear sesión de checkout
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'] as any,
        line_items: lineItems as any,
        mode: 'payment',
        customer_email: customerEmail,
        client_reference_id: customerName,
        metadata: {
          customer_email: customerEmail,
          customer_name: customerName,
          ...metadata,
        },
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout`,
        allow_promotion_codes: true,
      });

      if (!session.url) {
        throw new Error('No checkout URL returned from Stripe');
      }

      res.json({ checkoutUrl: session.url });
    } catch (stripeError: any) {
      console.error('Stripe API Error:', stripeError.message);
      res.status(500).json({
        error: `Error de Stripe: ${stripeError.message}`,
        details: process.env.NODE_ENV === 'development' ? stripeError : undefined,
      });
    }
  } catch (error: any) {
    console.error('Checkout error:', error);
    res.status(500).json({
      error: error.message || 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
});

export default router;
