
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  MoveUpRight,
  Play,
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
  title: "Slick Construction — Case Study | Layoutory",
  description:
    "Explore the Slick Construction website project by Layoutory, including its visual direction, website presentation, and design considerations.",
};

const BOOKING_URL =
  "https://calendly.com/bhavyarathore575/30min";

const ASSETS = {
  before: "/slick-before.png",
  after: "/slick-after.png",
  video: "/nick.mp4",
};

// Switch these to true after adding the corresponding
// files to the public folder.
const HAS_BEFORE_IMAGE = false;
const HAS_AFTER_IMAGE = false;
const HAS_CLIENT_VIDEO = false;

const principles = [
  {
    number: "01",
    label: "Clarity",
    title: "Make the first impression count.",
    description:
      "A construction website should make it easy to understand who the business is, what it offers, and how to get in touch. The visual direction prioritizes a clear introduction over unnecessary decoration.",
  },
  {
    number: "02",
    label: "Presentation",
    title: "Give the work room to speak.",
    description:
      "Project imagery and service information deserve a considered presentation. Generous spacing and purposeful hierarchy help visitors focus on what matters.",
  },
  {
    number: "03",
    label: "Experience",
    title: "Every interaction has a purpose.",
    description:
      "Navigation, page structure, and inquiry pathways should work together to create a straightforward experience for potential customers.",
  },
  {
    number: "04",
    label: "Consistency",
    title: "One identity. Every screen.",
    description:
      "Typography, spacing, and interface elements create a cohesive visual language across desktop, tablet, and mobile layouts.",
  },
];

function SectionLabel({
  number,
  title,
  light = false,
}: {
  number: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-5 border-t pt-5 ${
        light ? "border-white/25" : "border-black/25"
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
        {number} / {title}
      </span>

      <span
        className={`text-[10px] uppercase tracking-[0.12em] ${
          light ? "text-white/40" : "text-black/40"
        }`}
      >
        Layoutory — Selected Work
      </span>
    </div>
  );
}

function ArchitecturalDrawing() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      <defs>
        <pattern
          id="slick-case-grid"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M50 0H0V50"
            stroke="#D6FF70"
            strokeOpacity=".1"
            strokeWidth=".7"
          />
        </pattern>
      </defs>

      <rect
        width="1200"
        height="700"
        fill="url(#slick-case-grid)"
      />

      <g
        stroke="#D6FF70"
        strokeWidth="1.1"
        strokeOpacity=".35"
      >
        <path d="M230 580L600 75L970 580Z" />
        <path d="M310 580L600 180L890 580Z" />
        <path d="M390 580L600 290L810 580Z" />
        <path d="M470 580L600 400L730 580Z" />
        <path d="M600 75V580" />
        <path d="M230 580H970" />

        <circle
          cx="600"
          cy="350"
          r="230"
          strokeDasharray="4 11"
        />

        <path d="M80 350H1120" strokeOpacity=".4" />
      </g>

      <g fill="#D6FF70">
        <circle cx="600" cy="75" r="4" />
        <circle cx="230" cy="580" r="4" />
        <circle cx="970" cy="580" r="4" />
      </g>
    </svg>
  );
}

