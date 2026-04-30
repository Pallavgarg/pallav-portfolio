import { About } from "../components/About";
import { Certifications } from "../components/Certifications";
import { Contact } from "../components/Contact";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Projects";
import { Seo } from "../components/Seo";
import { Skills } from "../components/Skills";

export default function HomePage() {
  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
