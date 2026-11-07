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
import IntroScreen from "@/components/IntroScreen";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F6F1] text-[#242321] dark:bg-[#1D1C1A] dark:text-[#F5F1E9] flex flex-col selection:bg-[#B59662] selection:text-white">
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
    </main>
  );
}
