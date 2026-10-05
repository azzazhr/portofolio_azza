import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import EducationCert from "@/components/EducationCert";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomNav from "@/components/MobileBottomNav";
import IntroScreen from "@/components/IntroScreen";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#080b11] dark:text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white pb-[76px] md:pb-0">
      <IntroScreen />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <EducationCert />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomNav />
    </main>
  );
}
