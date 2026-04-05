"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Python", level: 95, gradient: "from-amber to-orange" },
  { name: "PyTorch / Transformers", level: 85, gradient: "from-coral to-orange" },
  { name: "Whisper / ASR", level: 85, gradient: "from-teal to-amber" },
  { name: "LLM API 开发", level: 90, gradient: "from-indigo to-teal" },
  { name: "FastAPI / 后端", level: 80, gradient: "from-orange to-amber" },
  { name: "数据处理 / 特征工程", level: 80, gradient: "from-teal to-indigo" },
];

function SkillBar({ skill, index, inView }: { skill: typeof skills[0]; index: number; inView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const glow = useTransform(mouseX, [-100, 0, 100], [0, 1, 0]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) mouseX.set(e.clientX - rect.left - rect.width / 2);
      }}
      className="group"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-mono text-muted group-hover:text-orange transition-colors">{skill.name}</span>
        <span className="text-xs font-mono text-orange/70">{skill.level}%</span>
      </div>
      <div className="relative h-2.5 rounded-full bg-card-border overflow-hidden">
        <motion.div
          initial={false}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 1, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.gradient}`}
        />
        <motion.div style={{ opacity: glow }} className="absolute inset-0 bg-orange/15 blur-sm" />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Colored background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-subtle/80 via-background to-teal-subtle/60" />

      {/* Decorative SVG curves */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 80C360 20 720 0 1080 30C1260 45 1380 65 1440 80V0H0V80Z" fill="var(--color-background)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 0C360 60 720 80 1080 50C1260 35 1380 15 1440 0V80H0V0Z" fill="var(--color-background)" />
        </svg>
      </div>

      {/* Floating dots */}
      <div className="absolute top-24 right-16 h-3 w-3 rounded-full bg-amber/40" />
      <div className="absolute top-40 right-32 h-2 w-2 rounded-full bg-teal/40" />
      <div className="absolute bottom-32 left-20 h-4 w-4 rounded-full bg-coral/30" />
      <div className="absolute bottom-48 left-40 h-2 w-2 rounded-full bg-indigo/30" />

      <div className="relative mx-auto max-w-4xl">
        <motion.h2
          initial={false}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <span className="text-orange font-mono text-lg block mb-2">02.</span>
          技能
        </motion.h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            {skills.map((s, i) => (
              <SkillBar key={s.name} skill={s} index={i} inView={inView} />
            ))}
          </div>

          <motion.div
            initial={false}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-64 w-64">
              {[
                { r: 80, color: "border-orange/20" },
                { r: 110, color: "border-teal/15" },
                { r: 140, color: "border-amber/15" },
              ].map(({ r, color }, i) => (
                <motion.div
                  key={r}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ repeat: Infinity, duration: 12 + i * 6, ease: "linear" }}
                  className={`absolute rounded-full border ${color}`}
                  style={{ width: r * 2, height: r * 2, top: `calc(50% - ${r}px)`, left: `calc(50% - ${r}px)` }}
                >
                  <motion.div
                    whileHover={{ scale: 2 }}
                    className={`absolute -top-1.5 left-1/2 h-3 w-3 rounded-full ${i === 0 ? "bg-orange/50" : i === 1 ? "bg-teal/50" : "bg-amber/50"}`}
                  />
                </motion.div>
              ))}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-gradient-to-br from-orange to-amber shadow-[0_0_25px_var(--color-orange-dim)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
