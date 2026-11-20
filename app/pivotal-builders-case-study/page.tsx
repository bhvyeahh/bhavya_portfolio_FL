
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Check,
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
  title: "Pivotal Builders — Case Study | Layoutory",
  description:
    "A closer look at the website design and development project for Pivotal Builders Inc., including its digital presentation, project structure, and inquiry experience.",
};

const BOOKING_URL =
  "https://calendly.com/bhavyarathore575/30min";

const LIVE_URL = "https://pivotalbuildersinc.com";

const phases = [
  {
    number: "01",
    title: "Understanding the business",
    description:
      "The project began with understanding the contractor's services, intended audience, and priorities for a more structured website experience.",
  },
  {
    number: "02",
    title: "Planning the experience",
    description:
      "A five-page website structure provided the foundation for presenting services, guiding visitors through the business, and making contact information accessible.",
  },
  {
    number: "03",
    title: "Designing the interface",
    description:
      "The visual direction focused on confident typography, clear content hierarchy, and a digital presentation suited to a construction business.",
  },
  {
    number: "04",
    title: "Developing the website",
    description:
      "Responsive page layouts, interactions, and the inquiry experience were brought together into a functional website for desktop and mobile visitors.",
  },
  {
    number: "05",
    title: "Reviewing and launching",
    description:
      "The final phase covered project review, refinements, functional checks, and preparing the finished experience for launch and handover.",
  },
];

const decisions = [
  {
    number: "01",
    title: "A clearer introduction.",
    description:
      "Give visitors an immediate understanding of the business and make its services easier to discover.",
  },
  {
    number: "02",
    title: "Work worth showing.",
    description:
      "Create space for project imagery and service information, helping potential customers assess the company's work.",
  },
  {
    number: "03",
    title: "An easier next step.",
    description:
      "Introduce a more structured inquiry experience so prospective customers can communicate what they need.",
  },
  {
    number: "04",
    title: "Designed for every screen.",
    description:
      "Build a responsive interface that remains readable, usable, and visually consistent across device sizes.",
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
        light
          ? "border-white/25"
          : "border-black/25"
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
        Layoutory — Case Study
      </span>
    </div>
  );
}

