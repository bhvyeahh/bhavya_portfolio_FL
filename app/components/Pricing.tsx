
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MoveUpRight,
  Plus,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Activity,
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

const BOOKING_URL =
  "https://calendly.com/bhavyarathore575/30min";

type OfferKey = "website" | "automation";

const offers = {
  website: {
    index: "01",
    name: "Website Only",
    headline: "A better first",
    accent: "impression.",
    price: 1200,
    description:
      "For businesses that are ready to look as professional online as they are in person. A distinctive website designed to build confidence, communicate your value, and turn interest into conversations.",
    ideal:
      "Established businesses looking for a stronger digital presence.",
    deliverables: [
      {
        title: "Digital direction",
        detail:
          "Discovery, website structure, visual direction, and messaging guidance.",
      },
      {
        title: "Custom website",
        detail:
          "Thoughtfully designed pages with responsive layouts and considered interactions.",
      },
      {
        title: "Service & project showcase",
        detail:
          "Clear service information, portfolio presentation, and credibility elements.",
      },
      {
        title: "Lead capture",
        detail:
          "Contact forms and inquiry experiences connected to your business email.",
      },
      {
        title: "Technical foundations",
        detail:
          "Performance considerations, accessibility, and essential on-page SEO setup.",
      },
      {
        title: "Launch & handover",
        detail:
          "Functional testing, deployment assistance, and a structured handover.",
      },
    ],
  },
  automation: {
    index: "02",
    name: "Website + Automation",
    headline: "A website that",
    accent: "works harder.",
    price: 1600,
    description:
      "For businesses that want more than an online presence. We combine a premium website with connected systems designed to organize inquiries, improve follow-ups, and take repetitive tasks off your plate.",
    ideal:
      "Service businesses handling regular inquiries, appointments, and customer communication.",
    deliverables: [
      {
        title: "Everything in Website Only",
        detail:
          "The same considered design, development, and technical foundation.",
      },
      {
        title: "Lead management",
        detail:
          "Structured inquiry capture with a connected CRM, spreadsheet, or suitable lead tool.",
      },
      {
        title: "Automated responses",
        detail:
          "Acknowledgement emails or notifications triggered by customer inquiries.",
      },
      {
        title: "Booking connections",
        detail:
          "Scheduling tools connected to your inquiry or consultation process.",
      },
      {
        title: "Workflow automation",
        detail:
          "Agreed follow-up steps, notifications, or repetitive administrative tasks.",
      },
      {
        title: "Testing & handover",
        detail:
          "Workflow testing, configuration guidance, and an explanation of how the system operates.",
      },
    ],
  },
} as const;

function SectionReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        element.animate(
          [
            {
              opacity: 0,
              transform: "translateY(24px)",
            },
            {
              opacity: 1,
              transform: "translateY(0)",
            },
          ],
          {
            duration: 850,
            easing: "cubic-bezier(.22,1,.36,1)",
          }
        );

        observer.unobserve(element);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}

