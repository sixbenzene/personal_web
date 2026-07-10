"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "../../i18n/context";

const hobbyMeta: Record<string, { icon: string; gradient: string; en: string; zh: string }> = {
  gaming: { icon: "🎮", gradient: "from-indigo to-teal", en: "Gaming", zh: "游戏" },
  music: { icon: "🎵", gradient: "from-coral to-orange", en: "Music", zh: "音乐" },
  photography: { icon: "📷", gradient: "from-teal to-amber", en: "Photography", zh: "摄影" },
  painting: { icon: "🎨", gradient: "from-amber to-orange", en: "Painting", zh: "绘画" },
};

/** Single pulsating circle with radiating bars — reusable at any size/position */
function PulseCircle({ size, top, left, barCount, drift }: {
  size: number; // vmin
  top: string;
  left: string;
  barCount: number;
  drift: { x: number[]; y: number[]; duration: number };
}) {
  const radius = size / 2; // vmin from center to edge
  const gap = size * 0.08; // gap between circle edge and bar start (vmin)

  const bars = Array.from({ length: barCount }, (_, i) => {
    const angle = (i / barCount) * 2 * Math.PI;
    const barDist = radius + gap; // distance from center to bar bottom
    // Position in % relative to the container (center is 50%), rounded to avoid hydration mismatch
    const cx = Math.round((50 + (barDist / size) * 100 * Math.sin(angle)) * 100) / 100;
    const cy = Math.round((50 - (barDist / size) * 100 * Math.cos(angle)) * 100) / 100;
    const rotateDeg = Math.round((i / barCount) * 360 * 100) / 100;

    return {
      cx,
      cy,
      rotateDeg,
      baseHeight: 10 + (i * 7) % Math.max(Math.round(size * 0.6), 15),
      duration: 1.0 + ((i * 3) % 18) / 10,
      delay: ((i * 5) % 20) / 10,
      color: i % 3 === 0 ? "#f07030" : i % 3 === 1 ? "#f4a261" : "#e86b5a",
    };
  });

  return (
    <motion.div
      animate={{ x: drift.x, y: drift.y }}
      transition={{ repeat: Infinity, duration: drift.duration, ease: "easeInOut" }}
      className="absolute"
      style={{ top, left, width: `${size}vmin`, height: `${size}vmin`, transform: "translate(-50%, -50%)" }}
    >
      {/* Circle background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange/10 to-amber/6" />
      <motion.div
        animate={{ scale: [1, 1.015, 0.985, 1.01, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border-[2px] border-orange/15"
      />

      {/* Bars positioned around the circumference, pointing outward from center */}
      {bars.map((bar, i) => (
        <div
          key={i}
          suppressHydrationWarning
          style={{
            position: "absolute",
            left: `${bar.cx}%`,
            top: `${bar.cy}%`,
            transform: `translate(-50%, 0%) rotate(${bar.rotateDeg + 180}deg)`,
          }}
        >
          <motion.div
            animate={{ scaleY: [0.3, 1, 0.15, 0.85, 0.3] }}
            transition={{ repeat: Infinity, duration: bar.duration, delay: bar.delay, ease: "easeInOut" }}
            style={{
              width: size > 20 ? "4px" : "3px",
              height: `${bar.baseHeight}px`,
              borderRadius: "2px",
              backgroundColor: bar.color,
              opacity: 0.5,
              transformOrigin: "top center",
            }}
          />
        </div>
      ))}
    </motion.div>
  );
}

