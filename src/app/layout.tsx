import { cn } from '~/lib/utils'
import { SiteHeader } from '~/components/site-header'
import { TooltipProvider } from '~/components/ui/tooltip'
import { Inter } from 'next/font/google'
import { CartProvider } from '~/lib/cart-context'
import { ThemeProvider } from 'next-themes'
import { Toaster } from "~/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stripe Products and Checkout',
  description:
    'A template to showcase Stripe products, Next.js Server Actions, and a checkout flow.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('flex min-h-svh flex-col antialiased', inter.className)}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <CartProvider>
              <TooltipProvider delayDuration={0}>
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <Toaster />
              </TooltipProvider>
            </CartProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

