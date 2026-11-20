
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
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

const BOOKING_URL =
  "https://calendly.com/bhavyarathore575/30min";

const process = [
  {
    number: "01",
    title: "Discover.",
    subtitle: "First, the right questions.",
    description:
      "We begin by understanding your business, the people you serve, and what you're trying to achieve. Not just what you want your website to look like — but what you need it to do.",
    details: [
      "Business & audience discovery",
      "Project goals",
      "Existing website review",
      "Scope & priorities",
    ],
    output: "A clear project direction.",
  },
  {
    number: "02",
    title: "Define & design.",
    subtitle: "Form follows intention.",
    description:
      "With a clear direction in place, we shape the structure, messaging, and visual language of your digital experience. Every decision is made to serve the people who will actually use it.",
    details: [
      "Information architecture",
      "Page structure & wireframes",
      "Visual direction",
      "Responsive interface design",
    ],
    output: "A considered design system.",
  },
  {
    number: "03",
    title: "Build & connect.",
    subtitle: "Where ideas become functional.",
    description:
      "We bring the experience to life with clean development, thoughtful interactions, and the integrations your business requires. From contact forms to scheduling and automated workflows.",
    details: [
      "Frontend development",
      "Responsive implementation",
      "Forms & integrations",
      "Performance & accessibility",
    ],
    output: "A functional digital experience.",
  },
  {
    number: "04",
    title: "Launch & refine.",
    subtitle: "Made for the real world.",
    description:
      "Before launch, we review the experience across devices, test important interactions, and check that everything works as intended. We help you move from a finished build to a website ready to use.",
    details: [
      "Responsive testing",
      "Functional quality checks",
      "Launch preparation",
      "Handover & guidance",
    ],
    output: "A website ready for its audience.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className={`${manrope.className} relative isolate overflow-clip bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >
      <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-24 md:px-12 md:pb-36 md:pt-32 xl:px-20 xl:pb-40 xl:pt-40">

        {/* SECTION IDENTIFIER */}
        <div className="flex items-center justify-between gap-6 border-t border-black/25 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
            04 / The approach
          </span>

          <span className="text-[10px] uppercase tracking-[0.14em] text-black/45">
            From idea to execution
          </span>
        </div>

        {/* INTRODUCTION */}
        <div className="grid grid-cols-1 gap-12 pb-24 pt-20 md:pb-32 md:pt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <h2
              id="approach-title"
              className="text-[clamp(3.7rem,9.2vw,10.5rem)] font-semibold leading-[0.94] tracking-[-0.09em]"
            >
              The thinking
              <br />
              <span
                className={`${instrument.className} font-normal italic tracking-[-0.07em]`}
              >
                behind it.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <span className="mb-5 block h-[7px] w-[7px] bg-[#171717]" />

            <p className="max-w-[305px] text-[14px] leading-[1.9] tracking-[-0.015em] text-black/55 md:text-[15px]">
              Great work is rarely an accident.
              It's the result of asking better
              questions, making thoughtful
              decisions, and caring about
              the details.
            </p>
          </div>
        </div>

        {/* MAIN PROCESS LAYOUT */}
        <div className="grid grid-cols-1 gap-16 border-t border-black/25 lg:grid-cols-12 lg:gap-10">

          {/* STICKY LEFT SIDE */}
          <div className="lg:col-span-4">
            <div className="flex flex-col pt-10 lg:sticky lg:top-10 lg:min-h-[520px] lg:pt-14">

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
                  Our working philosophy
                </span>

                <h3 className="mt-10 max-w-[430px] text-[clamp(2.5rem,4.5vw,5rem)] font-medium leading-[1.08] tracking-[-0.075em]">
                  No shortcuts.
                  <br />
                  No guesswork.
                  <br />
                  <span
                    className={`${instrument.className} font-normal italic tracking-[-0.05em]`}
                  >
                    Just intention.
                  </span>
                </h3>

                <p className="mt-8 max-w-[320px] text-[13px] leading-[1.9] text-black/50 md:text-[14px]">
                  A straightforward, collaborative
                  process designed to keep the
                  project focused, transparent,
                  and moving in the right direction.
                </p>
              </div>

              {/* SMALL EDITORIAL MARK */}
              <div className="mt-14 hidden flex-1 flex-col justify-end lg:flex">
                <div className="mb-8 h-px w-12 bg-black/35" />

                <div className="flex items-end justify-between gap-6">
                  <span className="text-[10px] font-medium uppercase leading-[1.9] tracking-[0.12em] text-black/40">
                    Thoughtfully made.
                    <br />
                    Purposefully built.
                  </span>

                  <ArrowDownRight
                    size={38}
                    strokeWidth={1}
                    className="text-black/40"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — PROCESS STAGES */}
          <div className="lg:col-span-8">
            <ol className="border-t border-black/15 lg:border-t-0">
              {process.map((step) => (
                <li
                  key={step.number}
                  className="group relative overflow-hidden border-b border-black/20 py-12 md:py-16 lg:py-20"
                >
                  {/* LARGE BACKGROUND NUMBER */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-3 -top-5 select-none text-[clamp(9rem,21vw,20rem)] font-semibold leading-none tracking-[-0.12em] text-black/[0.035] transition-colors duration-500 group-hover:text-black/[0.065] motion-reduce:transition-none md:-right-5 md:-top-10"
                  >
                    {step.number}
                  </span>

                  <div className="relative z-10">

                    {/* STEP TOP LINE */}
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center border border-black/25 text-[11px] font-medium tabular-nums">
                          {step.number}
                        </span>

                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-black/45">
                          Phase {step.number}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={22}
                        strokeWidth={1.2}
                        aria-hidden="true"
                        className="text-black/35 transition-transform duration-500 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                      />
                    </div>

                    {/* STEP TITLE */}
                    <h4 className="mt-12 max-w-[720px] text-[clamp(2.7rem,5.2vw,6.5rem)] font-medium leading-[1.03] tracking-[-0.078em] md:mt-16">
                      {step.title}
                    </h4>

                    <p
                      className={`${instrument.className} mt-3 text-[clamp(1.6rem,2.8vw,3rem)] font-normal italic leading-[1.2] tracking-[-0.04em] text-black/40`}
                    >
                      {step.subtitle}
                    </p>

                    {/* DESCRIPTION + LIST */}
                    <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-8">

                      <div className="md:col-span-7">
                        <p className="max-w-[470px] text-[14px] leading-[1.95] tracking-[-0.01em] text-black/60 md:text-[15px]">
                          {step.description}
                        </p>
                      </div>

                      <div className="md:col-span-5">
                        <span className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                          In this phase
                        </span>

                        <ul className="space-y-4">
                          {step.details.map(
                            (detail, index) => (
                              <li
                                key={detail}
                                className="flex items-start gap-4"
                              >
                                <span className="mt-[2px] text-[10px] tabular-nums text-black/35">
                                  0{index + 1}
                                </span>

                                <span className="text-[12px] leading-[1.7] text-black/70 md:text-[13px]">
                                  {detail}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* PHASE OUTPUT */}
                    <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-black/15 pt-6 md:mt-20">
                      <span className="h-[6px] w-[6px] bg-[#171717]" />

                      <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-black/40">
                        Intended outcome
                      </span>

                      <span className="text-[12px] font-medium tracking-[-0.01em] md:ml-auto">
                        {step.output}
                      </span>
                    </div>

                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* THE BOTTOM MANIFESTO */}
        <div className="mt-28 border-t border-black/25 pt-8 md:mt-44">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">

            <div className="md:col-span-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                The bigger picture
              </span>
            </div>

            <div className="md:col-span-8">
              <p className="max-w-[1000px] text-[clamp(2rem,4.2vw,5.2rem)] font-medium leading-[1.18] tracking-[-0.068em]">
                A website isn't the finish line.
                <span className="text-black/35">
                  {" "}It's the beginning of a
                  better digital experience for
                  your business.
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* CLOSING CTA */}
        <div className="mt-24 md:mt-36">
          <div className="grid grid-cols-1 gap-10 border-t border-black/25 pt-8 md:grid-cols-12">

            <div className="md:col-span-5">
              <p className="max-w-[310px] text-[13px] leading-[1.85] text-black/50">
                Have a project in mind?
                Every good collaboration starts
                with a conversation.
              </p>
            </div>

            <div className="md:col-span-7">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border-b border-black/45 pb-5 transition-colors duration-300 hover:border-black hover:text-black/65"
              >
                <span className="text-[clamp(1.8rem,3.5vw,4rem)] font-medium leading-[1.12] tracking-[-0.07em]">
                  Let's talk about yours.
                </span>

                <ArrowUpRight
                  size={30}
                  strokeWidth={1.3}
                  className="shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
                />
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* SIGNATURE STRIP */}
      <div className="border-t border-black/15">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-6 px-6 py-6 md:px-12 xl:px-20">

          <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
            Layoutory®
          </span>

          <span className="text-[10px] uppercase tracking-[0.12em] text-black/40">
            Independent digital studio
          </span>

        </div>
      </div>
    </section>
  );
}
