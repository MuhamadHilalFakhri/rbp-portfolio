import { MoneyTransfer } from "meya-icons/react/outline";
import type { Project } from "../project-types";

export const automationTradingProject: Project = {
  id: "automation-trading",
  icon: MoneyTransfer,
  iconLabel: "Trading Bot",
  title: "Automation Trading Suite - AI Bot MT5 & Web Journal",
  description:
    "Ekosistem trading otomatis terintegrasi yang menggabungkan AI Bot untuk MetaTrader 5 (analisis strategi SMC/ICT dengan LLM, risk guard, dan eksekusi otomatis) dengan Web Trading Journal berbasis Next.js untuk monitoring performa, kalender PnL, dan analitik secara real-time.",
  meta: "Date Project : 2026",
  githubUrl: "https://github.com/MuhamadHilalFakhri/AutomationTrading.git",
  techStack: [
    { label: "Python", slug: "python" },
    { label: "Next.js", slug: "nextdotjs", invertInDark: true },
    { label: "React", slug: "react" },
    { label: "TypeScript", slug: "typescript" },
    { label: "Tailwind CSS", slug: "tailwindcss" },
  ],
  overview:
    "Automation Trading Suite adalah sistem trading otomatis pribadi yang mengintegrasikan bot trading AI berbasis Python untuk MetaTrader 5 dengan aplikasi web jurnal trading modern berbasis Next.js. Bot AI memindai pergerakan market di berbagai timeframe, menganalisis struktur market menggunakan model AI (LLM OpenAI-compatible) dengan kerangka strategi SMC (Smart Money Concepts), ICT, dan Supply & Demand, memvalidasi parameter risiko melalui Risk Guard (RR minimum, spread filter, daily-loss halt), serta mengeksekusi order secara presisi di MT5 dengan trailing stop dan partial TP. Semua aktivitas trading, posisi terbuka, sinyal AI, dan performa PnL disinkronkan secara otomatis dan dapat dipantau langsung melalui web dashboard jurnal serta remote control melalui Telegram Bot.",
  highlights: [
    "Bot Trading AI MetaTrader 5 dengan scan paralel multi-pair & multi-timeframe (M5, M15, H1, H4)",
    "Integrasi AI LLM dengan strategi SMC (Order Block, FVG, Liquidity Sweep), ICT, dan Supply & Demand",
    "Risk Guard otomatis: validasi Risk:Reward (RR), spread filter, daily-loss limit, dan dynamic lot sizing",
    "Manajemen posisi otomatis: Break-Even (BE), Trailing Stop dinamis, dan Partial Take Profit (TP)",
    "Web Trading Journal modern dengan Next.js 16, React 19, Tailwind CSS, SQLite, dan Drizzle ORM",
    "Interactive Market Charts bertenaga TradingView & Lightweight Charts untuk visualisasi level entry/exit",
    "Analitik performa komprehensif: Kalender PnL harian, Win Rate, Profit Factor, dan breakdown per pair & strategi",
    "Live stream terminal aktivitas bot (scan, keputusan AI, eksekusi order, risk block) secara real-time",
    "Remote control & notifikasi real-time via Telegram Bot untuk pantau PnL dan ubah pair dari HP",
    "Desktop GUI control panel mandiri berbasis Python & PyInstaller untuk konfigurasi parameter tanpa coding",
  ],
  images: [
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712942/screenshot-2026-09-05-230752-converted.webp",
      alt: "Landing Page Automation Trading Suite",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712949/screenshot-2026-09-05-230811-converted.webp",
      alt: "Dashboard Performa Trading & Ringkasan PnL",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712945/screenshot-2026-09-05-230821-converted.webp",
      alt: "Market Chart TradingView & Analisis Pair",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712954/screenshot-2026-09-05-230841-converted.webp",
      alt: "Chart Eksekusi Entry MT5 Real-time",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712965/screenshot-2026-09-05-230847-converted.webp",
      alt: "Terminal Live Stream Aktivitas Bot Trading",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712961/screenshot-2026-09-05-230855-converted.webp",
      alt: "Riwayat Transaksi & Posisi Terbuka",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712956/screenshot-2026-09-05-230931-converted.webp",
      alt: "Kalender Rekap PnL Harian",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712969/screenshot-2026-09-05-231014-converted.webp",
      alt: "Analitik Performa Win Rate & Profit Factor",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712973/screenshot-2026-09-05-231023-converted.webp",
      alt: "Log Sinyal AI & Jejak Keputusan",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712985/screenshot-2026-09-05-231031-converted.webp",
      alt: "Pengaturan & Status Sinkronisasi MT5",
    },
    {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712981/x.png",
      alt: "Control Panel Desktop Terminal MT5",
    },
  ],
  video: {
    src: "https://res.cloudinary.com/jaiq0dj6/video/upload/v1790759237/automation-trading-horizontal.mp4",
    poster: {
      src: "https://res.cloudinary.com/jaiq0dj6/image/upload/v1790712942/screenshot-2026-09-05-230752-converted.webp",
      alt: "Landing Page Automation Trading Suite",
    },
  },
  imageRatio: 16 / 9,
};
