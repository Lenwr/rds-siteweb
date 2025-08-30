"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Image from "next/image";

const NAV = [
  { href: "/", label: "Accueil" },
  //{ href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" }, // dropdown services désactivé chez toi
  { href: "/suivi", label: "Suivi" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openPartners, setOpenPartners] = useState(false); // NEW

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Teranga Cargo" width={32} height={32} />
            <span className="text-xl font-bold text-[#0C3559]">Teranga Cargo</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {NAV.map((item) =>
                item.children ? (
                  <li key={item.href} className="relative">
                    <button
                      className={`inline-flex items-center gap-1 ${
                        isActive(item.href) ? "text-[#0C3559] font-semibold" : "text-[#0C3559] hover:text-orange-500"
                      }`}
                      onMouseEnter={() => setOpenServices(true)}
                      onMouseLeave={() => setOpenServices(false)}
                      onClick={() => setOpenServices((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown size={16} className="mt-0.5" />
                    </button>
                    {openServices && (
                      <div
                        className="absolute left-0 mt-3 w-64 rounded bg-white shadow border border-gray-200 p-2"
                        onMouseEnter={() => setOpenServices(true)}
                        onMouseLeave={() => setOpenServices(false)}
                      >
                        {/* … tes liens de services ici si besoin */}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`transition-colors ${
                        isActive(item.href) ? "text-[#0C3559] font-semibold" : "text-[#0C3559] hover:text-orange-500"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Boutons à droite */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+33613044335"
                className="flex items-center gap-2 px-3 py-2 border-2 border-[#0C3559] rounded-md text-[#0C3559] font-medium hover:bg-gray-50"
              >
                <Phone size={16} /> France
              </a>
              <a
                href="tel:+221774565983"
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600"
              >
                <Phone size={16} /> Sénégal
              </a>

              {/* === Teranga dropdown (Partenaires) === */}
              <div
                className="relative"
                onMouseEnter={() => setOpenPartners(true)}
                onMouseLeave={() => setOpenPartners(false)}
              >
                <button
                  onClick={() => setOpenPartners((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600"
                  aria-haspopup="menu"
                  aria-expanded={openPartners}
                >
                  Teranga <ChevronDown size={16} />
                </button>

                {openPartners && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow">
                    <ul className="py-1 text-sm">
                      <li>
                        <Link
                          href="/partenaires/niofar-logistics"
                          className="block px-3 py-2 hover:bg-gray-50 text-[#0C3559]"
                        >
                          NioFar Logistics
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/partenaires/baobab-freight"
                          className="block px-3 py-2 hover:bg-gray-50 text-[#0C3559]"
                        >
                          Baobab Freight
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* === /Teranga dropdown === */}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-[#0C3559] p-2"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-menu" className="lg:hidden border-t">
            <ul className="flex flex-col gap-1 px-2 py-3 text-sm font-medium">
              {NAV.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <details>
                      <summary className="py-2 cursor-pointer flex items-center justify-between px-2">
                        <span className={`${isActive(item.href) ? "text-[#0C3559] font-semibold" : "text-gray-700"}`}>
                          {item.label}
                        </span>
                        <ChevronDown size={16} />
                      </summary>
                      {/* … liens services si réactivés */}
                    </details>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2 px-2 hover:text-orange-500"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}

              {/* Bloc actions + dropdown partenaires (mobile) */}
              <li className="mt-2 grid grid-cols-2 gap-2 px-2">
                <a
                  href="tel:+33613044335"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 border-2 border-[#0C3559] rounded-md text-[#0C3559] font-medium"
                >
                  <Phone size={16} /> France
                </a>
                <a
                  href="tel:+221774565983"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md bg-orange-500 text-white font-medium"
                >
                  <Phone size={16} /> Sénégal
                </a>
              </li>

              {/* Teranga > partenaires (accordion) */}
              <li className="px-2">
                <details>
                  <summary className="py-2 cursor-pointer flex items-center justify-between px-2 rounded-md bg-orange-500 text-white">
                    Teranga <ChevronDown size={16} />
                  </summary>
                  <ul className="mt-2 ml-2 border-l pl-3 space-y-1">
                    <li>
                      <Link href="/partenaires/niofar-logistics" className="block py-1.5 px-2 text-[#0C3559]" onClick={() => setOpen(false)}>
                        NioFar Logistics
                      </Link>
                    </li>
                    <li>
                      <Link href="/partenaires/baobab-freight" className="block py-1.5 px-2 text-[#0C3559]" onClick={() => setOpen(false)}>
                        Baobab Freight
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
