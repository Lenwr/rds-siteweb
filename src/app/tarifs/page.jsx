import TarifsTabs from "../components/TarifsTabs";
import EmailJSBinder from "../components/EmailJSBinder";

export const metadata = {
  title: "Tarifs & Devis — Teranga Cargo",
  description:
    "Tarifs indicatifs pour le groupage France → Sénégal et formulaire pour obtenir un devis personnalisé selon poids, volume et destination.",
  alternates: { canonical: "/tarifs" },
};

const rows = [
  { type: "Carton standard", poids: "0–10 kg", volume: "0–0.1 m³", prix: "À partir de 25€" },
  { type: "Carton moyen",    poids: "10–30 kg", volume: "0.1–0.3 m³", prix: "À partir de 45€" },
  { type: "Gros colis",      poids: "30–50 kg", volume: "0.3–0.5 m³", prix: "À partir de 75€" },
];

export default function TarifsPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-600">Tarifs & Devis</h1>
        <p className="mt-4 text-brand-600/70 font-semibold">Tarifs indicatifs</p>
      </header>

      {/* Tableau tarifs */}
      <div className="mt-6 relative">
        <div className="absolute -left-2 right-2 bottom-2 top-2 rounded-[var(--radius)] bg-black/5 blur-[2px]" />
        <div className="relative overflow-hidden rounded-[var(--radius)] border border-[#D5DEE6] bg-white">
          <table className="w-full text-left">
            <thead className="bg-brand-600 text-white">
              <tr className="text-[14px]">
                <th className="px-5 py-3 font-semibold">Type de colis</th>
                <th className="px-5 py-3 font-semibold">Poids</th>
                <th className="px-5 py-3 font-semibold">Volume</th>
                <th className="px-5 py-3 font-semibold">Prix indicatif</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {rows.map((r) => (
                <tr key={r.type} className="odd:bg-white even:bg-[#F8FBFD]">
                  <td className="px-5 py-4 text-brand-600">{r.type}</td>
                  <td className="px-5 py-4 text-[#5D7283]">{r.poids}</td>
                  <td className="px-5 py-4 text-[#5D7283]">{r.volume}</td>
                  <td className="px-5 py-4 font-medium text-accent-500">{r.prix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#7D8D99] italic">
          *Tarifs indicatifs, devis personnalisé selon le poids, volume et destination exacte.
        </p>
      </div>

      {/* Carte formulaire + onglets (client) */}
      <div className="mt-10 relative">
        <div className="absolute left-2 -right-2 bottom-2 top-2 rounded-[var(--radius)] bg-black/5 blur-[2px]" />
        <div className="relative bg-white rounded-[var(--radius)] border border-[#D5DEE6]">
          <TarifsTabs />
          <EmailJSBinder formId="devis-form" />
        </div>
      </div>
    </section>
  );
}
