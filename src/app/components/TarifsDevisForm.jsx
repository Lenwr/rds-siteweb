"use client";

import { useState } from "react";
import { Send } from "lucide-react";

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-medium text-brand-600 mb-1">
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-[var(--radius)] border border-[#D5DEE6] bg-white px-3 py-2 text-[14px] text-brand-600 placeholder:text-[#9BB0BF] focus:outline-none focus:ring-2 focus:ring-brand-600/30 ${props.className||""}`}
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full rounded-[var(--radius)] border border-[#D5DEE6] bg-white px-3 py-2 text-[14px] text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
    >
      {children}
    </select>
  );
}

export default function TarifsDevisForm() {
  const [form, setForm] = useState({
    nom: "", email: "", tel: "", ville: "", nature: "Vêtements",
    poids: "", volume: "", date: "", message: "",
  });

  function set(k, v) { setForm((s) => ({ ...s, [k]: v })); }
  function submit(e) {
    e.preventDefault();
    // TODO: branche ton handler (route /api/devis ou Netlify form)
    alert("Merci ! On revient vers vous très vite avec un devis 😊");
  }

  return (
    <div className="p-5 md:p-7">
      <h2 className="text-center text-[20px] md:text-[22px] font-bold text-brand-600">
        Demander un devis personnalisé
      </h2>

      <form className="mt-6 space-y-5" onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nom">Nom complet *</Label>
            <Input id="nom" required value={form.nom} onChange={(e) => set("nom", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="tel">Téléphone *</Label>
            <Input id="tel" required value={form.tel} onChange={(e) => set("tel", e.target.value)} placeholder="ex: +33 6 12 34 56 78" />
          </div>
          <div>
            <Label htmlFor="ville">Ville de retrait (France)</Label>
            <Input id="ville" value={form.ville} onChange={(e) => set("ville", e.target.value)} placeholder="ex: Paris, Lyon, Marseille" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="nature">Nature du colis</Label>
            <Select id="nature" value={form.nature} onChange={(e) => set("nature", e.target.value)}>
              <option>Vêtements</option>
              <option>Électronique</option>
              <option>Pièces auto</option>
              <option>Cosmétiques</option>
              <option>Autre</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="poids">Poids estimé (kg)</Label>
            <Input id="poids" inputMode="decimal" placeholder="ex: 25" value={form.poids} onChange={(e) => set("poids", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="volume">Volume estimé (m³)</Label>
            <Input id="volume" inputMode="decimal" placeholder="ex: 0.5" value={form.volume} onChange={(e) => set("volume", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="date">Enlèvement souhaité</Label>
            <Input id="date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="message">Message (optionnel)</Label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              className="w-full rounded-[var(--radius)] border border-[#D5DEE6] bg-white px-3 py-2 text-[14px] text-brand-600 placeholder:text-[#9BB0BF] focus:outline-none focus:ring-2 focus:ring-brand-600/30"
              placeholder="Détails supplémentaires sur votre envoi…"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-accent-500 text-white px-5 py-3 text-[15px] font-semibold hover:opacity-95 active:opacity-90"
        >
          <Send size={16} /> Obtenir mon devis gratuit
        </button>
      </form>
    </div>
  );
}