function WebsiteFrame({
  type,
  image,
  available,
}: {
  type: "before" | "after";
  image: string;
  available: boolean;
}) {
  const before = type === "before";

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden border ${
        before
          ? "border-black/15 bg-[#D7D5CF]"
          : "border-black/15 bg-[#252724]"
      }`}
    >
      {available ? (
        <Image
          src={image}
          alt={
            before
              ? "Previous Slick Construction website screenshot"
              : "Redesigned Slick Construction website screenshot"
          }
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
        />
      ) : (
        <div
          className={`flex h-full flex-col justify-between p-6 md:p-10 ${
            before ? "text-[#171717]" : "text-[#F1F0EA]"
          }`}
        >
          <div
            className={`flex justify-between gap-5 border-b pb-5 ${
              before ? "border-black/20" : "border-white/20"
            }`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
              Slick Construction
            </span>
            <span className="text-[10px] opacity-50">
              {before ? "Archive / 01" : "New / 02"}
            </span>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span
              className={`mb-7 text-[10px] uppercase tracking-[0.16em] opacity-50`}
            >
              {before
                ? "Original website"
                : "Redesigned experience"}
            </span>

            <span
              className={`text-[clamp(2.2rem,4.2vw,5rem)] font-medium leading-[1.06] tracking-[-0.075em] ${
                !before ? serif.className + " italic" : ""
              }`}
            >
              {before ? (
                <>
                  Where it
                  <br />
                  started.
                </>
              ) : (
                <>
                  What's
                  <br />
                  next.
                </>
              )}
            </span>

            <span
              className={`mt-8 h-px w-12 ${
                before ? "bg-black/40" : "bg-[#D6FF70]"
              }`}
            />
          </div>

          <div
            className={`flex items-center justify-between gap-4 border-t pt-5 ${
              before ? "border-black/20" : "border-white/20"
            }`}
          >
            <span className="text-[9px] uppercase tracking-[0.13em] opacity-50">
              Image pending
            </span>
            <span className="text-[9px] uppercase tracking-[0.13em] opacity-50">
              Layoutory / Case Study
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SlickConstructionCaseStudy() {
  return (
    <main
      className={`${manrope.className} min-h-screen overflow-x-clip bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >
      {/* NAVIGATION */}
      <header className="border-b border-black/20 bg-[#F1F0EA]">
        <nav
          aria-label="Case study navigation"
          className="mx-auto flex h-[88px] max-w-[1800px] items-center justify-between gap-5 px-6 md:h-[100px] md:px-12 xl:px-20"
        >
          <Link
            href="/"
            aria-label="Layoutory homepage"
            className="text-[26px] font-extrabold leading-none tracking-[-0.085em]"
          >
            layoutory.
          </Link>

          <div className="flex items-center gap-6 md:gap-10">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[11px] text-black/60 transition-colors hover:text-black"
            >
              <ArrowLeft size={15} />
              All work
            </Link>

            <Link
              href="/pricing"
              className="hidden text-[11px] text-black/60 transition-colors hover:text-black md:inline"
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
              <ArrowUpRight size={16} />
            </a>
          </div>
        </nav>
      </header>

      {/* 01 — HERO */}
      <section className="bg-[#F1F0EA]">
        <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-12 md:px-12 md:pb-36 md:pt-20 xl:px-20">
          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-black/25 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Selected work / 002
            </span>
            <span className="text-[10px] uppercase tracking-[0.13em] text-black/45">
              Construction / Digital Experience
            </span>
          </div>

          <div className="grid grid-cols-1 gap-14 pb-20 pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-32">
            <div className="lg:col-span-10">
              <h1 className="text-[clamp(3.8rem,10.5vw,12.5rem)] font-medium leading-[0.89] tracking-[-0.1em]">
                Slick
                <br />
                <span
                  className={`${serif.className} font-normal italic tracking-[-0.065em]`}
                >
                  Construction.
                </span>
              </h1>
            </div>

            <div className="flex flex-col justify-end lg:col-span-2">
              <span className="mb-5 h-[7px] w-[7px] bg-[#171717]" />

              <p className="max-w-[300px] text-[13px] leading-[1.9] text-black/55">
                An editorial look at the digital
                presentation and website design
                for Slick Construction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 border-t border-black/20 pt-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5">
              <span className="mb-5 block text-[10px] uppercase tracking-[0.15em] text-black/40">
                The project
              </span>

              <p className="max-w-[440px] text-[15px] leading-[1.85] text-black/70">
                A digital experience centered on
                clear presentation, thoughtful
                structure, and an identity suited
                to the construction industry.
              </p>
            </div>

            <div className="md:col-span-3">
              <span className="mb-5 block text-[10px] uppercase tracking-[0.15em] text-black/40">
                Focus areas
              </span>

              <p className="text-[13px] leading-[1.9] text-black/70">
                Website presentation
                <br />
                Visual hierarchy
                <br />
                Interface design
                <br />
                Responsive experience
              </p>
            </div>

            <div className="md:col-span-4 md:text-right">
              <span className="mb-5 block text-[10px] uppercase tracking-[0.15em] text-black/40">
                Client
              </span>

              <span className="text-[clamp(1.4rem,2vw,2rem)] font-medium tracking-[-0.055em]">
                Nick Coleman
              </span>

              <p className="mt-3 text-[12px] text-black/45">
                Slick Construction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — ARCHITECTURAL PROJECT COVER */}
      <section className="bg-[#191B19] text-[#F1F0EA]">
        <div className="relative flex aspect-[4/3] min-h-[440px] flex-col justify-between overflow-hidden px-6 py-8 sm:aspect-[16/10] md:px-12 md:py-12 lg:aspect-[16/9] lg:px-20">
          <ArchitecturalDrawing />

          <div className="relative z-10 flex items-center justify-between gap-5 border-b border-white/20 pb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
              Slick Construction
            </span>

            <span className="text-[10px] uppercase tracking-[0.13em] text-white/45">
              Project 002
            </span>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-16 text-center">
            <span className="mb-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[#D6FF70]">
              Built with intention
            </span>

            <span className="text-[clamp(4rem,14vw,15rem)] font-extrabold leading-[0.8] tracking-[-0.12em]">
              SLICK
            </span>

            <span
              className={`${serif.className} mt-6 text-[clamp(3rem,8.5vw,9.5rem)] italic leading-none tracking-[-0.07em] text-[#D6FF70]`}
            >
              Construction.
            </span>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-5 border-t border-white/20 pt-6">
            <span className="text-[10px] uppercase tracking-[0.13em] text-white/45">
              Digital experience
            </span>
            <span className="text-[10px] uppercase tracking-[0.13em] text-white/45">
              Layoutory®
            </span>
          </div>
        </div>
      </section>

      {/* PROJECT FACTS */}
      <div className="bg-[#171717] text-[#F1F0EA]">
        <div className="mx-auto grid max-w-[1800px] grid-cols-2 gap-10 px-6 py-10 md:grid-cols-4 md:px-12 md:py-14 xl:px-20">
          {[
            ["Client", "Slick Construction"],
            ["Contact", "Nick Coleman"],
            ["Industry", "Construction"],
            ["Project", "Website experience"],
          ].map(([label, value]) => (
            <div key={label}>
              <span className="mb-4 block text-[10px] uppercase tracking-[0.14em] text-white/40">
                {label}
              </span>

              <span className="text-[13px] font-medium leading-[1.7]">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 03 — THE PERSPECTIVE */}
      <section className="bg-[#F1F0EA]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <SectionLabel number="01" title="The perspective" />

          <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(3.2rem,7.4vw,9rem)] font-medium leading-[1.03] tracking-[-0.085em]">
                Built on
                <br />
                reputation.
                <br />
                <span
                  className={`${serif.className} font-normal italic text-black/45`}
                >
                  Presented with
                  <br />
                  intention.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-4">
              <span className="mb-8 h-px w-14 bg-black/40" />

              <p className="max-w-[430px] text-[15px] leading-[1.95] text-black/60">
                In the construction industry,
                prospective customers often want
                to understand a company's work
                and capabilities before starting
                a conversation.
              </p>

              <p className="mt-7 max-w-[430px] text-[15px] leading-[1.95] text-black/60">
                For Slick Construction, the design
                direction explores how a clear
                visual identity, considered page
                hierarchy, and straightforward
                navigation can support that
                first impression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — BEFORE / AFTER */}
      <section className="bg-[#E5E3DC]">
        <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-12 md:py-36 xl:px-20">
          <SectionLabel number="02" title="The transformation" />

          <div className="grid grid-cols-1 gap-12 pb-16 pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(3rem,6.5vw,8rem)] font-medium leading-[1.04] tracking-[-0.08em]">
                Two versions.
                <br />
                <span
                  className={`${serif.className} font-normal italic`}
                >
                  One direction forward.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="max-w-[380px] text-[14px] leading-[1.9] text-black/55">
                A side-by-side look at the
                website before and after
                the redesign.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
            <div>
              <div className="mb-7 flex items-center justify-between gap-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                  01 / Before
                </span>
                <span className="text-[10px] text-black/45">
                  Previous website
                </span>
              </div>

              <WebsiteFrame
                type="before"
                image={ASSETS.before}
                available={HAS_BEFORE_IMAGE}
              />

              <p className="mt-6 max-w-[430px] text-[13px] leading-[1.9] text-black/55">
                The earlier website presentation,
                serving as a reference for
                the design comparison.
              </p>
            </div>

            <div>
              <div className="mb-7 flex items-center justify-between gap-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                  02 / After
                </span>
                <span className="text-[10px] text-black/45">
                  Redesigned experience
                </span>
              </div>

              <WebsiteFrame
                type="after"
                image={ASSETS.after}
                available={HAS_AFTER_IMAGE}
              />

              <p className="mt-6 max-w-[430px] text-[13px] leading-[1.9] text-black/55">
                The updated website presentation,
                showcasing the proposed visual
                hierarchy and layout direction.
              </p>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-10 border-t border-black/20 pt-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                The design objective
              </span>
            </div>

            <div className="md:col-span-8">
              <p className="text-[clamp(2rem,4.1vw,5rem)] font-medium leading-[1.19] tracking-[-0.065em]">
                A digital presence that feels
                considered.
                <span className="text-black/35">
                  {" "}Clearer communication.
                  Stronger presentation.
                  Less unnecessary friction.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — DESIGN PRINCIPLES */}
      <section className="bg-[#101010] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <SectionLabel
            number="03"
            title="Design principles"
            light
          />

          <div className="grid grid-cols-1 gap-12 pb-24 pt-20 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(3.3rem,8vw,9rem)] font-medium leading-[1.02] tracking-[-0.085em]">
                The details
                <br />
                <span
                  className={`${serif.className} font-normal italic text-[#D6FF70]`}
                >
                  make the difference.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-3">
              <p className="max-w-[320px] text-[14px] leading-[1.9] text-white/50">
                Four principles behind the
                creative direction and
                website experience.
              </p>
            </div>
          </div>

          <div className="border-t border-white/20">
            {principles.map((item) => (
              <div
                key={item.number}
                className="grid grid-cols-1 gap-8 border-b border-white/20 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
              >
                <div className="lg:col-span-2">
                  <span className="text-[11px] text-[#D6FF70]">
                    / {item.number}
                  </span>

                  <span className="mt-3 block text-[10px] uppercase tracking-[0.14em] text-white/35">
                    {item.label}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="text-[clamp(2.2rem,3.7vw,4.6rem)] font-medium leading-[1.1] tracking-[-0.065em]">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-col justify-end lg:col-span-4">
                  <p className="max-w-[390px] text-[14px] leading-[1.9] text-white/50">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — DIGITAL EXPERIENCE */}
      <section className="bg-[#F1F0EA]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <SectionLabel number="04" title="The digital experience" />

          <div className="grid grid-cols-1 gap-12 pb-20 pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(3rem,6.6vw,8rem)] font-medium leading-[1.04] tracking-[-0.085em]">
                A stronger
                <br />
                <span
                  className={`${serif.className} font-normal italic`}
                >
                  digital foundation.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="max-w-[370px] text-[14px] leading-[1.9] text-black/55">
                Design choices that support
                a cohesive experience, from
                the first impression through
                to the next conversation.
              </p>
            </div>
          </div>

          {/* WIDE FINISHED WEBSITE PRESENTATION */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#222522] sm:aspect-[16/10] lg:aspect-[16/9]">
            {HAS_AFTER_IMAGE ? (
              <Image
                src={ASSETS.after}
                alt="Slick Construction redesigned website presentation"
                fill
                sizes="100vw"
                className="object-contain"
              />
            ) : (
              <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center text-[#F1F0EA]">
                <ArchitecturalDrawing />

                <div className="relative z-10 px-5">
                  <span className="mb-7 block text-[10px] uppercase tracking-[0.22em] text-[#D6FF70]">
                    Digital presentation
                  </span>

                  <span className="block text-[clamp(3.2rem,9vw,10rem)] font-semibold leading-[0.92] tracking-[-0.1em]">
                    SLICK
                  </span>

                  <span
                    className={`${serif.className} mt-4 block text-[clamp(2.5rem,6vw,7rem)] italic text-[#D6FF70]`}
                  >
                    Construction.
                  </span>

                  <p className="mt-10 text-[10px] uppercase tracking-[0.15em] text-white/45">
                    Final website image pending
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/20 pt-8 md:grid-cols-3">
            {[
              ["01", "Clear navigation"],
              ["02", "Considered presentation"],
              ["03", "Responsive layouts"],
            ].map(([number, title]) => (
              <div key={number} className="flex items-center gap-4">
                <span className="text-[11px] text-black/35">
                  / {number}
                </span>

                <span className="text-[13px] font-medium">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — CLIENT PERSPECTIVE */}
      <section className="bg-[#171717] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-12 md:py-36 xl:px-20">
          <SectionLabel
            number="05"
            title="Client perspective"
            light
          />

          <div className="grid grid-cols-1 gap-16 pt-20 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <span className="mb-10 block text-[10px] uppercase tracking-[0.15em] text-white/40">
                A perspective from the client
              </span>

              <h2 className="text-[clamp(3.2rem,6.5vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.08em]">
                Beyond
                <br />
                <span
                  className={`${serif.className} font-normal italic text-[#D6FF70]`}
                >
                  the screen.
                </span>
              </h2>

              <p className="mt-10 max-w-[450px] text-[15px] leading-[1.95] text-white/55">
                Good collaborations are about
                more than the finished website.
                This space is reserved for a
                firsthand perspective on the
                project from Nick Coleman.
              </p>

              <div className="mt-16 border-t border-white/20 pt-7">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-white/40">
                  Client
                </span>

                <p className="mt-4 text-[clamp(1.6rem,2.5vw,2.7rem)] font-medium tracking-[-0.055em]">
                  Nick Coleman
                </p>

                <p className="mt-3 text-[12px] text-white/45">
                  Slick Construction
                </p>
              </div>
            </div>

            {/* PORTRAIT CLIENT VIDEO */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-[600px] overflow-hidden border border-white/15 bg-[#242522]">
                <div className="flex items-center justify-between border-b border-white/15 px-6 py-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                    Client film / 002
                  </span>

                  <span className="text-[10px] text-white/40">
                    Nick Coleman
                  </span>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden bg-[#242522]">
                  {HAS_CLIENT_VIDEO ? (
                    <video
                      src={ASSETS.video}
                      controls
                      preload="metadata"
                      playsInline
                      className="h-full w-full object-contain"
                      aria-label="Nick Coleman client review video"
                    >
                      Your browser does not support HTML video.
                    </video>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                      <div className="mb-10 flex h-20 w-20 items-center justify-center border border-white/25 text-[#D6FF70]">
                        <Play
                          size={28}
                          strokeWidth={1.2}
                        />
                      </div>

                      <h3 className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[1.05] tracking-[-0.075em]">
                        A word
                        <br />
                        <span
                          className={`${serif.className} font-normal italic text-[#D6FF70]`}
                        >
                          from Nick.
                        </span>
                      </h3>

                      <span className="mt-9 text-[10px] uppercase tracking-[0.17em] text-white/40">
                        Video coming soon
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-5 border-t border-white/15 px-6 py-5">
                  <span className="text-[10px] uppercase tracking-[0.13em] text-white/50">
                    Slick Construction
                  </span>

                  <span className="h-[6px] w-[6px] bg-[#D6FF70]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — CLOSING STATEMENT */}
      <section className="bg-[#E5E3DC]">
        <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40 xl:px-20">
          <div className="md:col-span-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              The final perspective
            </span>
          </div>

          <div className="md:col-span-8">
            <p className="text-[clamp(2.2rem,4.8vw,5.8rem)] font-medium leading-[1.15] tracking-[-0.07em]">
              Design isn't only about how
              something looks.
              <span className="text-black/35">
                {" "}It's about how clearly
                it communicates, how naturally
                it works, and how well it
                serves its purpose.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 09 — FINAL CTA */}
      <section className="bg-[#101010] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <SectionLabel
            number="06"
            title="What's next"
            light
          />

          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(3.5rem,8.5vw,10rem)] font-medium leading-[0.97] tracking-[-0.09em]">
                Build
                <br />
                <span
                  className={`${serif.className} font-normal italic text-[#D6FF70]`}
                >
                  something better.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-3">
              <p className="mb-10 max-w-[340px] text-[14px] leading-[1.9] text-white/50">
                A distinctive website.
                A more considered digital
                experience. Let's explore
                what makes sense for
                your business.
              </p>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border-b border-white/50 pb-5 text-[16px] font-medium transition-colors hover:border-[#D6FF70] hover:text-[#D6FF70]"
              >
                Start a project

                <MoveUpRight
                  size={24}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          <div className="mt-28 grid grid-cols-1 gap-8 border-t border-white/20 pt-8 md:grid-cols-2">
            <Link
              href="/work"
              className="group flex items-center gap-4 text-[12px] text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
              />
              Back to selected work
            </Link>

            <Link
              href="/pivotal-builders-case-study"
              className="group flex items-center justify-between gap-5 text-[12px] text-white/60 transition-colors hover:text-white md:justify-end"
            >
              View Pivotal Builders

              <ArrowRight
                size={18}
                className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
