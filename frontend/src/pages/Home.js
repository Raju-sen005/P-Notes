import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Downloads from "../components/Downloads";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Socials from "../components/Socials";

const Home = () => (
  <main className="bg-gray-50">
    {/* Hero */}
    <section className="w-full py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Hero />
      </div>
    </section>

   
    
    {/* Stats */}
    <section className="py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Stats />
      </div>
    </section>

 {/* Downloads */}
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <Downloads />
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <Testimonials />
      </div>
    </section>
    
    {/* Features */}
    <section className="py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Features />
      </div>
    </section>

    {/* Socials */}
    <section className="py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Socials />
      </div>
    </section>
  </main>
);

export default Home;