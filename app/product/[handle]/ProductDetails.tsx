// app/product/[handle]/ProductDetails.tsx
"use client";

import { useCart } from "@/app/context/CartContext";

export default function ProductDetails({ product }: { product: any }) {
  const { addToCart } = useCart();
  const image = product.images?.edges?.[0]?.node?.url;
  const firstVariant = product.variants?.edges?.[0]?.node;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <img src={image || "/placeholder.png"} alt={product.title} className="rounded-lg mb-6"/>
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-gray-600 mt-2">
        {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
      </p>
      <p className="mt-4">{product.description}</p>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700"
        onClick={() => {
          if (!firstVariant) return;
          addToCart({
            id: firstVariant.id,
            title: product.title,
            image,
            price: product.priceRange.minVariantPrice.amount,
            quantity: 1,
          });
        }}
      >
        Añadir al carrito
      </button>
    </div>
  );
}





