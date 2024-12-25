'use client'

import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { useCart } from '~/lib/cart-context'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '~/lib/utils'
import { checkoutCartAction } from '~/lib/actions'
import { useToast } from "~/hooks/use-toast"


export function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()
  const [animate, setAnimate] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const { toast } = useToast()

  useEffect(() => {
    if (itemCount > 0) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 500)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      const checkoutUrl = await checkoutCartAction(cart)
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Checkout Error",
        description: "There was a problem processing your checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <Sheet>
      <Tooltip>
        <SheetTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "border-border relative size-8 shrink-0 border",
                animate && "animate-shake"
              )}
            >
              <CartIcon className="size-4" />
              {itemCount > 0 && (
                <span className="bg-primary text-primary-foreground absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full text-xs font-bold">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </TooltipTrigger>
        </SheetTrigger>
        <TooltipContent align="end">Cart</TooltipContent>
        <SheetContent
          side="right"
          className="flex w-full flex-col justify-between p-4 pt-12 md:w-3/4"
        >
          <div>
            <SheetTitle className="mb-4 text-xl">Cart</SheetTitle>
            {cart.length > 0 ? (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.images?.[0] ?? '/placeholder.svg'}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">{item.price.display_amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No items in your cart.</p>
            )}
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-medium">
                {totalPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </div>
            <Button 
              variant="default" 
              size="sm" 
              disabled={cart.length === 0 || isCheckingOut}
              onClick={handleCheckout}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
          </div>
        </SheetContent>
      </Tooltip>
    </Sheet>
  )
}

function CartIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1730_25270)">
        <path
          d="M5.33317 14.6668C5.70136 14.6668 5.99984 14.3684 5.99984 14.0002C5.99984 13.632 5.70136 13.3335 5.33317 13.3335C4.96498 13.3335 4.6665 13.632 4.6665 14.0002C4.6665 14.3684 4.96498 14.6668 5.33317 14.6668Z"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6667 14.6668C13.0349 14.6668 13.3333 14.3684 13.3333 14.0002C13.3333 13.632 13.0349 13.3335 12.6667 13.3335C12.2985 13.3335 12 13.632 12 14.0002C12 14.3684 12.2985 14.6668 12.6667 14.6668Z"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.3667 1.36719H2.70003L4.47337 9.64719C4.53842 9.95043 4.70715 10.2215 4.95051 10.4138C5.19387 10.606 5.49664 10.7074 5.8067 10.7005H12.3267C12.6301 10.7 12.9244 10.596 13.1607 10.4057C13.3971 10.2154 13.5615 9.95021 13.6267 9.65385L14.7267 4.70052H3.41337"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1730_25270">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

