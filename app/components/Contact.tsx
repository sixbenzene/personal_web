"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socials = [
  { name: "GitHub", href: "#", icon: "GH", color: "hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5" },
  { name: "领英", href: "#", icon: "LI", color: "hover:text-indigo hover:border-indigo/30 hover:bg-indigo-subtle" },
  { name: "推特", href: "#", icon: "TW", color: "hover:text-teal hover:border-teal/30 hover:bg-teal-subtle" },
  { name: "邮箱", href: "mailto:hello@example.com", icon: "EM", color: "hover:text-coral hover:border-coral/30 hover:bg-coral-subtle" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-subtle/60 via-background to-background" />

      {/* Decorative curves at top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 60C480 10 960 10 1440 60V0H0V60Z" fill="var(--color-background)" />
          <path d="M0 40C360 5 720 0 1080 15C1260 22 1380 35 1440 40" stroke="var(--color-orange)" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
        </svg>
      </div>

      {/* Floating decorative dots */}
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-32 left-[15%] h-3 w-3 rounded-full bg-amber/30" />
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-48 right-[20%] h-2 w-2 rounded-full bg-teal/30" />
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute bottom-40 left-[25%] h-2 w-2 rounded-full bg-coral/25" />

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.h2
          initial={false}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <span className="text-orange font-mono text-lg block mb-2">04.</span>
          联系我
        </motion.h2>

        <motion.p
          initial={false}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-muted leading-relaxed"
        >
          我随时欢迎新的机会和有趣的项目。
          无论你有问题还是只想打个招呼，都可以随时联系我！
        </motion.p>

        <motion.a
          href="mailto:hello@example.com"
          initial={false}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 inline-block rounded-full bg-gradient-to-r from-orange to-amber px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-orange/20"
        >
          打个招呼 →
        </motion.a>

        <motion.div
          initial={false}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center gap-4"
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -4 }}
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-card-border text-xs font-mono text-muted transition-all ${s.color}`}
            >
              {hovered === i && (
                <motion.div
                  layoutId="social-glow"
                  className="absolute inset-0 rounded-full bg-orange-subtle"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{s.icon}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8 }}
        className="relative mt-24 text-center text-xs text-muted/50 font-mono"
      >
        用 ♥ 设计与构建
      </motion.div>
    </section>
  );
}
