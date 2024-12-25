'use client'

import { Button } from "~/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from "~/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "~/hooks/use-toast"


export function FavoritesMenu() {
  const { favorites, removeFavorite, addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleAddAllToCart = () => {
    favorites.forEach(product => {
      addToCart(product)
    })
    toast({
      title: "Added all to cart",
      description: `${favorites.length} items have been added to your cart.`,
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {favorites.length > 0 && (
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {favorites.length}
            </span>
          )}
          <span className="sr-only">Favorites</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="p-4 pb-2">
          <SheetTitle>Favorites</SheetTitle>
        </SheetHeader>
        {favorites.length > 0 ? (
          <>
            <Button 
              onClick={handleAddAllToCart} 
              className="w-[calc(100%-2rem)] mx-4 mb-2"
            >
              Add All to Cart
            </Button>
            <ScrollArea className="h-[calc(100vh-8rem)] px-4">
              <div className="space-y-4 pb-4">
                {favorites.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4">
                    <Image
                      src={product.images?.[0] ?? '/placeholder.svg'}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <Link href={`/product/${product.id}`} className="font-medium hover:underline">
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{product.price.display_amount}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(product.id)}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <p className="p-4 text-muted-foreground">No favorites yet.</p>
        )}
      </SheetContent>
    </Sheet>
  )
}

