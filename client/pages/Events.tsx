import { useLanguage } from "@/contexts/LanguageContext";

const events = {
  ne: [
    ["२०१३", "संस्थाको औपचारिक स्थापना र नित्य पूजा आरम्भ"],
    ["२०१८", "युवा सनातन अध्ययन तथा सांस्कृतिक कक्षा"],
    ["२०२२", "मन्दिर परिसर विस्तार र नवग्रह क्षेत्र सेवा"],
    ["आगामी", "श्रीमद्भागवत सप्ताह, जन्माष्टमी महोत्सव, सामूहिक विष्णु सहस्रनाम"],
  ],
  en: [
    ["2013", "Formal foundation and beginning of daily rituals"],
    ["2018", "Youth Sanatan learning and cultural classes"],
    ["2022", "Temple complex expansion and Navagraha service"],
    ["Upcoming", "Bhagavat Saptah, Janmashtami festival, collective Vishnu Sahasranama"],
  ],
};

export default function Events() {
  const { language } = useLanguage();
  return (
    <section className="card-divine">
      <h2 className="text-3xl font-bold text-amber-300">{language === "ne" ? "कार्यक्रम" : "Events"}</h2>
      <div className="mt-4 space-y-3">
        {events[language].map(([year, desc]) => (
          <div key={year} className="rounded-md border border-amber-300/25 bg-black/30 p-3">
            <h3 className="text-amber-200">{year}</h3>
            <p className="text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
