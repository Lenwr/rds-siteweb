"use client";

import { useMemo, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../service/config";
import { Search } from "lucide-react";

/* helpers */
function formatDate(dateString) {
  if (!dateString) return "Non disponible";
  const d = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).format(d);
}

export default function TrackingClient() {
  const [trackingCode, setTrackingCode] = useState("");
  const [data, setData] = useState(null);
  const [colisList, setColisList] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search() {
    setError("");
    setLoading(true);
    setData(null);
    setColisList([]);
    setTimeline([]);

    try {
      const q = query(collection(db, "enlevements"), where("numero", "==", trackingCode));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0].data();

        const steps = [
          { status: "Réceptionné", date: doc.date },
          { status: "Expédié", date: doc.preparationDate },
          { status: "Disponible pour retrait", date: doc.transitDate },
          { status: "Livré", date: doc.deliveryDate },
        ];
        setTimeline(steps);

        const details = (doc.colis || []).flatMap((colisItem, colisIndex) =>
          (colisItem.details || []).map((item, index) => ({
            id: `${colisIndex + 1}-${index + 1}`,
            nom: colisItem.nom || `Colis ${colisIndex + 1}`,
            coli: item.coli || `Colis ${colisIndex + 1}.${index + 1}`,
            quantite: colisItem.quantite || 1,
            statutColis:
              typeof item.statutColis === "string"
                ? item.statutColis
                : item.statutColis === false
                ? "Réceptionné"
                : "Inconnu",
            historique: item.historique || [],
          }))
        );
        setColisList(details);

        setData({
          etat: doc.deliveryStatus || "Inconnu",
          dateEstimee: formatDate(doc.date),
          lastUpdate: formatDate(doc.lastUpdate),
          expediteur: doc.expediteur || "Non renseigné",
          destinataire: doc.destinataire || "Non renseigné",
          destination: doc.destination || "Non renseigné",
          nombreColis: details.length,
          telephone: doc.telephoneDestinataire || "Non renseigné",
        });
      } else {
        setError("Aucun colis trouvé pour ce numéro.");
      }
    } catch (e) {
      console.error(e);
      setError("Erreur lors de la récupération.");
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = useMemo(() => loading || trackingCode.trim().length < 3, [loading, trackingCode]);

  return (
    <div className="mt-6">
      {/* Form */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
        <input
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          placeholder="Numéro de bordereau (ex: TC2024-001234)"
          className="flex-1 rounded-[var(--radius)] border border-[#D5DEE6] px-4 py-2.5 text-[14px] placeholder:text-[#9BB0BF] focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
        <button
          onClick={search}
          disabled={isDisabled}
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-accent-500 px-5 py-2.5 text-white font-medium disabled:opacity-50"
        >
          <Search size={16} /> Suivre mon colis
        </button>
      </div>

      {/* State */}
      {error && <p className="mt-4 text-center text-red-600 font-medium">{error}</p>}
      {loading && <p className="mt-4 text-center text-[#7D8D99]">Chargement…</p>}

      {/* Résultats */}
      {data && (
        <div className="mt-8">
          {/* Légende Timeline (comme ton code) */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-left mb-8">
            <div><strong>Réceptionné :</strong> Le colis a été pris en charge par notre service.</div>
            <div><strong>Expédié :</strong> Le colis est en route vers la destination.</div>
            <div><strong>Disponible pour retrait :</strong> Le colis est prêt à être récupéré ou livré.</div>
            <div><strong>Livré :</strong> Le colis a été remis au destinataire.</div>
          </div>

          {/* Infos enlèvement */}
          <div className="mt-6 p-5 border border-orange-200 rounded-[var(--radius)] bg-orange-50 text-orange-800">
            <h4 className="text-lg font-bold mb-2">Infos de l’enlèvement</h4>
            <p><strong>Expéditeur :</strong> {data.expediteur}</p>
            <p><strong>Destinataire :</strong> {data.destinataire}</p>
            <p><strong>Destination :</strong> {data.destination}</p>
            <p><strong>Nombre de colis :</strong> {data.nombreColis}</p>
            <p><strong>Téléphone :</strong> {data.telephone}</p>
          </div>

          {/* Détail des colis */}
          {colisList.length > 0 && (
            <>
              <h4 className="mt-10 text-xl font-bold text-center">📦 Détail des colis ({colisList.length})</h4>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {colisList.map((c) => (
                  <div key={c.id} className="p-5 bg-white border border-gray-200 rounded-[var(--radius)] shadow-sm">
                    <p className="font-bold text-accent-500 mb-1">{c.coli}</p>
                    <p><strong>Nom :</strong> {c.nom}</p>
                    <p><strong>Quantité :</strong> {c.quantite}</p>
                    <p>
                      <strong>Statut :</strong>{" "}
                      <span className={
                        c.statutColis === "Livré" ? "text-green-600 font-bold"
                        : c.statutColis === "Réceptionné" ? "text-orange-600 font-semibold"
                        : "text-gray-600"
                      }>
                        {c.statutColis === "Chargé" ? "Indisponible pour retrait" : c.statutColis}
                      </span>
                    </p>

                    {/* Timeline interne */}
                    {Array.isArray(c.historique) && c.historique.length > 0 && (
                      <div className="mt-4 space-y-3 border-l-4 border-orange-400 pl-4">
                        {c.historique.map((step, idx) => (
                          <div key={idx} className="relative">
                            <div className="absolute -left-3 top-1 w-3 h-3 bg-orange-400 rounded-full" />
                            <p className="font-semibold">{step.status}</p>
                            <p className="text-sm text-[#7D8D99]">
                              {formatDate(step.date)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tableau synthèse */}
              <h4 className="mt-10 text-lg font-semibold">Détails des colis :</h4>
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 text-[14px]">
                      <th className="p-2">Nom du colis</th>
                      <th className="p-2">Coli</th>
                      <th className="p-2">Quantité</th>
                      <th className="p-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    {colisList.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="p-2">{item.nom}</td>
                        <td className="p-2">{item.coli}</td>
                        <td className="p-2">{item.quantite}</td>
                        <td className="p-2">
                          <span className={
                            item.statutColis === "Livré" ? "text-green-600 font-bold"
                            : item.statutColis === "Réceptionné" ? "text-orange-600 font-semibold"
                            : "text-gray-600"
                          }>
                            {item.statutColis}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Infos expéditeur/destinataire */}
              <div className="mt-6 text-sm text-[#3D5668] space-y-1">
                <p><strong>Expéditeur :</strong> {data.expediteur}</p>
                <p><strong>Destinataire :</strong> {data.destinataire}</p>
                <p><strong>Destination :</strong> {data.destination}</p>
                <p><strong>Nombre de colis :</strong> {data.nombreColis}</p>
                <p><strong>Téléphone destinataire :</strong> {data.telephone}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
