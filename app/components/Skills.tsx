"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "UI/UX 设计", level: 75 },
  { name: "运维 / 云服务", level: 70 },
];

function SkillBar({ name, level, index, inView }: { name: string; level: number; index: number; inView: boolean }) {
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
        <span className="text-sm font-mono text-muted group-hover:text-orange transition-colors">{name}</span>
        <span className="text-xs font-mono text-orange/70">{level}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-card-border overflow-hidden">
        <motion.div
          initial={false}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange to-orange-light"
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
    <section id="skills" ref={ref} className="relative py-32 px-6">
      <motion.div
        initial={false}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-orange/30 to-transparent origin-center"
      />

      <div className="mx-auto max-w-4xl">
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
              <SkillBar key={s.name} {...s} index={i} inView={inView} />
            ))}
          </div>

          <motion.div
            initial={false}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-64 w-64">
              {[80, 110, 140].map((r, i) => (
                <motion.div
                  key={r}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12 + i * 6, ease: "linear" }}
                  className="absolute rounded-full border border-orange/15"
                  style={{ width: r * 2, height: r * 2, top: `calc(50% - ${r}px)`, left: `calc(50% - ${r}px)` }}
                >
                  <motion.div whileHover={{ scale: 2 }} className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-orange/50" />
                </motion.div>
              ))}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-orange shadow-[0_0_20px_var(--color-orange-dim)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