export default function PivotalBuildersCaseStudy() {
  return (
    <main
      className={`${manrope.className} min-h-screen overflow-x-clip bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >
      {/* NAVIGATION */}
      <header className="bg-[#101010] text-[#F1F0EC]">
        <nav
          aria-label="Case study navigation"
          className="mx-auto flex h-[88px] max-w-[1800px] items-center justify-between gap-5 border-b border-white/15 px-6 md:h-[100px] md:px-12 xl:px-20"
        >
          <Link
            href="/"
            aria-label="Layoutory homepage"
            className="text-[26px] font-extrabold leading-none tracking-[-0.085em]"
          >
            layoutory<span className="text-[#D6FF70]">.</span>
          </Link>

          <div className="flex items-center gap-6 md:gap-10">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[11px] text-white/65 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} />
              All work
            </Link>

            <Link
              href="/pricing"
              className="hidden text-[11px] text-white/65 transition-colors hover:text-white md:inline"
            >
              Investment
            </Link>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-[#D6FF70] pb-2 text-[11px] font-semibold"
            >
              Start a project
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
              />
            </a>
          </div>
        </nav>
      </header>

      {/* 01 — HERO */}
      <section className="bg-[#101010] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-12 md:px-12 md:pb-36 md:pt-20 xl:px-20">
          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/25 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Selected work / 001
            </span>
            <span className="text-[10px] uppercase tracking-[0.13em] text-white/40">
              Construction & Remodeling
            </span>
          </div>

          <div className="grid grid-cols-1 gap-14 pb-20 pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-32">
            <div className="lg:col-span-10">
              <h1 className="text-[clamp(3.5rem,10vw,12rem)] font-medium leading-[0.92] tracking-[-0.095em]">
                Pivotal
                <br />
                <span
                  className={`${serif.className} font-normal italic tracking-[-0.065em] text-[#D6FF70]`}
                >
                  Builders.
                </span>
              </h1>
            </div>

            <div className="flex flex-col justify-end lg:col-span-2">
              <span className="mb-5 h-[7px] w-[7px] bg-[#D6FF70]" />
              <p className="max-w-[300px] text-[13px] leading-[1.9] text-white/55">
                A considered digital experience
                for a construction and remodeling business.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 border-t border-white/20 pt-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5">
              <span className="mb-5 block text-[10px] uppercase tracking-[0.15em] text-white/40">
                The project
              </span>
              <p className="max-w-[430px] text-[15px] leading-[1.85] text-white/75">
                Reimagining how Pivotal Builders
                presents its work, communicates
                its services, and connects with
                prospective customers online.
              </p>
            </div>

            <div className="md:col-span-3">
              <span className="mb-5 block text-[10px] uppercase tracking-[0.15em] text-white/40">
                Scope
              </span>
              <p className="text-[13px] leading-[1.9] text-white/75">
                Website strategy
                <br />
                UI / UX design
                <br />
                Web development
                <br />
                Inquiry experience
              </p>
            </div>

            <div className="md:col-span-4 md:text-right">
              <span className="mb-5 block text-[10px] uppercase tracking-[0.15em] text-white/40">
                Explore the result
              </span>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 border-b border-white/50 pb-3 text-[17px] font-medium tracking-[-0.04em] hover:border-[#D6FF70] hover:text-[#D6FF70]"
              >
                Visit live website
                <ArrowUpRight
                  size={21}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — FULL-WIDTH PROJECT IMAGE */}
      <section className="bg-[#D5D3CD]">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[16/9]">
          <Image
            src="/mockup-pivotal.jpeg"
            alt="Pivotal Builders website project mockup"
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </section>

      {/* PROJECT INDEX */}
      <div className="bg-[#171717] text-[#F1F0EC]">
        <div className="mx-auto grid max-w-[1800px] grid-cols-2 gap-10 px-6 py-10 md:grid-cols-4 md:px-12 md:py-14 xl:px-20">
          {[
            ["Client", "Pivotal Builders Inc."],
            ["Industry", "General Contracting"],
            ["Location", "United States"],
            ["Project", "Five-page website"],
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

      {/* 03 — THE BRIEF */}
      <section className="bg-[#F1F0EA]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <SectionLabel number="01" title="The brief" />

          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(3.2rem,7.5vw,9rem)] font-medium leading-[1.02] tracking-[-0.085em]">
                The work was
                <br />
                already good.
                <br />
                <span
                  className={`${serif.className} font-normal italic text-black/45`}
                >
                  The website had
                  <br />
                  to catch up.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-4">
              <span className="mb-7 h-px w-14 bg-black/40" />

              <p className="max-w-[440px] text-[15px] leading-[1.95] text-black/60">
                For a construction company, a website
                is often one of the first places a
                prospective customer looks before
                making contact.
              </p>

              <p className="mt-7 max-w-[440px] text-[15px] leading-[1.95] text-black/60">
                The project focused on bringing
                Pivotal Builders' online presentation
                closer to the standard of professionalism
                it wanted to communicate, while making
                service information and inquiries
                easier to navigate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — BEFORE / AFTER */}
      <section className="bg-[#E5E3DC]">
        <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-12 md:py-36 xl:px-20">
          <SectionLabel number="02" title="The transformation" />

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
            {/* BEFORE */}
            <div>
              <div className="mb-7 flex items-center justify-between gap-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                  01 / Before
                </span>
                <span className="text-[10px] text-black/45">
                  Previous website
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden border border-black/15 bg-[#D0CEC7]">
                <Image
                  src="/before-pivotal.png"
                  alt="Screenshot of the previous Pivotal Builders website"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>

              <p className="mt-6 max-w-[420px] text-[13px] leading-[1.9] text-black/55">
                The previous digital presentation,
                shown here as a reference point
                for the redesign.
              </p>
            </div>

            {/* AFTER */}
            <div>
              <div className="mb-7 flex items-center justify-between gap-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                  02 / After
                </span>
                <span className="text-[10px] text-black/45">
                  Redesigned website
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden border border-black/15 bg-[#BDBBB4]">
                <Image
                  src="/mockup-pivotal.jpeg"
                  alt="Redesigned Pivotal Builders website mockup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>

              <p className="mt-6 max-w-[420px] text-[13px] leading-[1.9] text-black/55">
                The new website presentation
                with updated visual hierarchy,
                page design, and a clearer route
                toward contacting the business.
              </p>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-10 border-t border-black/20 pt-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                The direction
              </span>
            </div>

            <div className="md:col-span-8">
              <p className="text-[clamp(2rem,4vw,5rem)] font-medium leading-[1.2] tracking-[-0.065em]">
                A more considered presence.
                <span className="text-black/35">
                  {" "}Built around clarity,
                  credibility, and the people
                  on the other side of the screen.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — DESIGN DECISIONS */}
      <section className="bg-[#101010] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <SectionLabel
            number="03"
            title="Design decisions"
            light
          />

          <div className="grid grid-cols-1 gap-12 pb-20 pt-20 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(3.4rem,8vw,9rem)] font-medium leading-[0.99] tracking-[-0.085em]">
                Nothing
                <br />
                <span
                  className={`${serif.className} font-normal italic text-[#D6FF70]`}
                >
                  without reason.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-3">
              <p className="max-w-[330px] text-[14px] leading-[1.9] text-white/50">
                Four considerations guided
                the redesigned digital experience.
              </p>
            </div>
          </div>

          <div className="border-t border-white/20">
            {decisions.map((item) => (
              <div
                key={item.number}
                className="grid grid-cols-1 gap-8 border-b border-white/20 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
              >
                <div className="lg:col-span-1">
                  <span className="text-[11px] text-[#D6FF70]">
                    / {item.number}
                  </span>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="text-[clamp(2.2rem,4vw,4.8rem)] font-medium leading-[1.08] tracking-[-0.07em]">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-col justify-end lg:col-span-4">
                  <p className="max-w-[380px] text-[14px] leading-[1.9] text-white/50">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — EXECUTION */}
      <section className="bg-[#F1F0EA]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <SectionLabel number="04" title="The execution" />

          <div className="grid grid-cols-1 gap-16 pb-12 pt-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-12">
                <h2 className="text-[clamp(3.2rem,6vw,7rem)] font-medium leading-[1.05] tracking-[-0.08em]">
                  From brief
                  <br />
                  to
                  <span
                    className={`${serif.className} font-normal italic`}
                  >
                    {" "}built.
                  </span>
                </h2>

                <p className="mt-9 max-w-[360px] text-[14px] leading-[1.9] text-black/55">
                  The work behind the screen —
                  bringing structure, design,
                  development, and review together.
                </p>

                <div className="mt-12 hidden items-center gap-3 text-black/40 lg:flex">
                  <ArrowDown size={18} strokeWidth={1.3} />
                  <span className="text-[10px] uppercase tracking-[0.14em]">
                    Five project phases
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ol className="border-t border-black/25">
                {phases.map((phase) => (
                  <li
                    key={phase.number}
                    className="grid grid-cols-1 gap-7 border-b border-black/20 py-12 md:grid-cols-[70px_1fr] md:gap-8 md:py-16"
                  >
                    <span className="text-[11px] font-medium text-black/40">
                      / {phase.number}
                    </span>

                    <div>
                      <h3 className="text-[clamp(1.9rem,3.3vw,3.7rem)] font-medium leading-[1.15] tracking-[-0.06em]">
                        {phase.title}
                      </h3>

                      <p className="mt-7 max-w-[530px] text-[14px] leading-[1.95] text-black/55">
                        {phase.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — PROJECT VIDEO */}
      <section className="bg-[#171717] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-12 md:py-36 xl:px-20">
          <SectionLabel
            number="05"
            title="Client perspective"
            light
          />

          <div className="grid grid-cols-1 gap-14 pt-20 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <span className="mb-10 block text-[10px] uppercase tracking-[0.15em] text-white/40">
                Beyond the deliverable
              </span>

              <h2 className="text-[clamp(3.2rem,6.5vw,7.5rem)] font-medium leading-[1.03] tracking-[-0.08em]">
                In their
                <br />
                <span
                  className={`${serif.className} font-normal italic text-[#D6FF70]`}
                >
                  own words.
                </span>
              </h2>

              <p className="mt-10 max-w-[450px] text-[15px] leading-[1.95] text-white/55">
                A closer look at the collaboration
                through a client video from the
                Pivotal Builders project.
              </p>

              <div className="mt-16 border-t border-white/20 pt-7">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-white/40">
                  Featured client
                </span>

                <p className="mt-4 text-[22px] font-medium tracking-[-0.04em]">
                  Pivotal Builders Inc.
                </p>

                <p className="mt-3 text-[12px] text-white/45">
                  Construction & Remodeling
                </p>
              </div>
            </div>

            {/* PORTRAIT VIDEO IN AN EDITORIAL FRAME */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-[600px] overflow-hidden border border-white/15 bg-[#242522]">
                <div className="flex items-center justify-between border-b border-white/15 px-5 py-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                    Client film / 001
                  </span>

                  <span className="text-[10px] text-white/40">
                    Pivotal Builders
                  </span>
                </div>

                <div className="relative aspect-[4/5] bg-[#242522]">
                  <video
                    src="/testimonial.mp4"
                    controls
                    preload="metadata"
                    playsInline
                    className="h-full w-full object-contain"
                    aria-label="Pivotal Builders client testimonial video"
                  >
                    Your browser does not support HTML video.
                  </video>
                </div>

                <div className="flex items-center justify-between gap-5 border-t border-white/15 px-5 py-5">
                  <span className="text-[10px] uppercase tracking-[0.13em] text-white/50">
                    Project perspective
                  </span>

                  <span className="h-[6px] w-[6px] bg-[#D6FF70]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — FINISHED EXPERIENCE */}
      <section className="bg-[#E5E3DC]">
        <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-12 md:py-36 xl:px-20">
          <SectionLabel number="06" title="The finished experience" />

          <div className="grid grid-cols-1 gap-14 pb-16 pt-20 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(3.2rem,7vw,8rem)] font-medium leading-[1.02] tracking-[-0.085em]">
                Built for
                <br />
                <span
                  className={`${serif.className} font-normal italic`}
                >
                  real people.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-3">
              <p className="text-[14px] leading-[1.9] text-black/55">
                A more structured digital
                presence for customers exploring
                Pivotal Builders and the services
                it provides.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-[#C7C6C0] sm:aspect-[16/10]">
            <Image
              src="/mockup-pivotal.jpeg"
              alt="Final Pivotal Builders website design presentation"
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-contain"
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-black/25 pt-7">
            <div className="flex items-center gap-3">
              <Check size={18} strokeWidth={1.5} />
              <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
                Website completed
              </span>
            </div>

            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border-b border-black/50 pb-2 text-[12px] font-semibold hover:text-black/60"
            >
              Explore live website
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>

      {/* 09 — NEXT PROJECT / CTA */}
      <section className="bg-[#101010] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <SectionLabel
            number="07"
            title="What's next"
            light
          />

          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(3.5rem,8.7vw,10rem)] font-medium leading-[0.97] tracking-[-0.09em]">
                Your business.
                <br />
                <span
                  className={`${serif.className} font-normal italic text-[#D6FF70]`}
                >
                  Our next story?
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-3">
              <p className="mb-10 max-w-[340px] text-[14px] leading-[1.9] text-white/50">
                Have a website or digital
                experience in mind? Let's
                talk about what's possible
                for your business.
              </p>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border-b border-white/50 pb-5 text-[16px] font-medium hover:border-[#D6FF70] hover:text-[#D6FF70]"
              >
                Discuss your project
                <ArrowUpRight
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
              className="group flex items-center gap-4 text-[12px] text-white/60 hover:text-white"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
              />
              Back to selected work
            </Link>

            <Link
              href="/pricing"
              className="group flex items-center justify-between gap-5 text-[12px] text-white/60 hover:text-white md:justify-end"
            >
              Explore the investment
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
