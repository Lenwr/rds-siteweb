"use client";

import { useMemo, useState } from "react";
import { Calculator, Info } from "lucide-react";

/**
 * EstimationDevisForm
 * - Extensible (règles de pricing séparées)
 * - Calcule volume (m³), poids volumétrique (kg vol = m³ * 167), et prix estimatif
 * - Options: enlèvement à domicile, fragile, assurance
 * - Prêt pour brancher API/DB plus tard
 */

const TYPES = [
  { id: "carton", label: "Carton" },
  { id: "autre", label: "Autre" },
];

// Règles de base (exemple simple → tu pourras affiner)
const PRICING_RULES = {
  base: {
    // €/kg facturé (poids réel ou volumétrique), min par envoi
    ratePerKg: 2.2,
    minCharge: 25,
  },
  surcharges: {
    pickupHome: 10,       // enlèvement à domicile
    fragile: 8,           // manipulation
    insuranceRate: 0.02,  // 2% de la valeur déclarée
  },
  // paliers volume pour “forfaits” (exemple)
  volumeBrackets: [
    { max: 0.10, price: 25 },
    { max: 0.30, price: 45 },
    { max: 0.50, price: 75 },
  ],
};

/** helpers */
function toNumber(v) {
  const n = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}
function cmToM(n) {
  return toNumber(n) / 100;
}
function round2(n) {
  return Math.round(n * 100) / 100;
}

