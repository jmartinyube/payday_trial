"use client";

import "./globals.css";
import { CartProvider, useCart } from "./context/CartContext";
import Link from "next/link";
import { ShoppingCart, Home, Package } from "lucide-react";
import { SiInstagram, SiTiktok, SiX } from "react-icons/si";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Mensajes para el top header
  const messages = [
    "Envio gratis en compras mayores a 50€", //Sin tilde porque la fuente actual no acepta tildes
    "Nuevas cartas disponibles cada semana",
    "¡Suscribete y obten un 10% de descuento!",
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  // Rotar mensajes cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="es">
      <body className="font-body" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <CartProvider>

          {/* Top Header: mensajes con iconos sociales */}
          <div
            className="w-full relative py-1 text-sm font-medium"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            {/* Iconos sociales a la izquierda */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex gap-4 items-center">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <SiInstagram size={18} color="var(--background)" />
              </a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                <SiTiktok size={18} color="var(--background)" />
              </a>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                <SiX size={18} color="var(--background)" />
              </a>
            </div>

            {/* Mensaje centrado */}
            <div className="text-center">{messages[currentMessage]}</div>
          </div>

          {/* Main Header */}
          <header
            className="flex justify-between items-center px-6 py-6"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            {/* IZQUIERDA: Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo_payday.png" alt="Logo" className="w-16 h-16" />
              <span className="text-2xl font-heading font-bold">Payday Cards</span>
            </Link>

            {/* DERECHA: Iconos */}
            <div className="flex items-center gap-6 text-lg">
              <Link href="/" title="Inicio" className="hover:text-[var(--accent-red)]">
                <Home size={28} color="var(--accent-green)" />
              </Link>

              <Link href="/products" title="Productos" className="hover:text-[var(--accent-red)]">
                <Package size={28} color="var(--accent-green)" />
              </Link>

              <CartIcon />
            </div>
          </header>

          {/* Contenido */}
          {children}

          {/* Footer */}
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
    <Link href="/cart" title="Carrito" className="relative flex items-center hover:text-[var(--accent-red)]">
      <ShoppingCart size={28} color="var(--accent-green)" />
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
