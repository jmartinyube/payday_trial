"use client";

import "./globals.css";
import { CartProvider, useCart } from "./context/CartContext";
import Link from "next/link";
import {
  ShoppingCart,
  Home,
  Package,
  Menu,
  X,
  Sparkles,
  Dice5,
  Gem,
  Tags,
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
    const i = setInterval(
      () => setCurrentMessage((p) => (p + 1) % messages.length),
      5000
    );
    return () => clearInterval(i);
  }, []);

  return (
    <html lang="es">
      <body
        className="font-body"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <CartProvider>
          {/* ===== TOP HEADER ===== */}
          <div
            className="w-full px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm md:pl-16"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://www.instagram.com" target="_blank">
                <SiInstagram size={16} />
              </a>
              <a href="https://www.tiktok.com" target="_blank">
                <SiTiktok size={16} />
              </a>
              <a href="https://www.x.com" target="_blank">
                <SiX size={16} />
              </a>
            </div>

            <div className="text-center font-medium">
              {messages[currentMessage]}
            </div>

            <div className="hidden md:block w-20" />
          </div>

          {/* ===== HEADER PRINCIPAL ===== */}
          <header
            className="flex items-center justify-between px-4 md:px-8 py-4 md:pl-16"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            {/* IZQUIERDA */}
            <div className="flex items-center gap-2">
              {/* Botón menú móvil */}
              <button
                className="md:hidden"
                onClick={() => document.dispatchEvent(new Event("open-menu"))}
              >
                <Menu size={28} />
              </button>

              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/logo_payday.png"
                  className="w-10 h-10 md:w-16 md:h-16"
                />
                <span className="hidden md:block text-2xl font-bold">
                  Payday Cards
                </span>
              </Link>
            </div>

            {/* DERECHA */}
            <div className="flex items-center gap-4">
              <Link href="/" className="hidden md:block">
                <Home size={24} />
              </Link>
              <Link href="/products" className="hidden md:block">
                <Package size={24} />
              </Link>
              <CartIcon />
            </div>
          </header>

          {/* ===== SIDEBAR ===== */}
          <SideBar />

          {/* ===== CONTENIDO ===== */}
          <main className="md:pl-16">{children}</main>

          {/* ===== FOOTER ===== */}
          <footer
            className="text-center p-4 mt-10 text-sm md:pl-16"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            © 2025 Payday Cards
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

/* ---------------- CART ICON ---------------- */

function CartIcon() {
  const { cart } = useCart();
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span
          className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center rounded-full"
          style={{
            background: "var(--accent-red)",
            color: "var(--background)",
          }}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}

/* ---------------- SIDEBAR ---------------- */

function SideBar() {
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const open = () => setMobileOpen(true);
    document.addEventListener("open-menu", open);
    return () => document.removeEventListener("open-menu", open);
  }, []);

  const categories = [
    { name: "Pokemon", icon: Sparkles },
    { name: "Yu-Gi-Oh", icon: Dice5 },
    { name: "Magic", icon: Gem },
    { name: "Ofertas", icon: Tags },
  ];

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden md:flex fixed top-0 left-0 h-full z-40 flex-col"
        style={{
          width: hovered ? "220px" : "64px",
          background: "var(--foreground)",
          color: "var(--background)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="h-20 flex items-center justify-center">
          <Menu />
        </div>

        {categories.map(({ name, icon: Icon }) => (
          <div key={name} className="flex items-center gap-4 px-4 py-3">
            <Icon size={18} />
            {hovered && <span>{name}</span>}
          </div>
        ))}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="fixed top-0 left-0 h-full w-64 z-50 p-4"
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            <div className="flex justify-between mb-6">
              <Menu />
              <X onClick={() => setMobileOpen(false)} />
            </div>

            {categories.map(({ name, icon: Icon }) => (
              <div key={name} className="flex items-center gap-4 py-3">
                <Icon size={18} /> {name}
              </div>
            ))}
          </aside>
        </>
      )}
    </>
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
