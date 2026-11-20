
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import {
  Manrope,
  Instrument_Serif,
} from "next/font/google";

import Pricing from "../components/Pricing";
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

const BOOKING_URL =
  "https://calendly.com/bhavyarathore575/30min";

const EMAIL = "bhavyarathore575@gmail.com";

export const metadata: Metadata = {
  title: "Pricing & Investment | Layoutory",
  description:
    "Explore custom website design and business automation services from Layoutory. Website projects start at $2,000, with optional ongoing care.",
};

export default function PricingPage() {
  return (
    <main
      className={`${manrope.className} min-h-screen overflow-x-clip bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >
      {/* NAVIGATION */}
      <header className="relative z-20 bg-[#F1F0EA]">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[88px] max-w-[1800px] items-center justify-between gap-5 border-b border-black/20 px-6 md:h-[100px] md:px-12 xl:px-20"
        >
          <Link
            href="/"
            aria-label="Layoutory homepage"
            className="shrink-0 text-[26px] font-extrabold leading-none tracking-[-0.085em]"
          >
            layoutory.
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            <Link
              href="/"
              className="text-[11px] font-medium text-black/55 transition-colors hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/work"
              className="text-[11px] font-medium text-black/55 transition-colors hover:text-black"
            >
              Selected work
            </Link>

            <Link
              href="/#expertise"
              className="text-[11px] font-medium text-black/55 transition-colors hover:text-black"
            >
              Expertise
            </Link>

            <Link
              href="/pricing"
              aria-current="page"
              className="border-b border-black pb-1 text-[11px] font-semibold"
            >
              Investment
            </Link>
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-3 border-b border-black/60 text-[11px] font-semibold transition-colors hover:text-black/55"
          >
            Start a project
            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
            />
          </a>
        </nav>
      </header>

      {/* INTRODUCTORY EDITORIAL STRIP */}
      <section
        aria-labelledby="pricing-page-title"
        className="bg-[#F1F0EA]"
      >
        <div className="mx-auto max-w-[1800px] px-6 pb-16 pt-12 md:px-12 md:pb-20 md:pt-20 xl:px-20">
          <div className="flex items-center justify-between gap-5 border-t border-black/25 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
              Layoutory / Investment
            </span>

            <span className="text-[10px] uppercase tracking-[0.14em] text-black/45">
              A clear place to begin
            </span>
          </div>

          <div className="grid grid-cols-1 gap-12 pb-16 pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-28">
            <div className="lg:col-span-9">
              <h1
                id="pricing-page-title"
                className="text-[clamp(3.8rem,10vw,12rem)] font-medium leading-[0.94] tracking-[-0.09em]"
              >
                Your next
                <br />

                <span
                  className={`${serif.className} font-normal italic tracking-[-0.065em]`}
                >
                  big move.
                </span>
              </h1>
            </div>

            <div className="flex flex-col justify-end lg:col-span-3">
              <span className="mb-6 h-[7px] w-[7px] bg-[#171717]" />

              <p className="max-w-[320px] text-[14px] leading-[1.9] text-black/55 md:text-[15px]">
                Great digital work starts with
                a clear understanding of what
                you're building, why it matters,
                and what it takes to get there.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 border-t border-black/20 pt-7 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                Two ways to begin
              </span>
            </div>

            <div className="flex flex-col justify-between gap-7 md:col-span-8 md:flex-row md:items-end">
              <p className="max-w-[530px] text-[14px] leading-[1.9] text-black/55">
                A distinctive website on its own,
                or a website connected to the systems
                that support your business. Choose
                the direction that fits your needs.
              </p>

              <a
                href="#investment"
                className="group inline-flex min-h-11 shrink-0 items-center gap-3 self-start text-[11px] font-semibold uppercase tracking-[0.1em] hover:text-black/55"
              >
                Explore the options
                <ArrowDown
                  size={17}
                  className="transition-transform duration-300 motion-safe:group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SHARED PRICING COMPONENT */}
      <Pricing />

      {/* PROJECT FIT / TRANSPARENCY */}
      <section className="bg-[#E5E3DC]">
        <div className="mx-auto max-w-[1800px] px-6 py-24 md:px-12 md:py-36 xl:px-20">
          <div className="flex items-center justify-between gap-5 border-t border-black/25 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              A considered collaboration
            </span>

            <span className="text-[10px] uppercase tracking-[0.12em] text-black/40">
              Beyond the proposal
            </span>
          </div>

          <div className="grid grid-cols-1 gap-14 pb-20 pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(3rem,6.8vw,8rem)] font-medium leading-[1.03] tracking-[-0.085em]">
                The right fit
                <br />

                <span
                  className={`${serif.className} font-normal italic tracking-[-0.06em]`}
                >
                  matters.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="max-w-[390px] text-[15px] leading-[1.95] text-black/55">
                We're best suited to businesses
                that value their reputation, care
                about the details, and want a
                digital experience tailored to
                their actual needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 border-t border-black/20 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Built around you.",
                description:
                  "Your business, customers, and priorities shape the project scope and creative direction.",
              },
              {
                number: "02",
                title: "Clear from day one.",
                description:
                  "You'll know the proposed deliverables, timeline, and investment before work begins.",
              },
              {
                number: "03",
                title: "Made for real use.",
                description:
                  "We prioritize functionality, usability, and integrations that make sense for the business.",
              },
            ].map((item, index) => (
              <div
                key={item.number}
                className={`border-b border-black/20 py-10 md:border-b-0 md:py-12 ${
                  index > 0
                    ? "md:border-l md:pl-9"
                    : "md:pr-9"
                } ${
                  index === 1 ? "md:pr-9" : ""
                }`}
              >
                <span className="text-[11px] text-black/40">
                  / {item.number}
                </span>

                <h3 className="mt-10 text-[clamp(1.8rem,2.5vw,3rem)] font-medium tracking-[-0.06em]">
                  {item.title}
                </h3>

                <p className="mt-6 max-w-[350px] text-[13px] leading-[1.95] text-black/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CONVERSION AREA */}
      <section className="bg-[#101010] text-[#F1F0EC]">
        <div className="mx-auto max-w-[1800px] px-6 py-28 md:px-12 md:py-40 xl:px-20">
          <div className="flex items-center justify-between gap-5 border-t border-white/25 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Let's start a conversation
            </span>

            <span className="text-[10px] uppercase tracking-[0.12em] text-white/40">
              The next chapter
            </span>
          </div>

          <div className="grid grid-cols-1 gap-14 pb-20 pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-9">
              <h2 className="text-[clamp(3.4rem,8.8vw,10rem)] font-medium leading-[0.97] tracking-[-0.09em]">
                Worth doing.
                <br />

                <span
                  className={`${serif.className} font-normal italic tracking-[-0.06em] text-[#D6FF70]`}
                >
                  Worth doing right.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end lg:col-span-3">
              <p className="max-w-[350px] text-[14px] leading-[1.9] text-white/55">
                Tell us where your business
                stands today and where you'd
                like to take it. We'll explore
                the right direction together.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 border-t border-white/20 lg:grid-cols-12">
            <div className="border-b border-white/20 py-10 lg:col-span-8 lg:border-b-0 lg:border-r lg:py-14 lg:pr-12">
              <span className="mb-7 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                01 / Book a conversation
              </span>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6"
              >
                <span className="text-[clamp(2rem,4vw,4.8rem)] font-medium leading-[1.12] tracking-[-0.07em] transition-colors hover:text-[#D6FF70]">
                  Discuss your project
                </span>

                <ArrowUpRight
                  size={30}
                  strokeWidth={1.3}
                  className="shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="py-10 lg:col-span-4 lg:py-14 lg:pl-12">
              <span className="mb-7 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                02 / Prefer email?
              </span>

              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Layoutory project inquiry")}`}
                className="group inline-flex items-center gap-4 border-b border-white/40 pb-3 text-[clamp(1.6rem,2.8vw,3rem)] font-medium tracking-[-0.06em] hover:border-[#D6FF70] hover:text-[#D6FF70]"
              >
                Write to us
                <ArrowUpRight
                  size={25}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/20 pt-7">
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 text-[12px] text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
              />
              Explore selected work
            </Link>

            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-[12px] text-white/55 transition-colors hover:text-white"
            >
              Return home
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
