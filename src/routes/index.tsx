import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { EduExp } from "@/components/portfolio/EduExp";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Credentials } from "@/components/portfolio/Credentials";
import { Profiles } from "@/components/portfolio/Profiles";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ExperienceModeProvider } from "@/components/portfolio/ExperienceMode";
import { Cursor } from "@/components/portfolio/Cursor";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { BrainMap } from "@/components/portfolio/BrainMap";

const title = "Devanshi Chauhan — Data Analyst & Machine Learning Engineer";
const description =
  "Portfolio of Devanshi Chauhan: data analysis, machine learning, deep learning and AI projects, certifications, research and contact details.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ExperienceModeProvider>
      <Cursor />
      <SmoothScroll />
      <BrainMap />
      <Navbar />
      <main>
        <Hero />
        <About />
        <EduExp />
        <Skills />
        <Projects />
        <Credentials />
        <Profiles />
        <Contact />
      </main>
      <Footer />
    </ExperienceModeProvider>
  );
}
