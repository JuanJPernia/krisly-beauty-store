/**
 * Stripe Checkout Routes
 * 
 * Maneja la creación de sesiones de pago con Stripe
 */

import { Router, Request, Response } from 'express';
import Stripe from 'stripe';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Products mapping for Stripe
const productPrices: Record<string, { priceId: string; name: string }> = {
  'makeup-001': {
    priceId: 'price_makeup_001',
    name: 'Paleta de Sombras Premium Rose Gold',
  },
  'makeup-002': {
    priceId: 'price_makeup_002',
    name: 'Labial Mate Larga Duración',
  },
  'makeup-003': {
    priceId: 'price_makeup_003',
    name: 'Base de Maquillaje Full Coverage',
  },
  'makeup-004': {
    priceId: 'price_makeup_004',
    name: 'Delineador Líquido Precision',
  },
  'makeup-005': {
    priceId: 'price_makeup_005',
    name: 'Máscara de Pestañas Volumen Extremo',
  },
  'makeup-006': {
    priceId: 'price_makeup_006',
    name: 'Rubor en Polvo Luminoso',
  },
  'skincare-001': {
    priceId: 'price_skincare_001',
    name: 'Sérum Facial Hidratante Luxury',
  },
  'skincare-002': {
    priceId: 'price_skincare_002',
    name: 'Crema Facial Antienvejecimiento',
  },
  'skincare-003': {
    priceId: 'price_skincare_003',
    name: 'Limpiador Facial Suave',
  },
  'skincare-004': {
    priceId: 'price_skincare_004',
    name: 'Mascarilla Facial Purificante',
  },
  'skincare-005': {
    priceId: 'price_skincare_005',
    name: 'Tónico Equilibrante',
  },
  'skincare-006': {
    priceId: 'price_skincare_006',
    name: 'Contorno de Ojos Revitalizante',
  },
  'tools-001': {
    priceId: 'price_tools_001',
    name: 'Set de Brochas de Maquillaje Premium',
  },
  'tools-002': {
    priceId: 'price_tools_002',
    name: 'Esponja de Maquillaje Beauty Blender',
  },
  'tools-003': {
    priceId: 'price_tools_003',
    name: 'Rizador de Pestañas Profesional',
  },
  'tools-004': {
    priceId: 'price_tools_004',
    name: 'Espejo de Maquillaje LED',
  },
  'tools-005': {
    priceId: 'price_tools_005',
    name: 'Pinzas de Precisión para Cejas',
  },
  'tools-006': {
    priceId: 'price_tools_006',
    name: 'Organizador de Maquillaje Premium',
  },
};

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

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Build line items for Stripe
    const lineItems = items
      .map((item) => {
        const product = productPrices[item.id];
        if (!product) {
          console.warn(`Product not found: ${item.id}`);
          return null;
        }
        return {
          price: product.priceId,
          quantity: item.quantity,
        };
      })
      .filter((item) => item !== null);

    if (lineItems.length === 0) {
      return res.status(400).json({ error: 'No valid items in cart' });
    }

    // Get origin for redirect URLs
    const origin = req.headers.origin || 'http://localhost:3000';

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'] as any,
      line_items: lineItems,
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

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

export default router;
