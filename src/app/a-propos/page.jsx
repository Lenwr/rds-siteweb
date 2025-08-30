export const metadata = {
    title: "Qui sommes-nous ? — Teranga Cargo",
    alternates: { canonical: "/a-propos" },
  };
  
  const KPIS = [
    { value: "7+", label: "Années d’expérience" },
    { value: "1000+", label: "Colis expédiés" },
    { value: "98%", label: "Clients satisfaits" },
  ];
  
  export default function AboutPage() {
    return (
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-600 text-center">
          Qui sommes-nous ?
        </h1>
  
        {/* Carte avec ombre décalée */}
        <div className="mt-6 relative">
          <div className="absolute -left-2 right-2 bottom-2 top-2 rounded-[var(--radius)] bg-black/5 blur-[2px]" />
          <div className="relative bg-white rounded-[var(--radius)] border border-[#D5DEE6] p-6 md:p-8 text-center">
            <p className="text-[15px] text-[#3D5668] leading-relaxed">
              Teranga Cargo offre un service de groupage de fret maritime pour particuliers et professionnels
              de la France vers le Sénégal. Notre mission : un service fiable, éthique et transparent, pour une
              satisfaction durable dans une relation de confiance.
            </p>
  
            {/* KPIs */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {KPIS.map((k) => (
                <div key={k.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-500">{k.value}</div>
                  <div className="text-xs md:text-sm text-[#7D8D99]">{k.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  