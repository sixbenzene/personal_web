"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socials = [
  { name: "GitHub", href: "#", icon: "GH" },
  { name: "领英", href: "#", icon: "LI" },
  { name: "推特", href: "#", icon: "TW" },
  { name: "邮箱", href: "mailto:hello@example.com", icon: "EM" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <motion.div
        initial={false}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-orange/30 to-transparent origin-center"
      />

      <div className="mx-auto max-w-2xl text-center">
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
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px var(--color-orange-dim)" }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 inline-block rounded-full border border-orange/30 px-10 py-4 text-sm font-semibold text-orange hover:bg-orange-subtle shadow-sm"
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
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-card-border text-xs font-mono text-muted hover:text-orange hover:border-orange/30"
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
        className="mt-24 text-center text-xs text-muted/50 font-mono"
      >
        用 ♥ 设计与构建
      </motion.div>
    </section>
  );
}
