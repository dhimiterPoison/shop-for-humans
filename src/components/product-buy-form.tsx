'use client'

import { Button } from '~/components/ui/button'
import { checkoutAction } from '~/lib/actions'
import { useActionState } from 'react'
import { useCart } from '~/lib/cart-context'
import { productSchema } from '~/lib/schema'
import { z } from 'zod'
import { Heart, ShoppingCart } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { useToast } from "~/hooks/use-toast"


export function ProductBuyForm({ product, compact = false }: { 
  product: z.infer<typeof productSchema>;
  compact?: boolean;
}) {
  const [, formAction, isPending] = useActionState(checkoutAction, null)
  const { addToCart, addFavorite, removeFavorite, isFavorite } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const buttonSize = compact ? "sm" : "default"

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="priceId" value={product.price.id} />
      <Button type="submit" size={buttonSize} variant="default" className={compact ? "px-3 py-1 h-8" : ""}>
        {isPending ? 'Please wait' : 'Buy Now'}
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            type="button" 
            size={buttonSize}
            variant={"secondary"}
            className={compact ? "px-2 py-1 h-8" : ""}
            onClick={handleAddToCart}
          >
            <ShoppingCart className={compact ? "h-4 w-4" : "h-5 w-5 mr-2"} />
            {!compact && "Add to Cart"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to Cart</p>
        </TooltipContent>
      </Tooltip>
      <Button
        type="button"
        size={buttonSize}
        variant="ghost"
        className={compact ? "px-2 py-1 h-8" : ""}
        onClick={(e) => {
          e.preventDefault();
          isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product);
        }}
      >
        <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''} ${!compact ? 'mr-2' : ''}`} />
        {!compact && (isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites')}
      </Button>
    </form>
  )
}

