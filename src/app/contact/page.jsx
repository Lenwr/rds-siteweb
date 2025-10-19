// app/contact/page.jsx
import { Phone, Mail, MessageCircle, MapPin, Building2 } from "lucide-react";

export const metadata = {
  title: "Contactez-nous — Teranga Cargo",
  alternates: { canonical: "/contact" },
};

const CONTACTS = {
  fr: { label: "France", tel: "+33613044335" },
  sn: { label: "Sénégal", tel: "+221774565983" },
  email: "terangacargogroupage@gmail.com",
  whatsapp: "https://wa.me/33613044335",
};

function Pill({ children, className = "", href }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-[--radius] text-sm font-medium ${className}`}
    >
      {children}
    </Comp>
  );
}

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-600 text-center">
        Contactez-nous
      </h1>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ===== Colonne gauche : Coordonnées ===== */}
        <div>
          <h2 className="text-xl font-semibold text-brand-600">Nos coordonnées</h2>

          <ul className="mt-6 space-y-5">
            {/* France */}
            <li className="flex items-start gap-4">
              <span className="grid place-items-center size-10 rounded-full bg-accent-500 text-white shrink-0">
                <Phone size={18} />
              </span>
              <div>
                <div className="text-[15px] font-semibold text-brand-600">France</div>
                <a href={`tel:${CONTACTS.fr.tel}`} className="text-[15px] text-[#5D7283] hover:underline">
                  {CONTACTS.fr.tel.replace(/\+33/, "+33 ").replace(/\+221/, "+221 ")}
                </a>
              </div>
            </li>

            {/* Sénégal */}
            <li className="flex items-start gap-4">
              <span className="grid place-items-center size-10 rounded-full bg-accent-500 text-white shrink-0">
                <Phone size={18} />
              </span>
              <div>
                <div className="text-[15px] font-semibold text-brand-600">Sénégal</div>
                <a href={`tel:${CONTACTS.sn.tel}`} className="text-[15px] text-[#5D7283] hover:underline">
                  {CONTACTS.sn.tel.replace(/\+221/, "+221 ")}
                </a>
              </div>
            </li>

            {/* Email */}
            <li className="flex items-start gap-4">
              <span className="grid place-items-center size-10 rounded-full bg-accent-500 text-white shrink-0">
                <Mail size={18} />
              </span>
              <div>
                <div className="text-[15px] font-semibold text-brand-600">Email</div>
                <a href={`mailto:${CONTACTS.email}`} className="text-[15px] text-[#5D7283] hover:underline">
                  {CONTACTS.email}
                </a>
              </div>
            </li>

            {/* WhatsApp */}
            <li className="flex items-start gap-4">
              <span className="grid place-items-center size-10 rounded-full bg-accent-500 text-white shrink-0">
                <MessageCircle size={18} />
              </span>
              <div>
                <div className="text-[15px] font-semibold text-brand-600">WhatsApp</div>
                <a href={CONTACTS.whatsapp} className="text-[15px] text-[#5D7283] hover:underline">
                  +33 6 13 04 43 35
                </a>
              </div>
            </li>
          </ul>

          {/* Boutons d’action (mêmes styles que la maquette) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Pill href={`tel:${CONTACTS.fr.tel}`} className="bg-accent-500 text-white hover:opacity-95">
              <Phone size={16} /> Appeler France
            </Pill>
            <Pill
              href={`tel:${CONTACTS.sn.tel}`}
              className="border border-brand-600 rounded-[--radius] text-brand-600 bg-white hover:bg-[#F7FAFC]"
            >
              <Phone size={16} /> Appeler Sénégal
            </Pill>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Pill href={`mailto:${CONTACTS.email}`} className="border border-[#CED8DF] text-brand-600 bg-white">
              <Mail size={16} /> Email
            </Pill>
            <Pill href={CONTACTS.whatsapp} className="bg-accent-500/90 text-white hover:opacity-95">
              <MessageCircle size={16} /> WhatsApp
            </Pill>
          </div>
        </div>

        {/* ===== Colonne droite : Bureaux + carte ===== */}
        <div>
          <h2 className="text-xl font-semibold text-brand-600">Nos bureaux</h2>

          {/* Carte placeholder */}
          <div className="mt-6 h-56 sm:h-64 w-full rounded-[--radius] bg-[#E8EEF2] grid place-items-center text-[#7D8D99]">
            Carte des bureaux France & Sénégal
          </div>

          <div className="mt-6 space-y-6 text-[15px]">
            <section>
              <div className="font-semibold text-brand-600">Bureau France</div>
              <ul className="mt-1 text-[#5D7283] space-y-1">
                <li className="flex gap-2"><Building2 size={16} className="mt-0.5 text-brand-600" /> Services disponibles dans toute la France</li>
                <li className="flex gap-2"><MapPin size={16} className="mt-0.5 text-brand-600" /> Enlèvement à domicile sur rendez-vous</li>
              </ul>
            </section>

            <section>
              <div className="font-semibold text-brand-600">Bureau Sénégal</div>
              <ul className="mt-1 text-[#5D7283] space-y-1">
                <li className="flex gap-2"><MapPin size={16} className="mt-0.5 text-brand-600" /> Port autonome de Dakar</li>
                <li className="flex gap-2"><Building2 size={16} className="mt-0.5 text-brand-600" /> Réception et dédouanement</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
