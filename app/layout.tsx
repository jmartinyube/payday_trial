"use client";

import "./globals.css";
import { CartProvider, useCart } from "./context/CartContext";
import Link from "next/link";
import {
  ShoppingCart,
  Home,
  Package,
  Menu,
  Sparkles,
  Dice5,
  Gem,
  Tags,
  X,
} from "lucide-react";
import { SiInstagram, SiTiktok, SiX } from "react-icons/si";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = [
    "Envio gratis en compras mayores a 50€",
    "Nuevas cartas disponibles cada semana",
    "¡Suscribete y obten un 10% de descuento!",
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="es">
      <body
        className="font-body"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <CartProvider>
          <SideBar />

          {/* CONTENIDO */}
          <div className="md:ml-16">
            {/* TOP HEADER */}
            <div
              className="w-full relative py-1 text-sm font-medium"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex gap-4">
                <SiInstagram size={18} />
                <SiTiktok size={18} />
                <SiX size={18} />
              </div>
              <div className="text-center">{messages[currentMessage]}</div>
            </div>

            {/* MAIN HEADER */}
            <header
              className="flex justify-between items-center px-6 py-6"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo_payday.png" className="w-24 h-24" />
                <span className="text-2xl font-bold">Payday Cards</span>
              </Link>

              <div className="flex gap-6">
                <Link href="/">
                  <Home size={28} />
                </Link>
                <Link href="/products">
                  <Package size={28} />
                </Link>
                <CartIcon />
              </div>
            </header>

            {children}

            <footer
              className="text-center p-4 mt-10"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              © 2025 Payday Cards
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

/* =========================
   SIDEBAR RESPONSIVE + ANIMADO
========================= */
function SideBar() {
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = [
    { name: "Pokemon", href: "/products?cat=pokemon", icon: Sparkles },
    { name: "Yu-Gi-Oh", href: "/products?cat=yugioh", icon: Dice5 },
    { name: "Magic", href: "/products?cat=magic", icon: Gem },
    { name: "Ofertas", href: "/products?cat=offers", icon: Tags },
  ];

  return (
    <>
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside
        className="hidden md:flex fixed top-0 left-0 h-full z-50 flex-col transition-all duration-300 ease-in-out"
        style={{
          width: hovered ? "220px" : "64px",
          background: "var(--foreground)",
          color: "var(--background)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Icono menu */}
        <div className="h-16 flex items-center justify-center">
          <Menu size={28} />
        </div>

        {/* Categorías */}
        <nav className="flex flex-col mt-4">
          {categories.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-[var(--accent-yellow)] hover:text-[var(--foreground)]"
            >
              <Icon size={20} />
              {hovered && <span className="whitespace-nowrap">{name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ===== MOBILE MENU BUTTON ===== */}
      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* ===== MOBILE DRAWER ===== */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside
            className="fixed top-0 left-0 h-full w-64 z-50 animate-slideIn"
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            <div className="h-16 flex items-center justify-between px-4">
              <Menu size={24} />
              <X size={24} onClick={() => setMobileOpen(false)} />
            </div>

            <nav className="flex flex-col mt-4">
              {categories.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--accent-yellow)] hover:text-[var(--foreground)]"
                >
                  <Icon size={20} />
                  {name}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}

      {/* Animación */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}


/* =========================
   CART
========================= */
function CartIcon() {
  const { cart } = useCart();
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart size={28} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
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
