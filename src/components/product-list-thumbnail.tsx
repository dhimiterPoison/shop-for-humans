import { ProductBuyForm } from '~/components/product-buy-form'
import { productSchema } from '~/lib/schema'
import Image from 'next/image'
import Link from 'next/link'
import { z } from 'zod'

export function ProductListThumbnail({
product,
}: {
product: z.infer<typeof productSchema>
}) {
return (
  <div className="bg-background group p-2 rounded-2xl">
    <Link href={`/product/${product.id}`} className="block">
      <div className="ring-border relative aspect-square overflow-hidden rounded-xl ring-1 group-hover:ring-primary transition-all">
        <Image
          src={product.images?.[0] ?? '/placeholder.svg'}
          alt={product.name}
          width={400}
          height={400}
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 py-2">
        <div className="flex items-center justify-between">
          <div className="font-medium group-hover:underline">{product.name}</div>
          <div className="text-muted-foreground">
            {product.price.display_amount}
          </div>
        </div>
      </div>
    </Link>
    <div className="mt-2">
      <ProductBuyForm product={product} compact={true} />
    </div>
  </div>
)
}

export function ProductListThumbnailSkeleton() {
return <div className="bg-muted aspect-square rounded-xl" />
}

