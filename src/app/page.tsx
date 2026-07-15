"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confettiEffect from "canvas-confetti";
import { 
  Terminal, 
  ShieldAlert, 
  Check, 
  ChevronDown, 
  Lock,
  Camera
} from "lucide-react";

import { synth } from "@/utils/synth";
import Illustration from "@/components/Illustration";
import ViewportSection from "@/components/ViewportSection";
import QuizScreen from "@/components/QuizScreen";
import ProposalButtons from "@/components/ProposalButtons";
import LetterScreen from "@/components/LetterScreen";

const driftingEmojis = ["❤️", "💖", "🥰", "✨", "🌸", "🌻", "🎈"];

const CAROUSEL_IMAGES = [
  { id: 1, src: "/Images/Daniel and Becky she looking at him and his hand up to the camera.jpeg", emoji: "👩‍❤️‍👨", label: "Our smiles" },
  { id: 2, src: "/Images/Daniel and Becky sitting with hands on chin and dan behind becky.jpeg", emoji: "🍕", label: "Our sweet dates" },
  { id: 3, src: "/Images/Daniel and Becky.jpeg", emoji: "🌅", label: "Us" },
];

// 🌸 Custom backdrop that rains Becky's name in tiny letters continuously
function RainingNames() {
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number; duration: number; scale: number }[]>([]);

  useEffect(() => {
    // Generate 16 floating name particles
    const arr = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // horizontal start position
      delay: Math.random() * 12,
      duration: 12 + Math.random() * 10,
      scale: 0.65 + Math.random() * 0.45,
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.035]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute font-black text-[10px] text-black whitespace-nowrap tracking-wider font-mono"
          style={{ left: `${p.x}%`, top: "-5%" }}
          animate={{
            y: ["0vh", "110vh"],
            x: [`${p.x}%`, `${p.x + (Math.sin(p.id) * 8)}%`],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Becky ❤️
        </motion.div>
      ))}
    </div>
  );
}

