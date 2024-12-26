import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type CheckoutSessionParams = {
  priceId?: string;
  lineItems?: Array<{ price: string; quantity: number }>;
}

export async function createCheckoutSession({ priceId, lineItems }: CheckoutSessionParams) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: priceId 
      ? [{ price: priceId, quantity: 1 }] 
      : lineItems,
    mode: 'payment',
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/canceled`,
  })

  if (!session.url) {
    throw new Error('Failed to create checkout session')
  }

  return session
}

