"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "../../i18n/context";

const projectMeta: Record<string, { gradient: string; icon: string; tags: string[] }> = {
  "oral-scoring": { gradient: "from-orange to-amber", icon: "🎤", tags: ["Python", "Volcengine ASR", "Doubao LLM", "SQLite", "Pandas"] },
  "fact-check": { gradient: "from-teal to-amber", icon: "🔍", tags: ["Python", "asyncio", "Playwright", "LLM API", "MCP", "SQLite", "Gradio", "FastAPI"] },
  "digital-human": { gradient: "from-indigo to-coral", icon: "🧑‍🏫", tags: ["Flask", "Redis", "FFmpeg", "OpenCV", "Docker", "K8s", "MiniMax TTS", "HeyGem"] },
  "whisper-scoring": { gradient: "from-coral to-orange", icon: "🎯", tags: ["PyTorch", "Transformers", "Whisper large-v3", "ONNX Runtime"] },
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useLang();
  const meta = projectMeta[slug];

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">{t("detail.notFound")}</p>
      </div>
    );
  }

  const title = t(`projects.items.${slug}.title`);
  const description = t(`projects.items.${slug}.description`);
  const techStack = t(`projects.items.${slug}.techStack`);

  // Get details array - need to access it differently since t() returns string
  const details: string[] = [];
  for (let i = 0; i < 10; i++) {
    const val = t(`projects.items.${slug}.details.${i}`);
    if (val === `projects.items.${slug}.details.${i}`) break;
    details.push(val);
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-[0.06]`} />

      <div className="relative z-10 px-8 pt-8">
        <Link href="/#projects">
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
          <span className="text-6xl mb-6 block">{meta.icon}</span>
          <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
            {title}
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-card-border bg-card-bg px-4 py-1.5 text-xs font-mono text-muted">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-xl font-semibold mb-6">{t("detail.coreWork")}</h2>
          <div className="space-y-4">
            {details.map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3 rounded-xl border border-card-border bg-card-bg p-5 shadow-sm"
              >
                <span className={`mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r ${meta.gradient} shrink-0`} />
                <span className="text-sm text-foreground/80 leading-relaxed">{detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 rounded-2xl border border-card-border bg-card-bg p-6 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-muted mb-2">{t("detail.techStack")}</h3>
          <p className="text-sm font-mono text-foreground/70">{techStack}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-2xl border border-dashed border-card-border p-8 text-center">
            <p className="text-muted text-sm">{t("detail.architecture")}</p>
          </div>
          <div className="rounded-2xl border border-dashed border-card-border p-8 text-center">
            <p className="text-muted text-sm">{t("detail.metrics")}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
