// app/product/[handle]/page.tsx
import { getProduct } from "@/lib/shopify";

interface Props {
  params: { handle: string } | Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: Props) {
  // Desempaquetar params si es un Promise
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) return <p>Handle no definido</p>;

  // Obtener producto desde Shopify
  const product = await getProduct(handle);
  if (!product) return <p>Producto no encontrado</p>;

  // Obtener la primera imagen disponible
  const image = product.images?.edges?.[0]?.node?.url;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      {/* Imagen del producto */}
      <img
        src={image || "/placeholder.png"}
        alt={product.title}
        className="rounded-lg mb-6"
      />

      {/* Título */}
      <h1 className="text-3xl font-bold">{product.title}</h1>

      {/* Precio */}
      <p className="text-gray-600 mt-2">
        {product.priceRange.minVariantPrice.amount}{" "}
        {product.priceRange.minVariantPrice.currencyCode}
      </p>

      {/* Descripción */}
      <p className="mt-4">{product.description}</p>
    </div>
  );
}







