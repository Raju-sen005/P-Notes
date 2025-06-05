// import Typed from "typed.js";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Downloads from "../components/Downloads";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Socials from "../components/Socials";


const Home = () => {
  return (
    <div className="container mt-5">
      <Hero />
      <Stats />
      <Downloads />
      <Features />
      <Testimonials />
      <Socials />
    </div>
  );
};

export default Home;