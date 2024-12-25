'use server'

import { createCheckoutSession } from '~/lib/stripe'
import { CartItem } from '~/lib/cart-context'

export async function checkoutAction(_prevState: unknown, formData: FormData) {
  const priceId = formData.get('priceId') as string
  await createCheckoutSession({ priceId })
}

export async function checkoutCartAction(items: CartItem[]) {
  try {
    const lineItems = items.map(item => ({
      price: item.price.id,
      quantity: item.quantity,
    }))

    const session = await createCheckoutSession({ lineItems })
    return session.url
  } catch (error) {
    console.error('Checkout action error:', error)
    return null
  }
}

