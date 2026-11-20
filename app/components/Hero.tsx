
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Manrope, Instrument_Serif } from "next/font/google";
import { ArrowUpRight, ArrowDown, Menu, X } from "lucide-react";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const BOOKING_URL = "https://calendly.com/bhavyarathore575/30min";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const motion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (motion.matches) return;

    const elements = root.querySelectorAll<HTMLElement>(
      "[data-hero-reveal]"
    );

    const animation = elements.forEach((element, index) => {
      element.animate(
        [
          {
            opacity: 0,
            transform: "translateY(32px)",
          },
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        {
          duration: 850,
          delay: 120 + index * 110,
          easing: "cubic-bezier(.22,1,.36,1)",
          fill: "backwards",
        }
      );
    });

    return () => {
      // Animations belong to this mounted hero only.
      elements.forEach((element) =>
        element.getAnimations().forEach((a) => a.cancel())
      );
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className={`${manrope.className} relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#101010] text-[#F1F0EC] selection:bg-[#D6FF70] selection:text-[#101010]`}
    >
      {/* Subtle vertical editorial rule */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[50%] top-0 hidden w-px bg-white/[0.035] lg:block"
      />

      {/* NAVIGATION */}
      <header className="relative z-30 w-full">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[86px] max-w-[1800px] items-center justify-between border-b border-white/[0.14] px-6 md:h-[100px] md:px-12 xl:px-20"
        >
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Layoutory homepage"
            className="text-[26px] font-extrabold leading-none tracking-[-0.085em] outline-offset-8"
          >
            layoutory<span className="text-[#D6FF70]">.</span>
          </Link>

          <div className="hidden items-center gap-12 lg:flex">
            <Link
              href="/work"
              className="text-[12px] font-medium tracking-[0.02em] text-white/65 transition-colors hover:text-white"
            >
              Selected work
            </Link>
            <Link
              href="/pricing"
              className="text-[12px] font-medium tracking-[0.02em] text-white/65 transition-colors hover:text-white"
            >
              Services & pricing
            </Link>
            <a
              href="mailto:bhavyarathore575@gmail.com"
              className="text-[12px] font-medium tracking-[0.02em] text-white/65 transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.13em] text-white/45">
              <span className="h-[6px] w-[6px] rounded-full bg-[#D6FF70]" />
              Independent digital studio
            </span>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 border-b border-[#D6FF70] pb-2 text-[12px] font-semibold transition-colors hover:text-[#D6FF70]"
            >
              Start a project
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="layoutory-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center border border-white/20 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            id="layoutory-mobile-menu"
            className="absolute left-0 right-0 top-full border-b border-white/20 bg-[#171717] px-6 py-8 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-7 text-[16px]">
              <Link href="/work" onClick={closeMenu}>
                Selected work
              </Link>
              <Link href="/pricing" onClick={closeMenu}>
                Services & pricing
              </Link>
              <a
                href="mailto:bhavyarathore575@gmail.com"
                onClick={closeMenu}
              >
                Contact
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-between border-t border-white/20 pt-6 text-[#D6FF70]"
              >
                Start a project
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN HERO */}
      <div className="relative mx-auto flex w-full max-w-[1800px] flex-1 flex-col justify-between px-6 pb-10 pt-14 md:px-12 md:pb-12 md:pt-20 xl:px-20 xl:pt-24">
        {/* TOP EYEBROW */}
        <div
          data-hero-reveal
          className="flex items-start justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <span className="mt-[7px] h-[7px] w-[7px] shrink-0 bg-[#D6FF70]" />

            <p className="max-w-[220px] text-[10px] font-medium uppercase leading-[1.9] tracking-[0.17em] text-white/55 md:text-[11px]">
              Independent creative &
              <br />
              digital development studio
            </p>
          </div>

          <span className="hidden text-[11px] tracking-[0.04em] text-white/35 md:block">
            EST. 2024 — WORKING WORLDWIDE
          </span>
        </div>

        {/* TYPOGRAPHIC STATEMENT */}
        <div className="relative my-20 md:my-24 xl:my-16">
          <h1
            id="hero-title"
            className="max-w-[1550px] font-medium tracking-[-0.092em]"
          >
            <span
              data-hero-reveal
              className="block whitespace-nowrap text-[clamp(3.6rem,10.6vw,11.5rem)] leading-[0.99]"
            >
              Built to
            </span>

            <span
              data-hero-reveal
              className="flex flex-wrap items-baseline gap-x-[0.17em] text-[clamp(3.6rem,10.6vw,11.5rem)] leading-[1.05]"
            >
              <span>mean</span>
              <span
                className={`${instrument.className} font-normal italic tracking-[-0.075em] text-[#D6FF70]`}
              >
                business.
              </span>
            </span>
          </h1>

          <div
            data-hero-reveal
            className="mt-10 flex items-start gap-4 md:mt-14 md:ml-[4px]"
          >
            <span
              aria-hidden="true"
              className="mt-3 hidden h-px w-12 bg-white/40 sm:block"
            />
            <p className="max-w-[520px] text-[15px] font-normal leading-[1.85] tracking-[-0.015em] text-white/55 md:text-[17px]">
              We create distinctive websites and intelligent digital
              systems for service businesses that take their
              growth seriously.
            </p>
          </div>
        </div>

        {/* LOWER EDITORIAL STRIP */}
        <div
          data-hero-reveal
          className="grid grid-cols-1 gap-10 border-t border-white/20 pt-7 md:grid-cols-[1fr_1fr] md:gap-8 lg:grid-cols-[1.15fr_1fr_1fr]"
        >
          <div className="flex flex-col justify-between gap-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
              What we do / 001
            </span>

            <div className="flex flex-col gap-1 text-[13px] font-medium leading-[1.8] text-white/75">
              <span>Digital strategy & design</span>
              <span>Web development</span>
              <span>Business automation</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
              Our focus / 002
            </span>

            <p className="max-w-[280px] text-[13px] leading-[1.8] text-white/75">
              Considered digital experiences for established
              businesses ready for their next chapter.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 md:col-span-2 lg:col-span-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
              Your next move / 003
            </span>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-b border-white/50 pb-4 transition-colors duration-300 hover:border-[#D6FF70] hover:text-[#D6FF70]"
            >
              <span className="text-[clamp(1.5rem,2.5vw,2.3rem)] font-medium tracking-[-0.06em]">
                Let's make it happen.
              </span>

              <ArrowUpRight
                size={28}
                strokeWidth={1.3}
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER RAIL */}
      <div className="border-t border-white/[0.14]">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-5 px-6 py-5 md:px-12 xl:px-20">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/65 transition-colors hover:text-white"
          >
            Explore selected work
            <ArrowDown
              size={15}
              className="transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transform-none"
            />
          </Link>

          <span className="text-[10px] uppercase tracking-[0.15em] text-white/30">
            Layoutory © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}
