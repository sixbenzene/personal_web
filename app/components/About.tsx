"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <motion.div
        initial={false}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-orange/30 to-transparent origin-center"
      />

      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={false}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <span className="text-orange font-mono text-lg block mb-2">01.</span>
          关于我
        </motion.h2>

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_auto]">
          <motion.div
            initial={false}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2 }}
            className="space-y-5 text-muted leading-relaxed"
          >
            <p>
              我是一名充满热情的全栈开发者，拥有敏锐的设计眼光和对创造流畅用户体验的热爱。从像素级精确的前端到稳健的后端架构，我通过代码将创意变为现实。
            </p>
            <p>
              我的技术之旅始于好奇心，并逐渐发展成为一份打造有影响力产品的事业。我活跃在设计与工程的交汇处，在这里创造力与技术精度完美融合。
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {["React", "Next.js", "TypeScript", "Node.js", "Python", "Go"].map((t, i) => (
                <motion.span
                  key={t}
                  initial={false}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.1, borderColor: "var(--color-orange)" }}
                  className="rounded-full border border-card-border bg-orange-subtle px-4 py-1.5 text-xs font-mono text-orange cursor-default"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3, type: "spring" }}
            whileHover={{ rotate: 3 }}
            className="relative h-56 w-56 shrink-0 self-center"
          >
            <div className="absolute inset-0 rounded-2xl border-2 border-orange/20 translate-x-3 translate-y-3" />
            <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-orange-subtle to-orange/10 flex items-center justify-center shadow-lg shadow-orange/5">
              <span className="text-6xl">👨‍💻</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
