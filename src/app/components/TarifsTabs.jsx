"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import TarifsDevisForm from "../components/TarifsDevisForm";
import EstimationDevisForm from "../components/EstimationDevisForm";

export default function TarifsTabs() {
  const [tab, setTab] = useState("form"); // "form" | "estimate"

  return (
    <div className="p-5 md:p-7">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setTab("form")}
          className={`px-4 py-2 font-medium ${
            tab === "form" ? "text-brand-600 border-b-2 border-brand-600" : "text-gray-500"
          }`}
        >
          Devis personnalisé
        </button>
        <button
          onClick={() => setTab("estimate")}
          className={`px-4 py-2 font-medium ${
            tab === "estimate" ? "text-brand-600 border-b-2 border-brand-600" : "text-gray-500"
          }`}
        >
          Estimation rapide
        </button>
      </div>

      {tab === "form" && (
        <div>
          <p className="text-sm text-[#5D7283] mb-4">
            Remplissez vos informations pour recevoir un devis précis par email.
          </p>
          <TarifsDevisForm />
          {/* CTA global si besoin */}
          {/* <button className="btn bg-accent-500 text-white mt-4"><Send size={16}/> Obtenir mon devis gratuit</button> */}
        </div>
      )}

      {tab === "estimate" && <EstimationDevisForm />}
    </div>
  );
}
