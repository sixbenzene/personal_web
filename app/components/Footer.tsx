"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

export default function Footer() {
  const [showWechat, setShowWechat] = useState(false);
  const [copied, setCopied] = useState(false);

  // Anti-scraping: assemble the ID at runtime
  const getWechatId = useCallback(() => {
    const p = ["lgq", "goe", "6H"];
    return p.join("");
  }, []);

  const handleReveal = () => {
    setShowWechat(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getWechatId());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-subtle/50 to-background" />

      <div className="relative mx-auto max-w-md text-center space-y-6">
        {/* WeChat contact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <p className="text-sm text-muted">联系方式</p>

          <AnimatePresence mode="wait">
            {!showWechat ? (
              <motion.button
                key="btn"
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={handleReveal}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-6 py-2.5 text-sm font-medium text-foreground shadow-sm hover:border-teal/30 hover:shadow-md transition-all cursor-pointer"
              >
                <span className="text-teal">💬</span>
                点击查看微信号
              </motion.button>
            ) : (
              <motion.div
                key="id"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-2"
              >
                <div className="inline-flex items-center gap-3 rounded-full border border-teal/20 bg-teal-subtle px-6 py-2.5">
                  <span className="text-sm font-mono text-teal select-all">{getWechatId()}</span>
                  <button
                    onClick={handleCopy}
                    className="text-xs text-teal/70 hover:text-teal transition-colors cursor-pointer"
                  >
                    {copied ? "✓ 已复制" : "复制"}
                  </button>
                </div>
                <p className="text-xs text-muted/60">添加时请备注来意</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xs text-muted/40 font-mono pt-4"
        >
          © 2026 刘国清 · 用 ♥ 设计与构建
        </motion.div>
      </div>
    </footer>
  );
}
