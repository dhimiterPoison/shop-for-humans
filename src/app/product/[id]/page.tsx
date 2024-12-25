import { ProductBuyForm } from '~/components/product-buy-form'
import { getProducts } from '~/lib/products'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function ProductPage({
params,
}: {
params: { id: string }
}) {
const products = await getProducts({ limit: 100 })
const product = products.data.find(p => p.id === params.id)

if (!product) {
  notFound()
}

return (
  <div className="mx-auto max-w-screen-xl px-4 py-8">
    <div className="grid gap-8 md:grid-cols-2">
      <div className="ring-border aspect-square overflow-hidden rounded-xl ring-1">
        <Image
          src={product.images?.[0] ?? '/placeholder.svg'}
          alt={product.name}
          width={600}
          height={600}
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-semibold">{product.price.display_amount}</p>
        <p className="text-muted-foreground">{product.description}</p>
        <ProductBuyForm product={product} compact={false} />
      </div>
    </div>
  </div>
)
}

