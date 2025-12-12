"use client";

import "./globals.css";
import { CartProvider, useCart } from "./context/CartContext";
import Link from "next/link";
import { ShoppingCart, Home } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-body" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <CartProvider>
          <header
            className="p-4 flex justify-between items-center"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            {/* IZQUIERDA: Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo_payday.png" alt="Logo" className="w-10 h-10" />
            </Link>

            {/* CENTRO: Nombre */}
            <div className="flex-1 text-center">
              <Link
                href="/"
                className="text-xl font-bold hover:text-[var(--accent-yellow)]"
                style={{ fontFamily: "var(--font-family-heading)" }}
              >
                Payday Cards
              </Link>
            </div>

            {/* DERECHA: Home y Carrito */}
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-[var(--accent-red)]">
                <Home size={24} color="var(--accent-green)" />
              </Link>
              <CartIcon />
            </div>
          </header>

          {children}

          <footer
            className="text-center p-4 mt-10"
            style={{ background: "var(--foreground)", color: "var(--background)", fontFamily: "var(--font-family-body)" }}
          >
            © 2025 Payday Cards - Todos los derechos reservados
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

function CartIcon() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Link href="/cart" className="relative flex items-center">
      <ShoppingCart size={24} color="var(--accent-green)" />
      {totalItems > 0 && (
        <span
          className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs"
          style={{
            background: "var(--accent-red)",
            color: "var(--background)",
            fontFamily: "var(--font-family-body)",
          }}
        >
          {totalItems}
        </span>
      )}
    </Link>
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
