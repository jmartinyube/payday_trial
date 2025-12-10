import { getProduct } from "@/lib/shopify";

interface Props {
  params: { handle: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.handle);

  if (!product) return <p>Producto no encontrado</p>;

  const image = product.images?.edges?.[0]?.node?.url;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <img
        src={image || "/placeholder.png"}
        alt={product.title}
        className="rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold">{product.title}</h1>
      
      <p className="text-gray-600 mt-2">
        {product.priceRange.minVariantPrice.amount}{" "}
        {product.priceRange.minVariantPrice.currencyCode}
      </p>

      <p className="mt-4">{product.description}</p>
    </div>
  );
}

