"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "电商平台",
    desc: "全栈电商解决方案，支持实时库存管理、支付处理和管理后台。",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    color: "#f07030",
  },
  {
    title: "AI 聊天应用",
    desc: "基于大语言模型的实时聊天应用，支持流式响应、对话历史和 RAG 管道。",
    tags: ["React", "Python", "WebSocket"],
    color: "#f4a261",
  },
  {
    title: "运维监控面板",
    desc: "微服务监控面板，支持实时指标、告警和部署管理。",
    tags: ["Go", "Grafana", "K8s"],
    color: "#f07030",
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
      className="group relative rounded-2xl border border-card-border bg-card-bg p-6 cursor-pointer overflow-hidden shadow-sm hover:shadow-lg hover:shadow-orange/5 transition-shadow"
    >
      <motion.div
        initial={false}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-orange/50">0{index + 1}</span>
          <motion.span whileHover={{ x: 4 }} className="text-orange/40 group-hover:text-orange transition-colors">→</motion.span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-orange transition-colors">{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-card-border bg-orange-subtle px-3 py-1 text-xs font-mono text-muted">{tag}</span>
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
    <section id="projects" ref={ref} className="relative py-32 px-6">
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
