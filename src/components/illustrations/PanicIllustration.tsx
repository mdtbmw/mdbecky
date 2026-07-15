"use client";

import { motion } from "framer-motion";

export default function PanicIllustration() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center select-none">
      {/* Background jittery circle */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-accent/25 -z-10"
        animate={{
          x: [0, -3, 3, -2, 2, 0],
          y: [0, 2, -2, 1, -1, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dripping sweat drop 1 */}
      <motion.div
        className="absolute w-3 h-5 bg-accent rounded-full border border-black"
        style={{ top: "35%", left: "20%" }}
        animate={{
          y: [0, 40],
          opacity: [1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeIn",
        }}
      />
      {/* Dripping sweat drop 2 */}
      <motion.div
        className="absolute w-3 h-5 bg-accent rounded-full border border-black"
        style={{ top: "45%", right: "20%" }}
        animate={{
          y: [0, 35],
          opacity: [1, 0],
        }}
        transition={{
          duration: 1.2,
          delay: 0.6,
          repeat: Infinity,
          ease: "easeIn",
        }}
      />

      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-float-fast"
      >
        <motion.g
          animate={{
            x: [0, -1.5, 1.5, -1, 1, 0],
            y: [0, 1, -1, 0.5, -0.5, 0],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
          }}
        >
          {/* Main Face */}
          <circle cx="70" cy="75" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />

          {/* Screaming/Wide Open Mouth */}
          <ellipse cx="70" cy="98" rx="15" ry="12" fill="#000000" />
          {/* Tongue/Inner Mouth (Yellow Accent) */}
          <path d="M60 102C63 97 77 97 80 102C78 106 62 106 60 102Z" fill="#FFD54A" />

          {/* Wide Eyes */}
          {/* Left Eye */}
          <circle cx="50" cy="68" r="12" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
          <motion.circle
            cx="50"
            cy="68"
            r="5"
            fill="#000000"
            animate={{
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          {/* Right Eye */}
          <circle cx="90" cy="68" r="12" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
          <motion.circle
            cx="90"
            cy="68"
            r="5"
            fill="#000000"
            animate={{
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Worry eyebrows */}
          <path d="M38 52C42 48 52 50 56 53" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          <path d="M102 52C98 48 88 50 84 53" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

          {/* Hands holding face */}
          {/* Left Hand */}
          <path
            d="M20 95C25 90 32 94 30 105C28 112 25 116 20 112C15 108 15 100 20 95Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="5"
          />
          <line x1="22" y1="100" x2="28" y2="100" stroke="#000000" strokeWidth="3" />
          
          {/* Right Hand */}
          <path
            d="M120 95C115 90 108 94 110 105C112 112 115 116 120 112C125 108 125 100 120 95Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="5"
          />
          <line x1="118" y1="100" x2="112" y2="100" stroke="#000000" strokeWidth="3" />
        </motion.g>
      </svg>
    </div>
  );
}
