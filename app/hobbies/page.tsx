"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "../i18n/context";

const categories = [
  { slug: "gaming", icon: "🎮", gradient: "from-indigo to-teal" },
  { slug: "music", icon: "🎵", gradient: "from-coral to-orange" },
  { slug: "photography", icon: "📷", gradient: "from-teal to-amber" },
  { slug: "painting", icon: "🎨", gradient: "from-amber to-orange" },
];

const titles: Record<string, { en: string; zh: string }> = {
  gaming: { en: "Gaming", zh: "游戏" },
  music: { en: "Music", zh: "音乐" },
  photography: { en: "Photography", zh: "摄影" },
  painting: { en: "Painting", zh: "绘画" },
};

export default function Hobbies() {
  const { lang, t } = useLang();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange/[0.03] via-background to-teal/[0.03]" />

      {/* Back */}
      <div className="relative z-10 px-8 pt-8">
        <Link href="/">
          <motion.span
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-orange transition-colors cursor-pointer"
          >
            {t("detail.back")}
          </motion.span>
        </Link>
      </div>

      <div className="relative z-10 px-8 pt-16 pb-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            <span className="text-orange font-mono text-lg block mb-2">✦</span>
            {lang === "en" ? "Hobbies" : "爱好"}
          </h1>
          <p className="mt-4 text-muted">
            {lang === "en" ? "Things I enjoy outside of work." : "工作之余的兴趣爱好。"}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link href={`/hobbies/${cat.slug}`}>
                <div className="group relative rounded-2xl border border-card-border bg-card-bg p-8 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient}`} />
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{cat.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-orange transition-colors">
                        {titles[cat.slug][lang]}
                      </h3>
                      <p className="text-xs text-muted mt-1">
                        {lang === "en" ? "Coming soon..." : "即将更新..."}
                      </p>
                    </div>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="ml-auto text-orange/40 group-hover:text-orange transition-colors"
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
