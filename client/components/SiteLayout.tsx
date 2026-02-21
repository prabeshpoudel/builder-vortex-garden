import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const labels = {
  ne: {
    title: "धर्मोदय दशावतार बालन",
    subtitle: "सनातन धर्म, संस्कृति र भक्ति अभियान",
    nav: [
      ["/", "गृह"],
      ["/about", "संस्था परिचय"],
      ["/temple-complex", "मन्दिर परिसर"],
      ["/deities", "देवताहरू"],
      ["/vishnu", "भगवान विष्णु"],
      ["/dashavatar", "दशावतार"],
      ["/gallery", "ग्यालरी"],
      ["/events", "कार्यक्रम"],
      ["/contact", "सम्पर्क"],
    ],
  },
  en: {
    title: "Dharmodaya Dashavatar Balan",
    subtitle: "A movement for Sanatan Dharma, culture, and devotion",
    nav: [
      ["/", "Home"],
      ["/about", "About"],
      ["/temple-complex", "Temple Complex"],
      ["/deities", "Deities"],
      ["/vishnu", "Lord Vishnu"],
      ["/dashavatar", "Dashavatar"],
      ["/gallery", "Gallery"],
      ["/events", "Events"],
      ["/contact", "Contact"],
    ],
  },
} as const;

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const text = labels[language];

  return (
    <div className="min-h-screen text-amber-50 temple-bg">
      <div className="fixed inset-0 mandala-overlay pointer-events-none" />
      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-amber-200/20 bg-[#080b1ecc]/90 backdrop-blur-md">
          <div className="container py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-lg font-semibold text-amber-300">{text.title}</h1>
                <p className="text-xs text-amber-100/70">{text.subtitle}</p>
              </div>
              <div className="lang-toggle flex items-center gap-2 rounded-full border border-amber-300/30 p-1">
                <button onClick={() => setLanguage("ne")} className={cn("lang-btn", language === "ne" && "active")}>NE</button>
                <button onClick={() => setLanguage("en")} className={cn("lang-btn", language === "en" && "active")}>EN</button>
              </div>
            </div>
            <nav className="mt-3 flex flex-wrap gap-2 text-sm">
              {text.nav.map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "rounded-full border px-3 py-1.5 transition-all duration-300 hover:shadow-[0_0_18px_rgba(245,158,11,0.4)]",
                    location.pathname === path
                      ? "border-amber-300/70 bg-amber-200/20 text-amber-200"
                      : "border-amber-100/20 bg-black/20 text-amber-100/80",
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
      </div>
    </div>
  );
}
