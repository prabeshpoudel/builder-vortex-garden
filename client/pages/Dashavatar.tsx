import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

type AvatarInfo = {
  name: string;
  origin: { ne: string; en: string };
  journey: { ne: string; en: string };
  meaning: { ne: string; en: string };
  lesson: { ne: string; en: string };
  devotion: { ne: string; en: string };
};

const avatars: AvatarInfo[] = [
  { name: "Matsya", origin: { ne: "महाप्रलयबाट वेद संरक्षणका लागि प्रकट।", en: "Manifested to protect the Vedas during the great deluge." }, journey: { ne: "मनुलाई सुरक्षित मार्गदर्शन गर्दै दैत्यबाट ज्ञान उद्धार।", en: "Guided Manu to safety and recovered knowledge from demonic forces." }, meaning: { ne: "ज्ञानको रक्षा र संकटमा दिव्य मार्गदर्शन।", en: "Protection of wisdom and divine guidance in crisis." }, lesson: { ne: "संकटकालमा सत्य र शिक्षा जोगाउनुपर्छ।", en: "Protect truth and learning in difficult times." }, devotion: { ne: "जीवनको अनिश्चिततामा रक्षणको भरोसा दिन्छ।", en: "Invoked for protection amid uncertainty." } },
  { name: "Kurma", origin: { ne: "समुद्रमन्थन धारण गर्न।", en: "Appeared to support the churning of the cosmic ocean." }, journey: { ne: "मन्दर पर्वतलाई आधार दिँदै अमृत प्राप्तिमा सहयोग।", en: "Bore Mount Mandara to enable the quest for amrita." }, meaning: { ne: "धैर्य र आधार।", en: "Patience and foundational support." }, lesson: { ne: "ठूलो कार्यलाई स्थिर आधार चाहिन्छ।", en: "Great endeavors require steady support." }, devotion: { ne: "धैर्य र सहनशीलताको शक्ति दिन्छ।", en: "Worshipped for endurance and resilience." } },
  { name: "Varaha", origin: { ne: "भूदेवी उद्धार गर्न प्रकट।", en: "Manifested to rescue Mother Earth." }, journey: { ne: "हिरण्याक्षसँग युद्ध गरी पृथ्वी उत्थान।", en: "Defeated Hiranyaksha and lifted Earth from the abyss." }, meaning: { ne: "प्रकृति संरक्षण र धर्म पुनर्स्थापना।", en: "Ecological restoration and revival of Dharma." }, lesson: { ne: "पृथ्वीप्रति उत्तरदायी रहनु।", en: "Live responsibly toward the Earth." }, devotion: { ne: "साहस र संरक्षण भाव बढाउँछ।", en: "Invoked for courage and protective strength." } },
  { name: "Narasimha", origin: { ne: "प्रह्लादको रक्षा र अत्याचार अन्त्यका लागि।", en: "Appeared to protect Prahlada and end tyranny." }, journey: { ne: "हिरण्यकशिपुको अहंकार नाश।", en: "Destroyed the arrogance of Hiranyakashipu." }, meaning: { ne: "भक्तरक्षा र धर्म विजय।", en: "Protection of devotees and triumph of Dharma." }, lesson: { ne: "अहंकार सधैं पतनको कारण।", en: "Unchecked ego leads to downfall." }, devotion: { ne: "भय हटाई आत्मविश्वास जगाउँछ।", en: "Worshipped to dissolve fear and gain courage." } },
  { name: "Vamana", origin: { ne: "बलि राजाको परीक्षणका लागि।", en: "Manifested to test King Bali's righteousness." }, journey: { ne: "तीन पाइलामा लोक व्याप्दै विनम्रताद्वारा धर्म स्थापना।", en: "Covered the cosmos in three steps and restored order through humility." }, meaning: { ne: "विनम्रता र मर्यादा।", en: "Humility and sacred boundaries." }, lesson: { ne: "शक्ति भन्दा विनम्रता महान।", en: "Humility is greater than power." }, devotion: { ne: "अहंकार घटाई मर्यादा सिकाउँछ।", en: "Invoked for humility and self-restraint." } },
  { name: "Parashurama", origin: { ne: "अन्यायपूर्ण हिंस्र शासन नियन्त्रणका लागि।", en: "Appeared to restrain violent and unjust rule." }, journey: { ne: "अधर्मी शक्तिहरूलाई परास्त गर्दै तप र न्यायको सन्देश।", en: "Confronted adharmic forces and upheld discipline and justice." }, meaning: { ne: "न्यायका लागि दृढ संकल्प।", en: "Determined commitment to justice." }, lesson: { ne: "शक्ति धर्मयुक्त हुनुपर्छ।", en: "Power must remain aligned with Dharma." }, devotion: { ne: "कर्तव्यनिष्ठा र अनुशासन दिन्छ।", en: "Worshipped for discipline and duty." } },
  { name: "Rama", origin: { ne: "मर्यादा पुरुषोत्तम रूपमा धर्मपालनका लागि।", en: "Manifested as the ideal king to embody righteous living." }, journey: { ne: "वनवास, रावणवध, राज्यमा धर्म शासन।", en: "Lived exile, defeated Ravana, and ruled with Dharma." }, meaning: { ne: "आदर्श चरित्र र मर्यादा।", en: "Ideal conduct and ethical leadership." }, lesson: { ne: "कर्तव्य र सत्य सर्वोपरि।", en: "Duty and truth are paramount." }, devotion: { ne: "परिवार, राज्य र समाजमा सदाचार प्रेरणा।", en: "Inspires integrity in family and society." } },
  { name: "Krishna", origin: { ne: "धर्मसंस्थापन र गीता ज्ञान दिन।", en: "Appeared to restore Dharma and deliver the Gita." }, journey: { ne: "कंसवधदेखि महाभारतसम्म दिव्य मार्गदर्शन।", en: "From defeating Kansa to guiding the Mahabharata war." }, meaning: { ne: "प्रेम, ज्ञान र कर्मयोग।", en: "Love, wisdom, and Karma Yoga." }, lesson: { ne: "कर्तव्य गर्दै ईश्वरमा समर्पण।", en: "Perform duty with spiritual surrender." }, devotion: { ne: "भक्ति, संगीत र आनन्दमार्गमा प्रेरणा।", en: "Worshipped for joyous devotion and wisdom." } },
  { name: "Buddha", origin: { ne: "करुणा र अहिंसा सुदृढ गर्न (केही परम्परामा भिन्न मत सम्मानित)।", en: "Manifested to strengthen compassion and non-violence (alternate traditions respected)." }, journey: { ne: "मध्यम मार्ग, ध्यान र दुःख निवारण शिक्षा।", en: "Taught the middle path, meditation, and relief from suffering." }, meaning: { ne: "करुणा, सचेतना र शान्ति।", en: "Compassion, awareness, and peace." }, lesson: { ne: "आत्मअनुशासनले दुःख घटाउँछ।", en: "Self-awareness reduces suffering." }, devotion: { ne: "शान्तचित्त र दयालुता विकासमा सहायक।", en: "Invoked for calm mind and kindness." } },
  { name: "Kalki", origin: { ne: "भविष्यमा कलियुग अन्त्यका लागि आगमन।", en: "Future avatar expected to conclude the age of Kali." }, journey: { ne: "अधर्म नाश गरी सत्ययुग प्रारम्भ गर्ने प्रतिज्ञा।", en: "Will end adharma and reawaken Satya Yuga." }, meaning: { ne: "नवीन आरम्भ र धर्म पुनर्जागरण।", en: "Renewal and restoration of Dharma." }, lesson: { ne: "आशा राखी धर्ममय जीवन जिउनु।", en: "Live righteously with hope for renewal." }, devotion: { ne: "भविष्यप्रति विश्वास र नैतिकता सुदृढ।", en: "Worshipped as a symbol of moral hope." } },
];

