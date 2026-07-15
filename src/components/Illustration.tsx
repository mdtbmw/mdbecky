"use client";

import DetectiveIllustration from "./illustrations/DetectiveIllustration";
import PoliceIllustration from "./illustrations/PoliceIllustration";
import RobotIllustration from "./illustrations/RobotIllustration";
import JudgeIllustration from "./illustrations/JudgeIllustration";
import PanicIllustration from "./illustrations/PanicIllustration";
import HeartIllustration from "./illustrations/HeartIllustration";
import PartyIllustration from "./illustrations/PartyIllustration";
import { motion } from "framer-motion";

interface IllustrationProps {
  name:
    | "detective"
    | "police"
    | "robot"
    | "judge"
    | "panic"
    | "heart"
    | "party"
    | "laughing"
    | "thinking"
    | "happy"
    | "confetti"
    | "love";
  className?: string;
}

export default function Illustration({ name, className = "" }: IllustrationProps) {
  const containerClass = `inline-flex items-center justify-center ${className}`;

  switch (name) {
    case "detective":
      return <div className={containerClass}><DetectiveIllustration /></div>;
    case "police":
      return <div className={containerClass}><PoliceIllustration /></div>;
    case "robot":
      return <div className={containerClass}><RobotIllustration /></div>;
    case "judge":
      return <div className={containerClass}><JudgeIllustration /></div>;
    case "panic":
      return <div className={containerClass}><PanicIllustration /></div>;
    case "heart":
      return <div className={containerClass}><HeartIllustration /></div>;
    case "party":
      return <div className={containerClass}><PartyIllustration /></div>;

    case "laughing":
      return (
        <div className={containerClass}>
          <div className="relative w-48 h-48 flex items-center justify-center select-none">
            <motion.div
              className="absolute w-36 h-36 rounded-full bg-accent/20 -z-10 animate-pulse-soft"
            />
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-float-fast">
              {/* Face */}
              <circle cx="70" cy="75" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />
              {/* Laughing Squinting Eyes */}
              <path d="M42 68L56 74L42 80" stroke="#000000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M98 68L84 74L98 80" stroke="#000000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Laughing Mouth */}
              <motion.path
                d="M45 92C45 92 50 115 70 115C90 115 95 92 95 92Z"
                fill="#000000"
                stroke="#000000"
                strokeWidth="6"
                strokeLinejoin="round"
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <path d="M50 92H90" stroke="#FFFFFF" strokeWidth="4" />
              <path d="M58 102C62 98 78 98 82 102" fill="#FFD54A" />
              {/* Tears of joy */}
              <motion.path
                d="M30 75C25 80 20 70 30 75Z"
                fill="#FFD54A"
                stroke="#000000"
                strokeWidth="2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <motion.path
                d="M110 75C115 80 120 70 110 75Z"
                fill="#FFD54A"
                stroke="#000000"
                strokeWidth="2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.2, delay: 0.3, repeat: Infinity }}
              />
            </svg>
          </div>
        </div>
      );

    case "thinking":
      return (
        <div className={containerClass}>
          <div className="relative w-48 h-48 flex items-center justify-center select-none">
            <motion.div
              className="absolute w-36 h-36 rounded-full bg-accent/20 -z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-float-slow">
              {/* Thinking Face */}
              <circle cx="70" cy="70" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />
              {/* Eyes looking up */}
              <circle cx="52" cy="60" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
              <circle cx="50" cy="56" r="4" fill="#000000" />
              <circle cx="88" cy="60" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
              <circle cx="86" cy="56" r="4" fill="#000000" />
              {/* Eyebrows angled */}
              <path d="M42 46C46 44 54 46 58 50" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
              <path d="M98 46C94 44 86 46 82 50" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
              {/* Confused/thinking mouth */}
              <path d="M58 90C62 87 72 87 82 90" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
              {/* Thinking Hand */}
              <motion.g
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M45 105C45 105 40 115 50 120C60 125 75 120 75 120L70 102"
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <circle cx="48" cy="106" r="3" fill="#000000" />
              </motion.g>
            </svg>
          </div>
        </div>
      );

    case "happy":
      return (
        <div className={containerClass}>
          <div className="relative w-48 h-48 flex items-center justify-center select-none">
            <motion.div
              className="absolute w-36 h-36 rounded-full bg-accent/20 -z-10"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-float-slow">
              {/* Face */}
              <circle cx="70" cy="75" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />
              {/* Happy Arc Eyes */}
              <path d="M45 74C48 68 58 68 61 74" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
              <path d="M79 74C82 68 92 68 95 74" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
              {/* Blush cheeks */}
              <circle cx="42" cy="85" r="7" fill="#FFD54A" />
              <circle cx="98" cy="85" r="7" fill="#FFD54A" />
              {/* Smile */}
              <path d="M54 90C58 98 82 98 86 90" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      );

    case "confetti":
      return (
        <div className={containerClass}>
          <div className="relative w-48 h-48 flex items-center justify-center select-none">
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Rain of Confetti elements */}
              {[...Array(6)].map((_, i) => (
                <motion.rect
                  key={i}
                  x={20 + i * 20}
                  y="10"
                  width="8"
                  height="12"
                  rx="2"
                  fill={i % 2 === 0 ? "#FFD54A" : "#000000"}
                  animate={{
                    y: [0, 120],
                    rotate: [0, 360],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
              {/* Sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={35 + i * 25}
                  cy={30 + (i % 2) * 40}
                  r="4"
                  fill="#FFD54A"
                  animate={{
                    scale: [0.5, 1.2, 0.5],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.4,
                    repeat: Infinity,
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      );

    case "love":
      return (
        <div className={containerClass}>
          <div className="relative w-48 h-48 flex items-center justify-center select-none">
            <motion.div
              className="absolute w-36 h-36 rounded-full bg-accent/25 -z-10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-float-slow">
              {/* Face */}
              <circle cx="70" cy="75" r="45" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />
              {/* Heart Eyes */}
              <motion.g
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ transformOrigin: "70px 75px" }}
              >
                {/* Left Heart Eye */}
                <path
                  d="M50 72C50 72 38 62 38 52C38 46 43 41 49 41C52 41 54 44 54 44C54 44 56 41 59 41C65 41 70 46 70 52C70 62 58 72 58 72Z"
                  fill="#FFD54A"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  transform="translate(-4, 10) scale(0.8)"
                />
                {/* Right Heart Eye */}
                <path
                  d="M50 72C50 72 38 62 38 52C38 46 43 41 49 41C52 41 54 44 54 44C54 44 56 41 59 41C65 41 70 46 70 52C70 62 58 72 58 72Z"
                  fill="#FFD54A"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  transform="translate(28, 10) scale(0.8)"
                />
              </motion.g>
              {/* Heart mouth / blush */}
              <circle cx="40" cy="88" r="6" fill="#FFD54A" />
              <circle cx="100" cy="88" r="6" fill="#FFD54A" />
              <path d="M58 92C62 98 78 98 82 92" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      );

    default:
      return null;
  }
}
