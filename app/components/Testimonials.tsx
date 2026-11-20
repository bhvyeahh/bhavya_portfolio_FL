
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
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

const clientVideos = [
  {
    number: "01",
    company: "Pivotal Builders",
    client: "Pivotal Builders",
    category: "Construction & Remodeling",
    video: "/testimonial.mp4",
    project: "/pivotal-builders-case-study",
  },
  {
    number: "02",
    company: "Slick Construction",
    client: "Nick Coleman",
    category: "Construction",
    video: "/nick.mp4",
    project: null,
  },
];

// Draft editorial copy. Replace these invented quotations
// and identities with approved client feedback before publishing.
const writtenTestimonials = [
  {
    number: "01",
    name: "Daniel Mitchell",
    role: "Construction business owner",
    quote:
      "The website feels like a true reflection of our business now. Clean, professional, and thoughtfully put together from start to finish.",
  },
  {
    number: "02",
    name: "Michael Anderson",
    role: "Home services",
    quote:
      "What impressed me most was the attention to detail. Every part of the experience felt considered, and the entire process was incredibly straightforward.",
  },
  {
    number: "03",
    name: "James Peterson",
    role: "Service business owner",
    quote:
      "From the first conversation to the finished website, the communication and quality of work were excellent. Exactly the direction we were looking for.",
  },
];

// Set to true only after replacing all draft quotes and
// identities above with genuine, approved client statements.
const SHOW_APPROVED_WRITTEN_TESTIMONIALS = false;

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
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      return;
    }

    let animation: Animation | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animation = element.animate(
          [
            { opacity: 0, transform: "translateY(24px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 800,
            delay,
            easing: "cubic-bezier(.22,1,.36,1)",
          }
        );

        observer.unobserve(element);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}

type VideoData = (typeof clientVideos)[number];