export default function EstimationDevisForm() {
  const [type, setType] = useState("carton");
  const [longueur, setLongueur] = useState(""); // cm
  const [largeur, setLargeur] = useState("");   // cm
  const [hauteur, setHauteur] = useState("");   // cm
  const [poids, setPoids] = useState("");       // kg
  const [valeur, setValeur] = useState("");     // € valeur assurée
  const [pickupHome, setPickupHome] = useState(false);
  const [fragile, setFragile] = useState(false);
  const [assurance, setAssurance] = useState(false);

  // Calculs physiques
  const { volumeM3, poidsVolKg, poidsFacture } = useMemo(() => {
    const L = cmToM(longueur);
    const l = cmToM(largeur);
    const h = cmToM(hauteur);

    const volume = L > 0 && l > 0 && h > 0 ? L * l * h : 0; // m³
    const volumetricKg = volume * 167; // règle fret aérien/maritime (ajuste si besoin)
    const realKg = toNumber(poids);

    // le plus pénalisant
    const chargeable = Math.max(realKg || 0, volumetricKg || 0);

    return {
      volumeM3: round2(volume),
      poidsVolKg: round2(volumetricKg),
      poidsFacture: round2(chargeable),
    };
  }, [longueur, largeur, hauteur, poids]);

  // Pricing
  const estimate = useMemo(() => {
    const { ratePerKg, minCharge } = PRICING_RULES.base;

    // Forfait volume si petit (comme ton tableau)
    let forfait = null;
    for (const b of PRICING_RULES.volumeBrackets) {
      if ((volumeM3 || 0) > 0 && volumeM3 <= b.max) {
        forfait = b.price;
        break;
      }
    }

    let base = forfait ?? Math.max(minCharge, poidsFacture * ratePerKg);

    // Surcharges
    if (pickupHome) base += PRICING_RULES.surcharges.pickupHome;
    if (fragile) base += PRICING_RULES.surcharges.fragile;
    if (assurance) {
      const val = Math.max(0, toNumber(valeur));
      base += round2(val * PRICING_RULES.surcharges.insuranceRate);
    }

    return {
      total: round2(base),
      forfaitApplique: forfait != null,
    };
  }, [volumeM3, poidsFacture, pickupHome, fragile, assurance, valeur]);

  return (
    <div className="p-5 md:p-7">
      <h3 className="text-xl font-semibold text-brand-600">Estimateur</h3>

      {/* Sélecteur type */}
      <div className="mt-4">
        <label className="block text-[13px] font-medium text-brand-600 mb-1">
          Que souhaitez-vous envoyer aujourd’hui ?
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-[var(--radius)] border border-[#D5DEE6] bg-white px-3 py-2 text-[14px] text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        >
          {TYPES.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Dimensions/poids */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          inputMode="decimal"
          value={longueur}
          onChange={(e) => setLongueur(e.target.value)}
          placeholder="Longueur (cm)"
          className="rounded-[var(--radius)] border border-[#D5DEE6] px-3 py-2 text-[14px] placeholder:text-[#9BB0BF] focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
        <input
          inputMode="decimal"
          value={largeur}
          onChange={(e) => setLargeur(e.target.value)}
          placeholder="Largeur (cm)"
          className="rounded-[var(--radius)] border border-[#D5DEE6] px-3 py-2 text-[14px] placeholder:text-[#9BB0BF] focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
        <input
          inputMode="decimal"
          value={hauteur}
          onChange={(e) => setHauteur(e.target.value)}
          placeholder="Hauteur (cm)"
          className="rounded-[var(--radius)] border border-[#D5DEE6] px-3 py-2 text-[14px] placeholder:text-[#9BB0BF] focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
        <input
          inputMode="decimal"
          value={poids}
          onChange={(e) => setPoids(e.target.value)}
          placeholder="Poids (kg)"
          className="rounded-[var(--radius)] border border-[#D5DEE6] px-3 py-2 text-[14px] placeholder:text-[#9BB0BF] focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
      </div>

      {/*}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="inline-flex items-center gap-2 text-[14px] text-brand-600">
          <input type="checkbox" checked={pickupHome} onChange={(e) => setPickupHome(e.target.checked)} /> Enlèvement à domicile
        </label>
        <label className="inline-flex items-center gap-2 text-[14px] text-brand-600">
          <input type="checkbox" checked={fragile} onChange={(e) => setFragile(e.target.checked)} /> Colis fragile
        </label>
        <label className="inline-flex items-center gap-2 text-[14px] text-brand-600">
          <input type="checkbox" checked={assurance} onChange={(e) => setAssurance(e.target.checked)} /> Assurance
        </label>
      </div>
      
       Options */}

      {assurance && (
        <div className="mt-3">
          <input
            inputMode="decimal"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            placeholder="Valeur déclarée (€)"
            className="w-full rounded-[var(--radius)] border border-[#D5DEE6] px-3 py-2 text-[14px] placeholder:text-[#9BB0BF] focus:outline-none focus:ring-2 focus:ring-brand-600/30"
          />
          <p className="mt-1 text-xs text-[#7D8D99]">Assurance ≈ 2% de la valeur déclarée (paramétrable).</p>
        </div>
      )}

      {/* Résultats */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-[var(--radius)] border border-[#E2EAF0] bg-[#F8FBFD] p-4">
          <div className="flex items-center gap-2 text-brand-600 font-semibold">
            <Calculator size={16} /> Résumé calcul
          </div>
          <ul className="mt-3 text-sm text-[#3D5668] space-y-1.5">
            <li>Volume estimé : <strong>{volumeM3 || 0} m³</strong></li>
            <li>Poids volumétrique : <strong>{poidsVolKg || 0} kg</strong></li>
            <li>Poids facturé (max) : <strong>{poidsFacture || 0} kg</strong></li>
          </ul>
        </div>

        <div className="rounded-[var(--radius)] border border-[#E2EAF0] p-4">
          <div className="text-sm text-[#7D8D99] flex items-center gap-2">
            <Info size={16} /> Prix sous réserve de vérification
          </div>
          <div className="mt-2 text-3xl font-extrabold text-accent-500">
            ~ {estimate.total.toFixed(2)} €
          </div>
          {estimate.forfaitApplique && (
            <p className="text-xs text-[#7D8D99] mt-1">Forfait “petit volume” appliqué selon m³.</p>
          )}
          <button
            className="mt-4 w-full btn bg-accent-500 text-white hover:opacity-95"
            onClick={() => alert("On te recontacte pour finaliser le devis 🔒")}
          >
            Convertir en devis
          </button>
        </div>
      </div>
    </div>
  );
}
