"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "../i18n/context";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: t("nav.about"), href: "#about", isRoute: false },
    { label: t("nav.skills"), href: "#skills", isRoute: false },
    { label: t("nav.projects"), href: "#projects", isRoute: false },
    { label: t("nav.hobbies"), href: "/hobbies", isRoute: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        animate={{ backgroundColor: scrolled ? "rgba(250,248,245,0.9)" : "rgba(0,0,0,0)" }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 backdrop-blur-md ${scrolled ? "border-b border-card-border shadow-sm" : ""}`}
      >
        <motion.a href="#" className={`text-xl font-bold tracking-tight ${scrolled ? "text-orange" : "text-white"}`} whileHover={{ scale: 1.05 }}>
          {"<GQ />"}
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((link, i) => {
            const Tag = link.isRoute ? Link : "a";
            return (
              <Tag key={link.href} href={link.href}>
                <motion.span
                  className={`relative px-4 py-2 text-sm font-medium transition-colors inline-block ${scrolled ? "text-muted hover:text-foreground" : "text-white/70 hover:text-white"}`}
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
                </motion.span>
              </Tag>
            );
          })}
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className={`ml-3 px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer transition-all ${scrolled ? "border border-card-border text-muted hover:text-orange hover:border-orange/30" : "border border-white/20 text-white/70 hover:text-white hover:border-white/40"}`}
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono cursor-pointer ${scrolled ? "border border-card-border text-muted" : "border border-white/20 text-white/70"}`}
          >
            {lang === "en" ? "中" : "EN"}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex flex-col gap-1.5 p-2 cursor-pointer ${scrolled ? "text-foreground" : "text-white"}`}
            aria-label="Menu"
          >
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }} className={`block w-5 h-0.5 rounded ${scrolled ? "bg-foreground" : "bg-white"}`} />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className={`block w-5 h-0.5 rounded ${scrolled ? "bg-foreground" : "bg-white"}`} />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }} className={`block w-5 h-0.5 rounded ${scrolled ? "bg-foreground" : "bg-white"}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-20 px-6 bg-background/95 backdrop-blur-lg sm:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const Tag = link.isRoute ? Link : "a";
                return (
                  <Tag key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                    <div className="px-4 py-3 text-lg font-medium text-foreground hover:text-orange transition-colors rounded-xl hover:bg-orange-subtle">
                      {link.label}
                    </div>
                  </Tag>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
