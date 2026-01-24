import React from 'react';
import { Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Footer from '../components/Footer';
import Link from 'next/link';

// Updated Data: Detailer Focused + Bento sizing logic
const projects = [
  {
    id: 1,
    title: "JT's Mobile Detailing",
    category: "BOOKING SYSTEM • BRANDING",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2000&auto=format&fit=crop", 
    description: "Complete booking engine overhaul for a high-volume mobile detailer.",
    link: "https://jtsdetail.vercel.app",
    size: "large" // Spans full width
  },
  {
    id: 2,
    title: "Scrubz OC",
    category: "LOCAL SEO • LANDING PAGE",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "High-conversion landing page focused on recurring maintenance plans.",
    link: "https://scrubzocdetailing.vercel.app",
    size: "medium" // Spans 1 column
  },
  {
    id: 3,
    title: "Defries Detailing",
    category: "PORTFOLIO • UI/UX",
    image: "https://images.unsplash.com/photo-1732624697571-e877b2b4f5ba?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Luxury minimalist showcase for ceramic coating and paint correction services.",
    link: "https://defriesdetailing.vercel.app",
    size: "medium" // Spans 1 column
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-brand-green selection:text-black">
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
        <header className="flex justify-between items-center mb-20 text-xs font-medium tracking-widest text-neutral-400 uppercase">
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold tracking-widest">Layoutory.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" passHref>
            <button className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-full px-6 py-2 hover:bg-white hover:text-black transition-all duration-300">
              Home
            </button>
            </Link>
          </div>
        </header>

        {/* --- HERO SECTION (Compact) --- */}
        <section className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-neutral-800 pb-12">
          <div>
            <h1 className="text-[10vw] md:text-[8vw] leading-[0.8] font-bold tracking-tighter uppercase text-white">
              Selected <span className="text-neutral-600">Work</span>
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 max-w-sm text-left md:text-right">
            <div className="flex items-center gap-2 text-brand-green">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Niche Expertise</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Specialized digital solutions for the automotive detailing industry. 
              Focusing on conversion, booking automation, and luxury aesthetics.
            </p>
          </div>
        </section>

        {/* --- BENTO GRID PROJECTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Link 
                href={project.link} 
                key={project.id} 
                className={`group cursor-pointer relative block ${
                    project.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
                }`}
            >
              
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 transition-all duration-500 hover:border-neutral-600">
                
                {/* Image Wrapper */}
                <div className={`relative w-full overflow-hidden ${
                    project.size === 'large' ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'
                }`}>
                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                    
                    <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Floating Button */}
                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                </div>

                {/* Content info below image (Clean & Minimal) */}
                <div className="p-6 md:p-8 bg-[#0a0a0a] relative z-20">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-[10px] font-mono text-brand-green uppercase tracking-widest mb-2">
                                {project.category}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight group-hover:text-neutral-300 transition-colors">
                                {project.title}
                            </h3>
                        </div>
                        <div className="hidden md:block text-neutral-500 font-mono text-xs">
                            0{index + 1}
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-neutral-400 max-w-md leading-relaxed">
                        {project.description}
                    </p>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-32 text-center">
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">Ready to upgrade?</p>
            <Link href="https://calendly.com/bhavyarathore575/30min" className="inline-block">
                <h2 className="text-4xl md:text-6xl font-black text-white hover:text-brand-green transition-colors cursor-pointer tracking-tighter">
                    BOOK YOUR BUILD
                </h2>
            </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
}