import React from 'react';
import { Globe, ArrowUpRight, Menu } from 'lucide-react';
import Image from 'next/image';
import Footer from '../components/Footer';
import Link from 'next/link';

// Demo Data: Added 'link' property to each project
const projects = [
  {
    id: 1,
    title: "BLSSD BARBERSHOP",
    category: "UI/UX • LANDING PAGE",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop", 
    description: "A modern, masculine landing page for a premium barbershop featuring appointment scheduling and gallery.",
    link: "https://blssd-barber-shop.vercel.app/" // <--- REPLACE THIS with your actual link
  },
  {
    id: 2,
    title: "Beany Barista",
    category: "BRANDING • WEB DESIGN",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    description: "Minimalist coffee shop interface focusing on menu discovery and atmosphere.",
    link: "https://beanybarsita-demo.vercel.app/" // <--- REPLACE THIS
  },
  {
    id: 3,
    title: "Balt Coffee Co.",
    category: "ECOMMERCE • SHOPIFY",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
    description: "Dark-themed ecommerce experience for premium coffee bean subscriptions.",
    link: "https://balt-bakeries.vercel.app/" // <--- REPLACE THIS
  },
  {
    id: 4,
    title: "Cafe Matinal",
    category: "APP DESIGN • LOYALTY",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop",
    description: "Mobile app interface for a busy city cafe chain with order-ahead functionality.",
    link: "https://luxury-cafe-demo.vercel.app/" // <--- REPLACE THIS
  },
  {
    id: 5,
    title: "NoteZen App",
    category: "VISUAL IDENTITY",
    image: "https://images.pexels.com/photos/315791/pexels-photo-315791.jpeg",
    description: "Fresh, organic web design for a specialty matcha tea cafe.",
    link: "https://notezenn.vercel.app/" // <--- REPLACE THIS
  },
  {
    id: 6,
    title: "The Jelly Donuts",
    category: "DEVELOPMENT • FRAMER",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
    description: "Experimental design layout for a coffee workshop and training center.",
    link: "https://jelly-donut.vercel.app/" // <--- REPLACE THIS
  }
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-white selection:text-black">
      {/* Background Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pt-8 pb-20">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-start mb-24 text-xs font-medium tracking-widest text-neutral-400 uppercase">
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold">Bhavya Rathore</span>
          </div>

          <div className="hidden md:flex gap-8">
            
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" passHref>
            <button className="border border-neutral-700 rounded-full px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300">
              Home
            </button>
            </Link>
            
          </div>
        </header>

        {/* --- HERO SECTION --- */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Large Text */}
          <div className="lg:col-span-8">
            <h1 className="text-[14vw] leading-[0.8] font-bold tracking-tighter uppercase mix-blend-exclusion">
              WORKS
              <br />
    
            </h1>
          </div>

          {/* Right Side Description */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-4 space-y-8">
            <div className="w-16 h-16 animate-spin-slow opacity-80">
               {/* Wireframe globe representation */}
               <Globe strokeWidth={1} className="w-full h-full text-white" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wide">
                CRAFTING PROJECTS THAT HAVE<br/> PURPOSE & DESIGN
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
                Each project is designed to not just look good, but to work beautifully — merging thoughtful UX with bold visual storytelling.
              </p>
            </div>
          </div>
        </section>

        {/* --- DIVIDER --- */}
        <div className="flex items-center justify-between py-12 border-t border-neutral-900 mb-12">
          <span className="text-neutral-600 italic text-xl font-light">//</span>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-300">Featured Works</h2>
          <span className="text-neutral-600 italic text-xl font-light">//</span>
        </div>

        {/* --- PROJECT GRID --- */}
        <div className="flex flex-col gap-24">
          {projects.map((project) => (
            /* CHANGED: Wrapped in Link instead of div, added 'block' to className to maintain layout */
            <Link href={project.link} key={project.id} className="group cursor-pointer block">
              
              {/* UPDATED IMAGE CONTAINER 
                  Changed from aspect ratio to fixed viewport height (70vh)
              */}
              <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-lg bg-neutral-900 mb-6">
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Floating Mockup Title */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-4xl md:text-6xl font-bold tracking-tighter italic text-white/90 drop-shadow-lg">
                        View Project
                    </span>
                </div>
              </div>

              {/* Project Details Footer */}
              <div className="flex justify-between items-end border-b border-neutral-900 pb-6 group-hover:border-neutral-700 transition-colors duration-300">
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2 group-hover:text-neutral-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span>2025</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}