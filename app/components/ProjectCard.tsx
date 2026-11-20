
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Manrope, Instrument_Serif } from "next/font/google";

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

const projects = [
  {
    number: "01",
    name: "Pivotal Builders",
    category: "Construction & Remodeling",
    services: ["Web Design", "Development", "Lead Intake"],
    description:
      "A considered digital presence built around trust, clarity, and a more structured project inquiry experience.",
    href: "/pivotal-builders-case-study",
    external: false,
  },
  {
    number: "02",
    name: "Slick Construction",
    category: "Construction Services",
    services: ["Web Design", "Development", "Booking Experience"],
    description:
      "A service-focused website experience that brings detailing packages, customer information, and booking closer together.",
    href: "https://scsfinc.com",
    external: true,
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
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

    let animation: Animation | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animation = element.animate(
          [
            {
              opacity: 0,
              transform: "translateY(28px)",
            },
            {
              opacity: 1,
              transform: "translateY(0)",
            },
          ],
          {
            duration: 850,
            delay,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "backwards",
          }
        );

        observer.unobserve(element);
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}

function ProjectLink({
  href,
  external,
  children,
  className = "",
}: {
  href: string;
  external: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}

export default function FeaturedWorks() {
  return (
    <section
      id="selected-work"
      aria-labelledby="work-heading"
      className={`${manrope.className} relative w-full overflow-hidden bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >
      <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-24 md:px-12 md:pb-36 md:pt-32 xl:px-20 xl:pb-44 xl:pt-40">

        {/* SECTION INDEX */}
        <Reveal>
          <div className="flex items-center justify-between border-t border-black/25 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
              02 / Selected work
            </span>

            <span className="text-[10px] uppercase tracking-[0.14em] text-black/45">
              A selection of projects
            </span>
          </div>
        </Reveal>

        {/* SECTION HEADING */}
        <div className="grid grid-cols-1 gap-10 pb-24 pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-32">
          <div className="lg:col-span-9">
            <Reveal>
              <h2
                id="work-heading"
                className="text-[clamp(4rem,10.5vw,11rem)] font-semibold leading-[0.88] tracking-[-0.095em]"
              >
                Work that
                <br />
                <span
                  className={`${serif.className} font-normal italic tracking-[-0.065em]`}
                >
                  speaks.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <Reveal delay={120}>
              <p className="max-w-[300px] text-[14px] leading-[1.85] tracking-[-0.015em] text-black/55 md:text-[15px]">
                Not just something to look at.
                Digital experiences shaped around
                real businesses, their customers,
                and the way they work.
              </p>
            </Reveal>
          </div>
        </div>

        {/* PROJECT 01 */}
        <article className="mb-32 md:mb-44">
          <Reveal>
            <ProjectLink
              href={projects[0].href}
              external={projects[0].external}
              className="group relative block overflow-hidden bg-[#C7C6C0] outline-offset-4"
            >
              <div className="relative aspect-[5/4] overflow-hidden md:aspect-[16/10] xl:aspect-[16/9]">
                <Image
                  src="/mockup-pivotal.jpeg"
                  alt="Pivotal Builders website project preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] motion-safe:group-hover:scale-[1.035]"
                />

                {/* EDITORIAL TOP LABEL */}
                <div className="absolute left-5 top-5 z-10 flex items-center gap-2 bg-[#F1F0EA] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] md:left-8 md:top-8">
                  <span className="h-[6px] w-[6px] bg-[#202020]" />
                  Featured case study
                </div>

                {/* CORNER ACTION */}
                <div className="absolute bottom-5 right-5 z-10 flex h-12 w-12 items-center justify-center bg-[#D6FF70] text-black transition-transform duration-500 motion-safe:group-hover:-translate-y-1 md:bottom-8 md:right-8 md:h-16 md:w-16">
                  <ArrowUpRight
                    size={25}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </ProjectLink>
          </Reveal>

          <Reveal delay={100}>
            <ProjectInformation project={projects[0]} />
          </Reveal>
        </article>

        {/* TRANSITION STATEMENT */}
        <Reveal>
          <div className="mb-28 grid grid-cols-1 gap-8 border-t border-black/20 pt-7 md:mb-40 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                Beyond aesthetics
              </span>
            </div>

            <div className="md:col-span-8">
              <p className="max-w-[850px] text-[clamp(1.7rem,3.6vw,3.8rem)] font-medium leading-[1.17] tracking-[-0.065em]">
                Good design gets attention.
                <span className="text-black/35">
                  {" "}Thoughtful digital experiences
                  make that attention count.
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* PROJECT 02 */}
        <article className="mb-24 md:mb-32">
          <Reveal>
            <ProjectLink
              href={projects[1].href}
              external={projects[1].external}
              className="group relative block overflow-hidden bg-[#202020] text-white outline-offset-4"
            >
              <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden px-7 py-8 md:min-h-[650px] md:px-14 md:py-14 lg:min-h-[760px] lg:px-20 lg:py-16">

                {/* TOP BAR */}
                <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/20 pb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                    Slick Construction
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/45">
                    Digital experience
                  </span>
                </div>

                {/* TYPOGRAPHIC ARTWORK */}
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-12">
                  <span className="mb-5 text-[10px] font-medium uppercase tracking-[0.5em] text-[#D6FF70] md:mb-9">
                    The details matter
                  </span>

                  <div className="w-full text-center">
                    <span className="block text-[clamp(5rem,19vw,20rem)] font-extrabold leading-[0.77] tracking-[-0.13em]">
                      Slick
                    </span>

                    <span
                      className={`${serif.className} mt-3 block text-[clamp(3.5rem,12vw,12rem)] font-normal italic leading-[0.92] tracking-[-0.07em] text-[#D6FF70] md:mt-5`}
                    >
                      Construction.
                    </span>
                  </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="relative z-10 flex items-end justify-between gap-5 border-t border-white/20 pt-6">
                  <span className="max-w-[200px] text-[10px] uppercase leading-[1.8] tracking-[0.14em] text-white/50">
                    Service-led web experience
                  </span>

                  <span className="flex items-center gap-3 text-[11px] font-semibold">
                    Visit website
                    <ArrowUpRight
                      size={19}
                      className="text-[#D6FF70] transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                    />
                  </span>
                </div>

                {/* BACKGROUND DETAIL */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,.035), transparent 60%)",
                  }}
                />
              </div>
            </ProjectLink>
          </Reveal>

          <Reveal delay={100}>
            <ProjectInformation project={projects[1]} />
          </Reveal>
        </article>

        {/* EXPLORE ALL */}
        <Reveal>
          <div className="border-t border-black/25">
            <Link
              href="/work"
              className="group flex items-center justify-between gap-8 py-10 transition-colors hover:text-black/60 md:py-14"
            >
              <div>
                <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
                  More from the studio
                </span>

                <span className="block text-[clamp(2.4rem,5.5vw,6rem)] font-medium leading-none tracking-[-0.075em]">
                  Explore all work
                </span>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-black/25 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white md:h-20 md:w-20">
                <ArrowRight
                  size={26}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// SHARED PROJECT INFORMATION

type Project = (typeof projects)[number];

function ProjectInformation({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 border-b border-black/20 pb-10 pt-8 md:grid-cols-12 md:gap-6 md:pb-14 md:pt-10">

      <div className="flex items-start gap-5 md:col-span-7">
        <span className="mt-2 text-[11px] font-medium text-black/45">
          / {project.number}
        </span>

        <div>
          <ProjectLink
            href={project.href}
            external={project.external}
            className="group inline-flex items-start gap-4"
          >
            <h3 className="text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.075em]">
              {project.name}
            </h3>

            <ArrowUpRight
              size={20}
              className="mt-1 shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
            />
          </ProjectLink>

          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.13em] text-black/45">
            {project.category}
          </p>
        </div>
      </div>

      <div className="md:col-span-3">
        <p className="max-w-[320px] text-[13px] leading-[1.85] text-black/60">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap content-start gap-x-4 gap-y-2 md:col-span-2 md:flex-col md:items-end">
        {project.services.map((service) => (
          <span
            key={service}
            className="text-[10px] font-medium uppercase tracking-[0.08em] text-black/55"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}
