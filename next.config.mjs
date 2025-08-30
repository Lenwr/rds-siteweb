/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 🔑 Active l'export statique
    images: {
      unoptimized: true, // 🔑 Obligatoire sinon Next/Image casse en statique
    },
    trailingSlash: true, // 🔑 (Optionnel) ajoute un / à la fin des URLs → évite les 404
  };
  
  export default nextConfig;
  