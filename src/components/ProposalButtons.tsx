"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { synth } from "@/utils/synth";

interface ProposalButtonsProps {
  onYesPressed: () => void;
  onNoPressed: () => void;
}

const RUNAWAY_LABELS = [
  "NO 🙃",
  "Really? Becky? 🤨",
  "Are you sure? 🥺",
  "Nice try! Becky 😜",
  "Almost! 💨",
  "Permission Denied 🚫",
  "Access Refused 🔒",
  "Illegal Move 🛑",
  "That won't work ⚡",
  "Still chasing me? 🏃‍♀️",
  "You are persistent! Becky 😅",
  "System Error ⚠️",
  "Nope 🙅‍♀️",
  "Nice attempt! 🏆",
  "Daniel disabled this option 👨‍💻",
  "Fine... I'll stay still soon... 🙄",
];

export default function ProposalButtons({ onYesPressed, onNoPressed }: ProposalButtonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleNoInteraction = () => {
    if (attempts >= 10) {
      // If it has stopped running, they can click NO
      if (synth) synth.playPop();
      onNoPressed();
      return;
    }

    // Play spring whoosh sound effect!
    if (synth) synth.playSpring();

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height || 300;

      // Safe boundaries for the button to jump to (relative offsets from parent center)
      const padding = 15;
      const buttonWidth = 140;
      const buttonHeight = 44;

      const maxX = containerWidth / 2 - buttonWidth / 2 - padding;
      const minX = -containerWidth / 2 + buttonWidth / 2 + padding;
      const maxY = containerHeight / 2 - buttonHeight / 2 - padding;
      const minY = -containerHeight / 2 + buttonHeight / 2 + padding;

      let newX = Math.random() * (maxX - minX) + minX;
      let newY = Math.random() * (maxY - minY) + minY;

      // Avoid landing directly in the center where the YES button is (around 0,0)
      if (Math.abs(newX) < 95 && Math.abs(newY) < 60) {
        newX = newX > 0 ? newX + 85 : newX - 85;
        newY = newY > 0 ? newY + 65 : newY - 65;
      }

      // Constrain position to actual bounds
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      // Vary the transitions
      const index = nextAttempts % 5;
      if (index === 0) {
        // Teleport (instant)
        setScale(1.15);
        setRotation(0);
      } else if (index === 1) {
        // Rotate and Slide
        setScale(1);
        setRotation(Math.random() * 24 - 12);
      } else if (index === 2) {
        // Teleport and tilt
        setScale(0.9);
        setRotation(Math.random() * 36 - 18);
      } else {
        // Slide with scale bounce
        setScale(1.05);
        setRotation(Math.random() * 16 - 8);
      }

      setPosition({ x: newX, y: newY });
    }
  };

  const getNoButtonLabel = () => {
    if (attempts >= 10) {
      return "Okay... this time I'll stay. Whatever you choose, your decision matters Becky ❤️";
    }
    return RUNAWAY_LABELS[Math.min(attempts, RUNAWAY_LABELS.length - 1)];
  };

  const handleYesClick = () => {
    // Play romantic YES arpeggiated sound effect!
    if (synth) synth.playYesSwell();
    onYesPressed();
  };

  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[320px] relative mt-4">
      {/* Container holding the buttons */}
      <div 
        ref={containerRef} 
        className="w-full max-w-md h-[240px] flex items-center justify-center relative rounded-2xl border border-black/5 bg-neutral-50/50 p-4"
      >
        {/* YES BUTTON (Always centered, prominent, fixed) */}
        <motion.button
          onClick={handleYesClick}
          className="px-8 py-4 bg-black text-white hover:bg-neutral-900 font-bold text-lg rounded-full shadow-none transition-all duration-300 transform active:scale-95 flex items-center gap-2 select-none cursor-pointer z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          YES ❤️
        </motion.button>

        {/* NO BUTTON (Runs away, position: absolute relative to parent center) */}
        <motion.div
          style={{
            position: "absolute",
            x: attempts >= 10 ? 0 : position.x,
            y: attempts >= 10 ? 70 : position.y,
            zIndex: attempts >= 10 ? 10 : 20,
          }}
          animate={attempts >= 10 ? { x: 0, y: 70 } : {
            x: position.x,
            y: position.y,
            rotate: rotation,
            scale: scale,
          }}
          transition={
            attempts % 5 === 0 || attempts % 5 === 2
              ? { type: "keyframes", duration: 0 } // Instantly jump
              : { type: "spring", stiffness: 300, damping: 20 } // Smooth spring slide
          }
        >
          <button
            onMouseEnter={!isMobile ? handleNoInteraction : undefined}
            onTouchStart={isMobile ? handleNoInteraction : undefined}
            onClick={attempts >= 10 ? handleNoInteraction : handleNoInteraction}
            className={`px-5 py-3 font-semibold text-sm rounded-full transition-all select-none cursor-pointer text-center max-w-[280px] md:max-w-xs ${
              attempts >= 10
                ? "bg-white text-neutral-500 border border-neutral-300 hover:bg-neutral-50"
                : "bg-white text-black border-2 border-black hover:bg-neutral-50"
            }`}
          >
            {getNoButtonLabel()}
          </button>
        </motion.div>
      </div>

      {attempts > 0 && attempts < 10 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="text-xs text-neutral-400 mt-2 select-none"
        >
          Attempts: {attempts} / 10
        </motion.p>
      )}
    </div>
  );
}
