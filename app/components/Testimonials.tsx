"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Quote } from "lucide-react";

// --- TESTIMONIALS DATA ---
const testimonials = [
  {
    id: 1,
    quote: "CLEAN UI, SMOOTH INTERACTIONS, AND THOUGHTFUL DETAILS, IT'S EXACTLY WHAT WE NEEDED.",
    name: "Thiago Alcatara",
    title: "MARKETING MANAGEMENT, ABC JSC",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    align: "right",
  },
  {
    id: 2,
    quote: "WORKING WITH BHAVYA WAS A GAME-CHANGER. THE DESIGN WAS BEAUTIFUL AND SUPER INTUITIVE.",
    name: "Bobby Clarkson",
    title: "CEO FOUNDER, AGENCIFY",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    align: "left",
  },
  {
    id: 3,
    quote: "10 POINTS!!! NOTHING TO SAY. BEST DESIGNER WITH ME.",
    name: "Nathan Drake",
    title: "DESIGN LEAD, BRUNO",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    align: "right",
  },
];

export default function Testimonials() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // --- VIDEO HANDLERS ---
  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        setIsPlaying(true);
        await video.play();
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Playback error:", err);
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && videoRef.current.duration) {
      const seekTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
    }
  };

  return (
    <section
      className="relative w-full bg-[#050505] border-t border-white/5 pb-32 overflow-hidden"
    >
      {/* -------------------- PERMANENT BACKGROUND -------------------- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        
        {/* 1. Grid Pattern (Static Base) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
        
        {/* 2. Rotating Text Badge (Centered & Fixed) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             className="w-full h-full"
           >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text className="text-[5px] fill-white font-bold uppercase tracking-[0.18em]">
                  <textPath href="#circlePath">
                    • Trusted Results • Client Success • Proven Growth • Trusted Results • Client Success • Proven Growth
                  </textPath>
                </text>
              </svg>
           </motion.div>
        </div>

        {/* 3. Central Glow to highlight the video area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/5 blur-[120px] rounded-full"></div>
      </div>

      {/* -------------------- CONTENT WRAPPER -------------------- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-12 pt-32">
        
        {/* Title */}
        <div className="w-full flex justify-between items-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-24 max-w-7xl mx-auto">
          <span>//</span>
          <span className="text-white font-bold tracking-widest">
            CLIENT VOICES
          </span>
          <span>//</span>
        </div>

        {/* --- HERO: VIDEO CARD --- */}
        <div className="flex justify-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md aspect-[3/4] rounded-[2rem] overflow-hidden border-[4px] border-[#1a1a1a] bg-[#0A0A0A] shadow-[0_0_50px_-10px_rgba(255,255,255,0.05)] group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
              {/* VIDEO ELEMENT */}
              <video 
                  ref={videoRef}
                  src="/testimonial.mp4" 
                  className="w-full h-full object-cover scale-[1.02]" 
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
              />

              {/* FLOATING INFO PILLS */}
              <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 items-start pointer-events-none">
                  {/* Name Pill */}
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#2a2a2a]/90 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg"
                  >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-white font-bold text-[10px] tracking-widest uppercase">Paul</span>
                  </motion.div>
                  
                  {/* Company Pill */}
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#1a1a1a]/80 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-full shadow-lg"
                  >
                      <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Pivotal Builders Inc.</span>
                  </motion.div>
              </div>

              {/* CUSTOM CONTROLS OVERLAY */}
              <AnimatePresence>
                  {showControls && (
                      <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex flex-col justify-end"
                      >
                          {/* Center Play Button */}
                          {!isPlaying && (
                               <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                   <button 
                                      onClick={togglePlay}
                                      className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 group/play"
                                   >
                                       <Play fill="white" className="ml-1 w-6 h-6 text-white group-hover/play:text-cyan-400 transition-colors" />
                                   </button>
                               </div>
                          )}

                          {/* Bottom Gradient Shade */}
                          <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12">
                            <div className="flex flex-col gap-3">
                                {/* Timeline */}
                                <div 
                                    className="w-full h-1 bg-white/20 rounded-full cursor-pointer hover:h-1.5 transition-all group/seek"
                                    onClick={handleSeek}
                                >
                                    <div 
                                        className="h-full bg-cyan-400 rounded-full relative"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg scale-0 group-hover/seek:scale-100 transition-transform"></div>
                                    </div>
                                </div>

                                {/* Controls Row */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <button onClick={togglePlay} className="text-white hover:text-cyan-400 transition-colors">
                                            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                        </button>
                                        <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
                                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                        </button>
                                    </div>
                                    
                                    <span className="text-[10px] font-mono text-white/50">
                                      00:{Math.floor(videoRef.current?.currentTime || 0).toString().padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>
          </motion.div>
        </div>


        {/* --- TEXT TESTIMONIALS --- */}
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`flex w-full mb-8 md:mb-24 ${
              t.align === "right" ? "md:justify-end justify-center" : "md:justify-start justify-center"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-[400px] md:max-w-[500px] bg-[#0A0A0A] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative group hover:border-white/20 transition-colors duration-500"
            >
              <div className="absolute -top-5 left-8 bg-[#0A0A0A] border border-white/10 p-2.5 rounded-full">
                 <Quote size={18} className="text-gray-500" />
              </div>

              <div className="mt-4 mb-8">
                 <p className="font-sans font-medium text-sm md:text-lg text-white/90 leading-relaxed relative z-10">
                    "{t.quote}"
                 </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div>
                  <h4 className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">
                    {t.name}
                  </h4>
                  <p className="text-gray-500 text-[9px] md:text-[10px] font-mono uppercase tracking-wider">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}

      </div>
    </section>
  );
}