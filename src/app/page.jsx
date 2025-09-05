// app/page.jsx
import Link from "next/link";
import Image from "next/image";
import {
  Truck, FileText, Search, ShieldCheck, Ship, Boxes, PackageCheck,
  MapPinCheckInside, FileCheck2, Sparkles
} from "lucide-react";

export const metadata = {
  title: "Teranga Cargo — Groupage France → Sénégal",
  description: "Enlèvement partout en France, expédition maritime, réception à Dakar. Devis gratuit, suivi simple.",
  alternates: { canonical: "/" },
};

const SERVICES = [
  { i:1, title:"Enlèvement", desc:"Enlèvement de vos colis dans toute la France à domicile ou en point relais.", icon: PackageCheck },
  { i:2, title:"Sécurisation", desc:"Filmage, étiquetage et protection optimale de vos produits.", icon: ShieldCheck },
  { i:3, title:"Chargement", desc:"Chargement sécurisé de votre colis dans nos conteneurs.", icon: Boxes },
  { i:4, title:"Expédition", desc:"Transport maritime sécurisé vers le port de Dakar.", icon: Ship },
  { i:5, title:"Formalités douanières", desc:"Gestion complète des formalités export/import.", icon: FileCheck2 },
  { i:6, title:"Réception", desc:"Réception et déchargement au port de Dakar, prêt pour la récupération.", icon: MapPinCheckInside },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section
        className="
          relative overflow-hidden
          bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(255,255,255,.08),transparent_60%),
              radial-gradient(1000px_500px_at_90%_0%,rgba(255,255,255,.06),transparent_60%)]
          bg-brand-600
        "
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,.06)_100%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Groupage France <span className="text-white/95">→</span> Sénégal
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/80">
            Enlèvement partout en France, expédition maritime, réception à Dakar
          </p>
          <p className="mt-4 text-sm sm:text-base text-white/60">
            Groupage maritime France → Sénégal, simple et transparent
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4">
            <Link href="/contact#enlevement" className="btn bg-accent-500 text-white hover:opacity-95 active:opacity-90 flex items-center gap-2 px-5 py-3 text-base rounded-[--radius]">
              <Truck size={18} /> Demander un enlèvement
            </Link>
            <Link href="/tarifs" className="btn bg-transparent text-white/80 border border-white/25 hover:bg-white/5 flex items-center gap-2 px-5 py-3 text-base rounded-[--radius]">
              <FileText size={18} /> Demander un devis
            </Link>
            <Link href="/suivi" className="btn bg-transparent text-white/80 border border-white/25 hover:bg-white/5 flex items-center gap-2 px-5 py-3 text-base rounded-[--radius]">
              <Search size={18} /> Suivre mon colis
            </Link>
          </div>

          {/* bande “USP” */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-white/90">
            <div className="rounded-[--radius] bg-white/10 px-4 py-3">🚚 Enlèvement à domicile (FR)</div>
            <div className="rounded-[--radius] bg-white/10 px-4 py-3">🛳️ Expédition maritime sécurisée</div>
            <div className="rounded-[--radius] bg-white/10 px-4 py-3">📦 Suivi en ligne & support</div>
          </div>
        </div>
      </section>

      {/* SECTION IMAGES — bande 2/3 + 1/3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2 relative rounded-[--radius] overflow-hidden">
            {/* place une photo large */}
            <Image
              src="/entrepot.jpg"  // ↙️ mets tes fichiers dans /public/photos/
              alt="Chargement en entrepôt"
              width={1600}
              height={900}
              className="h-64 w-full object-cover"
              priority
            />
          </div>
          <div className="relative rounded-[--radius] overflow-hidden">
            <Image
              src="/contenaire.jpg"
              alt="Conteneur maritime"
              width={800}
              height={900}
              className="h-64 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="relative">
          <div className="absolute -left-2 right-2 bottom-2 top-2 rounded-[var(--radius)] bg-black/5 blur-[2px]" />
          <div className="relative bg-white rounded-[var(--radius)] border border-[#D5DEE6] p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-600">Qui sommes-nous ?</h2>
            <p className="mt-4 text-[15px] text-[#3D5668] leading-relaxed">
              Teranga Cargo offre un service de groupage de fret maritime pour particuliers et professionnels de la France vers le Sénégal.
              Notre mission : un service fiable, éthique et transparent, pour une satisfaction durable dans une relation de confiance.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div><div className="text-2xl font-extrabold text-accent-500">7+</div><div className="text-xs text-[#7D8D99]">Années d’expérience</div></div>
              <div><div className="text-2xl font-extrabold text-accent-500">1000+</div><div className="text-xs text-[#7D8D99]">Colis expédiés</div></div>
              <div><div className="text-2xl font-extrabold text-accent-500">98%</div><div className="text-xs text-[#7D8D99]">Clients satisfaits</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* NOS SERVICES (6 cartes) */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-600 text-center">Nos Services</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ i, title, desc, icon: Icon }) => (
            <div key={title} className="relative">
              <div className="absolute left-1 -right-1 bottom-1 top-1 rounded-[var(--radius)] bg-black/5 blur-[2px]" />
              <article className="relative bg-white rounded-[var(--radius)] border border-[#E2EAF0] p-5">
                <div className="flex items-start gap-3">
                  <span className="grid place-items-center size-9 rounded-full bg-accent-500 text-white shrink-0">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-semibold text-brand-600">{i}. {title}</h3>
                </div>
                <p className="mt-3 text-sm text-[#5D7283]">{desc}</p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-600 text-center">Questions fréquentes</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {[
            {q:"Quels sont les délais de livraison ?", a:"Les délais de livraisons sont de 3 à 4 semaines à partir de la date du chargement du container."},
            {q:"Comment suivre mon colis ?", a:"En entrant votre numéro de bordereau qui sera renseigné sur votre bordereau"},
            {q:"Quels sont les modes de paiement", a:"En espèces , Par virement"},
          ].map(({q,a}) => (
            <details key={q} className="rounded-[var(--radius)] border border-[#E2EAF0] bg-white p-4">
              <summary className="cursor-pointer font-semibold text-brand-600">{q}</summary>
              <p className="mt-2 text-sm text-[#5D7283]">{a}</p>
            </details>
          ))}
        </div>
      </section>
      

      {/* SUIVI TEASER *
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="relative">
          <div className="absolute -left-2 right-2 bottom-2 top-2 rounded-[var(--radius)] bg-black/5 blur-[2px]" />
          <div className="relative bg-white rounded-[var(--radius)] border border-[#D5DEE6] p-6 md:p-8 text-center">
            <h2 className="text-2xl font-extrabold text-brand-600">Suivre votre colis</h2>
            <p className="mt-2 text-sm text-[#5D7283]">Entrez votre numéro de bordereau pour suivre l’état de votre expédition en temps réel.</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                disabled
                placeholder="Numéro de bordereau (ex: TC2024-001234)"
                className="flex-1 rounded-[var(--radius)] border border-[#D5DEE6] px-4 py-2.5 text-[14px] placeholder:text-[#9BB0BF]"
              />
              <Link href="/suivi" className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-accent-500 px-5 py-2.5 text-white font-medium">
                <Search size={16} /> Suivre mon colis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TARIFS TEASER *
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-600 text-center">Tarifs & Devis</h2>
        <p className="text-center text-sm text-[#5D7283] mt-2">Tarifs indicatifs — devis personnalisé selon le poids, volume et destination exacte.</p>
        <div className="mt-6 flex justify-center">
          <Link href="/tarifs" className="btn bg-accent-500 text-white px-5 py-3 rounded-[--radius] flex items-center gap-2">
            <FileText size={16} /> Obtenir mon devis gratuit
          </Link>
        </div>
      </section>

      {/* PARTENAIRES (logos) *
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-600 text-center">Nos Partenaires</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
          {/* place tes logos en SVG/PNG dans /public/partners/
          {["teranga", "niofar", "baobab", "autre"].map((name) => (
            <div key={name} className="h-16 relative grayscale hover:grayscale-0 transition">
              <Image
                src={`/partners/${name}.svg`}
                alt={`Logo ${name}`}
                fill
                className="object-contain"
                sizes="200px"
              />
            </div>
          ))}
        </div>
      </section>
    

      {/* CTA final */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-[var(--radius)] bg-brand-600 px-6 py-7 text-center text-white relative overflow-hidden">
          <Sparkles className="absolute -left-2 -top-2 opacity-20" />
          <h3 className="text-2xl font-bold">Prêt à expédier ?</h3>
          <p className="mt-1 text-white/80">Demandez un enlèvement ou obtenez votre devis gratuit en 1 minute.</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact#enlevement" className="btn bg-accent-500 text-white hover:opacity-95">Demander un enlèvement</Link>
            <Link href="/tarifs" className="btn bg-transparent border border-white/30 text-white hover:bg-white/5">Obtenir un devis</Link>
          </div>
        </div>
      </section>
    </>
  );
}