export default function Pricing() {
  const [selected, setSelected] =
    useState<OfferKey>("website");

  const offer = offers[selected];

  return (
    <section
      id="investment"
      aria-labelledby="pricing-heading"
      className={`${manrope.className} relative isolate overflow-hidden bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >
      <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-24 md:px-12 md:pb-36 md:pt-32 xl:px-20 xl:pb-40 xl:pt-40">

        {/* SECTION IDENTIFIER */}
        <SectionReveal>
          <div className="flex items-center justify-between gap-5 border-t border-black/25 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
              07 / The investment
            </span>

            <span className="text-[10px] uppercase tracking-[0.14em] text-black/45">
              Built around your business
            </span>
          </div>
        </SectionReveal>

        {/* INTRODUCTION */}
        <div className="grid grid-cols-1 gap-12 pb-24 pt-20 md:pb-32 md:pt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <SectionReveal>
              <h2
                id="pricing-heading"
                className="text-[clamp(3.5rem,9vw,10.5rem)] font-semibold leading-[0.94] tracking-[-0.09em]"
              >
                An investment
                <br />

                <span
                  className={`${serif.className} font-normal italic tracking-[-0.065em]`}
                >
                  in what's next.
                </span>
              </h2>
            </SectionReveal>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <SectionReveal>
              <span className="mb-5 block h-[7px] w-[7px] bg-[#171717]" />

              <p className="max-w-[310px] text-[14px] leading-[1.9] text-black/55 md:text-[15px]">
                Considered design. Reliable
                development. Practical systems.
                Two straightforward ways to
                create a better digital presence.
              </p>
            </SectionReveal>
          </div>
        </div>

        {/* OFFER SELECTOR */}
        <SectionReveal>
          <div className="border-t border-black/25">
            <div className="flex flex-col justify-between gap-8 py-8 md:flex-row md:items-end">
              <div>
                <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
                  Choose your direction
                </span>

                <p className="max-w-[430px] text-[14px] leading-[1.8] text-black/60">
                  Start with a remarkable website,
                  or connect it to the everyday
                  systems behind your business.
                </p>
              </div>

              <div
                role="group"
                aria-label="Choose a project offering"
                className="grid grid-cols-2 gap-1 border border-black/20 p-1"
              >
                <button
                  type="button"
                  onClick={() => setSelected("website")}
                  aria-pressed={selected === "website"}
                  className={`min-h-12 px-4 py-3 text-[10px] font-semibold transition-colors duration-300 sm:px-6 sm:text-[11px] ${
                    selected === "website"
                      ? "bg-[#171717] text-[#F1F0EA]"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  Website Only
                </button>

                <button
                  type="button"
                  onClick={() => setSelected("automation")}
                  aria-pressed={selected === "automation"}
                  className={`min-h-12 px-4 py-3 text-[10px] font-semibold transition-colors duration-300 sm:px-6 sm:text-[11px] ${
                    selected === "automation"
                      ? "bg-[#171717] text-[#F1F0EA]"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  Website + Automation
                </button>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* MAIN INVESTMENT PRESENTATION */}
        <div
          key={selected}
          className="border-t border-black/25 motion-safe:animate-[pricingEntrance_.55s_cubic-bezier(.22,1,.36,1)_both]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">

            {/* LEFT: PROJECT VALUE */}
            <div className="flex flex-col justify-between border-b border-black/20 py-12 lg:col-span-7 lg:border-b-0 lg:py-20">
              <div>
                <div className="mb-12 flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center border border-black/25 text-[11px] tabular-nums">
                    {offer.index}
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
                    {offer.name}
                  </span>
                </div>

                <h3 className="max-w-[950px] text-[clamp(3.2rem,6vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.085em]">
                  {offer.headline}
                  <br />

                  <span
                    className={`${serif.className} font-normal italic tracking-[-0.055em]`}
                  >
                    {offer.accent}
                  </span>
                </h3>

                <p className="mt-10 max-w-[550px] text-[14px] leading-[1.95] text-black/60 md:mt-14 md:text-[16px]">
                  {offer.description}
                </p>
              </div>

              <div className="mt-16 max-w-[550px] border-t border-black/20 pt-6 md:mt-24">
                <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                  Best suited for
                </span>

                <p className="text-[13px] leading-[1.8] text-black/65">
                  {offer.ideal}
                </p>
              </div>
            </div>

            {/* RIGHT: PRICE & DELIVERABLES */}
            <div className="border-black/20 lg:col-span-5 lg:border-l lg:pl-12">
              <div className="py-12 lg:py-20">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
                  Starting project investment
                </span>

                <div className="mt-5 flex items-start gap-2">
                  <span className="text-[clamp(4.3rem,7vw,8.5rem)] font-medium leading-none tracking-[-0.095em] tabular-nums">
                    ${offer.price.toLocaleString("en-US")}
                  </span>

                  <Plus
                    size={22}
                    strokeWidth={1.6}
                    className="mt-3 shrink-0"
                  />
                </div>

                <p className="mt-4 max-w-[380px] text-[12px] leading-[1.8] text-black/50">
                  One-time project investment in USD.
                  Final pricing depends on scope,
                  features, and integrations.
                </p>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 flex min-h-16 items-center justify-between gap-6 bg-[#171717] px-6 py-5 text-[#F1F0EA] transition-colors duration-300 hover:bg-[#343434]"
                >
                  <span className="text-[13px] font-semibold tracking-[-0.015em]">
                    Discuss your project
                  </span>

                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                  />
                </a>

                <div className="mt-16 border-t border-black/20 pt-7">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
                    What your project can include
                  </span>

                  <div className="mt-8">
                    {offer.deliverables.map((item, index) => (
                      <div
                        key={item.title}
                        className="flex gap-4 border-b border-black/15 py-6 first:pt-0 last:border-b-0"
                      >
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center bg-[#171717] text-[#F1F0EA]">
                          <Check size={14} strokeWidth={1.8} />
                        </span>

                        <div>
                          <span className="block text-[13px] font-semibold tracking-[-0.025em]">
                            {item.title}
                          </span>

                          <p className="mt-2 max-w-[380px] text-[12px] leading-[1.85] text-black/50">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-6 text-[11px] leading-[1.8] text-black/45">
                  Exact deliverables and third-party
                  service costs are confirmed in
                  your project proposal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MONTHLY PARTNERSHIP */}
        <SectionReveal>
          <div className="mt-20 border-t border-black/25 pt-7 md:mt-32">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">

              {/* LEFT */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="h-[7px] w-[7px] bg-[#171717]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                    After the launch
                  </span>
                </div>

                <h3 className="mt-12 max-w-[760px] text-[clamp(2.8rem,5.8vw,7rem)] font-medium leading-[1.05] tracking-[-0.08em]">
                  Good work deserves
                  <br />

                  <span
                    className={`${serif.className} font-normal italic tracking-[-0.055em]`}
                  >
                    good care.
                  </span>
                </h3>

                <p className="mt-9 max-w-[520px] text-[14px] leading-[1.9] text-black/55 md:text-[15px]">
                  Launching your website is just the
                  beginning. For businesses that
                  prefer ongoing technical assistance,
                  we offer a straightforward monthly
                  care arrangement.
                </p>

                <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-3 lg:mt-20">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Maintenance",
                      text: "Routine technical checks and agreed maintenance tasks.",
                    },
                    {
                      icon: RefreshCw,
                      title: "Updates",
                      text: "Small content changes and website updates within the agreed allowance.",
                    },
                    {
                      icon: Headphones,
                      title: "Support",
                      text: "Help with website issues and questions within the agreed scope.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="border-t border-black/20 pt-6"
                      >
                        <Icon
                          size={23}
                          strokeWidth={1.3}
                          className="mb-7"
                        />

                        <h4 className="text-[13px] font-semibold">
                          {item.title}
                        </h4>

                        <p className="mt-3 text-[12px] leading-[1.85] text-black/50">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: MONTHLY PRICE */}
              <div className="lg:col-span-5">
                <div className="relative flex h-full min-h-[430px] flex-col justify-between overflow-hidden bg-[#171717] p-7 text-[#F1F0EA] md:p-10 lg:min-h-[570px]">

                  {/* Decorative vector circle */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 350 350"
                    className="pointer-events-none absolute -right-24 -top-24 w-[350px] opacity-[0.12]"
                    fill="none"
                  >
                    {[50, 85, 120, 155].map((radius) => (
                      <circle
                        key={radius}
                        cx="175"
                        cy="175"
                        r={radius}
                        stroke="#D6FF70"
                        strokeWidth="1"
                      />
                    ))}
                    <path
                      d="M20 175H330M175 20V330"
                      stroke="#D6FF70"
                      strokeWidth="1"
                    />
                  </svg>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                        Ongoing care
                      </span>

                      <Activity
                        size={18}
                        strokeWidth={1.3}
                        className="text-[#D6FF70]"
                      />
                    </div>

                    <div className="mt-16">
                      <span className="block text-[10px] uppercase tracking-[0.15em] text-white/40">
                        Monthly investment
                      </span>

                      <div className="mt-5 flex flex-wrap items-baseline gap-x-3">
                        <span className="text-[clamp(3.2rem,5.5vw,6rem)] font-medium leading-none tracking-[-0.09em] tabular-nums">
                          $59–89
                        </span>

                        <span className="text-[12px] text-white/40">
                          / month
                        </span>
                      </div>

                      <p className="mt-7 max-w-[330px] text-[13px] leading-[1.9] text-white/50">
                        The monthly rate depends on
                        your website, support needs,
                        and the maintenance scope
                        agreed for your project.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-16">
                    <div className="mb-7 flex items-center gap-3 border-t border-white/20 pt-6">
                      <span className="h-[6px] w-[6px] bg-[#D6FF70]" />

                      <span className="text-[10px] uppercase tracking-[0.12em] text-white/45">
                        Practical ongoing support
                      </span>
                    </div>

                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-5 border-b border-white/50 pb-5 transition-colors hover:border-[#D6FF70] hover:text-[#D6FF70]"
                    >
                      <span className="text-[clamp(1.3rem,2vw,2.1rem)] font-medium tracking-[-0.055em]">
                        Ask about monthly care
                      </span>

                      <ArrowUpRight
                        size={24}
                        strokeWidth={1.3}
                        className="shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* TRANSPARENCY */}
        <div className="mt-24 grid grid-cols-1 gap-10 border-t border-black/25 pt-8 md:mt-36 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              A few things worth knowing
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-8">
            <div>
              <span className="text-[12px] font-semibold">
                Clear project scope.
              </span>

              <p className="mt-3 max-w-[320px] text-[13px] leading-[1.85] text-black/50">
                Every engagement starts with a
                proposal outlining the deliverables,
                cost, and agreed schedule.
              </p>
            </div>

            <div>
              <span className="text-[12px] font-semibold">
                No unnecessary complexity.
              </span>

              <p className="mt-3 max-w-[320px] text-[13px] leading-[1.85] text-black/50">
                We recommend the design,
                integrations, and tools that make
                sense for your actual business.
              </p>
            </div>

            <div>
              <span className="text-[12px] font-semibold">
                Your business, your tools.
              </span>

              <p className="mt-3 max-w-[320px] text-[13px] leading-[1.85] text-black/50">
                Accounts, access, hosting, and
                ownership arrangements are made
                clear before the project begins.
              </p>
            </div>

            <div>
              <span className="text-[12px] font-semibold">
                Third-party costs explained.
              </span>

              <p className="mt-3 max-w-[320px] text-[13px] leading-[1.85] text-black/50">
                Any external subscriptions,
                automation usage costs, or
                paid integrations are discussed
                before implementation.
              </p>
            </div>
          </div>
        </div>

        {/* CLOSING CTA */}
        <SectionReveal>
          <div className="mt-28 border-t border-black/25 pt-8 md:mt-40">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <span className="mb-10 block text-[10px] font-semibold uppercase tracking-[0.16em]">
                  Ready when you are
                </span>

                <h3 className="text-[clamp(3rem,7vw,8.5rem)] font-medium leading-[1.02] tracking-[-0.085em]">
                  Let's build
                  <br />

                  <span
                    className={`${serif.className} font-normal italic tracking-[-0.055em]`}
                  >
                    what's next.
                  </span>
                </h3>
              </div>

              <div className="flex flex-col justify-end lg:col-span-4">
                <p className="mb-10 max-w-[330px] text-[14px] leading-[1.9] text-black/55">
                  Tell us a little about your
                  business and what you'd like
                  to create. We'll explore the
                  right approach together.
                </p>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-5 border-b border-black/60 pb-5 transition-colors hover:text-black/55"
                >
                  <span className="text-[clamp(1.5rem,2.3vw,2.5rem)] font-medium tracking-[-0.06em]">
                    Start a conversation
                  </span>

                  <MoveUpRight
                    size={26}
                    strokeWidth={1.3}
                    className="shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>

      <style jsx global>{`
        @keyframes pricingEntrance {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
