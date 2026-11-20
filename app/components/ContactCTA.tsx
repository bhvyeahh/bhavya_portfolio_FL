
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDownRight,
  Mail,
} from "lucide-react";
import {
  Manrope,
  Instrument_Serif,
} from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const BOOKING_URL =
  "https://calendly.com/bhavyarathore575/30min";

const EMAIL = "bhavyarathore575@gmail.com";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-reveal]",
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );

      if (arrowRef.current) {
        gsap.fromTo(
          arrowRef.current,
          {
            y: -25,
            rotation: -9,
          },
          {
            y: 35,
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="start-project"
      aria-labelledby="contact-title"
      className={`${manrope.className} relative isolate overflow-hidden bg-[#101010] text-[#F1F0EC] selection:bg-[#D6FF70] selection:text-black`}
    >
      <div className="mx-auto max-w-[1800px] px-6 pb-12 pt-24 md:px-12 md:pb-16 md:pt-32 xl:px-20 xl:pt-40">

        {/* SECTION INDEX */}
        <div
          data-contact-reveal
          className="flex items-center justify-between gap-6 border-t border-white/25 pt-5"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
            09 / Start a project
          </span>

          <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
            The next chapter
          </span>
        </div>

        {/* TOP INTRO */}
        <div
          data-contact-reveal
          className="mt-20 flex flex-col gap-7 md:mt-28 md:flex-row md:items-start md:justify-between"
        >
          <div className="flex items-start gap-4">
            <span className="mt-[6px] h-[7px] w-[7px] shrink-0 bg-[#D6FF70]" />

            <span className="text-[10px] font-medium uppercase leading-[1.9] tracking-[0.16em] text-white/50">
              Have something
              <br />
              in mind?
            </span>
          </div>

          <p className="max-w-[340px] text-[14px] leading-[1.9] tracking-[-0.015em] text-white/55 md:text-[15px]">
            Whether you're starting fresh or
            ready to rethink what's already
            there, we'd like to hear what
            you're working on.
          </p>
        </div>

        {/* LARGE TYPOGRAPHIC STATEMENT */}
        <div className="relative mb-20 mt-20 md:mb-28 md:mt-28">
          <h2
            id="contact-title"
            className="relative z-10 font-medium tracking-[-0.09em]"
          >
            <span
              data-contact-reveal
              className="block text-[clamp(3.8rem,10vw,12.5rem)] leading-[0.96]"
            >
              Let's make
            </span>

            <span
              data-contact-reveal
              className="block text-[clamp(3.8rem,10vw,12.5rem)] leading-[1.04]"
            >
              something
            </span>

            <span
              data-contact-reveal
              className={`${serif.className} block text-[clamp(4.6rem,12.5vw,15rem)] font-normal italic leading-[0.98] tracking-[-0.075em] text-[#D6FF70]`}
            >
              matter.
            </span>
          </h2>

          {/* OVERSIZED VECTOR ARROW */}
          <div
            ref={arrowRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[4%] right-[2%] hidden text-white/[0.14] lg:block"
          >
            <svg
              viewBox="0 0 300 300"
              fill="none"
              className="h-[clamp(150px,19vw,310px)] w-[clamp(150px,19vw,310px)]"
            >
              <path
                d="M45 255L250 50M99 50H250V201"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </div>
        </div>

        {/* CONTACT ACTIONS */}
        <div
          data-contact-reveal
          className="grid grid-cols-1 gap-0 border-t border-white/25 lg:grid-cols-12"
        >
          {/* PRIMARY CTA */}
          <div className="border-b border-white/20 py-10 lg:col-span-8 lg:border-b-0 lg:border-r lg:py-14 lg:pr-12">
            <span className="mb-8 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
              01 / Let's talk
            </span>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-end justify-between gap-6"
            >
              <div>
                <span className="mb-5 block text-[12px] text-white/50">
                  A conversation about your next project
                </span>

                <span className="block max-w-[730px] text-[clamp(2.1rem,4.5vw,5.5rem)] font-medium leading-[1.1] tracking-[-0.075em] transition-colors duration-300 group-hover:text-[#D6FF70]">
                  Book a consultation
                </span>
              </div>

              <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-white/35 transition-all duration-300 group-hover:border-[#D6FF70] group-hover:bg-[#D6FF70] group-hover:text-[#101010] md:h-20 md:w-20">
                <ArrowUpRight
                  size={30}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                />
              </span>
            </a>
          </div>

          {/* SECONDARY CTA */}
          <div className="py-10 lg:col-span-4 lg:py-14 lg:pl-12">
            <span className="mb-8 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
              02 / Prefer email?
            </span>

            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                "Project inquiry — Layoutory"
              )}`}
              className="group flex items-end justify-between gap-6"
            >
              <div>
                <span className="mb-5 block text-[12px] text-white/50">
                  Tell us what you're thinking
                </span>

                <span className="block text-[clamp(1.8rem,3vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.065em] transition-colors duration-300 group-hover:text-[#D6FF70]">
                  Write to us.
                </span>
              </div>

              <ArrowUpRight
                size={27}
                strokeWidth={1.3}
                className="mb-1 shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* PROJECT-FIT STRIP */}
        <div
          data-contact-reveal
          className="grid grid-cols-1 gap-10 border-t border-white/20 py-12 md:grid-cols-3 md:gap-8 md:py-16"
        >
          <div>
            <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              What we build
            </span>

            <p className="max-w-[280px] text-[13px] leading-[1.9] text-white/70">
              Distinctive websites, useful
              digital experiences, and connected
              business workflows.
            </p>
          </div>

          <div>
            <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Who we work with
            </span>

            <p className="max-w-[280px] text-[13px] leading-[1.9] text-white/70">
              Established service businesses
              ready to strengthen their digital
              presence and everyday operations.
            </p>
          </div>

          <div>
            <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Project investment
            </span>

            <p className="max-w-[280px] text-[13px] leading-[1.9] text-white/70">
              Custom website projects starting
              at $2,000 USD, with pricing based
              on the scope of work.
            </p>
          </div>
        </div>

        {/* CLOSING SIGNATURE */}
        <div className="flex flex-col gap-8 border-t border-white/20 pb-4 pt-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
              The next move is yours.
            </span>

            <span className="text-[clamp(2.2rem,5vw,5.8rem)] font-extrabold leading-none tracking-[-0.09em]">
              layoutory<span className="text-[#D6FF70]">.</span>
            </span>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 border-b border-white/35 pb-2 text-[12px] text-white/65 transition-colors hover:border-[#D6FF70] hover:text-[#D6FF70]"
            >
              {EMAIL}
              <ArrowUpRight size={15} />
            </a>

            <span className="text-[10px] uppercase tracking-[0.14em] text-white/30">
              Independent digital studio
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
