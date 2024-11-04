import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const createCheckoutSession = async (items: any[], shippingRate: number) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, shippingRate }),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Error in createCheckoutSession:', error);
    throw error;
  }
};