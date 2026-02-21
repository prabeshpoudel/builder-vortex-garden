import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import TempleComplex from "@/pages/TempleComplex";
import Deities from "@/pages/Deities";
import Vishnu from "@/pages/Vishnu";
import Dashavatar from "@/pages/Dashavatar";
import Gallery from "@/pages/Gallery";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";

const App = () => (
  <LanguageProvider>
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/temple-complex" element={<TempleComplex />} />
          <Route path="/deities" element={<Deities />} />
          <Route path="/vishnu" element={<Vishnu />} />
          <Route path="/dashavatar" element={<Dashavatar />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  </LanguageProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
