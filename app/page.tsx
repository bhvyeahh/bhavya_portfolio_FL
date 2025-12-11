import ContactCTA from "./components/ContactCTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import PricingBanner from "./components/PricingBanner";
import FeaturedWorks from "./components/ProjectCard";
import ServiceList from "./components/ServiceList";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import WhoAmI from "./components/WhoAmI";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-brand-dark selection:bg-brand-green selection:text-black">
      <Hero />
      <Services />
      <WhoAmI />
      <FeaturedWorks />
      <ServiceList />
      <Testimonials />
      <Pricing  />
      <PricingBanner  />
      <FAQ />
      <ContactCTA />
      <Footer />
      {/* Call to Action Footer */}
      {/* <footer className="h-[50vh] flex flex-col items-center justify-center border-t border-white/10 text-center px-4">
       
        <div className="mt-8 flex gap-6 text-sm text-gray-500 font-mono">
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-white transition-colors">EMAIL</a>
        </div>
        <p className="mt-12 text-xs text-gray-700">© 2025 Bhavya Rathore. All Rights Reserved.</p>
      </footer> */}
    </main>
  );
}