"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileText,
  Layout,
  Wand2,
  Rocket,
  Quote,
  TrendingUp,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PivotalBuildersCaseStudy() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Hero Animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
      )
        .fromTo(
          ".hero-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          ".hero-mockup",
          { scale: 0.9, opacity: 0, filter: "blur(10px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2 },
          "-=0.6",
        );

      // Scroll Animations for sections
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
          },
        );
      });

      // Timeline staggered animations
      gsap.fromTo(
        ".timeline-step",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 75%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="bg-[#050505] text-[#ededed] font-sans overflow-x-hidden selection:bg-purple-500/30 pb-24"
    >
      <nav className="relative z-10 max-w-7xl mx-auto px-6 pt-6 flex items-center">
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
            <span className="text-sm font-medium text-white/70 hover:text-white">
              ← Home
            </span>
          </button>
        </Link>
      </nav>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-4xl mb-12">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="text-[10px] uppercase tracking-widest text-white/70">
              Case Study • Construction & Remodeling
            </span>
          </div>
          <h1 className="hero-title text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            Automating{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              Client Intake
            </span>{" "}
            & Building Trust.
          </h1>
          <p className="hero-title text-xl text-white/50 max-w-2xl leading-relaxed">
            How Layoutory transformed Pivotal Builders' manual, time-consuming
            lead process into a high-converting digital storefront that
            qualifies high-ticket projects on autopilot.
          </p>

          {/* NEW LIVE WEBSITE BUTTON */}
          <div className="hero-title mt-8">
            <Link
              href="https://pivotalbuildersinc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300"
            >
              <span>View Live Website</span>
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* HERO MOCKUP */}
        <div className="hero-mockup w-full bg-white/[0.02] rounded-3xl aspect-[16/9] flex items-center justify-center border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

          <Image
            src="/mockup-pivotal.jpeg"
            fill
            className="w-full h-full object-contain relative z-10"
            alt="Pivotal Builders Website Mockup"
          />
        </div>
      </section>

      {/* 2. QUICK FACTS */}
      <section className="reveal-section relative z-10 border-y border-white/5 bg-white/[0.01] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-2">
              Client
            </h3>
            <p className="font-bold text-lg text-white">
              Pivotal Builders Inc.
            </p>
          </div>
          <div>
            <h3 className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-2">
              Location
            </h3>
            <p className="font-bold text-lg text-white">United States</p>
          </div>
          <div>
            <h3 className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-2">
              Services
            </h3>
            <p className="font-bold text-lg text-white">Web Design, Lead Gen</p>
          </div>
          <div>
            <h3 className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-2">
              Industry
            </h3>
            <p className="font-bold text-lg text-white">General Contracting</p>
          </div>
        </div>
      </section>

      {/* 3. THE BRIEF (PROBLEM) */}
      <section className="reveal-section relative z-10 max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          The Brief: Leaking High-Ticket Leads
        </h2>
        <div className="text-lg text-white/60 space-y-6 leading-relaxed">
          <p>
            For a US-based contractor like Pivotal Builders, reputation is
            everything. However, their online presence wasn't matching the
            quality of their real-world craftsmanship. They were relying on
            manual client intake methods, causing frustrating delays in
            communication.
          </p>
          <p>
            When a homeowner is ready to invest in a major remodeling project,
            they expect a seamless, professional experience. Pivotal Builders
            was losing valuable time answering basic questions and sorting
            through unqualified inquiries, potentially missing out on lucrative
            contracts to competitors who had smoother digital systems.
          </p>
        </div>
        <br />
        <br />
        <br />
        <p className="text-white uppercase tracking-widest z-10">
          "Before" Website Screenshot
        </p>
        {/* BEFORE IMAGE PLACEHOLDER */}
        <div className="mt-10 bg-white/[0.02] rounded-xl aspect-video flex items-center justify-center border border-white/5 relative overflow-hidden">
          <Image
            src="/before-pivotal.png"
            fill
            className="w-full h-full object-cover"
            alt="Pivotal Builders Website Mockup"
          />
        </div>
      </section>

      {/* 4. THE RESULT (OUTCOMES & ROI) */}
      <section className="reveal-section relative z-10 bg-white/[0.02] border-y border-white/5 py-24 mt-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            The Result: A 24/7 Sales Engine
          </h2>
          <div className="text-lg text-white/60 leading-relaxed text-center max-w-3xl mx-auto mb-16">
            <p>
              The new digital storefront immediately elevated their brand
              perception. By implementing a structured intake funnel, we
              eliminated back-and-forth emails. Paul and his team now focus
              entirely on the job site, knowing their website is actively
              capturing and qualifying leads for high-ticket projects.
            </p>
          </div>

          {/* STATS / HIGHLIGHTS */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            <div className="glass-surface p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent">
              <TrendingUp className="text-purple-400 mb-4 w-8 h-8" />
              <h4 className="text-white font-bold text-2xl mb-2">Automated</h4>
              <p className="text-white/50 text-sm">
                Pre-qualification process filters out low-budget tire-kickers.
              </p>
            </div>
            <div className="glass-surface p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent">
              <Smartphone className="text-blue-400 mb-4 w-8 h-8" />
              <h4 className="text-white font-bold text-2xl mb-2">
                Mobile-Ready
              </h4>
              <p className="text-white/50 text-sm">
                Flawless, app-like experience optimized for homeowners on the
                go.
              </p>
            </div>
            <div className="glass-surface p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent">
              <ShieldCheck className="text-green-400 mb-4 w-8 h-8" />
              <h4 className="text-white font-bold text-2xl mb-2">High-Trust</h4>
              <p className="text-white/50 text-sm">
                Premium positioning that justifies high-ticket remodeling bids.
              </p>
            </div>
          </div>

          {/* AFTER IMAGE / VIDEO PLACEHOLDER */}
          {/* <div className="w-full bg-white/[0.02] rounded-2xl aspect-video flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
            <p className="text-white/30 text-sm uppercase tracking-widest z-10">Final "After" Walkthrough Video / Showcase</p>
          </div> */}
        </div>
      </section>

      {/* 5. THE PROCESS TIMELINE (How we did it) */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 reveal-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Layoutory Process
            </h2>
            <p className="text-white/50 text-lg">
              The exact step-by-step execution that generated these results.
            </p>
          </div>

          <div className="timeline-container relative border-l border-white/10 ml-4 md:ml-8 space-y-16 pb-8">
            <div className="timeline-step relative pl-10 md:pl-16">
              <div className="absolute -left-6 top-0 w-12 h-12 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                1. Discovery & Strategy
              </h3>
              <p className="text-white/60 leading-relaxed mb-4">
                We kicked off with an in-depth strategy call. Paul knew exactly
                what his ideal client looked like. We mapped out a streamlined{" "}
                <strong>5-page architecture</strong> designed purely for
                conversion. Immediately after the call, detailed proposals and
                timelines were sent and approved.
              </p>
            </div>

            <div className="timeline-step relative pl-10 md:pl-16">
              <div className="absolute -left-6 top-0 w-12 h-12 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                2. Architecture & Wireframing
              </h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Before writing a single line of code, we built the foundation.
                We created comprehensive sitemaps and low-fidelity wireframes to
                dictate the user journey, ensuring the qualification form was
                placed exactly where buyer intent was highest.
              </p>
            </div>

            <div className="timeline-step relative pl-10 md:pl-16">
              <div className="absolute -left-6 top-0 w-12 h-12 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                3. Premium UI & Scroll Physics
              </h3>
              <p className="text-white/60 leading-relaxed mb-4">
                We translated the wireframes into a high-end, dark-themed UI. We
                engineered custom GSAP scroll animations to give the site a
                tactile, premium feel—because high-ticket clients expect
                high-ticket aesthetics.
              </p>
            </div>

            <div className="timeline-step relative pl-10 md:pl-16">
              <div className="absolute -left-6 top-0 w-12 h-12 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center">
                <Layout className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                4. The Day 5 Demo
              </h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Speed is a feature. By Day 5, we presented a fully functional
                demo. We hopped on a refinement call to review the staging link,
                finalized the granular details, adjusted mobile responsiveness,
                and locked in the final form logic.
              </p>
            </div>

            <div className="timeline-step relative pl-10 md:pl-16">
              <div className="absolute -left-6 top-0 w-12 h-12 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center">
                <Rocket className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                5. Final Call & Launch
              </h3>
              <p className="text-white/60 leading-relaxed mb-4">
                We executed the final handover call, transferring all assets,
                invoices, and showing Paul exactly how to manage his new
                automated intake system. We hit the launch button, instantly
                upgrading his brand authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EXPECTATIONS VS REALITY */}
      <section className="reveal-section relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Expectations vs. Delivery
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-surface p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-xl font-bold text-white/50 mb-4 border-b border-white/10 pb-4">
              The Expectation
            </h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex gap-3">
                <span className="text-white/30">—</span> A clean, 5-page
                website.
              </li>
              <li className="flex gap-3">
                <span className="text-white/30">—</span> A working contact form.
              </li>
              <li className="flex gap-3">
                <span className="text-white/30">—</span> Better mobile layout.
              </li>
            </ul>
          </div>
          <div className="glass-surface p-8 rounded-2xl border border-purple-500/30 bg-purple-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle2 size={100} />
            </div>
            <h4 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-4 relative z-10">
              The Layoutory Delivery
            </h4>
            <ul className="space-y-4 text-white relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="text-purple-400 mt-1 shrink-0"
                  size={18}
                />{" "}
                A high-converting sales architecture optimized for builders.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="text-purple-400 mt-1 shrink-0"
                  size={18}
                />{" "}
                A multi-step qualification funnel to filter out low-budget
                leads.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="text-purple-400 mt-1 shrink-0"
                  size={18}
                />{" "}
                Premium GSAP scroll physics that elevate brand trust instantly.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIAL */}
      <section className="reveal-section relative z-10 max-w-4xl mx-auto px-6 py-12 mb-10">
        <div className="glass-surface p-10 md:p-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent text-center relative">
          <Quote className="absolute top-6 left-6 md:top-10 md:left-10 text-white/10 w-16 h-16" />
          <p className="text-xl md:text-3xl font-medium leading-relaxed italic text-white/90 relative z-10 mb-8">
            "The level of detail and speed was incredible. It's not just a
            website; it feels like an actual upgrade to how my business handles
            new clients."
          </p>
          <div>
            <p className="font-bold text-lg text-white">Paul</p>
            <p className="text-white/50 text-sm tracking-widest uppercase">
              Founder, Pivotal Builders Inc.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FUNNEL CTA */}
      <section className="reveal-section relative z-10 max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="glass-surface border border-white/10 bg-white/[0.02] rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Stop losing high-value projects.
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              If you're a contractor still relying on manual outreach and basic
              contact forms, you are leaving money on the table. Let's build
              your automated system.
            </p>
            <Link
              href="https://calendly.com/bhavyarathore575/30min"
              target="_blank"
            >
              <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#050505] font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 flex items-center gap-2">
                  See If You Qualify <ArrowUpRight size={18} />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
