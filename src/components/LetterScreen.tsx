"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import { Download, RotateCcw, ArrowRight } from "lucide-react";
import { synth } from "@/utils/synth";

interface LetterScreenProps {
  name: string;
  isActive: boolean;
  onContinue: () => void;
}

export default function LetterScreen({ name, isActive, onContinue }: LetterScreenProps) {
  const [typedText, setTypedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const letterText = `Dear Becky,

If you're reading this, my heart is probably racing so fast I might need medical attention. But that's your fault — for being you.

I've replayed this moment in my head a hundred times. And every single time, I end up smiling like an idiot. Because it's you. It's always been you.

You have this way of making the ordinary feel magical. A random "good morning" text from you? Best part of my day. A voice note where you're rambling about something? I'll listen to it twice. Your laugh? I'd pay good money to hear it on loop.

I love how your brain works — the way you overthink the smallest things but somehow always land on the right answer. I love how fiercely you care about the people you love. I love that you're stubborn, because it means you fight for what matters. And somehow, you chose to let me be part of that.

I know I'm not perfect. I'm awkward, I overthink, and I definitely put way too much effort into this app. But what I feel for you is the most real thing I've ever known.

So here I am — no games, no pretending, just me. Hoping you'll take a chance on the guy who built an entire website just to tell you how crazy he is about you.

With all my heart,
Daniel`;

  useEffect(() => {
    if (!isActive) {
      setTypedText("");
      setIsDone(false);
      return;
    }

    setTypedText("");
    setIsDone(false);

    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + letterText.charAt(index));
      index++;
      
      // Play typing tick sound every 4 characters for realistic typewriter sound!
      if (index % 4 === 0 && synth) {
        synth.playTick();
      }

      // Auto scroll container down if text overflows
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }

      if (index >= letterText.length) {
        clearInterval(interval);
        setIsDone(true);
        // Play final completion chime!
        if (synth) synth.playChime();
      }
    }, 25); // 25ms is highly readable

    return () => clearInterval(interval);
  }, [isActive, letterText]);

  const handleSkip = () => {
    setTypedText(letterText);
    setIsDone(true);
    if (synth) synth.playChime();
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleRestart = () => {
    setTypedText("");
    setIsDone(false);
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + letterText.charAt(index));
      index++;
      
      if (index % 4 === 0 && synth) {
        synth.playTick();
      }

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
      if (index >= letterText.length) {
        clearInterval(interval);
        setIsDone(true);
        if (synth) synth.playChime();
      }
    }, 25);
  };

  const downloadPDF = () => {
    if (synth) synth.playPop();
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text("A Letter for Becky", 25, 35);

    doc.setLineWidth(0.5);
    doc.line(25, 42, 185, 42);

    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    
    const splitText = doc.splitTextToSize(letterText, 155);
    doc.text(splitText, 25, 55);

    doc.save(`a_special_letter_for_becky.pdf`);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center py-4 relative h-full">
      {/* Header */}
      <div className="text-center shrink-0">
        <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">LETTER EXPERIENCE</span>
        <h2 className="text-2xl md:text-3xl font-extrabold mt-2 select-none">A Message for Becky</h2>
      </div>

      {/* Floating Hearts */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-accent/30 text-xl"
              style={{
                bottom: "10%",
                left: `${10 + i * 16}%`,
              }}
              animate={{
                y: [0, -400],
                x: [0, Math.sin(i) * 30, 0],
                scale: [0.6, 1, 0.6],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 6,
                delay: i * 0.9,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      {/* Letter Body Box */}
      <div 
        ref={containerRef}
        className="w-full max-w-lg flex-1 overflow-y-auto no-scrollbar border-2 border-black rounded-3xl bg-neutral-50/50 p-6 md:p-8 my-6 relative z-10 min-h-[220px]"
      >
        <p className="font-sans text-base md:text-lg leading-relaxed whitespace-pre-line text-neutral-900 select-text">
          {typedText}
          {!isDone && <span className="inline-block w-2.5 h-5 bg-black cursor-blink ml-1 align-middle" />}
        </p>
      </div>

      {/* Control Actions / Buttons */}
      <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-3 z-10 select-none">
        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.button
              key="skip-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleSkip}
              className="text-xs font-semibold underline text-neutral-500 hover:text-black cursor-pointer py-1"
            >
              Skip typing animation
            </motion.button>
          ) : (
            <motion.div
              key="actions-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={downloadPDF}
                className="flex-1 px-5 py-3 border-2 border-black bg-white hover:bg-neutral-50 text-black font-bold text-sm rounded-full flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
              >
                <Download size={16} />
                Download Letter (PDF)
              </button>
              
              <button
                onClick={handleRestart}
                className="px-5 py-3 border-2 border-black bg-white hover:bg-neutral-50 text-black font-bold text-sm rounded-full flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
              >
                <RotateCcw size={16} />
                Read Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            if (synth) synth.playPop();
            onContinue();
          }}
          disabled={!isDone}
          className={`w-full mt-2 px-6 py-4 font-extrabold text-base rounded-full flex items-center justify-center gap-2 transition active:scale-95 ${
            isDone 
              ? "bg-black text-white hover:bg-neutral-900 cursor-pointer" 
              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          }`}
        >
          Continue
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
