import TrackingClient from "../components/TrackingClient";

export const metadata = {
  title: "Suivre votre colis — Teranga Cargo",
  alternates: { canonical: "/suivi" },
};

export default function SuiviPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-600 text-center">
        Suivre votre colis
      </h1>

      {/* Carte formulaire + résultats */}
      <div className="mt-6 relative">
        <div className="absolute -left-2 right-2 bottom-2 top-2 rounded-[var(--radius)] bg-black/5 blur-[2px]" />
        <div className="relative bg-white rounded-[var(--radius)] border border-[#D5DEE6] p-6 md:p-8">
          <p className="text-center text-sm text-[#5D7283]">
            Entrez votre numéro de bordereau pour suivre l’état de votre expédition en temps réel.
          </p>
          <TrackingClient />
        </div>
      </div>
    </section>
  );
}
