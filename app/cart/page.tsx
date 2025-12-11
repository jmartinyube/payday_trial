"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return <p className="p-10">Tu carrito está vacío.</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Carrito</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b pb-4 mb-4"
        >
          <img src={item.image} className="w-20 rounded" />
          <div className="flex-1">
            <h2 className="font-bold">{item.title}</h2>
            <p>
              {item.price} USD × {item.quantity}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm mt-2"
            >
              Quitar
            </button>
          </div>
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-6">Total: {total.toFixed(2)} USD</h2>

      <button
        onClick={clearCart}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Vaciar carrito
      </button>

      <button className="mt-4 ml-4 bg-green-600 text-white px-4 py-2 rounded">
        Tramitar pedido
      </button>
    </div>
  );
}

