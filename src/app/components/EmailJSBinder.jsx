"use client";

import { useEffect } from "react";
import emailjs from "@emailjs/browser";

// Clés fournies
const SERVICE_ID = "service_zlqxnzd";
const TEMPLATE_ID = "template_m2dad75";
const PUBLIC_KEY = "42mtzXnuUb0BkaG_N";

/**
 * Se contente d'accrocher un listener sur le formulaire #devis-form
 * et d'appeler EmailJS au submit. Ne change PAS le design.
 */
export default function EmailJSBinder({ formId = "devis-form" }) {
  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) return;

    const onSubmit = async (e) => {
      e.preventDefault();

      try {
        // Optionnel: disable le bouton submit pendant l’envoi
        const btn = form.querySelector('[type="submit"]');
        if (btn) btn.disabled = true;

        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });

        alert("✅ Demande envoyée ! Nous revenons vers vous rapidement.");
        form.reset();
      } catch (err) {
        console.error(err);
        alert("❌ Impossible d'envoyer votre demande. Réessayez plus tard.");
      } finally {
        const btn = form.querySelector('[type="submit"]');
        if (btn) btn.disabled = false;
      }
    };

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [formId]);

  return null; // Invisible, n’impacte pas le design
}
