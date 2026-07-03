"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "../../i18n/context";

const skillMeta: Record<string, { gradient: string; icon: string }> = {
  python: { gradient: "from-amber to-orange", icon: "🐍" },
  pytorch: { gradient: "from-coral to-orange", icon: "🔥" },
  asr: { gradient: "from-teal to-amber", icon: "🎙️" },
  llm: { gradient: "from-indigo to-teal", icon: "🧠" },
  microservice: { gradient: "from-orange to-amber", icon: "⚡" },
  data: { gradient: "from-teal to-indigo", icon: "📊" },
};

export default function SkillDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useLang();
  const meta = skillMeta[slug];

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">{t("detail.notFound")}</p>
      </div>
    );
  }

  const name = t(`skills.items.${slug}.name`);
  const description = t(`skills.items.${slug}.description`);

  // Get highlights array
  const highlights: string[] = [];
  for (let i = 0; i < 10; i++) {
    const val = t(`skills.items.${slug}.highlights.${i}`);
    if (val === `skills.items.${slug}.highlights.${i}`) break;
    highlights.push(val);
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-[0.06]`} />

      <div className="relative z-10 px-8 pt-8">
        <Link href="/#skills">
          <motion.span
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-orange transition-colors cursor-pointer"
          >
            {t("detail.back")}
          </motion.span>
        </Link>
      </div>

      <div className="relative z-10 px-8 pt-20 pb-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <span className="text-6xl mb-6 block">{meta.icon}</span>
          <h1 className={`text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
            {name}
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-xl font-semibold mb-6">{t("detail.coreCapabilities")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3 rounded-xl border border-card-border bg-card-bg p-5 shadow-sm"
              >
                <span className={`mt-0.5 h-2 w-2 rounded-full bg-gradient-to-r ${meta.gradient} shrink-0`} />
                <span className="text-sm text-foreground/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-2xl border border-dashed border-card-border p-12 text-center"
        >
          <p className="text-muted text-sm">{t("detail.wip")}</p>
        </motion.div>
      </div>
    </div>
  );
}
