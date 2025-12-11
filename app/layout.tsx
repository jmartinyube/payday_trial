"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider, useCart } from "./context/CartContext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // Icono

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*export const metadata: Metadata = {
  title: "Mi Tienda",
  description: "Tienda con carrito",
};*/

// Componente para mostrar el icono con contador
function CartIcon() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative flex items-center">
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans">
        <CartProvider>
          <header className="bg-black text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Mi Tienda</h1>

            <nav className="flex gap-4 items-center">
              <Link href="/" className="hover:text-gray-400">Inicio</Link>
              <Link href="/productos" className="hover:text-gray-400">Productos</Link>
              <CartIcon />
            </nav>
          </header>

          {children}

          <footer className="bg-black text-white text-center p-4 mt-10">
            © 2025 Mi tienda - Todos los derechos reservados
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}




/*export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}*/
