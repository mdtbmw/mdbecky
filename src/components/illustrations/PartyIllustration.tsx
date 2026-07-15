"use client";

import { motion } from "framer-motion";

export default function PartyIllustration() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center select-none">
      {/* Confetti bursting particles */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const xDist = Math.cos(angle) * 60;
        const yDist = Math.sin(angle) * 60 - 20; // Bias upward
        return (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-sm ${i % 2 === 0 ? "bg-accent" : "bg-black"}`}
            style={{
              top: "40%",
              left: "45%",
            }}
            initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.2, 0.8, 0],
              x: [0, xDist],
              y: [0, yDist],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        );
      })}

      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Streamers */}
        <motion.g
          animate={{
            scale: [0.9, 1.1, 0.9],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "40px 100px" }}
        >
          {/* Streamer 1 */}
          <path
            d="M50 70C60 60 70 65 85 50C90 45 92 35 95 25"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Streamer 2 (Yellow) */}
          <path
            d="M65 80C80 70 85 75 100 65C108 58 112 50 118 40"
            stroke="#FFD54A"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Sparkles */}
          <path d="M105 20L115 15" stroke="#FFD54A" strokeWidth="3" strokeLinecap="round" />
          <path d="M110 10L100 15" stroke="#FFD54A" strokeWidth="3" strokeLinecap="round" />
          <path d="M125 30L135 32" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Party Popper Cone */}
        <motion.g
          animate={{
            x: [0, -4, 0],
            y: [0, 4, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "40px 100px" }}
        >
          {/* Popper Cone */}
          <path
            d="M15 115L35 65L75 95L15 115Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Yellow Stripes on Cone */}
          <path
            d="M25 90L48 75L58 83L31 98L25 90Z"
            fill="#FFD54A"
            stroke="#000000"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Popper opening rim */}
          <path
            d="M35 65L75 95"
            stroke="#000000"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Back edge details */}
          <circle cx="15" cy="115" r="4" fill="#000000" />
        </motion.g>
      </svg>
    </div>
  );
}
