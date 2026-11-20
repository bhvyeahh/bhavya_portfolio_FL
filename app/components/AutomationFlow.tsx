
"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Check,
  Clock3,
  Mail,
  CalendarCheck2,
  Database,
  MousePointer2,
  Zap,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  Manrope,
  Instrument_Serif,
} from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

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

// Illustrative scenario data, not actual client results.
const stages = [
  {
    number: "01",
    eyebrow: "The first interaction",
    title: "Someone is",
    accent: "interested.",
    description:
      "A homeowner discovers your business and submits a project inquiry. That first interaction matters. It's the beginning of a potential customer relationship.",
    detail:
      "The inquiry arrives through a structured website form, with the customer's contact information and project requirements.",
    status: "New inquiry received",
    activity: "Website inquiry received",
    leads: 8,
    emails: 0,
    bookings: 0,
    hours: 0,
  },
  {
    number: "02",
    eyebrow: "Everything in its place",
    title: "Nothing gets",
    accent: "buried.",
    description:
      "Instead of another message sitting unnoticed in a crowded inbox, customer information is organized into a clear, trackable lead workflow.",
    detail:
      "Contact details, service requirements, and inquiry status are captured in one connected system.",
    status: "Lead captured in CRM",
    activity: "New lead added to pipeline",
    leads: 18,
    emails: 6,
    bookings: 1,
    hours: 2,
  },
  {
    number: "03",
    eyebrow: "The system keeps moving",
    title: "Follow-ups,",
    accent: "handled.",
    description:
      "The customer receives a timely acknowledgement, useful next steps, and an invitation to schedule a conversation — without someone manually sending every message.",
    detail:
      "Automated emails and scheduling integrations help keep inquiries moving through an agreed follow-up sequence.",
    status: "Follow-up email delivered",
    activity: "Booking invitation sent",
    leads: 27,
    emails: 19,
    bookings: 4,
    hours: 6,
  },
  {
    number: "04",
    eyebrow: "A clearer picture",
    title: "Less chaos.",
    accent: "More clarity.",
    description:
      "Your business has a clearer view of who's interested, who has been contacted, and which conversations have moved forward. Your team can spend less time chasing details.",
    detail:
      "A shared dashboard brings lead activity, follow-ups, bookings, and estimated administrative time saved into one place.",
    status: "Workflow running",
    activity: "Consultation scheduled",
    leads: 36,
    emails: 28,
    bookings: 7,
    hours: 12,
  },
];

type Stage = (typeof stages)[number];

function useAnimatedMetrics(
  stage: Stage,
  enabled: boolean
) {
  const [values, setValues] = useState({
    leads: stage.leads,
    emails: stage.emails,
    bookings: stage.bookings,
    hours: stage.hours,
  });

  const current = useRef({ ...values });

  useEffect(() => {
    if (!enabled) return;

    const target = {
      leads: stage.leads,
      emails: stage.emails,
      bookings: stage.bookings,
      hours: stage.hours,
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      current.current = { ...target };
      return;
    }

    const tween = gsap.to(current.current, {
      ...target,
      duration: 0.85,
      ease: "power2.out",
      onUpdate: () => {
        setValues({
          leads: Math.round(current.current.leads),
          emails: Math.round(current.current.emails),
          bookings: Math.round(current.current.bookings),
          hours: Math.round(current.current.hours),
        });
      },
    });

    return () => tween.kill();
  }, [stage, enabled]);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (enabled && reducedMotion) {
    return {
      leads: stage.leads,
      emails: stage.emails,
      bookings: stage.bookings,
      hours: stage.hours,
    };
  }

  return values;
}

