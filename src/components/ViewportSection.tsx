"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ViewportSectionProps {
  id: string;
  isActive: boolean;
  children: ReactNode;
  className?: string;
  bgColor?: string;
}

export default function ViewportSection({
  id,
  isActive,
  children,
  className = "",
  bgColor = "bg-transparent",
}: ViewportSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-section flex flex-col justify-between px-6 py-8 md:px-12 md:py-16 ${bgColor} ${className}`}
    >
      <motion.div
        className="w-full max-w-2xl mx-auto h-full flex flex-col justify-between items-center relative"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: { 
            opacity: 0, 
            scale: 0.96, 
            filter: "blur(10px)",
          },
          visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Custom premium easeOut (Apple style)
              staggerChildren: 0.12,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
