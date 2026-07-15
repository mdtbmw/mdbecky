"use client";

import { motion } from "framer-motion";

export default function JudgeIllustration() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center select-none">
      {/* Background radial accent */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-accent/10 -z-10"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Sound Block */}
        <ellipse cx="70" cy="115" rx="35" ry="10" fill="#000000" />
        <ellipse cx="70" cy="110" rx="35" ry="10" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />
        <path d="M35 110V115C35 115 42 120 70 120C98 120 105 115 105 115V110H35Z" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />
        <ellipse cx="70" cy="110" rx="23" ry="5" fill="#FFD54A" />

        {/* Gavel Group (Animates pivot slamming down) */}
        <motion.g
          style={{ transformOrigin: "95px 95px" }}
          animate={{
            rotate: [0, -35, -35, 10, -5, 0],
            y: [0, -10, -10, 0, -2, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        >
          {/* Gavel Handle */}
          <line
            x1="55"
            y1="55"
            x2="95"
            y2="95"
            stroke="#000000"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Gavel Ribbon Connection (Yellow) */}
          <rect
            x="48"
            y="48"
            width="12"
            height="12"
            rx="2"
            fill="#FFD54A"
            stroke="#000000"
            strokeWidth="3"
            transform="rotate(45 54 54)"
          />

          {/* Gavel Head */}
          <motion.g>
            <rect
              x="20"
              y="20"
              width="45"
              height="30"
              rx="6"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="6"
              transform="rotate(45 42.5 35)"
            />
            {/* Gavel Bands (Yellow Highlights) */}
            <line
              x1="26"
              y1="34"
              x2="46"
              y2="54"
              stroke="#FFD54A"
              strokeWidth="4"
            />
            <line
              x1="38"
              y1="22"
              x2="58"
              y2="42"
              stroke="#FFD54A"
              strokeWidth="4"
            />
          </motion.g>
        </motion.g>

        {/* Slam Sparks / Soundwaves (Only visible during strike) */}
        <motion.g
          animate={{
            opacity: [0, 0, 0, 1, 0.5, 0],
            scale: [0.5, 0.5, 0.5, 1.2, 1.4, 1.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeOut",
          }}
        >
          {/* Left Spark */}
          <path d="M25 100L10 95" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 90L20 80" stroke="#FFD54A" strokeWidth="4" strokeLinecap="round" />
          {/* Right Spark */}
          <path d="M115 100L130 95" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          <path d="M108 90L120 80" stroke="#FFD54A" strokeWidth="4" strokeLinecap="round" />
          {/* Top Sparks */}
          <path d="M50 85L45 70" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <path d="M90 85L95 70" stroke="#FFD54A" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </svg>
    </div>
  );
}