// 🎰 Cute infinite scrolling text ticker fixed at the bottom
function TickerBanner() {
  return (
    <div className="w-full h-7 bg-black text-white border-t border-black flex items-center overflow-hidden font-mono text-[9px] uppercase tracking-wider select-none shrink-0 z-30 relative">
      <div className="whitespace-nowrap animate-ticker flex items-center gap-8">
        {[1, 2].map((group) => (
          <div key={group} className="flex items-center gap-8 shrink-0">
            <span>DANIEL ❤️ BECKY</span>
            <span className="text-accent font-bold">•</span>
            <span>WARNING: DANIEL&apos;S HEART RATE IS CURRENTLY 182 BPM</span>
            <span className="text-accent font-bold">•</span>
            <span>SYSTEM STATUS: ADORABLENESS Scan Exceeded Safety bounds</span>
            <span className="text-accent font-bold">•</span>
            <span>STATUS: HAND-CODED WITH LOVE BY DANIEL FOR BECKY IN 2026</span>
            <span className="text-accent font-bold">•</span>
            <span>PROPOSAL SECURITY PROTOCOL ACTIVE</span>
            <span className="text-accent font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProposalAppContent() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get("name") || "";
  const name = rawName ? rawName.charAt(0).toUpperCase() + rawName.slice(1) : "Becky";
  const phone = searchParams.get("phone") || "2348147987460";

  // Scroll Container Ref
  const containerRef = useRef<HTMLDivElement>(null);

  // Global Snapping Viewport States
  const [activeSection, setActiveSection] = useState(0);
  const [unlockedSection, setUnlockedSection] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Hydrate progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("proposal_unlocked_section");
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 0) {
          setUnlockedSection(parsed);
          setTimeout(() => {
            const el = document.getElementById(`section-${parsed}`);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 600);
        }
      }
    } catch (e) {
      console.warn("localStorage read failed:", e);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (synth) synth.stop();
    };
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.id.replace("section-", ""), 10);
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.55 }
    );

    const elements = document.querySelectorAll(".scroll-section");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [unlockedSection]);

  // Scroll Snap to Section Index and Save Progress
  const scrollToSection = (index: number) => {
    if (index > unlockedSection) {
      setUnlockedSection(index);
      try {
        localStorage.setItem("proposal_unlocked_section", index.toString());
      } catch (e) {
        console.warn("localStorage write failed:", e);
      }
    }
    setTimeout(() => {
      const el = document.getElementById(`section-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  // Helper to clear progress for reading again
  const resetProgress = () => {
    try {
      localStorage.removeItem("proposal_unlocked_section");
    } catch (e) {}
    setUnlockedSection(0);
    scrollToSection(0);
  };

  // --- SCREEN 0: DECRYPT MESSAGE ---
  const handleDecryptMessage = () => {
    if (synth) {
      synth.start();
      synth.playPop();
      setIsMuted(false);
    }
    scrollToSection(1);
  };

  // --- SCREEN 1: TERMINAL STATES ---
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalDone, setTerminalDone] = useState(false);
  const [terminalReveal, setTerminalReveal] = useState(false);

  const terminalSequence = [
    "Loading Becky's proposal database...",
    "Compiling Daniel's courage variables...",
    "Initializing custom layout modules...",
    "Status: Spent nights coding this code for Becky...",
    "Verifying security handshake...",
    "Identity Found.",
  ];

  useEffect(() => {
    if (activeSection !== 1) return;
    if (terminalLines.length > 0) return;

    let current = 0;
    const interval = setInterval(() => {
      if (current < terminalSequence.length) {
        setTerminalLines((prev) => [...prev, terminalSequence[current]]);
        if (synth) synth.playTick();
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTerminalReveal(true);
          setTerminalDone(true);
          if (synth) synth.playChime();
        }, 800);
      }
    }, 550);

    return () => clearInterval(interval);
  }, [activeSection]);

  // --- SCREEN 2: DO YOU KNOW THIS GUY STATES ---
  const [knowGuyShaking, setKnowGuyShaking] = useState(false);
  const [knowGuyStatus, setKnowGuyStatus] = useState<"ask" | "yes" | "no">("ask");

  const handleKnowGuyYes = () => {
    if (synth) synth.playChime();
    setKnowGuyStatus("yes");
  };

  const handleKnowGuyNo = () => {
    if (synth) synth.playBuzzer();
    setKnowGuyStatus("no");
    setKnowGuyShaking(true);
    setTimeout(() => setKnowGuyShaking(false), 500);
  };

  // --- SCREEN 3: IS THIS DAMSEL STATES ---
  const [damselShaking, setDamselShaking] = useState(false);
  const [damselStatus, setDamselStatus] = useState<"ask" | "yes" | "no">("ask");

  const handleDamselYes = () => {
    if (synth) synth.playChime();
    setDamselStatus("yes");
  };

  const handleDamselNo = () => {
    if (synth) synth.playBuzzer();
    setDamselStatus("no");
    setDamselShaking(true);
    setTimeout(() => setDamselShaking(false), 500);
  };

  // --- SCREEN 4: CAROUSEL ---
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleCardSwipe = () => {
    if (synth) synth.playPop();
    setCarouselIndex((prev) => prev + 1);
  };

  // --- SCREEN 5: LEGAL WARNING STATES ---
  const [warningChecked, setWarningChecked] = useState(false);
  const [wiggleCheckbox, setWiggleCheckbox] = useState(false);

  const handleCheckboxClick = () => {
    setWarningChecked(!warningChecked);
    if (synth) synth.playPop();
    setWiggleCheckbox(true);
    setTimeout(() => setWiggleCheckbox(false), 250);
  };

  // --- SCREEN 6: PERSONALITY SCANNER ---
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState("Scanning Personality...");
  const [scanDone, setScanDone] = useState(false);

  const scanMessages = [
    "Scanning Personality...",
    "Checking Humour...",
    "Searching Kindness...",
    "Removing Stress...",
    "Detecting Drama...",
    "Installing Good Vibes...",
    "Looking Cute...",
    "Done.",
  ];

  useEffect(() => {
    if (activeSection !== 6 || scanDone) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setScanProgress(progress);

      if (progress % 6 === 0 && synth) {
        synth.playTick();
      }

      const msgIndex = Math.min(
        Math.floor((progress / 100) * scanMessages.length),
        scanMessages.length - 1
      );
      setScanMessage(scanMessages[msgIndex]);

      if (progress >= 100) {
        clearInterval(interval);
        setScanDone(true);
        if (synth) synth.playChime();
      }
    }, 45);

    return () => clearInterval(interval);
  }, [activeSection, scanDone]);

  // Countup helper
  const CountUp = ({ max, delay = 0 }: { max: number; delay?: number }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (activeSection !== 6) return;
      let start = 0;
      const end = max;
      const duration = 1.5;
      const steps = 40;
      const stepTime = (duration * 1000) / steps;
      const stepVal = end / steps;

      const timeout = setTimeout(() => {
        const timer = setInterval(() => {
          start += stepVal;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
        return () => clearInterval(timer);
      }, delay);

      return () => clearTimeout(timeout);
    }, [activeSection, max, delay]);

    return <span>{count}</span>;
  };

  // --- SCREEN 9: STAMP SLAM ---
  const [stampState, setStampState] = useState<"hidden" | "slammed" | "moved">("hidden");

  useEffect(() => {
    if (activeSection === 9 && stampState === "hidden") {
      const slamTimer = setTimeout(() => {
        setStampState("slammed");
        if (synth) synth.playSlam();
        confettiEffect({
          particleCount: 25,
          spread: 45,
          origin: { x: 0.5, y: 0.65 },
          colors: ["#FFD54A", "#000000"],
        });

        const moveTimer = setTimeout(() => {
          setStampState("moved");
        }, 2000);

        return () => clearTimeout(moveTimer);
      }, 1500);

      return () => clearTimeout(slamTimer);
    }
  }, [activeSection, stampState]);

  // --- SCREEN 11: CONFESSION ---
  const confessionLines = [
    `Becky, you're genuinely my favorite person.`,
    "Remember when I asked you if asking a girl out online was okay?",
    "I asked you for advice about how to ask a girl out...",
    "And I let you believe it was someone else.",
    "But the truth is, Becky...",
    "There was never anyone else.",
    "The girl I wanted to ask out was always you.",
    "And somewhere along the way... I realized... I like you.",
  ];
  const [confessionIndex, setConfessionIndex] = useState(0);
  const [confessionDone, setConfessionDone] = useState(false);

  useEffect(() => {
    if (activeSection !== 11 || confessionDone) return;

    let current = 0;
    const interval = setInterval(() => {
      if (current < confessionLines.length - 1) {
        current++;
        setConfessionIndex(current);
        if (synth) synth.playTick();
      } else {
        clearInterval(interval);
        setConfessionDone(true);
        if (synth) synth.playChime();
      }
    }, 2200);

    return () => clearInterval(interval);
  }, [activeSection, confessionDone]);

  // --- SCREEN 12: PANIC STATES ---
  const [panicProgress, setPanicProgress] = useState(0);
  const [panicMessage, setPanicMessage] = useState("Restarting Confidence...");
  const [panicDone, setPanicDone] = useState(false);
  const [courageSpeed, setCourageSpeed] = useState(120);

  const panicMessages = [
    "Restarting Confidence...",
    "Loading Courage...",
    "Finding Words...",
    "Deep Breathing...",
    "Almost Ready...",
  ];

  useEffect(() => {
    if (activeSection !== 12 || panicDone) return;

    let progress = panicProgress;
    const timer = setInterval(() => {
      progress += 1;
      setPanicProgress(progress);

      if (progress % 5 === 0 && synth) {
        synth.playTick();
      }

      const msgIdx = Math.min(
        Math.floor((progress / 100) * panicMessages.length),
        panicMessages.length - 1
      );
      setPanicMessage(panicMessages[msgIdx]);

      if (progress >= 100) {
        clearInterval(timer);
        setPanicDone(true);
        if (synth) synth.playChime();
      }
    }, courageSpeed);

    return () => clearInterval(timer);
  }, [activeSection, panicProgress, courageSpeed, panicDone]);

  const handleHelpDaniel = () => {
    if (synth) synth.playPop();
    setCourageSpeed(15);
  };

  // --- SCREEN 13: COUNTDOWN ---
  const [countdownVal, setCountdownVal] = useState(3);
  const [countdownDone, setCountdownDone] = useState(false);

  useEffect(() => {
    if (activeSection !== 13 || countdownDone) return;

    const timer = setInterval(() => {
      setCountdownVal((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCountdownDone(true);
          if (synth) synth.playChime();
          confettiEffect({
            particleCount: 160,
            spread: 90,
            origin: { y: 0.55 },
          });
          setTimeout(() => {
            scrollToSection(14);
          }, 2000);
          return 0;
        } else {
          if (synth) synth.playTick();
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSection, countdownDone]);

  // --- SCREEN 14: PROPOSAL ---
  const [proposalAnswer, setProposalAnswer] = useState<"YES" | "NO" | null>(null);

  const handleYes = () => {
    setProposalAnswer("YES");
    if (synth) synth.stop();
    scrollToSection(15);
  };

  const handleNo = () => {
    setProposalAnswer("NO");
    scrollToSection(15);
  };

  // --- SCREEN 15: TYPING SUSPENSE ---
  const [typingSuspenseDone, setTypingSuspenseDone] = useState(false);
  useEffect(() => {
    if (activeSection === 15 && !typingSuspenseDone) {
      const timer = setTimeout(() => {
        setTypingSuspenseDone(true);
        scrollToSection(16);
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [activeSection, typingSuspenseDone]);

  // --- SCREEN 17: REPLY ---
  const defaultReply = `Yes Daniel! I'd love to be your girlfriend ❤️`;
  const [replyText, setReplyText] = useState(defaultReply);

  const handleSendToDaniel = () => {
    if (synth) {
      synth.playPop();
      synth.playYesSwell();
    }
    const encodedText = encodeURIComponent(replyText);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");

    scrollToSection(18);
    
    setTimeout(() => {
      confettiEffect({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    }, 300);
    setTimeout(() => {
      confettiEffect({ particleCount: 150, spread: 80, origin: { y: 0.4 } });
    }, 1200);
    setTimeout(() => {
      confettiEffect({ particleCount: 180, spread: 110, origin: { y: 0.55 }, colors: ["#FFD54A", "#000000"] });
    }, 2000);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-stretch overflow-hidden bg-white text-black font-sans relative">
      
      {/* 🌧️ Raining Becky Names backdrop */}
      <RainingNames />

      {/* Background soft moving name watermark */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.03] font-black text-6xl tracking-widest text-black">
        <motion.div
          className="absolute top-1/4 left-10 text-7xl"
          animate={{ y: [0, -35, 0], x: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          BECKY
        </motion.div>
        <motion.div
          className="absolute top-2/3 right-16 text-6xl"
          animate={{ y: [0, -25, 0], x: [0, -15, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          BECKY ❤️
        </motion.div>
        <motion.div
          className="absolute top-10 right-1/4 text-5xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          BECKY
        </motion.div>
      </div>

      {/* Main Snap Scroll Container */}
      <div
        ref={containerRef}
        className="scroll-container no-scrollbar w-full flex-1 z-10"
      >
        {/* --- SCREEN 0: DECRYPT MESSAGE --- */}
        <ViewportSection id="section-0" isActive={activeSection === 0}>
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.035] select-none pointer-events-none">
            <img src="/Images/Daniel and Becky.jpeg" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black text-center select-none z-10">
            <div className="flex items-center gap-2 border-2 border-black rounded-full px-4 py-2 font-mono text-xs uppercase bg-neutral-50 shrink-0">
              <Lock size={14} className="animate-pulse" />
              Secure Message Protocol
            </div>

            <div className="w-full flex-1 flex flex-col items-center justify-center gap-4">
              <span className="text-6xl animate-float-slow">📩</span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Hi Becky.
              </h1>
              <p className="text-neutral-500 font-medium text-sm max-w-xs leading-relaxed">
                I spent days writing code just for you. There is a secure, personalized message waiting to be decrypted.
              </p>
            </div>

            <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
              <button
                onClick={handleDecryptMessage}
                className="w-full py-4 rounded-full bg-black text-white hover:bg-neutral-900 font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                Decrypt Message 🔑
              </button>
              <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                Click decrypt below to begin our journey... 👇
              </p>
            </div>
          </div>
        </ViewportSection>

        {/* --- SCREEN 1: LOADING TERMINAL --- */}
        {unlockedSection >= 1 && (
          <ViewportSection id="section-1" isActive={activeSection === 1}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="flex items-center gap-2 border-2 border-black rounded-full px-4 py-2 font-mono text-xs uppercase bg-neutral-50 shrink-0">
                <Terminal size={14} className="animate-pulse" />
                Terminal
              </div>

              <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-6 my-6">
                <div className="relative shrink-0">
                  <Illustration name="detective" />
                </div>

                <div className="w-full max-w-sm font-mono text-left bg-black text-white p-6 rounded-2xl border-2 border-black min-h-[190px] flex flex-col justify-start gap-1.5 shadow-none overflow-hidden select-text text-sm">
                  {terminalLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-accent font-bold">&gt;</span>
                      <span>{line}</span>
                    </motion.div>
                  ))}
                  {!terminalReveal && (
                    <div className="flex items-center gap-2">
                      <span className="text-accent font-bold">&gt;</span>
                      <span className="w-2.5 h-4 bg-white cursor-blink" />
                    </div>
                  )}

                  <AnimatePresence>
                    {terminalReveal && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-4 pt-4 border-t border-neutral-800 text-neutral-200"
                      >
                        <p className="text-base font-bold text-accent">Hello, Becky.</p>
                        <p className="text-xs text-neutral-400 mt-1 italic font-sans">
                          &ldquo;I have been expecting you.&rdquo;
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(2);
                  }}
                  disabled={!terminalDone}
                  className={`w-full py-4 rounded-full font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    terminalDone
                      ? "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ChevronDown size={18} />
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Decrypted successfully. Let&apos;s proceed to the security questions below... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 2: DO YOU KNOW THIS GUY? --- */}
        {unlockedSection >= 2 && (
          <ViewportSection id="section-2" isActive={activeSection === 2}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black text-center">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">VERIFICATION PART I</span>
                <h2 className="text-2xl md:text-3xl font-extrabold mt-2 select-none">
                  Do you know this guy?
                </h2>
              </div>

              <div className="w-full flex-1 flex flex-col items-center justify-center my-4">
                <div className="border-2 border-black rounded-3xl p-4 bg-white flex flex-col items-center w-44 select-none shadow-none relative">
                  <div className="relative w-32 h-32 border-2 border-black rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                    <img src="/Images/Daniel face shot.jpeg" alt="Daniel" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 mt-3 uppercase">
                    The Coder
                  </span>
                  <span className="font-extrabold text-base text-black mt-0.5">Daniel</span>
                </div>

                <div className="h-10 mt-4 flex items-center">
                  <AnimatePresence mode="wait">
                    {knowGuyStatus === "yes" && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-bold text-black font-sans"
                      >
                        Yeah, obviously! He&apos;s the guy who thinks about you all day. 🥰
                      </motion.p>
                    )}
                    {knowGuyStatus === "no" && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-bold text-red-600 font-sans"
                      >
                        Shhh... try again. You definitely know him! 😉
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col gap-2 select-none">
                <AnimatePresence mode="wait">
                  {knowGuyStatus !== "yes" ? (
                    <motion.div
                      key="options"
                      className="w-full flex gap-3"
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <button
                        onClick={handleKnowGuyYes}
                        className="flex-1 py-4 bg-black text-white hover:bg-neutral-900 font-bold rounded-full cursor-pointer transition active:scale-95 text-base"
                      >
                        YES ❤️
                      </button>
                      <motion.button
                        onClick={handleKnowGuyNo}
                        animate={knowGuyShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        className="flex-1 py-4 border-2 border-black bg-white hover:bg-neutral-50 text-black font-bold rounded-full cursor-pointer transition"
                      >
                        NO 🙃
                      </motion.button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <motion.button
                        key="continue"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => scrollToSection(3)}
                        className="w-full py-4 bg-black text-white hover:bg-neutral-900 font-extrabold rounded-full cursor-pointer flex items-center justify-center gap-2 text-base"
                      >
                        Continue
                        <ChevronDown size={18} />
                      </motion.button>
                      <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                        Identity verified. Let&apos;s check your credentials next... 👇
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 3: IS THIS BEAUTIFUL DAMSEL YOU? --- */}
        {unlockedSection >= 3 && (
          <ViewportSection id="section-3" isActive={activeSection === 3}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black text-center">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">VERIFICATION PART II</span>
                <h2 className="text-2xl md:text-3xl font-extrabold mt-2 select-none">
                  Is this beautiful damsel you?
                </h2>
              </div>

              <div className="w-full flex-1 flex flex-col items-center justify-center my-4">
                <div className="border-2 border-black rounded-3xl p-4 bg-white flex flex-col items-center w-44 select-none shadow-none relative">
                  <div className="relative w-32 h-32 border-2 border-black rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                    <img src="/Images/Becky Face.jpeg" alt="Becky" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 mt-3 uppercase">
                    The Target
                  </span>
                  <span className="font-extrabold text-base text-black mt-0.5">Becky</span>
                </div>

                <div className="h-14 mt-3 flex items-center px-4 max-w-xs text-center">
                  <AnimatePresence mode="wait">
                    {damselStatus === "yes" && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold text-black font-sans leading-relaxed"
                      >
                        ACCESS GRANTED! 🔒✨ Verified: The sweetest, most beautiful girl is logged in. Daniel&apos;s heart rate has officially doubled. Proceed with caution... 🥰
                      </motion.p>
                    )}
                    {damselStatus === "no" && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold text-red-600 font-sans leading-normal"
                      >
                        Ain&apos;t no way, gal! Shhh... you can&apos;t fool the system. Try again! 😍
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* YES / NO Choices */}
              <div className="w-full max-w-md shrink-0 flex flex-col gap-2 select-none">
                <AnimatePresence mode="wait">
                  {damselStatus !== "yes" ? (
                    <motion.div
                      key="options"
                      className="w-full flex gap-3"
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <button
                        onClick={handleDamselYes}
                        className="flex-1 py-4 bg-black text-white hover:bg-neutral-900 font-bold rounded-full cursor-pointer transition active:scale-95 text-base"
                      >
                        YES, it&apos;s me! ✨
                      </button>
                      <motion.button
                        onClick={handleDamselNo}
                        animate={damselShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        className="flex-1 py-4 border-2 border-black bg-white hover:bg-neutral-50 text-black font-bold rounded-full cursor-pointer transition"
                      >
                        NO, who&apos;s that? 🙃
                      </motion.button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <motion.button
                        key="continue"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => scrollToSection(4)}
                        className="w-full py-4 bg-black text-white hover:bg-neutral-900 font-extrabold rounded-full cursor-pointer flex items-center justify-center gap-2 text-base"
                      >
                        Continue
                        <ChevronDown size={18} />
                      </motion.button>
                      <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                        Both identities verified. Let&apos;s examine the archive folder next... 👇
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 4: COUPLES PHOTO SWIPER (With visual stacked offsets) --- */}
        {unlockedSection >= 4 && (
          <ViewportSection id="section-4" isActive={activeSection === 4}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black text-center">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">VERIFICATION PART III</span>
                <h2 className="text-2xl md:text-3xl font-extrabold mt-2 select-none">
                  Our Memory Lane
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5 select-none">
                  SWIPE CARDS RIGHT OR LEFT TO VERIFY
                </p>
              </div>

              <div className="w-full flex-1 flex items-center justify-center my-2 relative">
                {/* Swipe instruction helper */}
                {carouselIndex < CAROUSEL_IMAGES.length && (
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 text-xs font-bold bg-black text-white border border-black px-3.5 py-1 rounded-full font-mono uppercase tracking-wider z-40 pointer-events-none"
                  >
                    Swipe left/right to browse deck 👆
                  </motion.div>
                )}

                <AnimatePresence>
                  {CAROUSEL_IMAGES.map((img, idx) => {
                    if (idx < carouselIndex) return null;
                    if (idx > carouselIndex + 2) return null; // Show up to 3 cards stacked
                    
                    const isTop = idx === carouselIndex;
                    const relIndex = idx - carouselIndex;

                    // Rotations and offsets for card stacking effect
                    let cardRotate = 0;
                    let cardX = 0;
                    let cardY = 0;
                    let cardScale = 1;

                    if (relIndex === 0) {
                      cardRotate = 0;
                      cardX = 0;
                      cardY = 0;
                      cardScale = 1;
                    } else if (relIndex === 1) {
                      cardRotate = -5;
                      cardX = -12;
                      cardY = 8;
                      cardScale = 0.95;
                    } else if (relIndex === 2) {
                      cardRotate = 5;
                      cardX = 12;
                      cardY = 16;
                      cardScale = 0.90;
                    }

                    return (
                      <motion.div
                        key={img.id}
                        className="absolute w-64 h-[300px] bg-white border-2 border-black rounded-3xl p-3 flex flex-col justify-between items-center shadow-none cursor-grab active:cursor-grabbing"
                        style={{
                          zIndex: 30 - idx,
                          originX: 0.5,
                          originY: 0.5,
                        }}
                        initial={{ scale: cardScale, y: cardY + 20, rotate: cardRotate, opacity: 0 }}
                        animate={{ 
                          scale: cardScale, 
                          y: cardY, 
                          x: isTop ? 0 : cardX, 
                          rotate: cardRotate,
                          opacity: 1
                        }}
                        exit={{ x: 280, rotate: 20, opacity: 0 }}
                        drag={isTop ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, info) => {
                          if (info.offset.x > 90) {
                            handleCardSwipe();
                          } else if (info.offset.x < -90) {
                            handleCardSwipe();
                          }
                        }}
                      >
                        <div className="w-full flex-1 border-2 border-black rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center relative">
                          <img src={img.src} alt={img.label} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="text-center mt-2.5">
                          <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                            Memory {img.id}/3
                          </span>
                          <p className="font-extrabold text-sm text-black">{img.label}</p>
                        </div>
                      </motion.div>
                    );
                  })}

                  {carouselIndex >= CAROUSEL_IMAGES.length && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-64 p-5 bg-accent/10 border-2 border-black rounded-3xl flex flex-col items-center justify-center gap-3 select-none"
                    >
                      <Camera size={36} />
                      <h4 className="font-extrabold text-base text-black leading-snug">
                        See? Even the pixels know how good we look together.
                      </h4>
                      <p className="text-xs font-bold text-neutral-700">
                        Aren&apos;t we lovely? 📸✨
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full max-w-md shrink-0 select-none flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(5);
                  }}
                  disabled={carouselIndex < CAROUSEL_IMAGES.length}
                  className={`w-full py-4 rounded-full font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    carouselIndex >= CAROUSEL_IMAGES.length
                      ? "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ChevronDown size={18} />
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Archive verified. Now read the legal warning guidelines... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 5: WARNING LEGAL CHECKBOX --- */}
        {unlockedSection >= 5 && (
          <ViewportSection id="section-5" isActive={activeSection === 5}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="flex items-center gap-2 border-2 border-black rounded-full px-4 py-2 font-mono text-xs uppercase bg-red-50 text-red-700 shrink-0">
                <ShieldAlert size={14} className="animate-pulse" />
                Legal Advisory
              </div>

              <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 my-6">
                <div className="shrink-0">
                  <Illustration name="police" />
                </div>

                <div className="flex-1 max-w-md text-left flex flex-col gap-4">
                  <h2 className="text-4xl font-extrabold tracking-tight select-none">
                    WARNING 🛑
                  </h2>
                  <div className="font-medium text-lg leading-relaxed text-neutral-700 select-none">
                    <p className="font-bold text-black mb-1">Before continuing...</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-base">
                      <li>You agree to laugh at least once.</li>
                      <li>Failure to laugh may result in excessive smiling.</li>
                    </ul>
                  </div>

                  <motion.div
                    animate={wiggleCheckbox ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.25 }}
                    onClick={handleCheckboxClick}
                    className={`mt-4 p-4 border-2 rounded-2xl flex items-center gap-4 cursor-pointer select-none transition ${
                      warningChecked 
                        ? "border-black bg-accent/10" 
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md border-2 border-black flex items-center justify-center transition-colors ${
                      warningChecked ? "bg-black text-white" : "bg-white"
                    }`}>
                      {warningChecked && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className="font-bold text-sm text-neutral-800">
                      I solemnly promise to smile. 😊
                    </span>
                  </motion.div>
                </div>
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(6);
                  }}
                  disabled={!warningChecked}
                  className={`w-full py-4 rounded-full font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    warningChecked
                      ? "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ChevronDown size={18} />
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Agreement signed. Preparing personality scan... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 6: SCANNER --- */}
        {unlockedSection >= 6 && (
          <ViewportSection id="section-6" isActive={activeSection === 6}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">BIOMETRICS</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 select-none">
                  Scanning Personality...
                </h2>
              </div>

              <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 my-6">
                <div className="shrink-0">
                  <Illustration name="robot" />
                </div>

                <div className="w-full max-w-sm flex flex-col gap-4 text-left font-mono">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1 text-neutral-500">
                      <span>{scanMessage}</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full h-4 bg-neutral-100 rounded-full border-2 border-black overflow-hidden relative">
                      <motion.div
                        className="h-full bg-accent"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {scanDone && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="border-2 border-black rounded-2xl p-5 bg-white space-y-3 shadow-none text-sm font-sans"
                      >
                        <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold border-b pb-1.5">
                          Scan Results:
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-neutral-600">Humour</span>
                          <span className="font-mono font-bold text-base text-black">
                            <CountUp max={100} />%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-neutral-600">Kindness</span>
                          <span className="font-mono font-bold text-base text-black">
                            <CountUp max={100} delay={400} />%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-neutral-600">Beauty</span>
                          <span className="font-mono font-bold text-base text-black">
                            <CountUp max={100} delay={800} />%
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-accent-dark">
                          <span className="font-bold text-black">Adorableness</span>
                          <span className="font-mono font-black text-xl text-black bg-accent px-2 py-0.5 rounded">
                            <CountUp max={999} delay={1200} />%
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(7);
                  }}
                  disabled={!scanDone}
                  className={`w-full py-4 rounded-full font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    scanDone
                      ? "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ChevronDown size={18} />
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Scanner completed. Preparing narrative download... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 7: FIRST-PERSON CONFESSION PART 1 --- */}
        {unlockedSection >= 7 && (
          <ViewportSection id="section-7" isActive={activeSection === 7}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">PART I</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 select-none">
                  My Confession
                </h2>
              </div>

              <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 my-6">
                <div className="shrink-0">
                  <Illustration name="thinking" />
                </div>

                <div className="flex-1 max-w-md text-left flex flex-col gap-6 select-none font-sans text-neutral-800">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <span className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-400">
                      Becky...
                    </span>
                    <p className="text-lg md:text-xl font-medium text-black mt-1 leading-relaxed">
                      I have a confession to make. I played a little game because I was too terrified to tell you how I really felt.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <span className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-400">
                      What I did:
                    </span>
                    <p className="text-lg md:text-xl font-medium text-black mt-1 leading-relaxed">
                      I asked you for advice about asking a girl out online.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <span className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-400">
                      Then...
                    </span>
                    <p className="text-lg md:text-xl font-medium text-black mt-1 leading-relaxed">
                      I told you I was talking to someone special. I let you believe it was someone else... because I was just too shy to tell you it was always you.
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(8);
                  }}
                  className="w-full py-4 rounded-full bg-black text-white hover:bg-neutral-900 font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continue
                  <ChevronDown size={18} />
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Part I read. Let&apos;s reveal the truth in Part II... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 8: CONFESSION PART 2 --- */}
        {unlockedSection >= 8 && (
          <ViewportSection id="section-8" isActive={activeSection === 8}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black relative">
              {activeSection === 8 && (
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                  {driftingEmojis.map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl opacity-20"
                      style={{
                        top: `${15 + (i * 12)}%`,
                        left: `${5 + (i * 14)}%`,
                      }}
                      animate={{
                        y: [0, -40, 0],
                        x: [0, Math.sin(i) * 20, 0],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 5 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="text-center shrink-0 z-10">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">PART II</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 select-none">
                  The Actual Truth
                </h2>
              </div>

              <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 my-6 z-10">
                <div className="shrink-0">
                  <Illustration name="love" />
                </div>

                <div className="flex-1 max-w-md text-left flex flex-col gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-black select-none">
                    Because here is the truth...
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-semibold select-none">
                    {[
                      "There was never anyone else.",
                      "I was talking about you Becky.",
                      "I asked for your advice to ask you out.",
                      "Every smile was because of Becky.",
                      "Waiting for your text only.",
                      "Checking whatsapp all day.",
                      "I have only ever wanted you.",
                    ].map((symptom, idx) => (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        className="flex items-center gap-2 p-2.5 border-2 border-black rounded-xl bg-white"
                      >
                        <span className="text-xs font-mono bg-accent px-1.5 py-0.5 rounded border border-black text-black">
                          {idx + 1}
                        </span>
                        <span className="text-neutral-800">{symptom}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    className="mt-2 p-3 border-2 border-black bg-accent rounded-xl text-center select-none"
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                      Official Verdict:
                    </span>
                    <p className="text-lg font-black mt-0.5 text-black">
                      I am hopelessly, completely in love with you.
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="w-full max-w-md shrink-0 z-10 flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(9);
                  }}
                  className="w-full py-4 rounded-full bg-black text-white hover:bg-neutral-900 font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continue
                  <ChevronDown size={18} />
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  The truth is out. Let&apos;s face the legal verdict... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 9: COURTROOM VERDICT --- */}
        {unlockedSection >= 9 && (
          <ViewportSection id="section-9" isActive={activeSection === 9}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">THE TRIAL</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 select-none">
                  My Legal Verdict
                </h2>
              </div>

              <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 my-6 relative">
                <div className="shrink-0 z-10">
                  <Illustration name="judge" />
                </div>

                <div className="flex-1 max-w-md text-left flex flex-col gap-4 z-10 select-none">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
                    Daniel&apos;s Self-Imposed Court of Truth
                  </span>
                  <p className="text-xl font-medium leading-relaxed text-neutral-800">
                    So I put myself on trial for holding back...
                  </p>
                  <p className="text-2xl font-extrabold text-black mt-1">
                    And I, Daniel, have officially been found:
                  </p>

                  <div className="p-4 border-2 border-black rounded-2xl bg-neutral-50 flex flex-col gap-1.5 mt-2">
                    <span className="text-xs font-mono font-bold text-neutral-400 uppercase">
                      The Sentence
                    </span>
                    <p className="text-base font-bold text-neutral-900 leading-normal">
                      I, Daniel, am found GUILTY of being ridiculously, hopelessly in love with Becky.
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {stampState !== "hidden" && (
                    <motion.div
                      initial={{ scale: 3.5, opacity: 0, rotate: -25 }}
                      animate={
                        stampState === "slammed"
                          ? { scale: 1, opacity: 1, rotate: -15, x: 0, y: 0 }
                          : { scale: 0.6, opacity: 0.65, rotate: -8, x: 60, y: 125 }
                      }
                      exit={{ opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        damping: 12, 
                        stiffness: 140,
                      }}
                      className="absolute md:right-16 md:bottom-12 right-1/2 bottom-1/3 translate-x-1/2 md:translate-x-0 z-30 border-8 border-black bg-accent text-black font-black text-5xl md:text-6xl px-8 py-3 rounded-2xl select-none tracking-wider text-center shadow-none flex items-center justify-center pointer-events-none"
                    >
                      GUILTY
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full max-w-md shrink-0 z-10 flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(10);
                  }}
                  disabled={stampState !== "moved" && stampState !== "slammed"}
                  className={`w-full py-4 rounded-full font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    stampState === "moved" || stampState === "slammed"
                      ? "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ChevronDown size={18} />
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Sentence passed. Let&apos;s take a quick test on this... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 10: QUIZ --- */}
        {unlockedSection >= 10 && (
          <ViewportSection id="section-10" isActive={activeSection === 10}>
            <QuizScreen onSuccess={() => scrollToSection(11)} />
          </ViewportSection>
        )}

        {/* --- SCREEN 11: CONFESSION SINCERITY --- */}
        {unlockedSection >= 11 && (
          <ViewportSection id="section-11" isActive={activeSection === 11}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">SINCERITY</span>
                <h2 className="text-2xl md:text-3xl font-extrabold mt-2 select-none">
                  A Real Moment
                </h2>
              </div>

              <div className="w-full max-w-lg flex-1 flex flex-col justify-center items-start gap-4 my-8 font-sans select-text text-left pl-4 border-l-4 border-black min-h-[220px]">
                {confessionLines.slice(0, confessionIndex + 1).map((line, idx) => {
                  const isLast = idx === confessionIndex;
                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`text-lg md:text-xl leading-relaxed ${
                        idx === confessionLines.length - 1
                          ? "font-extrabold text-black text-2xl md:text-3xl mt-4 underline decoration-accent decoration-4"
                          : idx >= 4
                          ? "font-bold text-black"
                          : "text-neutral-600 font-medium"
                      }`}
                    >
                      {line}
                      {isLast && !confessionDone && (
                        <span className="inline-block w-2.5 h-5 bg-black cursor-blink ml-1 align-middle" />
                      )}
                    </motion.p>
                  );
                })}
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(12);
                  }}
                  disabled={!confessionDone}
                  className={`w-full py-4 rounded-full font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    confessionDone
                      ? "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ChevronDown size={18} />
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Sincere moment logged. Oh wait... system error detected! 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 12: PANIC INTERRUPT --- */}
        {unlockedSection >= 12 && (
          <ViewportSection id="section-12" isActive={activeSection === 12}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-red-500 font-bold animate-pulse">
                  CRITICAL INTERRUPT
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 select-none">
                  WAIT!!
                </h2>
              </div>

              <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 my-6">
                <div className="shrink-0">
                  <Illustration name="panic" />
                </div>

                <div className="w-full max-w-sm flex flex-col gap-4 text-left select-none">
                  <p className="text-lg font-bold leading-snug text-neutral-800">
                    Okay Becky, I am panicking. Seriously.
                  </p>
                  
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1 text-neutral-500">
                      <span>{panicMessage}</span>
                      <span>{panicProgress}%</span>
                    </div>
                    <div className="w-full h-4 bg-neutral-100 rounded-full border-2 border-black overflow-hidden relative">
                      <motion.div
                        className="h-full bg-accent"
                        style={{ width: `${panicProgress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 italic">
                    My courage levels are very low right now. I need your help.
                  </p>
                </div>
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
                <button
                  onClick={panicDone ? () => { if (synth) synth.playPop(); scrollToSection(13); } : handleHelpDaniel}
                  className="w-full py-4 rounded-full bg-black text-white hover:bg-neutral-900 font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {panicDone ? "Continue" : "Help Daniel ⚡"}
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Daniel saved! Preparing final countdown... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 13: COUNTDOWN --- */}
        {unlockedSection >= 13 && (
          <ViewportSection
            id="section-13"
            isActive={activeSection === 13}
            bgColor="bg-[#FFFCEE] transition-colors duration-1000"
          >
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">PREPARATION</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 select-none">
                  Get Ready...
                </h2>
              </div>

              <div className="flex-1 w-full flex flex-col items-center justify-center select-none my-8">
                <AnimatePresence mode="wait">
                  {!countdownDone ? (
                    <motion.div
                      key={countdownVal}
                      initial={{ scale: 0.3, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1.1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.6, type: "spring", damping: 12 }}
                      className="text-8xl md:text-9xl font-black text-black"
                    >
                      {countdownVal}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="go"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="text-center flex flex-col items-center gap-4"
                    >
                      <span className="text-6xl">✨</span>
                      <h3 className="text-3xl md:text-4xl font-black text-black">
                        Okay...
                      </h3>
                      <p className="text-xl md:text-2xl font-bold underline decoration-accent decoration-4">
                        Here goes nothing...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    if (synth) synth.playPop();
                    scrollToSection(14);
                  }}
                  disabled={!countdownDone}
                  className={`w-full py-4 rounded-full font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    countdownDone
                      ? "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  Let&apos;s Go
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Countdown complete. Moving to final decision... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 14: PROPOSAL SCREEN --- */}
        {unlockedSection >= 14 && (
          <ViewportSection
            id="section-14"
            isActive={activeSection === 14}
            bgColor="bg-[#FFFCEE] transition-colors duration-1000"
          >
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.04] select-none pointer-events-none">
              <img src="/Images/Daniel and Becky sitting with hands on chin and dan behind becky.jpeg" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black relative z-10">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">THE QUESTION</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4 select-none leading-tight">
                  Will you be my girlfriend, Becky?
                </h2>
              </div>

              <div className="flex-1 flex items-center justify-center z-10 relative">
                <Illustration name="heart" />
              </div>

              <div className="w-full shrink-0 z-20">
                <ProposalButtons onYesPressed={handleYes} onNoPressed={handleNo} />
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 15: TYPING SUSPENSE --- */}
        {unlockedSection >= 15 && (
          <ViewportSection
            id="section-15"
            isActive={activeSection === 15}
          >
            <div className="flex-1 w-full flex flex-col items-center justify-center bg-white text-black select-none">
              <div className="text-center flex flex-col items-center gap-4">
                <div className="flex gap-2.5 items-center justify-center mb-2">
                  <motion.div
                    className="w-4 h-4 bg-black rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="w-4 h-4 bg-black rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, delay: 0.15, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="w-4 h-4 bg-black rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-extrabold font-mono uppercase tracking-wider">
                  Daniel is typing...
                </h2>
                
                <p className="text-sm text-neutral-400 italic max-w-xs mt-1">
                  Hold on, I am putting my heart into words...
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 16: LETTER EXPERIENCE --- */}
        {unlockedSection >= 16 && (
          <ViewportSection id="section-16" isActive={activeSection === 16}>
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.035] select-none pointer-events-none">
              <img src="/Images/Becky Face.jpeg" alt="" className="w-full h-full object-cover" />
            </div>

            <LetterScreen
              name={name}
              isActive={activeSection === 16}
              onContinue={() => scrollToSection(17)}
            />
          </ViewportSection>
        )}

        {/* --- SCREEN 17: REPLY --- */}
        {unlockedSection >= 17 && (
          <ViewportSection id="section-17" isActive={activeSection === 17}>
            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">REPLY</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 select-none">
                  Now... It&apos;s your turn.
                </h2>
              </div>

              <div className="shrink-0 my-2">
                <Illustration name="happy" />
              </div>

              <div className="w-full max-w-lg flex-1 flex flex-col justify-center my-4 relative">
                <span className="text-xs font-mono font-bold text-neutral-400 mb-1 ml-1 text-left block">
                  Write your response:
                </span>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full flex-1 p-5 border-2 border-black rounded-2xl bg-neutral-50/50 font-sans text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white select-text resize-none"
                  placeholder="Type your response here..."
                />
              </div>

              <div className="w-full max-w-md shrink-0 flex flex-col items-center gap-2">
                <button
                  onClick={handleSendToDaniel}
                  className="w-full py-4 rounded-full bg-black text-white hover:bg-neutral-900 font-extrabold text-base transition duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Send To Daniel 🚀
                </button>
                <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1 select-none">
                  Let Daniel know! Submit your response directly to his WhatsApp... 👇
                </p>
              </div>
            </div>
          </ViewportSection>
        )}

        {/* --- SCREEN 18: FINAL CELEBRATION --- */}
        {unlockedSection >= 18 && (
          <ViewportSection id="section-18" isActive={activeSection === 18}>
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.045] select-none pointer-events-none">
              <img src="/Images/Daniel and Becky she looking at him and his hand up to the camera.jpeg" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 flex flex-col justify-between items-center w-full py-4 text-black relative z-10">
              <div className="text-center shrink-0">
                <span className="text-xs uppercase tracking-widest font-mono text-accent bg-black px-3 py-1 rounded-full font-bold">
                  MISSION COMPLETE 🏆
                </span>
              </div>

              <div className="shrink-0 my-4">
                <Illustration name="party" />
              </div>

              <div className="w-full max-w-md text-center flex flex-col items-center gap-5 select-none font-sans">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-black">
                  Congratulations!
                </h2>
                
                <div className="space-y-2 mt-2">
                  <p className="text-xl font-bold text-neutral-700">
                    💖 Becky is officially my girlfriend!
                  </p>
                  <p className="text-xl font-bold text-neutral-700">
                    👨‍💻 I am the happiest guy alive.
                  </p>
                  <p className="text-xl font-bold text-neutral-700">
                    🔓 A lifetime of sweet memories unlocked.
                  </p>
                </div>
              </div>

              <div className="w-full text-center mt-8 pt-4 border-t border-neutral-100 shrink-0 select-none flex flex-col items-center gap-4">
                <button
                  onClick={resetProgress}
                  className="text-xs font-semibold underline text-neutral-400 hover:text-black cursor-pointer select-none"
                >
                  Reset Progress & Experience Again
                </button>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider select-none">
                  Thank you Becky for making today unforgettable.
                </p>
              </div>
            </div>
          </ViewportSection>
        )}
      </div>

      {/* 🎰 Infinite scrolling text ticker banner */}
      <TickerBanner />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex flex-1 items-center justify-center h-screen bg-white text-black font-mono">
        Loading Becky&apos;s story...
      </div>
    }>
      <ProposalAppContent />
    </Suspense>
  );
}
