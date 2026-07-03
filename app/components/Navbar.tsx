"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/context";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t("nav.about"), href: "about" },
    { label: t("nav.skills"), href: "skills" },
    { label: t("nav.projects"), href: "projects" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      animate={{ backgroundColor: scrolled ? "rgba(250,248,245,0.9)" : "rgba(0,0,0,0)" }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5 backdrop-blur-md ${scrolled ? "border-b border-card-border shadow-sm" : ""}`}
    >
      <motion.a href="#" className={`text-xl font-bold tracking-tight ${scrolled ? "text-orange" : "text-white"}`} whileHover={{ scale: 1.05 }}>
        {"<GQ />"}
      </motion.a>
      <div className="flex items-center gap-1">
        {links.map((link, i) => (
          <motion.a
            key={link.href}
            href={`#${link.href}`}
            className={`relative px-4 py-2 text-sm font-medium transition-colors ${scrolled ? "text-muted hover:text-foreground" : "text-white/70 hover:text-white"}`}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ y: -2 }}
          >
            {hovered === i && (
              <motion.span
                layoutId="nav-pill"
                className={`absolute inset-0 rounded-full ${scrolled ? "bg-orange-subtle" : "bg-white/15"}`}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{link.label}</span>
          </motion.a>
        ))}

        {/* Language switcher */}
        <button
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
          className={`ml-3 px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer transition-all ${scrolled ? "border border-card-border text-muted hover:text-orange hover:border-orange/30" : "border border-white/20 text-white/70 hover:text-white hover:border-white/40"}`}
        >
          {lang === "en" ? "中文" : "EN"}
        </button>
      </div>
    </motion.nav>
  );
}
