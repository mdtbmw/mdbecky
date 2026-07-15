"use client";

import { motion } from "framer-motion";

export default function HeartIllustration() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center select-none">
      {/* Back pulse ring */}
      <motion.div
        className="absolute w-28 h-28 rounded-full bg-accent/20 -z-10"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating mini hearts */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-accent text-lg"
          style={{
            bottom: "20%",
            left: `${35 + i * 10}%`,
          }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: [-10, -70],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ❤️
        </motion.div>
      ))}

      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.g
          animate={{
            scale: [1, 1.08, 0.98, 1.05, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "70px 70px" }}
        >
          {/* Main Heart Path */}
          <path
            d="M70 115C70 115 20 85 20 48C20 28 36 12 55 12C65 12 70 20 70 20C70 20 75 12 85 12C104 12 120 28 120 48C120 85 70 115 70 115Z"
            fill="#FFD54A"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Heart Accent Reflection */}
          <path
            d="M40 32C32 40 32 50 32 50"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  );
}
