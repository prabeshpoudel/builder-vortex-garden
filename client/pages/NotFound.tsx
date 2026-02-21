import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();
  return (
    <div className="card-divine text-center">
      <h2 className="text-5xl font-bold text-amber-300">404</h2>
      <p className="mt-3">{language === "ne" ? "पृष्ठ फेला परेन।" : "Page not found."}</p>
      <Link className="btn-divine mt-5 inline-block" to="/">
        {language === "ne" ? "गृहमा फर्किनुहोस्" : "Back to Home"}
      </Link>
    </div>
  );
}
