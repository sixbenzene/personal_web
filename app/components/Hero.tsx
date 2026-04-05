"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);

  useEffect(() => { setMounted(true); }, []);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Orange gradient background covering top ~70% */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f07030] via-[#f4a261] to-[#f07030]" />

      {/* Decorative floating circles */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] h-64 w-64 rounded-full border border-white/20"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-[20%] right-[8%] h-40 w-40 rounded-full bg-white/10"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[40%] left-[25%] h-20 w-20 rounded-full bg-white/5 backdrop-blur-sm"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-[30%] right-[20%] h-32 w-32 rounded-full border border-white/10"
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />

      {/* Large soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-white/10 blur-[100px]" />

      {/* Bottom curved wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80C240 160 480 200 720 160C960 120 1200 40 1440 80V200H0V80Z" fill="var(--color-background)" />
          <path d="M0 100C240 170 480 200 720 170C960 140 1200 70 1440 100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
          <path d="M0 60C300 140 600 180 900 140C1100 110 1300 50 1440 70" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        style={mounted ? { rotateX, rotateY, perspective: 1000 } : {}}
        className="relative z-10 text-center px-6"
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
      >
        <motion.p variants={fadeUp} transition={{ delay: 0.1 }} className="mb-4 font-mono text-sm tracking-widest text-white/70 uppercase">
          Creative Developer
        </motion.p>
        <motion.h1 variants={fadeUp} transition={{ delay: 0.2, type: "spring", stiffness: 80 }} className="text-6xl font-bold tracking-tight sm:text-8xl">
          <span className="text-white">你好，我是 </span>
          <span className="text-white/90 drop-shadow-lg">开发者</span>
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ delay: 0.3 }} className="mt-6 max-w-lg mx-auto text-lg text-white/70 leading-relaxed">
          全栈开发者，热衷于使用现代 Web 技术打造优雅的数字体验。
        </motion.p>
        <motion.div variants={fadeUp} transition={{ delay: 0.5 }} className="mt-10 flex justify-center gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-orange shadow-lg"
          >
            查看项目
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 backdrop-blur-sm"
          >
            联系我
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
        <div className="h-10 w-6 rounded-full border-2 border-white/40 flex justify-center pt-2">
          <motion.div className="h-2 w-1 rounded-full bg-white" />
        </div>
      </motion.div>
    </section>
  );
}
