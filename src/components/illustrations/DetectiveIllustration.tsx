"use client";

import { motion } from "framer-motion";

export default function DetectiveIllustration() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center select-none">
      {/* Background decorative elements */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-accent/20 -z-10"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Tiny floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-accent"
          style={{
            top: `${20 + i * 30}%`,
            left: `${15 + i * 25}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Face */}
        <motion.circle
          cx="70"
          cy="75"
          r="45"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="6"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Detective Hat */}
        <motion.g
          animate={{ y: [0, -5, 0], rotate: [0, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Hat Brim */}
          <path
            d="M20 38C20 38 45 35 70 35C95 35 120 38 120 38C120 38 115 46 70 46C25 46 20 38 20 38Z"
            fill="#000000"
            stroke="#000000"
            strokeWidth="2"
          />
          {/* Hat Crown */}
          <path
            d="M38 36C38 36 40 10 70 10C100 10 102 36 102 36"
            fill="#000000"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Yellow Hat Ribbon */}
          <path
            d="M37 32C50 30 90 30 103 32L102 36C90 34 50 34 38 36L37 32Z"
            fill="#FFD54A"
          />
        </motion.g>

        {/* Blinking Eyes */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left Eye */}
          <motion.ellipse
            cx="55"
            cy="75"
            rx="5"
            ry="7"
            fill="#000000"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />
          {/* Right Eye */}
          <motion.ellipse
            cx="85"
            cy="75"
            rx="5"
            ry="7"
            fill="#000000"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />
        </motion.g>

        {/* Smile */}
        <motion.path
          d="M60 88C64 92 76 92 80 88"
          stroke="#000000"
          strokeWidth="5"
          strokeLinecap="round"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Magnifying Glass */}
        <motion.g
          animate={{
            x: [0, 8, -4, 0],
            y: [0, -8, 4, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Handle */}
          <line
            x1="98"
            y1="98"
            x2="120"
            y2="120"
            stroke="#000000"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Glass Rim */}
          <circle
            cx="82"
            cy="82"
            r="20"
            fill="#FFD54A"
            fillOpacity="0.3"
            stroke="#000000"
            strokeWidth="6"
          />
          {/* Reflection Glare */}
          <path
            d="M72 72C75 69 79 69 82 72"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  );
}
