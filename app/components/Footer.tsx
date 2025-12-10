"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full h-[50vh] md:h-[80vh] bg-[#050505] flex flex-col justify-end overflow-hidden">
      {/* --- BACKGROUND GLOWING ORB --- */}
      {/* This uses your footerbg.png as the massive rising sun/orb */}
      <div className="absolute inset-0 flex items-end justify-center z-0 pointer-events-none">
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 50, opacity: 1 }} // Rising effect
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-[120%] md:w-[80%] h-[120%] relative translate-y-[20%]"
        >
          <img
            src="/footerbg.avif"
            alt="Footer Glow"
            className="w-full h-full object-contain mix-blend-screen opacity-80"
          />
        </motion.div>
      </div>

      {/* --- FOOTER CONTENT STRIP --- */}
      {/* - Copyright Left, Socials Center, Back Top Right */}
      <div className="relative z-20 w-full px-6 md:px-12 pb-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
        {/* LEFT: Copyright */}
        <div className="font-display font-bold text-white uppercase text-[10px] md:text-xs tracking-widest">
          ©2025 Framer-Theme
        </div>

        {/* CENTER: Minimal Social Links (Horizontal) */}
        <div className="flex gap-6 md:gap-12">
          {[
            { name: "IG", url: "https://www.instagram.com/bhv.yeahh" },
            { name: "MAIL", url: "mailto:bhavyarathore575@gmail.com" },
            {
              name: "LinkedIn",
              url: "https://www.linkedin.com/in/bhavya-rathore",
            }, // Replace with your actual LinkedIn URL
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank" // Opens in new tab
              rel="noopener noreferrer" // Security best practice
              className="font-display font-bold text-white text-[10px] md:text-xs uppercase hover:text-gray-400 transition-colors cursor-pointer"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* RIGHT: Back To Top */}
        <button
          onClick={scrollToTop}
          className="font-display font-bold text-white uppercase text-[10px] md:text-xs tracking-widest hover:text-gray-400 transition-colors"
        >
          BACK TO TOP
        </button>
      </div>

      {/* Grid Pattern Overlay (Subtle texture over the glow) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-10 pointer-events-none opacity-30"></div>
    </footer>
  );
}