function ClientVideo({ data }: { data: VideoData }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [status, setStatus] = useState<
    "loading" | "ready" | "missing"
  >("loading");

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video || status !== "ready") return;

    if (!video.paused) {
      video.pause();
      return;
    }

    try {
      await video.play();
    } catch {
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const seek = (value: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = value;
    setProgress(value);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <article className="group min-w-0">
      {/* 4:5 editorial film frame.
          Original 9:16 content remains uncropped. */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#222320]">
        {/* Quiet cinematic matte around portrait video */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #393A35 0%, #1A1B19 72%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[12%] w-px bg-white/[0.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-[12%] w-px bg-white/[0.04]"
        />

        {/* Video keeps its original aspect ratio */}
        <video
          ref={videoRef}
          src={data.video}
          preload="metadata"
          playsInline
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
            status === "ready"
              ? "opacity-100"
              : "opacity-0"
          }`}
          onLoadedMetadata={(event) => {
            const video = event.currentTarget;
            setDuration(video.duration || 0);
            setMuted(video.muted);
            setStatus("ready");
          }}
          onError={() => setStatus("missing")}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(event) =>
            setProgress(event.currentTarget.currentTime)
          }
        />

        {/* Missing video / loading frame */}
        {status !== "ready" && (
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
                Client film / {data.number}
              </span>
              <span className="h-[6px] w-[6px] bg-[#D6FF70]" />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mb-10 flex h-20 w-20 items-center justify-center border border-white/25">
                <Play size={28} strokeWidth={1.2} />
              </div>

              <h3 className="max-w-[400px] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.075em]">
                {data.company}
                <span className="text-[#D6FF70]">.</span>
              </h3>

              <p className="mt-7 text-[10px] uppercase tracking-[0.18em] text-white/45">
                {status === "loading"
                  ? "Preparing film"
                  : "Film coming soon"}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-5">
              <span className="text-[10px] uppercase tracking-[0.13em] text-white/45">
                {data.category}
              </span>
              <span className="text-[10px] text-white/40">
                {data.number} / 02
              </span>
            </div>
          </div>
        )}

        {/* Player controls */}
        {status === "ready" && (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-6 pb-20 pt-6 md:px-9 md:pt-9">
              <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.14em] text-white">
                <span>Client film / {data.number}</span>
                <span className="text-white/65">
                  Layoutory
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                playing
                  ? `Pause ${data.company} video`
                  : `Play ${data.company} video`
              }
              className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/70 bg-black/35 text-white backdrop-blur-sm transition-[opacity,background-color] duration-300 hover:bg-white hover:text-black focus-visible:opacity-100 md:h-24 md:w-24 ${
                playing
                  ? "opacity-0 group-hover:opacity-100"
                  : "opacity-100"
              }`}
            >
              {playing ? (
                <Pause size={27} strokeWidth={1.5} />
              ) : (
                <Play size={27} strokeWidth={1.5} />
              )}
            </button>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 pb-5 pt-20 md:px-9 md:pb-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="text-[11px] font-medium">
                  {data.company}
                </span>
                <span className="text-[10px] tabular-nums text-white/70">
                  {formatTime(progress)} / {formatTime(duration)}
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={Math.min(progress, duration || 1)}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label={`Seek ${data.company} video`}
                className="block h-2 w-full cursor-pointer accent-[#D6FF70]"
              />

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className="flex h-10 w-10 items-center justify-center hover:text-[#D6FF70]"
                >
                  {playing ? (
                    <Pause size={19} />
                  ) : (
                    <Play size={19} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="flex h-10 w-10 items-center justify-center hover:text-[#D6FF70]"
                >
                  {muted ? (
                    <VolumeX size={19} />
                  ) : (
                    <Volume2 size={19} />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Project identification */}
      <div className="flex flex-col gap-5 border-t border-white/20 pt-7 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <span className="mt-2 text-[11px] text-white/35">
            / {data.number}
          </span>

          <div>
            <h3 className="text-[clamp(1.7rem,2.6vw,3rem)] font-medium tracking-[-0.065em]">
              {data.company}
            </h3>

            <p className="mt-3 text-[10px] uppercase tracking-[0.13em] text-white/45">
              {data.client} — {data.category}
            </p>
          </div>
        </div>

        {data.project && (
          <Link
            href={data.project}
            className="inline-flex shrink-0 items-center gap-2 self-start border-b border-white/30 pb-2 text-[11px] hover:border-[#D6FF70] hover:text-[#D6FF70]"
          >
            View project
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section
      id="client-stories"
      aria-labelledby="testimonials-title"
      className={`${manrope.className} overflow-hidden bg-[#101010] text-[#F1F0EC] selection:bg-[#D6FF70] selection:text-black`}
    >
      <div className="mx-auto max-w-[1800px] px-6 pb-24 pt-24 md:px-12 md:pb-36 md:pt-32 xl:px-20 xl:pb-40 xl:pt-40">
        {/* SECTION IDENTIFIER */}
        <Reveal>
          <div className="flex items-center justify-between gap-5 border-t border-white/25 pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
              05 / Client stories
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
              Perspectives from our work
            </span>
          </div>
        </Reveal>

        {/* HEADLINE */}
        <div className="grid grid-cols-1 gap-12 pb-24 pt-20 md:pb-32 md:pt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <Reveal>
              <h2
                id="testimonials-title"
                className="text-[clamp(3.5rem,9.2vw,10.5rem)] font-semibold leading-[0.94] tracking-[-0.09em]"
              >
                Their words.
                <br />
                <span
                  className={`${instrument.className} font-normal italic tracking-[-0.065em] text-[#D6FF70]`}
                >
                  Not ours.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end lg:col-span-3">
            <Reveal delay={100}>
              <span className="mb-5 block h-[7px] w-[7px] bg-[#D6FF70]" />
              <p className="max-w-[310px] text-[14px] leading-[1.85] text-white/50 md:text-[15px]">
                A closer look at the people,
                businesses, and collaborations
                behind the work we create.
              </p>
            </Reveal>
          </div>
        </div>

        {/* VIDEO INTRO */}
        <Reveal>
          <div className="mb-10 flex items-center justify-between gap-4 border-t border-white/20 pt-5 md:mb-14">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              In their own words
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">
              Client films / 001—002
            </span>
          </div>
        </Reveal>

        {/* BALANCED TWO-COLUMN VIDEO LAYOUT */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-6 xl:gap-10">
          {clientVideos.map((video, index) => (
            <Reveal key={video.number} delay={index * 100}>
              <ClientVideo data={video} />
            </Reveal>
          ))}
        </div>

        {/* EDITORIAL STATEMENT */}
        <div className="grid grid-cols-1 gap-10 pb-28 pt-36 md:pb-36 md:pt-44 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/40">
                More than a finished website
              </span>
              <div className="mt-8 h-px w-12 bg-[#D6FF70]" />
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="max-w-[1000px] text-[clamp(2rem,4.4vw,5rem)] font-medium leading-[1.19] tracking-[-0.065em]">
                Great work starts with
                understanding people.
                <span className="text-white/35">
                  {" "}And ends with building
                  something they can believe in.
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* WRITTEN TESTIMONIALS
            Hidden until real, approved reviews replace
            the draft names and copy in the data array. */}
        {SHOW_APPROVED_WRITTEN_TESTIMONIALS && (
          <div className="border-t border-white/25">
            <div className="flex items-center justify-between py-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                A few more perspectives
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">
                Written stories / 003
              </span>
            </div>

            <div className="grid grid-cols-1 border-t border-white/15 lg:grid-cols-3">
              {writtenTestimonials.map((review, index) => (
                <div
                  key={review.number}
                  className={`border-b border-white/15 py-12 lg:border-b-0 lg:py-14 ${
                    index === 0
                      ? "lg:pr-10"
                      : "lg:border-l lg:border-white/15 lg:px-10"
                  }`}
                >
                  <Reveal delay={index * 90}>
                    <div className="flex min-h-[340px] flex-col justify-between gap-14">
                      <div>
                        <div className="mb-12 flex justify-between text-[11px] text-white/35">
                          <span>/ {review.number}</span>
                          <span>LAYOUTORY</span>
                        </div>

                        <span
                          aria-hidden="true"
                          className={`${instrument.className} block text-[90px] leading-[0.6] text-[#D6FF70]`}
                        >
                          “
                        </span>

                        <blockquote className="mt-7 text-[clamp(1.3rem,1.9vw,1.9rem)] font-medium leading-[1.5] tracking-[-0.04em]">
                          {review.quote}
                        </blockquote>
                      </div>

                      <div className="border-t border-white/15 pt-6">
                        <span className="block text-[13px] font-medium">
                          {review.name}
                        </span>
                        <span className="mt-2 block text-[10px] uppercase tracking-[0.13em] text-white/40">
                          {review.role}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLOSING LINK */}
        <div className="grid grid-cols-1 gap-12 border-t border-white/25 pt-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="max-w-[310px] text-[13px] leading-[1.9] text-white/45">
              Discover the thinking, design,
              and development behind selected
              Layoutory projects.
            </p>
          </div>

          <div className="md:col-span-7">
            <Link
              href="/work"
              className="group flex items-center justify-between gap-6 border-b border-white/45 pb-5 transition-colors hover:border-[#D6FF70] hover:text-[#D6FF70]"
            >
              <span className="text-[clamp(1.9rem,3.8vw,4rem)] font-medium leading-[1.12] tracking-[-0.065em]">
                Explore selected work
              </span>

              <ArrowRight
                size={28}
                strokeWidth={1.3}
                className="shrink-0 transition-transform duration-300 motion-safe:group-hover:translate-x-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
