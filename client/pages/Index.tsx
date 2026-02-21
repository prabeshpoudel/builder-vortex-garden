import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const data = {
  ne: {
    tagline: "सनातन धर्मको ज्योति, दशावतारको प्रेरणा",
    intro:
      "धर्मोदय दशावतार बालन विगत १० वर्षभन्दा बढी समयदेखि मन्दिर सेवा, वैदिक शिक्षा र सांस्कृतिक संरक्षणमार्फत समाजमा आध्यात्मिक चेतना फैलाउँदै आएको समर्पित संस्था हो।",
    ctas: [
      ["/dashavatar", "दशावतार अन्वेषण गर्नुहोस्"],
      ["/temple-complex", "मन्दिर भ्रमण"],
      ["/deities", "सनातन धर्म सिक्नुहोस्"],
    ],
    gods: "विशेष देवता",
    vishnu: "भगवान विष्णु—पालनकर्ता, धर्मरक्षक र करुणाको सागर।",
    shloka1: "ॐ नमो भगवते वासुदेवाय",
    shloka2: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत",
  },
  en: {
    tagline: "Light of Sanatan Dharma, wisdom of Dashavatar",
    intro:
      "Dharmodaya Dashavatar Balan has served as a temple-rooted spiritual institution for over 10 years, nurturing society through devotional service, Vedic learning, and cultural preservation.",
    ctas: [
      ["/dashavatar", "Explore Dashavatar"],
      ["/temple-complex", "Visit Temple"],
      ["/deities", "Learn Sanatan Dharma"],
    ],
    gods: "Featured Divine Forms",
    vishnu: "Lord Vishnu—the Preserver, guardian of Dharma, and ocean of compassion.",
    shloka1: "Om Namo Bhagavate Vasudevaya",
    shloka2: "Yada Yada Hi Dharmasya Glanir Bhavati Bharata",
  },
};

const featuredGods = ["Vishnu", "Shiva", "Durga", "Krishna", "Lakshmi", "Hanuman"];

export default function Index() {
  const { language } = useLanguage();
  const t = data[language];

  return (
    <div className="space-y-10">
      <section className="card-divine parallax">
        <p className="text-center text-amber-200/80">{t.shloka1}</p>
        <p className="text-center text-amber-200/70 mb-5">{t.shloka2}</p>
        <h2 className="text-center text-4xl font-bold text-amber-200 glow-text">{t.tagline}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-amber-50/90 leading-relaxed">{t.intro}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {t.ctas.map(([href, label]) => (
            <Link key={href} to={href} className="btn-divine">
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card-divine">
          <h3 className="mb-4 text-2xl font-semibold text-amber-300">{t.gods}</h3>
          <div className="grid grid-cols-2 gap-3">
            {featuredGods.map((god) => (
              <div key={god} className="rounded-lg border border-amber-300/20 bg-black/30 p-3 text-center hover-glow">
                {god}
              </div>
            ))}
          </div>
        </article>
        <article className="card-divine flex items-center">
          <p className="text-lg leading-relaxed">{t.vishnu}</p>
        </article>
      </section>
    </div>
  );
}
