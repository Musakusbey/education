export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <div className="font-bold text-lg mb-1">Frovexis</div>
          <div className="text-sm">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </div>
          <div className="text-xs mt-1">
            KVKK & Gizlilik |{" "}
            <a href="mailto:info@frovexis.com" className="underline">
              info@frovexis.com
            </a>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href="https://instagram.com/frovexis"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/company/frovexis"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
          >
            LinkedIn
          </a>
          <a href="tel:+905555555555" className="hover:text-blue-300">
            +90 555 555 55 55
          </a>
        </div>
      </div>
    </footer>
  );
}
