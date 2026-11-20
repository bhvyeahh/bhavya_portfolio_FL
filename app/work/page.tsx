
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  Manrope,
  Instrument_Serif,
} from "next/font/google";
import Footer from "../components/Footer";

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

export const metadata: Metadata = {
  title: "Selected Work | Layoutory",
  description:
    "Explore selected website design and development projects from Layoutory, an independent digital studio.",
};

const BOOKING_URL =
  "https://calendly.com/bhavyarathore575/30min";

const smallProjects = [
  {
    number: "03",
    title: "Scrubz OC",
    industry: "Automotive Detailing",
    discipline: "Digital Experience",
    description:
      "A service-led website experience with a focus on clear customer information and an approachable digital presence.",
    href: "https://scrubzocdetailing.vercel.app",
    artwork: "scrubz",
  },
  {
    number: "04",
    title: "Defries Detailing",
    industry: "Automotive Detailing",
    discipline: "Website Design",
    description:
      "An understated digital presentation for a specialist detailing business and its service offering.",
    href: "https://defriesdetailing.vercel.app",
    artwork: "defries",
  },
] as const;

/* -------------------------------------------
   SLICK CONSTRUCTION — CUSTOM VECTOR ARTWORK
------------------------------------------- */

function SlickArtwork() {
  return (
    <div className="group relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden bg-[#191B19] p-6 text-[#F1F0EA] sm:aspect-[16/10] md:p-12 lg:aspect-[16/9] lg:p-16">

      {/* ARCHITECTURAL VECTOR GRID */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <pattern
            id="slick-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M60 0H0V60"
              stroke="#D6FF70"
              strokeWidth=".6"
              strokeOpacity=".10"
            />
          </pattern>
        </defs>

        <rect
          width="1200"
          height="720"
          fill="url(#slick-grid)"
        />

        <g
          stroke="#D6FF70"
          strokeWidth="1"
          strokeOpacity=".28"
        >
          <path d="M320 600L600 90L880 600Z" />
          <path d="M390 600L600 220L810 600Z" />
          <path d="M460 600L600 350L740 600Z" />

          <path d="M600 90V600" />
          <path d="M320 600H880" />

          <circle
            cx="600"
            cy="355"
            r="230"
            strokeDasharray="5 12"
          />

          <circle
            cx="600"
            cy="355"
            r="135"
            strokeOpacity=".4"
          />

          <path d="M80 355H1120" strokeOpacity=".25" />
        </g>

        <g fill="#D6FF70">
          <circle cx="600" cy="90" r="4" />
          <circle cx="320" cy="600" r="4" />
          <circle cx="880" cy="600" r="4" />
        </g>
      </svg>

      {/* TOP BAR */}
      <div className="relative z-10 flex items-start justify-between gap-6 border-b border-white/20 pb-5">
        <div className="flex items-center gap-3">
          <span className="h-[7px] w-[7px] bg-[#D6FF70]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
            Slick Construction
          </span>
        </div>

        <span className="hidden text-[10px] uppercase tracking-[0.14em] text-white/45 sm:block">
          Digital project / 002
        </span>
      </div>

      {/* MAIN TYPOGRAPHY */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-12 text-center">
        <span className="mb-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[#D6FF70]">
          Built with intention
        </span>

        <span className="text-[clamp(4.4rem,13.5vw,14rem)] font-extrabold leading-[0.8] tracking-[-0.12em]">
          SLICK
        </span>

        <span
          className={`${serif.className} mt-5 text-[clamp(3.2rem,8.5vw,9rem)] font-normal italic leading-none tracking-[-0.07em] text-[#D6FF70]`}
        >
          Construction.
        </span>

        <div className="mt-10 h-px w-16 bg-[#D6FF70]/60" />
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/20 pt-5">
        <span className="text-[10px] uppercase tracking-[0.14em] text-white/50">
          Construction / Digital presence
        </span>

        <span className="text-[10px] uppercase tracking-[0.14em] text-white/50">
          Layoutory®
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------
   SMALL PROJECTS — TYPOGRAPHIC ARTWORK
------------------------------------------- */

function SmallProjectArtwork({
  type,
}: {
  type: "scrubz" | "defries";
}) {
  if (type === "scrubz") {
    return (
      <div className="relative flex aspect-[5/4] flex-col justify-between overflow-hidden bg-[#DCE3D7] p-6 text-[#21362B] sm:aspect-[4/3] md:p-10">

        <div className="flex items-center justify-between gap-4 border-b border-[#21362B]/25 pb-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.17em]">
            SCRUBZ OC
          </span>

          <span className="text-[9px] uppercase tracking-[0.12em] opacity-60">
            Automotive care
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12">
          <span className="mb-8 h-[7px] w-[7px] bg-[#21362B]" />

          <span className="text-[clamp(4rem,10vw,10rem)] font-extrabold leading-[0.88] tracking-[-0.105em]">
            Clean.
            <br />

            <span
              className={`${serif.className} font-normal italic tracking-[-0.08em]`}
            >
              Refined.
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-[#21362B]/25 pt-5 text-[9px] uppercase tracking-[0.13em] opacity-60">
          <span>Service focused</span>
          <span>Digital experience</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[5/4] flex-col justify-between overflow-hidden bg-[#E4DED3] p-6 text-[#282722] sm:aspect-[4/3] md:p-10">

      <div className="flex items-center justify-between gap-4 border-b border-black/20 pb-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
          DEFRIES
        </span>

        <span className="text-[9px] uppercase tracking-[0.12em] text-black/50">
          Specialist detailing
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
        <span className="mb-8 text-[10px] uppercase tracking-[0.3em] text-black/50">
          Attention to every detail
        </span>

        <span className="text-[clamp(3.7rem,9vw,9rem)] font-medium leading-none tracking-[-0.095em]">
          Defries
        </span>

        <span
          className={`${serif.className} mt-2 text-[clamp(3rem,7.3vw,7.5rem)] italic leading-none tracking-[-0.075em]`}
        >
          Detailing.
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-black/20 pt-5 text-[9px] uppercase tracking-[0.13em] text-black/50">
        <span>Visual direction</span>
        <span>Selected work</span>
      </div>
    </div>
  );
}

/* -------------------------------------------
   SHARED PROJECT INFORMATION
------------------------------------------- */

function ProjectDetails({
  number,
  title,
  category,
  services,
  description,
  dark = false,
}: {
  number: string;
  title: string;
  category: string;
  services: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-8 border-b pb-10 pt-9 md:grid-cols-12 md:gap-6 md:pb-14 ${
        dark
          ? "border-white/20"
          : "border-black/20"
      }`}
    >
      <div className="flex items-start gap-5 md:col-span-7">
        <span
          className={`mt-2 text-[11px] ${
            dark ? "text-white/40" : "text-black/40"
          }`}
        >
          / {number}
        </span>

        <div>
          <h3 className="text-[clamp(2.2rem,4.5vw,5rem)] font-medium leading-[1.05] tracking-[-0.075em]">
            {title}
          </h3>

          <p
            className={`mt-5 text-[10px] uppercase tracking-[0.14em] ${
              dark ? "text-white/40" : "text-black/45"
            }`}
          >
            {category}
          </p>
        </div>
      </div>

      <div className="md:col-span-3">
        <p
          className={`max-w-[350px] text-[13px] leading-[1.85] ${
            dark ? "text-white/55" : "text-black/55"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="md:col-span-2 md:text-right">
        <span
          className={`text-[10px] uppercase leading-[1.8] tracking-[0.11em] ${
            dark ? "text-white/45" : "text-black/45"
          }`}
        >
          {services}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------
   MAIN WORK PAGE
------------------------------------------- */

export default function WorkPage() {
  return (
    <main
      className={`${manrope.className} min-h-screen overflow-x-clip bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >

      {/* NAVIGATION */}
      <header className="border-b border-black/20">
        <nav
          aria-label="Work page navigation"
          className="mx-auto flex h-[88px] max-w-[1800px] items-center justify-between gap-5 px-6 md:h-[100px] md:px-12 xl:px-20"
        >
          <Link
            href="/"
            aria-label="Layoutory homepage"
            className="text-[26px] font-extrabold leading-none tracking-[-0.085em]"
          >
            layoutory.
          </Link>

          <div className="flex items-center gap-6 md:gap-12">
            <Link
              href="/"
              className="hidden text-[11px] font-medium text-black/55 transition-colors hover:text-black sm:inline-flex"
            >
              Home
            </Link>

            <Link
              href="/pricing"
              className="hidden text-[11px] font-medium text-black/55 transition-colors hover:text-black md:inline-flex"
            >
              Investment
            </Link>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-black/60 pb-2 text-[11px] font-semibold"
            >
              Start a project

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
              />
            </a>
          </div>
        </nav>
      </header>

      {/* PAGE INTRO */}
      <section className="mx-auto max-w-[1800px] px-6 pb-24 pt-12 md:px-12 md:pb-36 md:pt-16 xl:px-20">
        <div className="flex items-center justify-between gap-5 border-t border-black/25 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
            Layoutory / Archive
          </span>

          <span className="text-[10px] uppercase tracking-[0.12em] text-black/45">
            Selected projects
          </span>
        </div>

        <div className="grid grid-cols-1 gap-14 pb-16 pt-20 md:pb-24 md:pt-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <h1 className="text-[clamp(4.2rem,12vw,13rem)] font-medium leading-[0.87] tracking-[-0.1em]">
              Selected
              <br />

              <span
                className={`${serif.className} font-normal italic tracking-[-0.07em]`}
              >
                work.
              </span>
            </h1>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <span className="mb-6 h-[7px] w-[7px] bg-[#171717]" />

            <p className="max-w-[330px] text-[14px] leading-[1.9] text-black/55">
              Different businesses. Different
              challenges. A shared belief that
              the digital experience should be
              as considered as the work behind it.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-black/20 pt-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
            The project index
          </span>

          <span className="text-[10px] uppercase tracking-[0.13em] text-black/45">
            01 — 04
          </span>
        </div>
      </section>

      {/* ==================================
          FEATURED 01 — PIVOTAL BUILDERS
      ================================== */}
      <section className="bg-[#171717] py-20 text-[#F1F0EA] md:py-32">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 xl:px-20">

          <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/25 pt-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              01 / Featured project
            </span>

            <span className="text-[10px] uppercase tracking-[0.13em] text-white/40">
              Construction & Remodeling
            </span>
          </div>

          <Link
            href="/pivotal-builders-case-study"
            className="group block outline-offset-4"
            aria-label="Read Pivotal Builders case study"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#353531] sm:aspect-[16/10] lg:aspect-[16/9]">
              <Image
                src="/mockup-pivotal.jpeg"
                alt="Pivotal Builders website project preview"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover transition-transform duration-[950ms] ease-out motion-safe:group-hover:scale-[1.035]"
              />

              <span className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center bg-[#D6FF70] text-[#171717] md:bottom-8 md:right-8 md:h-20 md:w-20">
                <ArrowUpRight size={30} strokeWidth={1.3} />
              </span>
            </div>

            <ProjectDetails
              number="01"
              title="Pivotal Builders"
              category="Construction & Remodeling"
              services="Web Design / Development / Lead Inquiry"
              description="A digital presence for a construction business, with a focus on presenting its work, building credibility, and creating a clearer way to inquire."
              dark
            />
          </Link>
        </div>
      </section>

      {/* ==================================
          FEATURED 02 — SLICK CONSTRUCTION
      ================================== */}
      <section className="bg-[#F1F0EA] py-20 text-[#171717] md:py-32">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 xl:px-20">

          <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-t border-black/25 pt-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              02 / Featured project
            </span>

            <span className="text-[10px] uppercase tracking-[0.13em] text-black/45">
              Construction
            </span>
          </div>

          {/* No invented external link or case study URL */}
          <Link
  href="/slick-construction-case-study"
  className="group block outline-offset-4"
  aria-label="Read Slick Construction case study"
>
  <SlickArtwork />

  <ProjectDetails
    number="02"
    title="Slick Construction"
    category="Construction"
    services="Website Design / Development"
    description="A digital experience for Slick Construction, focused on clarity, visual presentation, and a distinctive identity."
  />
</Link>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.13em] text-black/40">
              Project presentation
            </span>

            <span className="text-[11px] text-black/50">
              Client: Nick Coleman
            </span>
          </div>
        </div>
      </section>

      {/* ==================================
          SMALL PROJECTS — 03 AND 04
      ================================== */}
      <section className="bg-[#E8E7E0] py-24 text-[#171717] md:py-36">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 xl:px-20">

          <div className="mb-16 flex items-center justify-between gap-5 border-t border-black/25 pt-6 md:mb-24">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              More from the studio
            </span>

            <span className="text-[10px] uppercase tracking-[0.12em] text-black/45">
              03 — 04
            </span>
          </div>

          <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2 md:gap-10 xl:gap-14">
            {smallProjects.map((project) => (
              <article key={project.number}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block outline-offset-4"
                  aria-label={`Visit ${project.title} website (opens in new tab)`}
                >
                  <div className="relative overflow-hidden">
                    <div className="transition-transform duration-[850ms] ease-out motion-safe:group-hover:scale-[1.025]">
                      <SmallProjectArtwork
                        type={project.artwork}
                      />
                    </div>

                    <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center bg-[#D6FF70] text-black">
                      <ArrowUpRight
                        size={23}
                        strokeWidth={1.4}
                      />
                    </span>
                  </div>

                  <div className="mt-8 flex justify-between gap-6 border-t border-black/25 pt-6">
                    <div>
                      <span className="mb-5 block text-[10px] font-medium tracking-[0.14em] text-black/45">
                        / {project.number}
                      </span>

                      <h3 className="text-[clamp(2rem,3.5vw,4rem)] font-medium leading-[1.1] tracking-[-0.07em]">
                        {project.title}
                      </h3>

                      <p className="mt-4 text-[10px] uppercase tracking-[0.12em] text-black/45">
                        {project.industry}
                        <span className="mx-2">/</span>
                        {project.discipline}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.3}
                      className="shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                    />
                  </div>

                  <p className="mt-6 max-w-[480px] text-[13px] leading-[1.9] text-black/55">
                    {project.description}
                  </p>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================
          EDITORIAL STATEMENT
      ================================== */}
      <section className="border-y border-black/15 bg-[#F1F0EA]">
        <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-14 px-6 py-28 md:grid-cols-12 md:gap-8 md:px-12 md:py-40 xl:px-20">

          <div className="md:col-span-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              The common thread
            </span>
          </div>

          <div className="md:col-span-8">
            <p className="text-[clamp(2.3rem,5vw,6rem)] font-medium leading-[1.16] tracking-[-0.075em]">
              The industry changes.

              <span className="text-black/35">
                {" "}Our attention to the
                experience doesn't.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ==================================
          CLOSING CTA
      ================================== */}
      <section className="bg-[#101010] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">

          <div className="flex items-center justify-between gap-5 border-t border-white/25 pt-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Your project could be next
            </span>

            <span className="text-[10px] uppercase tracking-[0.12em] text-white/40">
              Layoutory / Studio
            </span>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(3.5rem,9vw,11rem)] font-medium leading-[0.96] tracking-[-0.09em]">
                Let's make
                <br />

                <span
                  className={`${serif.className} font-normal italic tracking-[-0.065em] text-[#D6FF70]`}
                >
                  your mark.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-3">
              <p className="mb-9 text-[14px] leading-[1.9] text-white/50">
                Tell us about your business
                and what you're looking to build.
              </p>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-5 border-b border-white/50 pb-5 text-[16px] font-medium transition-colors hover:text-[#D6FF70]"
              >
                Discuss a project

                <ArrowRight
                  size={23}
                  className="transition-transform motion-safe:group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          <Link
            href="/"
            className="mt-28 inline-flex items-center gap-3 text-[11px] text-white/55 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to homepage
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
