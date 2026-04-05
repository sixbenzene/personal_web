"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techTags = [
  { name: "Python", color: "bg-amber-subtle text-amber border-amber/20" },
  { name: "PyTorch", color: "bg-coral-subtle text-coral border-coral/20" },
  { name: "Whisper", color: "bg-teal-subtle text-teal border-teal/20" },
  { name: "LLM API", color: "bg-indigo-subtle text-indigo border-indigo/20" },
  { name: "FastAPI", color: "bg-teal-subtle text-teal border-teal/20" },
  { name: "Transformers", color: "bg-orange-subtle text-orange border-orange/20" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 -left-32 h-64 w-64 rounded-full bg-amber/8 blur-[80px]" />
      <div className="absolute bottom-20 -right-32 h-72 w-72 rounded-full bg-teal/8 blur-[80px]" />

      {/* Top separator */}
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
              我是一名 AI 应用工程师，专注于将前沿的人工智能技术落地为实际产品。在语音识别领域，我基于 Whisper 模型的 Encoder 层结合多层感知机（MLP），训练文本与音频的评分任务模型，积累了丰富的多模态建模经验。
            </p>
            <p>
              同时，我熟悉大语言模型 API 的开发与集成，能够快速构建基于 LLM 的智能应用。我热衷于探索 AI 技术的边界，将复杂的模型能力转化为用户可感知的产品价值。
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {techTags.map((t, i) => (
                <motion.span
                  key={t.name}
                  initial={false}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.1 }}
                  className={`rounded-full border px-4 py-1.5 text-xs font-mono cursor-default ${t.color}`}
                >
                  {t.name}
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
            <div className="absolute inset-0 rounded-2xl border-2 border-teal/20 translate-x-3 translate-y-3" />
            <div className="absolute inset-0 rounded-2xl border-2 border-amber/15 -translate-x-2 translate-y-5 rotate-3" />
            <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-orange-subtle via-amber-subtle to-teal-subtle flex items-center justify-center shadow-lg shadow-orange/5">
              <span className="text-6xl">🤖</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
