import Stripe from 'stripe';
import { z } from 'zod';
import { apiError, apiSuccess } from '@/lib/api/response';
import { appEnv, hasConfiguredStripeSecret } from '@/lib/config/env';
import { getMarketplaceCheckoutProduct } from '@/lib/payments/marketplaceCheckout';

const checkoutSchema = z.object({
  productId: z.string().min(1),
});

function getStripeClient() {
  if (!appEnv.stripeSecretKey) return null;
  return new Stripe(appEnv.stripeSecretKey);
}

export async function POST(request: Request) {
  try {
    if (!hasConfiguredStripeSecret) {
      return apiError('Stripe is not configured yet.', 503);
    }

    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return apiError('Invalid checkout payload.', 400);
    }

    const product = getMarketplaceCheckoutProduct(parsed.data.productId);
    if (!product) {
      return apiError('Marketplace product not found.', 404);
    }

    const stripe = getStripeClient();
    if (!stripe) {
      return apiError('Stripe is not configured yet.', 503);
    }

    const origin = new URL(request.url).origin || appEnv.authUrl;
    const successUrl = `${origin}/marketplace?checkout=success&item=${product.id}`;
    const cancelUrl = `${origin}/marketplace?checkout=cancel&item=${product.id}`;

    const session = await stripe.checkout.sessions.create({
      mode: product.id === 'premium-plan-monthly' ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.amountCents,
            recurring: product.id === 'premium-plan-monthly' ? { interval: 'month' } : undefined,
            product_data: {
              name: product.name,
              description: product.description,
              metadata: {
                productId: product.id,
                source: 'zstream-marketplace-beta',
              },
            },
          },
        },
      ],
      metadata: {
        productId: product.id,
        source: 'zstream-marketplace-beta',
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    if (!session.url) {
      return apiError('Stripe did not return a checkout URL.', 502);
    }

    return apiSuccess({ checkoutUrl: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Marketplace checkout error:', error);
    const message = error instanceof Error ? error.message : 'Unable to create checkout session.';
    return apiError(message, 500);
  }
}


