'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { productSchema } from './schema'
import type { z } from 'zod'

export type Product = z.infer<typeof productSchema>

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  favorites: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  addFavorite: (product: Product) => void
  removeFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Product[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const newTotalPrice = cart.reduce((total, item) => {
      return total + (item.price.amount ?? 0) * item.quantity
    }, 0)
    setTotalPrice(newTotalPrice)
  }, [cart])

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const addFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(item => item.id === product.id)) {
        return [...prevFavorites, product]
      }
      return prevFavorites
    })
  }

  const removeFavorite = (productId: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        addFavorite,
        removeFavorite,
        isFavorite,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

