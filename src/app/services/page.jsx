import { PackageCheck, ShieldCheck, Boxes, Ship, FileCheck2, MapPinCheckInside } from "lucide-react";

export const metadata = {
  title: "Nos Services — Teranga Cargo",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  { i: 1, title: "Enlèvement", desc: "Enlèvement de vos colis dans toute la France à domicile ou en point relais.", icon: PackageCheck },
  { i: 2, title: "Sécurisation", desc: "Filmage, étiquetage et protection optimale de vos produits.", icon: ShieldCheck },
  { i: 3, title: "Chargement", desc: "Chargement sécurisé de votre colis dans nos conteneurs.", icon: Boxes },
  { i: 4, title: "Expédition", desc: "Transport maritime sécurisé de votre colis vers le port de Dakar.", icon: Ship },
  { i: 5, title: "Formalités douanières", desc: "Gestion complète des formalités douanières export et import.", icon: FileCheck2 },
  { i: 6, title: "Réception", desc: "Réception et déchargement au port de Dakar, prêt pour la récupération.", icon: MapPinCheckInside },
];

export default function ServicesPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-600 text-center">Nos Services</h1>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map(({ i, title, desc, icon: Icon }) => (
          <div key={title} className="relative">
            {/* ombre décalée */}
            <div className="absolute left-1 -right-1 bottom-1 top-1 rounded-[var(--radius)] bg-black/5 blur-[2px]" />
            <article className="relative bg-white rounded-[var(--radius)] border border-[#E2EAF0] p-5 hover:bg-[#F7FAFC] transition-colors duration-300">
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
  );
}
