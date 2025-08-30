import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata = {
  title: "TerangaCargo — Groupage France → Sénégal",
  description: "Fret maritime France → Sénégal. Devis gratuit, suivi simple.",
  metadataBase: new URL("https://terangacargo.com"),
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
