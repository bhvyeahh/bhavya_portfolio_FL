
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
} from "lucide-react";
import {
  Manrope,
  Instrument_Serif,
} from "next/font/google";

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

const EMAIL = "bhavyarathore575@gmail.com";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Selected work", href: "/work" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Our approach", href: "/#approach" },
  { label: "Investment", href: "/pricing" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/layoutory/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bhavya-rathore",
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) return;

    const wordmark = footer.querySelector<HTMLElement>(
      "[data-footer-wordmark]"
    );

    if (!wordmark) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        wordmark.animate(
          [
            {
              opacity: 0,
              transform: "translateY(38px)",
            },
            {
              opacity: 1,
              transform: "translateY(0)",
            },
          ],
          {
            duration: 1100,
            easing: "cubic-bezier(.22,1,.36,1)",
          }
        );

        observer.unobserve(wordmark);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(wordmark);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduced ? "instant" : "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className={`${manrope.className} relative isolate w-full overflow-hidden bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >
      <div className="mx-auto max-w-[1800px] px-6 pt-12 md:px-12 md:pt-16 xl:px-20 xl:pt-20">

        {/* TOP EDITORIAL RAIL */}
        <div className="flex flex-wrap items-start justify-between gap-8 border-t border-black/25 pt-6">
          <div className="flex items-start gap-4">
            <span className="mt-[5px] h-[7px] w-[7px] bg-[#171717]" />

            <span className="text-[10px] font-semibold uppercase leading-[1.9] tracking-[0.16em]">
              Layoutory®
              <br />
              Independent digital studio
            </span>
          </div>

          <span className="text-right text-[10px] uppercase leading-[1.9] tracking-[0.14em] text-black/40">
            Design. Development.
            <br />
            Connected experiences.
          </span>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 gap-16 pb-24 pt-24 md:grid-cols-12 md:gap-8 md:pb-32 md:pt-32 lg:pt-40">

          {/* LEFT SIDE — BRAND STATEMENT */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="flex flex-col items-start">
              <span className="mb-10 text-[10px] font-semibold uppercase tracking-[0.17em] text-black/45">
                A studio for what's next.
              </span>

              <h2 className="max-w-[700px] text-[clamp(2.5rem,5.5vw,6.5rem)] font-medium leading-[1.08] tracking-[-0.078em]">
                Made with
                <br />

                <span
                  className={`${serif.className} font-normal italic tracking-[-0.065em]`}
                >
                  intention.
                </span>

                <br />
                Built to last.
              </h2>

              <div className="mt-12 flex items-center gap-4 md:mt-16">
                <span className="h-px w-12 bg-black/30" />

                <span className="max-w-[280px] text-[12px] leading-[1.9] text-black/45">
                  Considered digital experiences
                  for businesses with ambition.
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — LINKS */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:col-span-6 lg:col-span-5">

            {/* NAVIGATION */}
            <div>
              <span className="mb-10 block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                Explore
              </span>

              <nav
                aria-label="Footer navigation"
                className="flex flex-col items-start gap-5"
              >
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.02em] transition-colors duration-300 hover:text-black/50"
                  >
                    {item.label}

                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="opacity-0 transition-all duration-300 motion-safe:-translate-x-1 motion-safe:translate-y-1 group-hover:opacity-100 motion-safe:group-hover:translate-x-0 motion-safe:group-hover:translate-y-0"
                    />
                  </Link>
                ))}
              </nav>
            </div>

            {/* SOCIALS */}
            <div>
              <span className="mb-10 block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                Elsewhere
              </span>

              <div className="flex flex-col items-start gap-5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.02em] transition-colors duration-300 hover:text-black/50"
                  >
                    {social.label}

                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div className="col-span-2 border-t border-black/20 pt-8">
              <span className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                Direct line
              </span>

              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex max-w-full items-center gap-3 border-b border-black/35 pb-3 text-[clamp(0.85rem,1.55vw,1.4rem)] font-medium tracking-[-0.045em] transition-colors duration-300 hover:border-black/75 hover:text-black/55"
              >
                <span className="min-w-0 break-all">
                  {EMAIL}
                </span>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.4}
                  className="shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                />
              </a>

              <p className="mt-5 max-w-[300px] text-[12px] leading-[1.8] text-black/45">
                Have something worth building?
                We'd love to hear about it.
              </p>
            </div>
          </div>
        </div>

        {/* GIANT BRAND SIGNATURE */}
        <div
          data-footer-wordmark
          className="relative border-t border-black/25 pt-8 md:pt-12"
        >
          <div className="relative flex w-full items-end justify-between gap-4">

            {/* Wordmark */}
            <Link
              href="/"
              aria-label="Layoutory homepage"
              className="block min-w-0 flex-1 outline-offset-4"
            >
              <span
                className="block w-full whitespace-nowrap text-[clamp(3.5rem,15.2vw,18rem)] font-extrabold leading-[0.78] tracking-[-0.105em] text-[#171717]"
                aria-hidden="true"
              >
                layoutory<span className="text-[#171717]">.</span>
              </span>
            </Link>
          </div>

          {/* SMALL SIGNATURE MARK */}
          <div className="mt-8 flex items-center justify-between gap-6 md:mt-12">
            <div className="flex items-center gap-4">

              {/* Custom vector mark */}
              <svg
                aria-hidden="true"
                viewBox="0 0 40 40"
                className="h-9 w-9 md:h-11 md:w-11"
                fill="none"
              >
                <rect
                  x="1"
                  y="1"
                  width="38"
                  height="38"
                  stroke="#171717"
                  strokeWidth="1.2"
                />
                <path
                  d="M10 10V30H30"
                  stroke="#171717"
                  strokeWidth="3"
                  strokeLinecap="square"
                />
                <path
                  d="M20 10H30V20"
                  stroke="#171717"
                  strokeWidth="1.2"
                />
                <rect
                  x="25"
                  y="25"
                  width="5"
                  height="5"
                  fill="#171717"
                />
              </svg>

              <span className="text-[10px] font-medium uppercase leading-[1.8] tracking-[0.12em] text-black/45">
                Independent in thought.
                <br />
                Intentional in execution.
              </span>
            </div>

            {/* BACK TO TOP */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex min-h-12 items-center gap-3 border-b border-black/40 pb-2 text-[10px] font-semibold uppercase tracking-[0.13em] transition-colors hover:border-black hover:text-black/55"
            >
              <span className="hidden sm:inline">
                Back to top
              </span>

              <ArrowUp
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>

        {/* BOTTOM LEGAL RAIL */}
        <div className="mt-14 flex flex-col justify-between gap-6 border-t border-black/20 py-7 sm:flex-row sm:items-center md:mt-20">
          <span className="text-[10px] uppercase tracking-[0.13em] text-black/45">
            © {year} Layoutory. All rights reserved.
          </span>

          <span className="text-[10px] uppercase tracking-[0.13em] text-black/45">
            Designed & developed with intention.
          </span>
        </div>
      </div>
    </footer>
  );
}
