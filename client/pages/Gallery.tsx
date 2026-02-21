import { useLanguage } from "@/contexts/LanguageContext";

const items = ["Dashain", "Tihar", "Janmashtami", "Temple Rituals", "Cultural Events", "Devotees"];

export default function Gallery() {
  const { language } = useLanguage();
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold text-amber-300">{language === "ne" ? "ग्यालरी" : "Gallery"}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <figure key={item} className="card-divine hover-glow">
            <div className="h-36 rounded bg-gradient-to-br from-amber-500/20 to-orange-400/15" />
            <figcaption className="mt-2 text-sm">{item}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
