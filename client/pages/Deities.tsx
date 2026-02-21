import { useLanguage } from "@/contexts/LanguageContext";

const deities = [
  {
    key: "Brahma",
    en: "Creator of cosmic order and source of knowledge.",
    ne: "सृष्टिको आरम्भ गर्ने र ज्ञान प्रवाह गर्ने आदिदेव।",
  },
  { key: "Vishnu", en: "Preserver who sustains Dharma and balance.", ne: "धर्म र सन्तुलन जोगाउने पालनकर्ता।" },
  { key: "Shiva", en: "Transformer who dissolves ignorance and ego.", ne: "अज्ञान र अहंकार नाश गर्ने रूपान्तरणकर्ता।" },
  { key: "Devi (Durga)", en: "Divine mother power defeating adharma.", ne: "अधर्म विनाश गर्ने आदिशक्ति माता।" },
  { key: "Lakshmi", en: "Goddess of abundance, harmony, and grace.", ne: "समृद्धि, सौभाग्य र सद्भावकी देवी।" },
  { key: "Saraswati", en: "Goddess of wisdom, arts, and speech.", ne: "विद्या, कला र वाणीकी देवी।" },
  { key: "Ganesha", en: "Remover of obstacles and lord of beginnings.", ne: "विघ्नहर्ता र शुभारम्भका अधिपति।" },
  { key: "Hanuman", en: "Embodiment of strength, bhakti, and courage.", ne: "बल, भक्ति र साहसका प्रतीक।" },
  { key: "Kali", en: "Fierce compassionate force against darkness.", ne: "अन्धकार विरुद्ध करुणामयी उग्रशक्ति।" },
];

export default function Deities() {
  const { language } = useLanguage();
  return (
    <section className="space-y-6">
      <div className="card-divine">
        <h2 className="text-3xl font-bold text-amber-300">{language === "ne" ? "हिन्दू देवताहरू" : "Hindu Deities Overview"}</h2>
        <p className="mt-2">{language === "ne" ? "हरेक देवताले सृष्टि, धर्म र जीवन मूल्यमा विशिष्ट भूमिका निर्वाह गर्छन्।" : "Each deity expresses a unique cosmic function and spiritual teaching."}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {deities.map((d) => (
          <article key={d.key} className="card-divine hover-glow">
            <h3 className="text-xl text-amber-200">{d.key}</h3>
            <p className="mt-2 text-sm">{language === "ne" ? d.ne : d.en}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
