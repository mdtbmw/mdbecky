"use client";

import { motion } from "framer-motion";

export default function RobotIllustration() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center select-none">
      {/* Background soft pulse */}
      <motion.div
        className="absolute w-36 h-36 rounded-2xl bg-accent/15 -z-10"
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Antenna */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Mast */}
          <line
            x1="70"
            y1="40"
            x2="70"
            y2="15"
            stroke="#000000"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Glowing Tip */}
          <motion.circle
            cx="70"
            cy="12"
            r="8"
            fill="#FFD54A"
            stroke="#000000"
            strokeWidth="4"
            animate={{
              fill: ["#FFD54A", "#FFFFFF", "#FFD54A"],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>

        {/* Head */}
        <motion.rect
          x="30"
          y="40"
          width="80"
          height="70"
          rx="16"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="6"
          animate={{ y: [0, 2, 0], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ears (Bolts) */}
        <motion.g
          animate={{ y: [0, 2, 0], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left Bolt */}
          <rect x="18" y="60" width="12" height="20" rx="4" fill="#000000" />
          {/* Right Bolt */}
          <rect x="110" y="60" width="12" height="20" rx="4" fill="#000000" />
        </motion.g>

        {/* Robot Eyes */}
        <motion.g
          animate={{ y: [0, 2, 0], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left Eye Socket */}
          <circle cx="53" cy="70" r="14" fill="#FFD54A" stroke="#000000" strokeWidth="4" />
          {/* Left Pupil */}
          <motion.circle
            cx="53"
            cy="70"
            r="5"
            fill="#000000"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2 }}
          />
          {/* Right Eye Socket */}
          <circle cx="87" cy="70" r="14" fill="#FFD54A" stroke="#000000" strokeWidth="4" />
          {/* Right Pupil */}
          <motion.circle
            cx="87"
            cy="70"
            r="5"
            fill="#000000"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.g>

        {/* Mouth/Meter screen */}
        <motion.g
          animate={{ y: [0, 2, 0], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Meter Box */}
          <rect x="46" y="92" width="48" height="10" rx="4" fill="#000000" />
          {/* Sound Wave bars */}
          {[...Array(5)].map((_, i) => (
            <motion.rect
              key={i}
              x={51 + i * 8}
              y={94}
              width="4"
              height="6"
              fill="#FFD54A"
              animate={{
                scaleY: [1, 1.8, 0.6, 1],
                y: [0, -2, 1, 0],
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>

        {/* Body Neck */}
        <path
          d="M55 110H85V122H55V110Z"
          fill="#000000"
        />
        
        {/* Collar Collar */}
        <path
          d="M40 122H100V130H40V122Z"
          fill="#FFD54A"
          stroke="#000000"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}
