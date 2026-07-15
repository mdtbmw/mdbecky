"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { synth } from "@/utils/synth";

interface QuizScreenProps {
  onSuccess: () => void;
}

const QUIZ_OPTIONS = [
  { id: "A", text: "Block him. 🛑", isCorrect: false },
  { id: "B", text: "Ignore him forever. 🔕", isCorrect: false },
  { id: "C", text: "Pretend this never happened. 🫣", isCorrect: false },
  { id: "D", text: "Hear him out. 💬", isCorrect: true },
];

export default function QuizScreen({ onSuccess }: QuizScreenProps) {
  const [shakingOption, setShakingOption] = useState<string | null>(null);

  const handleOptionClick = (id: string, isCorrect: boolean) => {
    if (isCorrect) {
      if (synth) synth.playChime();
      onSuccess();
    } else {
      // Play buzzer sound
      if (synth) synth.playBuzzer();
      
      // Trigger wiggle shake animation
      setShakingOption(id);
      setTimeout(() => setShakingOption(null), 500);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center py-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">QUIZ</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2 select-none">
          What should happen next?
        </h2>
      </div>

      {/* Options Cards */}
      <div className="w-full max-w-md flex flex-col gap-3 my-8 select-none">
        {QUIZ_OPTIONS.map((option) => {
          const isShaking = shakingOption === option.id;
          return (
            <motion.div
              key={option.id}
              onClick={() => handleOptionClick(option.id, option.isCorrect)}
              animate={isShaking ? {
                x: [0, -10, 10, -10, 10, -5, 5, 0],
              } : {}}
              transition={{ duration: 0.4 }}
              className={`p-4 md:p-5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-colors ${
                isShaking
                  ? "border-red-500 bg-red-50/50 text-red-900"
                  : "border-black bg-white hover:bg-accent hover:border-black text-black active:scale-[0.98]"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center font-mono font-bold text-sm">
                  {option.id}
                </span>
                <span className="font-semibold text-base">{option.text}</span>
              </div>
              
              <span className="text-xs font-mono opacity-40">
                {option.isCorrect ? "Correct Option" : "Risky Option"}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Info indicator */}
      <p className="text-xs text-neutral-400 italic text-center max-w-xs">
        Choose wisely. There is only one correct path forward...
      </p>
    </div>
  );
}
