
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, Plus, Minus } from "lucide-react";
import { Manrope, Instrument_Serif } from "next/font/google";

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

const services = [
  {
    number: "01",
    title: "Strategy &",
    accent: "design.",
    category: "The foundation",
    description:
      "Before a single pixel is placed, we get to know your business, your audience, and what your website actually needs to accomplish. Then we turn that clarity into a distinctive digital experience.",
    items: [
      "Brand & digital direction",
      "Website strategy",
      "UX / UI design",
      "Responsive design systems",
    ],
  },
  {
    number: "02",
    title: "Web",
    accent: "development.",
    category: "The execution",
    description:
      "Thoughtfully engineered websites that feel as good as they look. Built for performance, accessibility, and the everyday needs of real businesses — not just a pretty portfolio screenshot.",
    items: [
      "Custom website development",
      "Responsive experiences",
      "Performance optimization",
      "CMS & content integration",
    ],
  },
  {
    number: "03",
    title: "Leads &",
    accent: "bookings.",
    category: "The conversion",
    description:
      "Make it easier for the right customers to reach you. We design clearer paths from their first visit to their first conversation, connecting your website with the tools you use to manage inquiries.",
    items: [
      "Lead capture & qualification",
      "Inquiry & contact forms",
      "Scheduling integrations",
      "CRM & lead routing",
    ],
  },
  {
    number: "04",
    title: "Business",
    accent: "automation.",
    category: "The efficiency",
    description:
      "Less repetitive work. More room to focus on the business. We connect the right tools and build practical workflows that help keep customer communication and internal processes moving.",
    items: [
      "Automated follow-up workflows",
      "Email notifications",
      "App & workflow integrations",
      "Process automation",
    ],
  },
];

function ServiceRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: (typeof services)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="group border-b border-white/[0.16]">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`capability-panel-${index}`}
          id={`capability-heading-${index}`}
          className="flex w-full items-start justify-between gap-5 py-9 text-left outline-offset-[-4px] transition-colors duration-300 md:gap-10 md:py-12 lg:py-14"
        >
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 md:grid-cols-[65px_minmax(0,1fr)] md:gap-8">
            <span className="pt-1 text-[11px] font-medium tracking-[0.08em] text-white/40 md:pt-4">
              / {service.number}
            </span>

            <div className="min-w-0">
              <span className="mb-5 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/35 md:hidden">
                {service.category}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-[0.22em] gap-y-0 leading-[1.05]">
                <span className="text-[clamp(2.4rem,5.4vw,6.4rem)] font-semibold tracking-[-0.075em] transition-colors duration-300 group-hover:text-white">
                  {service.title}
                </span>

                <span
                  className={`${instrument.className} text-[clamp(2.7rem,6vw,7rem)] font-normal italic tracking-[-0.065em] transition-colors duration-300 ${
                    isOpen
                      ? "text-[#D6FF70]"
                      : "text-white/45 group-hover:text-[#D6FF70]"
                  }`}
                >
                  {service.accent}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-start gap-8 md:pt-3 lg:gap-16">
            <span className="hidden pt-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white/35 lg:block">
              {service.category}
            </span>

            <span
              aria-hidden="true"
              className={`flex h-11 w-11 items-center justify-center border transition-all duration-300 md:h-14 md:w-14 ${
                isOpen
                  ? "border-[#D6FF70] bg-[#D6FF70] text-[#101010]"
                  : "border-white/25 text-white group-hover:border-white group-hover:bg-white group-hover:text-[#101010]"
              }`}
            >
              {isOpen ? (
                <Minus size={20} strokeWidth={1.4} />
              ) : (
                <Plus size={20} strokeWidth={1.4} />
              )}
            </span>
          </div>
        </button>
      </h3>

      {/* EXPANDABLE CONTENT */}
      <div
        id={`capability-panel-${index}`}
        role="region"
        aria-labelledby={`capability-heading-${index}`}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-12 md:gap-8 md:pb-16">
            <div className="hidden md:col-span-1 md:block" />

            <div className="md:col-span-6">
              <p className="max-w-[610px] text-[15px] leading-[1.9] tracking-[-0.015em] text-white/60 md:text-[17px]">
                {service.description}
              </p>
            </div>

            <div className="md:col-span-5 lg:pl-14">
              <span className="mb-6 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
                What this can include
              </span>

              <ul className="space-y-4">
                {service.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 text-[12px] leading-[1.6] text-white/70 md:text-[13px]"
                  >
                    <span className="mt-[1px] text-[10px] text-[#D6FF70]">
                      0{itemIndex + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const targets = section.querySelectorAll<HTMLElement>(
      "[data-capability-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;

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
              duration: 800,
              easing: "cubic-bezier(.22,1,.36,1)",
            }
          );

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const toggleService = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="capabilities-title"
      className={`${manrope.className} relative isolate w-full overflow-hidden bg-[#101010] text-[#F1F0EC] selection:bg-[#D6FF70] selection:text-black`}
    >
      <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-24 md:px-12 md:pb-36 md:pt-32 xl:px-20 xl:pb-40 xl:pt-40">
        {/* SECTION TOP INDEX */}
        <div
          data-capability-reveal
          className="flex items-center justify-between gap-5 border-t border-white/25 pt-5"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
            03 / What we do
          </span>

          <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">
            Our expertise
          </span>
        </div>

        {/* HEADING */}
        <div className="grid grid-cols-1 gap-12 pb-20 pt-20 md:pb-28 md:pt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <div data-capability-reveal>
              <h2
                id="capabilities-title"
                className="text-[clamp(3.6rem,9.2vw,10.5rem)] font-semibold leading-[0.92] tracking-[-0.09em]"
              >
                Good looks.
                <br />

                <span
                  className={`${instrument.className} font-normal italic tracking-[-0.065em] text-[#D6FF70]`}
                >
                  Real purpose.
                </span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <div data-capability-reveal>
              <span className="mb-5 block h-[7px] w-[7px] bg-[#D6FF70]" />

              <p className="max-w-[300px] text-[14px] leading-[1.9] tracking-[-0.015em] text-white/50 md:text-[15px]">
                Every decision, every detail, every
                interaction — designed with a reason.
                Because a website should do more
                than just exist.
              </p>
            </div>
          </div>
        </div>

        {/* SERVICES INDEX */}
        <div className="border-t border-white/[0.16]">
          {services.map((service, index) => (
            <div
              key={service.number}
              data-capability-reveal
            >
              <ServiceRow
                service={service}
                index={index}
                isOpen={activeIndex === index}
                onToggle={() => toggleService(index)}
              />
            </div>
          ))}
        </div>

        {/* BOTTOM STATEMENT */}
        <div className="grid grid-cols-1 gap-14 pb-20 pt-28 md:grid-cols-12 md:gap-8 md:pb-28 md:pt-40">
          <div className="md:col-span-4">
            <div data-capability-reveal>
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                A connected approach
              </span>

              <div className="mt-7 h-px w-12 bg-[#D6FF70]" />
            </div>
          </div>

          <div className="md:col-span-8">
            <div data-capability-reveal>
              <p className="max-w-[970px] text-[clamp(1.9rem,4.2vw,4.8rem)] font-medium leading-[1.2] tracking-[-0.065em]">
                Design brings people in.
                <span className="text-white/35">
                  {" "}The right systems help
                  turn interest into opportunity.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* SERVICE FOOTER / CTA */}
        <div
          data-capability-reveal
          className="grid grid-cols-1 gap-10 border-t border-white/20 pt-8 md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <ArrowDownRight
                size={20}
                strokeWidth={1.3}
                className="text-[#D6FF70]"
              />

              <p className="max-w-[300px] text-[12px] leading-[1.8] text-white/45">
                One studio. A considered approach
                from the first idea to the finished
                experience.
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <Link
              href="/pricing"
              className="group flex items-center justify-between gap-6 border-b border-white/50 pb-5 transition-colors duration-300 hover:border-[#D6FF70] hover:text-[#D6FF70]"
            >
              <span className="text-[clamp(1.6rem,3.4vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.065em]">
                Explore our services
              </span>

              <ArrowUpRight
                size={28}
                strokeWidth={1.3}
                className="shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
