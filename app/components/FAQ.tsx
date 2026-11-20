
"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Plus,
  Minus,
  ArrowDownRight,
} from "lucide-react";
import {
  Manrope,
  Instrument_Serif,
} from "next/font/google";

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

const faqs = [
  {
    number: "01",
    question: "What does a project typically cost?",
    answer:
      "For a custom business website, we generally work within the $2,000–$5,000 investment range, depending on the scope, number of pages, design requirements, and functionality. More involved builds or automation systems are quoted individually. We'll discuss your goals and provide a clear proposal before any work begins.",
  },
  {
    number: "02",
    question: "How long does a website take to build?",
    answer:
      "Timelines depend on the size and complexity of the project, along with how quickly content and feedback are available. A focused business website may take a few weeks, while a larger custom build or a project involving integrations may take longer. We'll agree on a realistic schedule before starting.",
  },
  {
    number: "03",
    question: "Will my website be designed from scratch?",
    answer:
      "Our approach prioritizes design that suits your business rather than simply dropping your content into a generic template. We consider your positioning, customers, messaging, and visual identity. The precise design process and level of customization will be outlined in your project proposal.",
  },
  {
    number: "04",
    question: "Can you connect bookings and automations?",
    answer:
      "Yes. Depending on your requirements, we can integrate inquiry forms, appointment scheduling, email notifications, CRM connections, and automated follow-up workflows. We focus on practical solutions that fit your existing operations rather than adding complicated tools you don't need. Any third-party subscription costs will be discussed upfront.",
  },
  {
    number: "05",
    question: "Will I own the website when it's finished?",
    answer:
      "Ownership, access, hosting, and handover terms are clearly defined in the project agreement. We can help arrange the website so that important accounts and services are under your business's control. If you need training or ongoing technical assistance, that can also be included in the scope.",
  },
  {
    number: "06",
    question: "Will the website help with Google visibility?",
    answer:
      "We can build with search-friendly foundations such as semantic page structure, responsive layouts, performance considerations, and appropriate metadata. Local SEO requirements can also be addressed as part of the project. Rankings depend on many factors outside the website itself, so we don't promise a specific Google position.",
  },
  {
    number: "07",
    question: "What happens after the website goes live?",
    answer:
      "Before launch, we test the important pages, forms, and interactions. We'll also discuss handover requirements, content updates, and any ongoing maintenance or support you might need. Post-launch services and support periods are defined in the proposal so expectations stay clear.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group border-b border-black/20">
      <h3>
        <button
          type="button"
          id={`faq-question-${index}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-5 py-7 text-left outline-offset-[-3px] md:gap-8 md:py-9 lg:py-10"
        >
          <div className="flex min-w-0 flex-1 items-start gap-5 md:gap-8">
            <span
              className={`mt-2 shrink-0 text-[10px] font-medium tabular-nums tracking-[0.07em] transition-colors duration-300 ${
                isOpen
                  ? "text-[#171717]"
                  : "text-black/35"
              }`}
            >
              / {item.number}
            </span>

            <span
              className={`max-w-[650px] text-[clamp(1.25rem,2.1vw,2.25rem)] font-medium leading-[1.3] tracking-[-0.045em] transition-colors duration-300 ${
                isOpen
                  ? "text-[#171717]"
                  : "text-black/65 group-hover:text-[#171717]"
              }`}
            >
              {item.question}
            </span>
          </div>

          <span
            aria-hidden="true"
            className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-300 md:h-12 md:w-12 ${
              isOpen
                ? "border-[#171717] bg-[#171717] text-[#F1F0EA]"
                : "border-black/25 text-black/70 group-hover:border-[#171717] group-hover:bg-[#171717] group-hover:text-white"
            }`}
          >
            {isOpen ? (
              <Minus size={19} strokeWidth={1.4} />
            ) : (
              <Plus size={19} strokeWidth={1.4} />
            )}
          </span>
        </button>
      </h3>

      {/* Accessible expanding panel */}
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-10 pl-0 md:pb-12 md:pl-[50px]">
            <p className="max-w-[610px] text-[14px] leading-[1.95] tracking-[-0.012em] text-black/55 md:text-[15px]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className={`${manrope.className} relative isolate w-full overflow-hidden bg-[#F1F0EA] text-[#171717] selection:bg-[#D6FF70] selection:text-black`}
    >
      <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-24 md:px-12 md:pb-36 md:pt-32 xl:px-20 xl:pb-40 xl:pt-40">

        {/* TOP SECTION LABEL */}
        <div className="flex items-center justify-between gap-5 border-t border-black/25 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
            06 / Common questions
          </span>

          <span className="text-[10px] uppercase tracking-[0.14em] text-black/45">
            A little more clarity
          </span>
        </div>

        {/* HEADER */}
        <div className="grid grid-cols-1 gap-12 pb-24 pt-20 md:pb-32 md:pt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <h2
              id="faq-title"
              className="text-[clamp(3.4rem,9vw,10.5rem)] font-semibold leading-[0.94] tracking-[-0.09em]"
            >
              Good questions.
              <br />

              <span
                className={`${instrument.className} font-normal italic tracking-[-0.065em]`}
              >
                Clear answers.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <span className="mb-5 block h-[7px] w-[7px] bg-[#171717]" />

            <p className="max-w-[310px] text-[14px] leading-[1.9] tracking-[-0.015em] text-black/55 md:text-[15px]">
              A few things worth knowing
              before we get started.
              No confusing terminology,
              no unnecessary complications.
            </p>
          </div>
        </div>

        {/* TWO COLUMN FAQ STRUCTURE */}
        <div className="grid grid-cols-1 gap-16 border-t border-black/25 lg:grid-cols-12 lg:gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-4">
            <div className="flex flex-col justify-between gap-14 pt-10 lg:sticky lg:top-10 lg:min-h-[480px] lg:pt-14">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
                  Before we begin
                </span>

                <h3 className="mt-10 max-w-[380px] text-[clamp(2.5rem,4.3vw,4.8rem)] font-medium leading-[1.1] tracking-[-0.075em]">
                  No question
                  <br />
                  <span
                    className={`${instrument.className} font-normal italic tracking-[-0.05em]`}
                  >
                    too small.
                  </span>
                </h3>

                <p className="mt-8 max-w-[320px] text-[13px] leading-[1.9] text-black/50 md:text-[14px]">
                  Investing in your business's
                  digital presence is a considered
                  decision. Here's what you can
                  expect when working with us.
                </p>
              </div>

              <div className="hidden lg:block">
                <div className="mb-8 h-px w-12 bg-black/35" />

                <div className="flex items-end justify-between gap-6">
                  <span className="text-[10px] font-medium uppercase leading-[1.9] tracking-[0.12em] text-black/40">
                    Transparency first.
                    <br />
                    Always.
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

          {/* RIGHT SIDE — ACCORDION */}
          <div className="lg:col-span-8">
            <div className="border-t border-black/15 lg:border-t-0">
              {faqs.map((item, index) => (
                <FAQItem
                  key={item.number}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(
                      openIndex === index ? null : index
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-28 grid grid-cols-1 gap-12 border-t border-black/25 pt-8 md:mt-40 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <span className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.16em]">
              Still curious?
            </span>

            <p className="max-w-[310px] text-[13px] leading-[1.9] text-black/50">
              Every project is different.
              If you have a question about
              yours, we're happy to talk
              through the possibilities.
            </p>
          </div>

          <div className="md:col-span-7">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-b border-black/45 pb-5 transition-colors duration-300 hover:border-[#171717] hover:text-black/60"
            >
              <span className="text-[clamp(1.9rem,3.7vw,4rem)] font-medium leading-[1.12] tracking-[-0.07em]">
                Let's clear things up.
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

      {/* SMALL FOOTER RAIL */}
      <div className="border-t border-black/15">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-5 px-6 py-6 md:px-12 xl:px-20">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
            Layoutory®
          </span>

          <span className="text-[10px] uppercase tracking-[0.12em] text-black/40">
            Let's build something considered.
          </span>
        </div>
      </div>
    </section>
  );
}