export default function Dashavatar() {
  const { language } = useLanguage();
  const [open, setOpen] = useState<string | null>(null);
  const ne = language === "ne";

  return (
    <section className="space-y-6">
      <div className="card-divine">
        <h2 className="text-3xl font-bold text-amber-300">{ne ? "दशावतार अनुभव" : "Immersive Dashavatar Experience"}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {avatars.map((avatar) => (
          <Dialog key={avatar.name} open={open === avatar.name} onOpenChange={(state) => setOpen(state ? avatar.name : null)}>
            <DialogTrigger asChild>
              <button className="card-divine text-left hover-glow">
                <h3 className="text-2xl text-amber-200">{avatar.name}</h3>
                <p className="mt-2 text-sm">{ne ? avatar.meaning.ne : avatar.meaning.en}</p>
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto border-amber-300/30 bg-[#090d20] text-amber-50">
              <DialogHeader>
                <DialogTitle className="text-2xl text-amber-300">{avatar.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm leading-relaxed">
                <p><strong>{ne ? "१) उत्पत्ति प्रसङ्ग:" : "1) Origin Context:"}</strong> {ne ? avatar.origin.ne : avatar.origin.en}</p>
                <p><strong>{ne ? "२) दिव्य यात्रा:" : "2) Divine Journey:"}</strong> {ne ? avatar.journey.ne : avatar.journey.en}</p>
                <p><strong>{ne ? "३) आध्यात्मिक अर्थ:" : "3) Spiritual Meaning:"}</strong> {ne ? avatar.meaning.ne : avatar.meaning.en}</p>
                <p><strong>{ne ? "४) आधुनिक जीवन पाठ:" : "4) Modern Life Lessons:"}</strong> {ne ? avatar.lesson.ne : avatar.lesson.en}</p>
                <p><strong>{ne ? "५) भक्तिमूल्य:" : "5) Devotional Importance:"}</strong> {ne ? avatar.devotion.ne : avatar.devotion.en}</p>
                <h4 className="pt-2 text-lg text-amber-300">{ne ? "६) चित्र खण्ड" : "6) Image Section"}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <figure key={idx} className="rounded border border-amber-300/25 bg-black/30 p-2">
                      <div className="h-16 rounded bg-gradient-to-r from-amber-500/20 to-orange-500/20" />
                      <figcaption className="mt-1 text-xs">{ne ? `${avatar.name} दृश्य ${idx + 1}` : `${avatar.name} visual ${idx + 1}`}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
