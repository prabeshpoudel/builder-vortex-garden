import { useLanguage } from "@/contexts/LanguageContext";

const benefits = {
  ne: ["आन्तरिक शान्ति", "जीवनमा स्थिरता", "धर्मसँग समन्वय", "अराजकता विरुद्ध संरक्षण", "भक्तिमा दृढता", "भावनात्मक स्पष्टता"],
  en: ["Inner peace", "Stability in life", "Alignment with Dharma", "Protection from chaos", "Devotional strength", "Emotional clarity"],
};

export default function Vishnu() {
  const { language } = useLanguage();
  const ne = language === "ne";

  return (
    <div className="space-y-6">
      <section className="card-divine">
        <h2 className="text-3xl font-bold text-amber-300">{ne ? "भगवान विष्णु" : "Lord Vishnu"}</h2>
        <p className="mt-3">
          {ne
            ? "भगवान विष्णु सृष्टिको पालनकर्ता, धर्मका संरक्षक र करुणामयी मार्गदर्शकका रूपमा पूजनीय हुनुहुन्छ।"
            : "Lord Vishnu is revered as the Preserver of the universe, protector of Dharma, and compassionate guide of all beings."}
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {[
          ["Shankha", ne ? "दिव्य नाद र धर्म जागरण" : "Divine sound and awakening of Dharma"],
          ["Chakra", ne ? "अधर्म विनाश र समयचक्र" : "Destruction of adharma and cosmic time"],
          ["Gada", ne ? "बल, न्याय र संरक्षण" : "Strength, justice, and protection"],
          ["Padma", ne ? "पवित्रता र आध्यात्मिक प्रस्फुटन" : "Purity and spiritual blossoming"],
        ].map(([title, desc]) => (
          <article key={title} className="card-divine hover-glow">
            <h3 className="text-xl text-amber-200">{title}</h3>
            <p className="mt-2">{desc}</p>
          </article>
        ))}
      </section>
      <section className="card-divine">
        <h3 className="text-2xl text-amber-300">{ne ? "विष्णु उपासनाका लाभ" : "Benefits of Worshipping Vishnu"}</h3>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {benefits[language].map((b) => (
            <li key={b} className="rounded-md border border-amber-300/25 bg-black/30 px-3 py-2">
              {b}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
