import { getProducts } from "../lib/shopify";
import { Product } from "../types/product";

// Helper para obtener la primera imagen de un producto
function getProductImage(product: Product) {
  return product.images.edges[0]?.node.url || "/placeholder.png";
}

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.length === 0 && <p>No hay productos o error de conexión.</p>}

      {products.map((product: Product) => (
        <div key={product.id} className="border p-4 rounded-xl shadow">
          <img
            src={getProductImage(product)}
            alt={product.title}
            className="rounded"
          />
          <h2 className="mt-2 text-xl font-bold">{product.title}</h2>
          <p className="text-gray-600">
            {product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>
        </div>
      ))}
    </div>
  );
}

