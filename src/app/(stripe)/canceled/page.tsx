import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { XCircle } from 'lucide-react'
import Link from 'next/link'

export default function CanceledPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <XCircle className="h-6 w-6 text-red-500" />
            <CardTitle>Payment Canceled</CardTitle>
          </div>
          <CardDescription>Your order has been canceled.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>If you have any questions or concerns, please contact our customer support.</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">Return to Shop</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

