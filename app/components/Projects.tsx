"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "视频翻译系统",
    desc: "基于 Whisper Encoder + MLP 的音频文本评分模型，实现视频语音识别与多语言翻译的端到端流水线。",
    tags: ["Whisper", "PyTorch", "FFmpeg"],
    gradient: "from-orange to-amber",
    accent: "text-orange",
    tagBg: "bg-orange-subtle border-orange/15",
  },
  {
    title: "音频质量评分模型",
    desc: "利用 Whisper Encoder 提取音频特征，结合多层感知机对文本与音频进行匹配度评分，用于语音合成质量评估。",
    tags: ["Transformer", "MLP", "Python"],
    gradient: "from-teal to-amber",
    accent: "text-teal",
    tagBg: "bg-teal-subtle border-teal/15",
  },
  {
    title: "LLM 智能应用平台",
    desc: "基于大模型 API 构建的智能对话与内容生成平台，支持流式输出、Prompt 管理与多模型切换。",
    tags: ["LLM API", "FastAPI", "React"],
    gradient: "from-indigo to-coral",
    accent: "text-indigo",
    tagBg: "bg-indigo-subtle border-indigo/15",
  },
];

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [6, -6]);
  const rotateY = useTransform(x, [-150, 150], [-6, 6]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: 0.1 + index * 0.15, type: "spring", stiffness: 80 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, perspective: 800 }}
      className="group relative rounded-2xl border border-card-border bg-card-bg p-6 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
    >
      {/* Top gradient line */}
      <motion.div
        initial={false}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
        className={`absolute top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r ${project.gradient}`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className={`font-mono text-xs ${project.accent} opacity-60`}>0{index + 1}</span>
          <motion.span whileHover={{ x: 4 }} className={`${project.accent} opacity-40 group-hover:opacity-100 transition-opacity`}>→</motion.span>
        </div>
        <h3 className={`text-xl font-semibold mb-2 group-hover:${project.accent} transition-colors`}>{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-mono text-muted ${project.tagBg}`}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-16 -right-20 h-48 w-48 rounded-full bg-indigo/5 blur-[60px]" />
      <div className="absolute bottom-16 -left-20 h-56 w-56 rounded-full bg-coral/5 blur-[60px]" />

      <motion.div
        initial={false}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-teal/30 to-transparent origin-center"
      />

      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={false}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <span className="text-orange font-mono text-lg block mb-2">03.</span>
          项目
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
