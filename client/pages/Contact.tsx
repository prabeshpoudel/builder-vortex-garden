import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { language } = useLanguage();
  const ne = language === "ne";
  return (
    <section className="card-divine space-y-5">
      <h2 className="text-3xl font-bold text-amber-300">{ne ? "सम्पर्क" : "Contact"}</h2>
      <p>{ne ? "ठेगाना: [मन्दिर ठेगाना यहाँ]" : "Address: [Temple address here]"}</p>
      <p>{ne ? "फोन: +977-XXXXXXXXXX | इमेल: info@dharmodaya.org" : "Phone: +977-XXXXXXXXXX | Email: info@dharmodaya.org"}</p>
      <p>{ne ? "भ्रमण समय: बिहान ५:३०–९:००, साँझ ४:३०–८:००" : "Visiting Hours: 5:30 AM–9:00 AM, 4:30 PM–8:00 PM"}</p>
      <form className="grid gap-3 md:grid-cols-2">
        <input className="input-divine" placeholder={ne ? "नाम" : "Name"} />
        <input className="input-divine" placeholder={ne ? "इमेल" : "Email"} />
        <textarea className="input-divine md:col-span-2" rows={4} placeholder={ne ? "सन्देश" : "Message"} />
        <button type="button" className="btn-divine md:col-span-2">{ne ? "सन्देश पठाउनुहोस्" : "Send Message"}</button>
      </form>
      <div className="rounded border border-amber-300/25 bg-black/30 p-3">
        <h3 className="text-xl text-amber-200">{ne ? "दान / सेवा" : "Donation / Seva"}</h3>
        <p className="text-sm">{ne ? "मन्दिर सेवा, अन्नदान, शिक्षा-सेवा र विशेष पूजा सहकार्यका लागि सम्पर्क गर्नुहोस्।" : "Contact us to support temple seva, annadanam, education outreach, and special rituals."}</p>
      </div>
    </section>
  );
}
