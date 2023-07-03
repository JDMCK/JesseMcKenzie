import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Technologies from "../components/Technologies";
import Projects from "../components/Projects";
import WaveBottom from "../components/WaveBottom";
import WaveTop from "../components/WaveTop";
import Games from "../components/Games";
import WorkExperience from "@/components/WorkExperience";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <>
      <Navbar />
      <section id="header">
        <h1 id='main-title'>{'<JesseMcKenzie />'}</h1>
      </section>
      <WaveTop />
      <Technologies />
      <WaveBottom />
      <Projects />
      <WaveTop />
      <Games />
      <WaveBottom />
      <WorkExperience />
      <WaveTop />
      <AboutMe />
      <WaveBottom />
      <Footer />
    </>
  )
}
