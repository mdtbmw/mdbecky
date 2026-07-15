"use client";

import { motion } from "framer-motion";

export default function PoliceIllustration() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center select-none">
      {/* Flashing Police Siren Background */}
      <motion.div
        className="absolute w-44 h-44 rounded-full -z-10"
        animate={{
          backgroundColor: ["rgba(255,213,74,0)", "rgba(255,213,74,0.25)", "rgba(255,213,74,0)"],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 1.5,
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
        {/* Head */}
        <motion.circle
          cx="70"
          cy="75"
          r="42"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="6"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Police Cap */}
        <motion.g
          animate={{ y: [0, 3, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Cap Crown */}
          <path
            d="M33 46C33 26 45 15 70 15C95 15 107 26 107 46"
            fill="#000000"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Cap Visor */}
          <path
            d="M24 45C24 45 45 52 70 52C95 52 116 45 116 45C116 45 108 58 70 58C32 58 24 45 24 45Z"
            fill="#000000"
          />
          {/* Cap Ribbon (Yellow) */}
          <path
            d="M31 43C50 40 90 40 109 43L107 47C90 44 50 44 33 47L31 43Z"
            fill="#FFD54A"
          />
          {/* Gold Badge on Cap */}
          <path
            d="M70 24L75 29L74 36L70 39L66 36L65 29L70 24Z"
            fill="#FFD54A"
            stroke="#000000"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Blinking Eyes */}
        <motion.g
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.circle
            cx="55"
            cy="76"
            r="6"
            fill="#000000"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="85"
            cy="76"
            r="6"
            fill="#000000"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Mustache or Smile */}
        {/* We'll use a cute playful whistle/smile mouth */}
        <motion.circle
          cx="70"
          cy="92"
          r="5"
          fill="#000000"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Whistle blowing detail (small music notes or whistles) */}
        <motion.path
          d="M78 92H88"
          stroke="#000000"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Badge on chest */}
        <motion.g
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M70 110L78 116L76 126L70 131L64 126L62 116L70 110Z"
            fill="#FFD54A"
            stroke="#000000"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Star on Badge */}
          <path
            d="M70 115L72 119H76L73 121L74 125L70 123L66 125L67 121L64 119H68L70 115Z"
            fill="#000000"
          />
        </motion.g>
      </svg>
    </div>
  );
}