/** Background with multiple pulsating circles */
function MusicOrb() {
  const circles = [
    { size: 55, top: "45%", left: "55%", barCount: 24, drift: { x: [0, 25, -10, 15, 0], y: [0, -15, 10, -8, 0], duration: 22 } },
    { size: 30, top: "20%", left: "15%", barCount: 16, drift: { x: [0, -15, 10, -8, 0], y: [0, 10, -12, 5, 0], duration: 18 } },
    { size: 22, top: "75%", left: "80%", barCount: 12, drift: { x: [0, 12, -8, 6, 0], y: [0, -8, 12, -5, 0], duration: 20 } },
    { size: 18, top: "65%", left: "20%", barCount: 10, drift: { x: [0, -10, 8, -5, 0], y: [0, 8, -6, 10, 0], duration: 16 } },
    { size: 14, top: "15%", left: "75%", barCount: 8, drift: { x: [0, 8, -12, 5, 0], y: [0, -10, 6, -8, 0], duration: 14 } },
    { size: 12, top: "85%", left: "40%", barCount: 8, drift: { x: [0, -6, 10, -4, 0], y: [0, 5, -8, 6, 0], duration: 15 } },
    { size: 10, top: "35%", left: "90%", barCount: 6, drift: { x: [0, 6, -5, 8, 0], y: [0, -6, 4, -3, 0], duration: 12 } },
    { size: 8, top: "50%", left: "5%", barCount: 6, drift: { x: [0, -4, 6, -3, 0], y: [0, 5, -4, 6, 0], duration: 13 } },
    { size: 16, top: "30%", left: "40%", barCount: 10, drift: { x: [0, 10, -6, 8, 0], y: [0, -12, 8, -6, 0], duration: 19 } },
    { size: 20, top: "80%", left: "60%", barCount: 12, drift: { x: [0, -8, 12, -6, 0], y: [0, 6, -10, 8, 0], duration: 17 } },
    { size: 9, top: "10%", left: "50%", barCount: 6, drift: { x: [0, 5, -8, 4, 0], y: [0, -4, 6, -5, 0], duration: 11 } },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {circles.map((c, i) => (
        <PulseCircle key={i} {...c} />
      ))}
    </div>
  );
}

function MusicPage({ lang }: { lang: "en" | "zh" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 space-y-12"
    >
      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted leading-relaxed max-w-2xl"
      >
        {lang === "en"
          ? "Guitar is my way of unwinding. I enjoy fingerstyle and acoustic covers — here are some recordings from practice sessions."
          : "吉他是我放松的方式。喜欢指弹和木吉他翻弹，这里是一些练习时的录像。"}
      </motion.p>

      {/* Featured video */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎸</span>
          <h2 className="text-xl font-semibold">
            {lang === "en" ? "Featured" : "精选演奏"}
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-card-border bg-card-bg overflow-hidden shadow-lg shadow-coral/5"
        >
          <div className="relative w-full aspect-video">
            <iframe
              src="//player.bilibili.com/player.html?isOutside=true&aid=116896376692142&bvid=BV1qcNp6zEG2&cid=39831014715&p=1&high_quality=1&danmaku=0"
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="p-5 border-t border-card-border">
            <h3 className="font-semibold text-sm">
              {lang === "en" ? "Guitar Practice Session" : "吉他练习录像"}
            </h3>
            <p className="text-xs text-muted mt-1">
              {lang === "en" ? "Acoustic guitar fingerstyle" : "木吉他指弹"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* More videos grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-muted">
          {lang === "en" ? "More Recordings" : "更多录像"}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="rounded-xl border border-dashed border-card-border bg-card-bg/50 overflow-hidden"
            >
              <div className="aspect-video flex items-center justify-center bg-foreground/[0.02]">
                <div className="text-center">
                  <span className="text-3xl block mb-2 opacity-30">🎬</span>
                  <p className="text-xs text-muted/40">
                    {lang === "en" ? "Coming soon..." : "即将更新..."}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Music taste / playlist section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-2xl border border-card-border bg-gradient-to-br from-coral-subtle to-orange-subtle p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎧</span>
          <h3 className="font-semibold">
            {lang === "en" ? "What I Listen To" : "我在听什么"}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Fingerstyle", "Post-Rock", "Jazz", "Lo-fi", "Acoustic"].map((genre) => (
            <span key={genre} className="rounded-full border border-coral/20 bg-card-bg px-4 py-1.5 text-xs font-mono text-coral">
              {genre}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HobbyDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { lang, t } = useLang();
  const meta = hobbyMeta[slug];

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">{t("detail.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-[0.05]`} />

      {/* Pulsating orb for music page */}
      {slug === "music" && <MusicOrb />}

      {/* Back button */}
      <div className="relative z-10 px-8 pt-8">
        <Link href="/hobbies">
          <motion.span
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-orange transition-colors cursor-pointer"
          >
            {lang === "en" ? "← Back to Hobbies" : "← 返回爱好"}
          </motion.span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 pt-16 pb-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <span className="text-6xl mb-4 block">{meta.icon}</span>
          <h1 className={`text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
            {meta[lang]}
          </h1>
        </motion.div>

        {slug === "music" && <MusicPage lang={lang} />}

        {slug !== "music" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 rounded-2xl border border-dashed border-card-border p-16 text-center"
          >
            <p className="text-muted text-sm">{t("detail.wip")}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
