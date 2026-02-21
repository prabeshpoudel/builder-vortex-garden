import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { language } = useLanguage();
  const t =
    language === "ne"
      ? {
          title: "संस्था परिचय",
          history:
            "धर्मोदय दशावतार बालनले एक दशकभन्दा बढी समयदेखि मन्दिर परम्परा, वैदिक अध्ययन, युवा आध्यात्मिकता, र समुदाय सेवा निरन्तर अघि बढाएको छ।",
          mission: "मिशन: सनातन धर्मको ज्ञानलाई व्यवहारिक जीवनसँग जोड्दै संस्कृतिको निरन्तर संरक्षण गर्नु।",
          vision: "दृष्टि: नेपालबाट विश्वसम्म भक्तिमय, नैतिक र संस्कारयुक्त समाज निर्माण।",
          values: ["भक्ति", "सेवा", "शिक्षा", "संस्कृति", "अनुशासन"],
        }
      : {
          title: "About the Organization",
          history:
            "For over ten years, Dharmodaya Dashavatar Balan has advanced temple tradition, Vedic education, youth spirituality, and community service.",
          mission:
            "Mission: To connect the wisdom of Sanatan Dharma with practical life while preserving sacred culture.",
          vision:
            "Vision: To build a devotional, ethical, and value-centered society from Nepal to the world.",
          values: ["Devotion", "Service", "Education", "Culture", "Discipline"],
        };

  return (
    <section className="card-divine space-y-5">
      <h2 className="text-3xl font-bold text-amber-300">{t.title}</h2>
      <p>{t.history}</p>
      <p>{t.mission}</p>
      <p>{t.vision}</p>
      <div className="flex flex-wrap gap-2">
        {t.values.map((v) => (
          <span key={v} className="rounded-full border border-amber-300/30 bg-amber-100/10 px-4 py-1">
            {v}
          </span>
        ))}
      </div>
    </section>
  );
}