function Metric({
  label,
  value,
  suffix = "",
  icon: Icon,
  highlighted = false,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon: typeof Activity;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[136px] flex-col justify-between border p-5 ${
        highlighted
          ? "border-[#D6FF70]/35 bg-[#D6FF70]/[0.055]"
          : "border-white/10 bg-white/[0.025]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.13em] text-white/40">
          {label}
        </span>

        <Icon
          size={16}
          strokeWidth={1.4}
          className={
            highlighted
              ? "text-[#D6FF70]"
              : "text-white/35"
          }
        />
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-[clamp(1.9rem,3vw,3.2rem)] font-medium leading-none tracking-[-0.075em] tabular-nums">
          {value}
        </span>

        {suffix && (
          <span className="text-[12px] text-white/35">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function PerformanceGraph({
  active,
  enabled,
}: {
  active: number;
  enabled: boolean;
}) {
  const clipId = useId().replace(/:/g, "");
  const revealRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const rect = revealRef.current;
    if (!rect || !enabled) return;

    const widths = [95, 205, 315, 560];

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      gsap.set(rect, {
        attr: { width: widths[active] },
      });
      return;
    }

    const tween = gsap.to(rect, {
      attr: { width: widths[active] },
      duration: 1.1,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    return () => tween.kill();
  }, [active, enabled]);

  return (
    <div className="border border-white/10 bg-[#171817] p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.14em] text-white/40">
            Lead pipeline
          </span>

          <h4 className="mt-2 text-[15px] font-medium tracking-[-0.035em]">
            Inquiry activity
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-[6px] w-[6px] rounded-full bg-[#D6FF70]" />

          <span className="text-[9px] uppercase tracking-[0.13em] text-white/45">
            Illustrative data
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 560 200"
        className="h-auto w-full"
        role="img"
        aria-label="Illustrative lead activity graph increasing through the example workflow"
      >
        {[30, 75, 120, 165].map((y) => (
          <line
            key={y}
            x1="35"
            y1={y}
            x2="545"
            y2={y}
            stroke="white"
            strokeOpacity="0.09"
            strokeDasharray="3 6"
          />
        ))}

        {[35, 137, 239, 341, 443, 545].map((x) => (
          <line
            key={x}
            x1={x}
            y1="20"
            x2={x}
            y2="165"
            stroke="white"
            strokeOpacity="0.05"
          />
        ))}

        <defs>
          <clipPath id={clipId}>
            <rect
              ref={revealRef}
              x="0"
              y="0"
              width="95"
              height="200"
            />
          </clipPath>

          <linearGradient
            id={`${clipId}-gradient`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#D6FF70"
              stopOpacity="0.2"
            />

            <stop
              offset="100%"
              stopColor="#D6FF70"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <path
            d="M35 151 L85 143 L137 148 L188 119 L239 126 L290 92 L341 97 L392 66 L443 72 L494 40 L545 26 L545 165 L35 165 Z"
            fill={`url(#${clipId}-gradient)`}
          />

          <path
            d="M35 151 L85 143 L137 148 L188 119 L239 126 L290 92 L341 97 L392 66 L443 72 L494 40 L545 26"
            fill="none"
            stroke="#D6FF70"
            strokeWidth="2.7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        <circle
          cx={[85, 188, 341, 545][active]}
          cy={[143, 119, 97, 26][active]}
          r="5"
          fill="#D6FF70"
          stroke="#171817"
          strokeWidth="3"
          className="transition-[cx,cy] duration-700 motion-reduce:transition-none"
        />

        <text x="35" y="191" fill="#777B75" fontSize="11">
          START
        </text>

        <text
          x="545"
          y="191"
          textAnchor="end"
          fill="#777B75"
          fontSize="11"
        >
          PROGRESSION
        </text>
      </svg>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-[10px] text-white/40">
          Example lead volume
        </span>

        <span className="flex items-center gap-2 text-[11px] text-[#D6FF70]">
          <TrendingUp size={14} />
          {stages[active].leads} inquiries
        </span>
      </div>
    </div>
  );
}

function WorkflowDiagram({
  active,
}: {
  active: number;
}) {
  const nodes = [
    { label: "WEBSITE", icon: MousePointer2 },
    { label: "LEAD CRM", icon: Database },
    { label: "EMAIL", icon: Mail },
    { label: "BOOKING", icon: CalendarCheck2 },
  ];

  return (
    <div className="border border-white/10 bg-[#171817] p-6">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.14em] text-white/40">
            Connected infrastructure
          </span>

          <h4 className="mt-2 text-[15px] font-medium tracking-[-0.035em]">
            How information moves
          </h4>
        </div>

        <Zap
          size={17}
          className="text-[#D6FF70]"
          strokeWidth={1.4}
        />
      </div>

      <div className="relative grid grid-cols-4 gap-3">
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-white/15"
        />

        <div
          aria-hidden="true"
          className="absolute left-[12.5%] top-5 h-px bg-[#D6FF70] transition-[width] duration-700 ease-out motion-reduce:transition-none"
          style={{
            width: `${active * 25}%`,
            maxWidth: "75%",
          }}
        />

        {nodes.map((node, index) => {
          const Icon = node.icon;
          const enabled = active >= index;

          return (
            <div
              key={node.label}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center border transition-colors duration-500 ${
                  enabled
                    ? "border-[#D6FF70] bg-[#D6FF70] text-[#101010]"
                    : "border-white/20 bg-[#171817] text-white/35"
                }`}
              >
                {enabled && index < active ? (
                  <Check size={18} strokeWidth={1.8} />
                ) : (
                  <Icon size={18} strokeWidth={1.5} />
                )}
              </div>

              <span
                className={`text-center text-[9px] font-medium tracking-[0.08em] transition-colors duration-500 ${
                  enabled
                    ? "text-white/85"
                    : "text-white/30"
                }`}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="relative flex h-[7px] w-[7px] shrink-0">
          <span className="absolute inset-0 rounded-full bg-[#D6FF70] motion-safe:animate-ping motion-reduce:animate-none" />
          <span className="relative h-[7px] w-[7px] rounded-full bg-[#D6FF70]" />
        </span>

        <span
          aria-live="polite"
          className="text-[11px] text-white/65"
        >
          {stages[active].status}
        </span>
      </div>
    </div>
  );
}

function OperationsDashboard({
  active,
  enabled,
}: {
  active: number;
  enabled: boolean;
}) {
  const stage = stages[active];
  const values = useAnimatedMetrics(stage, enabled);

  return (
    <div className="overflow-hidden border border-white/15 bg-[#111211] shadow-[0_30px_100px_rgba(0,0,0,0.22)]">
      {/* WINDOW BAR */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-[5px]" aria-hidden="true">
            <span className="h-[7px] w-[7px] rounded-full bg-white/35" />
            <span className="h-[7px] w-[7px] rounded-full bg-white/20" />
            <span className="h-[7px] w-[7px] rounded-full bg-white/10" />
          </div>

          <span className="text-[10px] font-semibold tracking-[-0.025em] text-white/80">
            layoutory<span className="text-[#D6FF70]">.</span>

            <span className="ml-2 font-normal text-white/35">
              / operations
            </span>
          </span>
        </div>

        <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.1em] text-white/40">
          <span className="h-[6px] w-[6px] rounded-full bg-[#D6FF70]" />
          DEMO
        </span>
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="p-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/35">
              Business overview
            </span>

            <h3 className="mt-2 text-[clamp(1.4rem,2.3vw,2.2rem)] font-medium leading-none tracking-[-0.06em]">
              Your pipeline.
              <span className="text-white/35">
                {" "}In view.
              </span>
            </h3>
          </div>

          <span className="border border-white/15 px-3 py-2 text-[9px] uppercase tracking-[0.1em] text-white/50">
            Scenario {active + 1} / 04
          </span>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 gap-3">
          <Metric
            label="Leads captured"
            value={values.leads}
            icon={MousePointer2}
          />

          <Metric
            label="Emails sent"
            value={values.emails}
            icon={Mail}
          />

          <Metric
            label="Consultations"
            value={values.bookings}
            icon={CalendarCheck2}
          />

          <Metric
            label="Admin time saved"
            value={values.hours}
            suffix="hrs"
            icon={Clock3}
            highlighted
          />
        </div>

        {/* VECTOR GRAPH + WORKFLOW */}
        <div className="mt-3 grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
          <PerformanceGraph
            active={active}
            enabled={enabled}
          />
          <WorkflowDiagram active={active} />
        </div>

        {/* ACTIVITY FEED */}
        <div className="mt-3 border border-white/10 bg-[#171817]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/65">
              Recent activity
            </span>

            <Activity
              size={15}
              className="text-[#D6FF70]"
            />
          </div>

          <div className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D6FF70]/25 bg-[#D6FF70]/10">
              <Check
                size={18}
                className="text-[#D6FF70]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p
                aria-live="polite"
                className="truncate text-[12px] font-medium text-white/85"
              >
                {stage.activity}
              </p>

              <p className="mt-1 text-[10px] text-white/35">
                Example residential contractor
              </p>
            </div>

            <span className="shrink-0 text-[9px] uppercase tracking-[0.1em] text-[#D6FF70]">
              Completed
            </span>
          </div>
        </div>

        {/* ECONOMIC CONTEXT */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            <ArrowDownRight
              size={18}
              className="text-[#D6FF70]"
            />

            <span className="text-[10px] text-white/45">
              Illustrative admin time value
            </span>
          </div>

          <span className="text-[20px] font-medium tracking-[-0.055em] tabular-nums text-[#D6FF70]">
            ${values.hours * 30}

            <span className="ml-1 text-[10px] font-normal text-white/35">
              at $30/hr
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AutomationFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // NEW: Track whether the device is desktop-sized.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1024px)"
    );

    const updateDesktop = () => {
      setIsDesktop(query.matches);
    };

    updateDesktop();

    query.addEventListener("change", updateDesktop);

    return () => {
      query.removeEventListener(
        "change",
        updateDesktop
      );
    };
  }, []);

  // NEW: ScrollTrigger is initialized only when the
  // desktop media query matches. Handles resizing too.
  useEffect(() => {
    if (!isDesktop) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const triggers = stepsRef.current
        .filter(
          (step): step is HTMLDivElement =>
            Boolean(step)
        )
        .map((element, index) =>
          ScrollTrigger.create({
            trigger: element,
            start: "top 55%",
            end: "bottom 45%",

            onEnter: () => {
              setActive(index);
            },

            onEnterBack: () => {
              setActive(index);
            },
          })
        );

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  const moveToStage = (index: number) => {
    setActive(index);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reduced) {
      stepsRef.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="automation"
      aria-labelledby="automation-heading"
      // NEW: Completely hidden below 1024px.
      className={`${manrope.className} relative isolate hidden overflow-clip bg-[#101010] text-[#F1F0EC] selection:bg-[#D6FF70] selection:text-black lg:block`}
    >
      <div className="mx-auto max-w-[1800px] px-12 pb-36 pt-32 xl:px-20 xl:pb-40 xl:pt-40">

        {/* SECTION INDEX */}
        <div className="flex items-center justify-between gap-5 border-t border-white/25 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
            04 / The connected business
          </span>

          <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">
            A workflow, visualized
          </span>
        </div>

        {/* INTRODUCTION */}
        <div className="grid grid-cols-12 gap-8 pb-28 pt-24">
          <div className="col-span-9">
            <h2
              id="automation-heading"
              className="text-[clamp(3.5rem,8.5vw,10rem)] font-semibold leading-[0.94] tracking-[-0.09em]"
            >
              Every lead
              <br />

              <span
                className={`${serif.className} font-normal italic tracking-[-0.065em] text-[#D6FF70]`}
              >
                matters.
              </span>
            </h2>
          </div>

          <div className="col-span-3 flex flex-col justify-end">
            <span className="mb-5 block h-[7px] w-[7px] bg-[#D6FF70]" />

            <p className="max-w-[340px] text-[15px] leading-[1.9] text-white/50">
              Your website shouldn't be where
              customer inquiries go to disappear.
              Here's how a connected workflow
              can help keep opportunities moving.
            </p>
          </div>
        </div>

        {/* MAIN SCROLL EXPERIENCE */}
        <div className="border-t border-white/20 pt-10">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Inside the system
            </span>

            <span className="text-[10px] uppercase tracking-[0.12em] text-white/35">
              Scroll to explore / 04 stages
            </span>
          </div>

          <div className="grid grid-cols-12 items-start gap-12">

            {/* STICKY DASHBOARD */}
            <div className="sticky top-[5vh] col-span-8 self-start">
              <OperationsDashboard
                active={active}
                enabled={isDesktop}
              />

              {/* STAGE NAVIGATION */}
              <div className="mt-5 grid grid-cols-4 gap-2">
                {stages.map((stage, index) => (
                  <button
                    key={stage.number}
                    type="button"
                    onClick={() => moveToStage(index)}
                    aria-label={`Show workflow stage ${stage.number}`}
                    aria-pressed={active === index}
                    className={`flex min-h-11 items-center justify-between border px-3 py-3 text-[10px] transition-colors duration-300 ${
                      active === index
                        ? "border-[#D6FF70] bg-[#D6FF70] text-[#101010]"
                        : "border-white/15 text-white/45 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    <span>{stage.number}</span>

                    {active === index && (
                      <span className="h-[5px] w-[5px] bg-[#101010]" />
                    )}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-[10px] leading-[1.7] text-white/35">
                Illustrative workflow and sample metrics,
                not actual Layoutory client results.
                Estimated administrative time value
                uses $30/hour and excludes software costs.
              </p>
            </div>

            {/* SCROLL CHAPTERS */}
            <div className="relative col-span-4">
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-[3px] top-0 w-px bg-white/10"
              />

              {stages.map((stage, index) => (
                <div
                  key={stage.number}
                  ref={(element) => {
                    stepsRef.current[index] = element;
                  }}
                  className="relative flex min-h-[90vh] flex-col justify-center border-b border-white/15 py-28 pl-8 last:border-b-0"
                >
                  {/* ACTIVE INDICATOR */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 transition-colors duration-500 ${
                      active === index
                        ? "bg-[#D6FF70]"
                        : "bg-white/20"
                    }`}
                  />

                  <div className="mb-12 flex items-center justify-between gap-4">
                    <span
                      className={`text-[11px] font-medium tracking-[0.1em] ${
                        active === index
                          ? "text-[#D6FF70]"
                          : "text-white/40"
                      }`}
                    >
                      / {stage.number}
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.12em] text-white/35">
                      Stage {stage.number}
                    </span>
                  </div>

                  <span className="mb-8 text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    {stage.eyebrow}
                  </span>

                  <h3 className="text-[clamp(2.5rem,4vw,5.2rem)] font-medium leading-[1.06] tracking-[-0.075em]">
                    {stage.title}
                    <br />

                    <span
                      className={`${serif.className} font-normal italic tracking-[-0.05em] text-[#D6FF70]`}
                    >
                      {stage.accent}
                    </span>
                  </h3>

                  <p className="mt-9 max-w-[400px] text-[14px] leading-[1.95] text-white/65">
                    {stage.description}
                  </p>

                  <div className="mt-12 border-t border-white/15 pt-6">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="h-[6px] w-[6px] bg-[#D6FF70]" />

                      <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
                        Behind the scenes
                      </span>
                    </div>

                    <p className="max-w-[360px] text-[12px] leading-[1.85] text-white/45">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CLOSING MESSAGE */}
        <div className="mt-36 grid grid-cols-12 gap-8 border-t border-white/25 pt-10">
          <div className="col-span-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              The bigger picture
            </span>

            <div className="mt-7 h-px w-12 bg-[#D6FF70]" />
          </div>

          <div className="col-span-8">
            <p className="max-w-[950px] text-[clamp(2rem,4.2vw,5rem)] font-medium leading-[1.2] tracking-[-0.065em]">
              You focus on the work.

              <span className="text-white/35">
                {" "}Let the right systems
                handle what happens in between.
              </span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 grid grid-cols-12 gap-8 border-t border-white/20 pt-8">
          <div className="col-span-5">
            <p className="max-w-[320px] text-[13px] leading-[1.9] text-white/45">
              Every business works differently.
              We design practical integrations
              around your actual processes,
              tools, and customers.
            </p>
          </div>

          <div className="col-span-7">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border-b border-white/45 pb-5 transition-colors duration-300 hover:border-[#D6FF70] hover:text-[#D6FF70]"
            >
              <span className="text-[clamp(1.7rem,3.5vw,4rem)] font-medium tracking-[-0.07em]">
                Let's connect the dots.
              </span>

              <ArrowRight
                size={28}
                strokeWidth={1.3}
                className="shrink-0 transition-transform duration-300 motion-safe:group-hover:translate-x-2"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
