import { useLanguage } from "@/contexts/LanguageContext";

const temples = ["Vishnu Mandir", "Shiva Mandir", "Devi Mandir", "Ganesh Mandir", "Navagraha Area"];

export default function TempleComplex() {
  const { language } = useLanguage();
  const t =
    language === "ne"
      ? {
          title: "मन्दिर परिसर",
          intro: "पवित्र बहु-मन्दिर परिसरले ध्यान, दर्शन र शान्त भक्ति अनुभव प्रदान गर्छ।",
          rules: ["शुद्ध पोशाक", "मौन वा मध्यम स्वर", "फोटो अनुमति अनुसार", "मन्दिर अनुशासन पालना"],
          exp: "हरेक मन्दिरमा दैनिक पूजा, आरती र श्रद्धालु सेवा सञ्चालन हुन्छ।",
        }
      : {
          title: "Temple Complex",
          intro: "Our sacred multi-temple complex offers a serene atmosphere for darshan, meditation, and devotional reflection.",
          rules: ["Respectful attire", "Soft voice and silence", "Photography as permitted", "Follow temple discipline"],
          exp: "Each shrine hosts daily rituals, aarti, and guided devotee service.",
        };

  return (
    <div className="space-y-6">
      <section className="card-divine">
        <h2 className="text-3xl font-bold text-amber-300">{t.title}</h2>
        <p className="mt-3">{t.intro}</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {temples.map((temple) => (
          <article key={temple} className="card-divine hover-glow">
            <h3 className="text-xl text-amber-200">{temple}</h3>
          </article>
        ))}
      </section>
      <section className="card-divine">
        <h3 className="text-xl text-amber-300">{language === "ne" ? "भ्रमण नियम" : "Visiting Rules"}</h3>
        <ul className="mt-3 list-disc pl-6">
          {t.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p className="mt-4">{t.exp}</p>
      </section>
    </div>
  );
}
