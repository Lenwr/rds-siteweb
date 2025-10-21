import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-footer text-gray-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
        {/* grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: logo + pitch */}
          <div>
            <div className="flex items-center gap-3">
              {/* remplace /logo-mini.png par ton pictogramme orange */}
              <Image src="/logo.jpg" alt="Teranga Cargo" width={28} height={28} />
              <span className="sr-only">Teranga Cargo</span>
            </div>
            <p className="mt-6 text-base leading-7 text-gray-200">
              Groupage maritime France → Sénégal, <br /> simple et transparent
            </p>
          </div>

          {/* Col 2: liens utiles */}
          <div>
            <h4 className="footer-title">Liens utiles</h4>
            <ul className="mt-6 space-y-3 text-base">
              <li><Link href="/" className="footer-link">Accueil</Link></li>
              <li><Link href="/services" className="footer-link">Services</Link></li>
              <li><Link href="/tarifs" className="footer-link">Tarifs</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: contact rapide */}
          <div>
            <h4 className="footer-title">Contact rapide</h4>
            <ul className="mt-6 space-y-4 text-base">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gray-300" />
                <a href="tel:+33613044335" className="footer-link">+33 6 13 04 43 35</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gray-300" />
                <a href="tel:+221774565983" className="footer-link">+221 77 456 59 83</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gray-300" />
                <a href="mailto:terangacargogroupage@gmail.com" className="footer-link">terangacargogroupage@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* séparateur */}
        <hr className="mt-10 border-t" style={{ borderColor: "var(--line)" }} />

        {/* bas de page */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Teranga Cargo. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <Link href="/mentions-legales" className="footer-link">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="footer-link">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
