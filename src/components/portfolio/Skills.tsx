import { useState } from "react";
import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Reveal";

interface SkillItem {
  name: string;
  icon: ReactElement;
}


interface SkillCategory {
  num: string;
  title: string;
  items: SkillItem[];
}

// ── Crisp monochrome vector icons matching the reference style ──────────────
const ICONS = {
  // 01 PROGRAMMING
  python: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M12 2c-5.5 0-5.1 2.4-5.1 2.4v2.5h5.2v.7H4.9S2 7.1 2 12.5s4.4 5.3 4.4 5.3h2.6v-2.5s-.2-2.9 2.9-2.9h5s2.7.1 2.7-2.7V4.4S20.1 2 14.6 2H12zm-2.6 1.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4.8 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2.4-5.3h-2.6v2.5s.2 2.9-2.9 2.9h-5s-2.7-.1-2.7 2.7v2.8s-.5 2.4 5 2.4h2.6s5.1 0 5.1-2.4v-2.5h-5.2v-.7h7.2s2.9.5 2.9-4.9-4.4-5.3-4.4-5.3z" />
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  r: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm3.8 15.6l-2.7-4.3c1.2-.4 2.1-1.4 2.1-2.9 0-2-1.6-3.1-4-3.1H7v10.3h2.3v-3.7h1.4l2.6 3.7h2.5zm-6.5-6v-2.6h1.9c1 0 1.8.4 1.8 1.3 0 .9-.8 1.3-1.8 1.3H9.3z" />
    </svg>
  ),

  // 02 DATA & ANALYTICS
  dataAnalysis: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M8 11l2 2 4-4" />
    </svg>
  ),
  eda: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 14l3-3 3 2 4-5" />
    </svg>
  ),
  dataCleaning: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  featureEng: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <line x1="6" y1="9" x2="6" y2="15" />
      <line x1="18" y1="9" x2="18" y2="15" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  ),
  pandas: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M7 3h3v18H7V3zm7 0h3v18h-3V3zM3 8h3v8H3V8zm15 0h3v8h-3V8z" />
    </svg>
  ),
  numpy: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M4 4h4v16H4V4zm12 0h4v16h-4V4zm-6 3h4v10h-4V7z" />
    </svg>
  ),
  matplotlib: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 5 5-9" />
    </svg>
  ),
  powerbi: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M4 14h4v7H4v-7zm6-6h4v13h-4V8zm6-5h4v18h-4V3z" />
    </svg>
  ),
  regression: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="3" y1="3" x2="3" y2="21" />
      <line x1="4" y1="18" x2="20" y2="6" />
      <polyline points="15 6 20 6 20 11" />
    </svg>
  ),
  classification: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M9 12h3m3-4l-3 4m0 0l3 4" />
    </svg>
  ),
  clustering: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="9" cy="9" r="3" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="15" cy="16" r="4" />
    </svg>
  ),
  modelEval: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="12" cy="12" r="9" />
      <polyline points="9 12 11.5 14.5 15.5 9.5" />
    </svg>
  ),
  tuning: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="8" cy="6" r="2" fill="currentColor" />
      <circle cx="16" cy="12" r="2" fill="currentColor" />
      <circle cx="11" cy="18" r="2" fill="currentColor" />
    </svg>
  ),
  predictiveModeling: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M3 21h18" />
      <path d="M5 17l4-5 4 3 6-8" />
      <polyline points="15 7 19 7 19 11" />
    </svg>
  ),

  // 03 AI / MACHINE LEARNING
  ml: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
      <path d="M4 10a4 4 0 0 0 4 4" />
      <path d="M20 10a4 4 0 0 1-4 4" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  ),
  deepLearning: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="5" cy="8" r="2" />
      <circle cx="5" cy="16" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      <circle cx="19" cy="8" r="2" />
      <circle cx="19" cy="16" r="2" />
      <line x1="7" y1="8" x2="10" y2="6" />
      <line x1="7" y1="8" x2="10" y2="12" />
      <line x1="7" y1="16" x2="10" y2="12" />
      <line x1="7" y1="16" x2="10" y2="18" />
      <line x1="14" y1="6" x2="17" y2="8" />
      <line x1="14" y1="12" x2="17" y2="8" />
      <line x1="14" y1="12" x2="17" y2="16" />
      <line x1="14" y1="18" x2="17" y2="16" />
    </svg>
  ),
  generativeAi: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
      <path d="M18 14l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1 1-2.2z" />
    </svg>
  ),
  nlp: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </svg>
  ),
  neuralNet: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="12" cy="12" r="2.5" />
      <line x1="7.5" y1="7.5" x2="10.5" y2="10.5" />
      <line x1="16.5" y1="7.5" x2="13.5" y2="10.5" />
      <line x1="7.5" y1="16.5" x2="10.5" y2="13.5" />
      <line x1="16.5" y1="16.5" x2="13.5" y2="13.5" />
    </svg>
  ),
  cnn: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <rect x="3" y="3" width="12" height="12" rx="1" />
      <rect x="9" y="9" width="12" height="12" rx="1" />
    </svg>
  ),
  rnn: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="12" cy="12" r="6" />
      <polyline points="12 6 15 9 12 12" />
      <path d="M12 18a6 6 0 0 1-6-6" />
    </svg>
  ),
  lstm: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <line x1="12" y1="9" x2="12" y2="15" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  transformers: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="12" cy="4" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="12" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="12" y1="6" x2="5" y2="17" />
      <line x1="12" y1="6" x2="12" y2="17" />
      <line x1="12" y1="6" x2="19" y2="17" />
    </svg>
  ),
  scikitLearn: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <circle cx="8" cy="12" r="5" className="opacity-80" />
      <circle cx="16" cy="12" r="5" className="opacity-60" />
      <path d="M12 7a5 5 0 0 1 0 10 5 5 0 0 1 0-10z" />
    </svg>
  ),
  tensorFlow: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M1.5 4.5L12 1.2l10.5 3.3v4.5L12 5.7 1.5 9V4.5zm0 6.8L12 8l10.5 3.3V22.8L12 19.5 1.5 22.8V11.3z" />
    </svg>
  ),

  // 04 COMPUTER VISION
  computerVision: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      <line x1="3" y1="3" x2="6" y2="3" />
      <line x1="3" y1="3" x2="3" y2="6" />
      <line x1="21" y1="3" x2="18" y2="3" />
      <line x1="21" y1="3" x2="21" y2="6" />
    </svg>
  ),
  opencv: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <circle cx="12" cy="6" r="3.5" />
      <circle cx="6" cy="16" r="3.5" />
      <circle cx="18" cy="16" r="3.5" />
    </svg>
  ),
  imageProcessing: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  docProcessing: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  ),
  ocr: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M4 7V4h3" />
      <path d="M17 4h3v3" />
      <path d="M20 17v3h-3" />
      <path d="M7 20H4v-3" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="12" y1="8" x2="12" y2="16" />
    </svg>
  ),

  // 05 DEVELOPMENT
  html: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M4.5 2h15l-1.4 15.6L12 21.8l-6.1-4.2L4.5 2zm12.3 4.2H7.2l.3 3.3h9l-.4 4.5-4.1 1.1-4.1-1.1-.3-2.6H4.6l.5 5.5 6.9 1.9 6.9-1.9.9-10.7z" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M4.5 2h15l-1.4 15.6L12 21.8l-6.1-4.2L4.5 2zm12.3 4.2H7.2l.3 3.3h9.3l-.9 9.8-3.9 1.1-3.9-1.1-.2-2.8H4.6l.4 5.7 7 1.9 7-1.9 1.2-13.4z" />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M3 3h18v18H3V3zm11.5 14.5c.8 0 1.5-.4 1.8-1l1.5.9c-.7 1.3-2 2-3.6 2-2.4 0-3.9-1.4-3.9-3.7 0-2.2 1.4-3.5 3.8-3.5 1.4 0 2.6.6 3.2 1.6l-1.5.9c-.4-.6-1-1-1.7-1-1.2 0-2 .8-2 2s.7 2 2.4 2zm-5.4-1.2h-1.9v-6.6h1.9v6.6z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  ),
  softwareEng: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h.01" />
      <path d="M9 8h.01" />
      <path d="M12 8h.01" />
      <path d="M7 14l3-3-3-3" />
      <line x1="12" y1="16" x2="16" y2="16" />
    </svg>
  ),

  // 06 RESEARCH & INNOVATION
  aiResearch: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M3 11a9 9 0 0 1 18 0c0 4.97-4.03 9-9 9a9.7 9.7 0 0 1-4-.85L3 21l1.85-4.99A8.93 8.93 0 0 1 3 11z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="13" y2="14" />
    </svg>
  ),
  sciResearch: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M10 2v7.5L5 19a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3L14 9.5V2" />
      <line x1="8" y1="2" x2="16" y2="2" />
      <line x1="8.5" y1="14" x2="15.5" y2="14" />
    </svg>
  ),
  techDoc: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="13" y2="11" />
    </svg>
  ),
  innovation: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15 8.5A5.5 5.5 0 1 0 9 8.5C9 11 11 13 11 15h2c0-2 2-4 2-6.5z" />
    </svg>
  ),
  socialImpact: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),

  // 07 TOOLS
  git: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M21.7 10.8l-8.5-8.5c-.4-.4-1-.4-1.4 0l-1.9 1.9 2.4 2.4c.4-.1.9 0 1.2.3.4.4.4 1.1.1 1.5l2.4 2.4c.4-.3 1.1-.3 1.5.1.5.5.5 1.3 0 1.8s-1.3.5-1.8 0c-.4-.4-.4-1.1-.1-1.5l-2.2-2.2v5.7c.3.2.5.6.5 1 0 .7-.6 1.3-1.3 1.3s-1.3-.6-1.3-1.3c0-.4.2-.8.5-1v-6.2c-.3-.2-.5-.6-.5-1 0-.5.2-.9.5-1.2L9.2 4.6 2.3 11.5c-.4.4-.4 1 0 1.4l8.5 8.5c.4.4 1 .4 1.4 0l9.5-9.5c.4-.4.4-1.1 0-1.6z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2z" />
    </svg>
  ),
  jupyter: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M12 3a9 9 0 0 0-8.5 6 9.5 9.5 0 0 0 0 6A9 9 0 0 0 12 21a9 9 0 0 0 8.5-6 9.5 9.5 0 0 0 0-6A9 9 0 0 0 12 3zm0 2.2a6.8 6.8 0 0 1 6.3 4.5h-12.6A6.8 6.8 0 0 1 12 5.2zm0 13.6a6.8 6.8 0 0 1-6.3-4.5h12.6a6.8 6.8 0 0 1-6.3 4.5z" />
      <circle cx="6" cy="6" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
      <circle cx="18" cy="6" r="1" />
    </svg>
  ),
  colab: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M16.9 7.8A5.7 5.7 0 0 0 12 5a5.7 5.7 0 0 0-4.9 2.8L2.4 16a5.7 5.7 0 0 0 9.6 6l4.9-8.2a5.7 5.7 0 0 0 0-6zm-4.9 12.4a3.7 3.7 0 0 1-3.2-1.9l-3.3-5.7a3.7 3.7 0 0 1 6.5-3.8l3.3 5.7a3.7 3.7 0 0 1-3.3 5.7z" />
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M23.5 4.5L17.2.5c-.4-.3-.9-.2-1.2.1L8.5 8.7 3.8 5.1c-.5-.4-1.2-.3-1.6.2L.4 7.2c-.4.5-.3 1.2.2 1.6l4.2 3.2L.6 15.2c-.5.4-.6 1.1-.2 1.6l1.8 1.9c.4.5 1.1.6 1.6.2l4.7-3.6 7.5 8.1c.3.3.8.4 1.2.1l6.3-4c.3-.2.5-.6.5-1V5.5c0-.4-.2-.8-.5-1zM17.5 17L12 12l5.5-5v10z" />
    </svg>
  ),
  pymupdf: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 13v4" />
      <path d="M9 13h2.5a1.5 1.5 0 0 0 0-3H9" />
    </svg>
  ),

  // 08 CORE COMPUTER SCIENCE
  dsa: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <line x1="10.5" y1="7" x2="7.5" y2="15.5" />
      <line x1="13.5" y1="7" x2="16.5" y2="15.5" />
    </svg>
  ),
  oop: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  dbms: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M21 19c0 1.66-4 3-9 3s-9-1.34-9-3" />
    </svg>
  ),
  os: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),

  // 09 EXTRA / PROFESSIONAL SKILLS
  leadership: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  publicSpeaking: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  crossCultural: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  projectMgmt: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M14 9h4" />
      <path d="M14 15h4" />
    </svg>
  ),
  teamwork: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <circle cx="9" cy="7" r="4" />
      <path d="M17 11a3 3 0 1 0-2.82-4" />
      <path d="M1 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
      <path d="M17 17v-1a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v1" />
    </svg>
  ),
  criticalThinking: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
    </svg>
  ),
  problemSolving: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  communication: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  adaptability: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
};

// ── 4 Exact Categories ───────────────────────────────────────────────────────
const CATEGORIES: SkillCategory[] = [
  {
    num: "01",
    title: "PROGRAMMING",
    items: [
      { name: "Python",  icon: ICONS.python },
      { name: "SQL",     icon: ICONS.sql },
      { name: "R",       icon: ICONS.r },
    ],
  },
  {
    num: "02",
    title: "DATA & ANALYTICS",
    items: [
      { name: "Pandas",              icon: ICONS.pandas },
      { name: "NumPy",               icon: ICONS.numpy },
      { name: "Matplotlib",          icon: ICONS.matplotlib },
      { name: "Power BI",            icon: ICONS.powerbi },
      { name: "EDA",                 icon: ICONS.eda },
      { name: "Data Cleaning",       icon: ICONS.dataCleaning },
      { name: "Feature Engineering", icon: ICONS.featureEng },
    ],
  },
  {
    num: "03",
    title: "AI & MACHINE LEARNING",
    items: [
      { name: "Machine Learning",       icon: ICONS.ml },
      { name: "Scikit-learn",           icon: ICONS.scikitLearn },
      { name: "TensorFlow",             icon: ICONS.tensorFlow },
      { name: "Deep Learning",          icon: ICONS.deepLearning },
      { name: "Generative AI",          icon: ICONS.generativeAi },
      { name: "NLP",                    icon: ICONS.nlp },
      { name: "Transformers",           icon: ICONS.transformers },
      { name: "Regression",             icon: ICONS.regression },
      { name: "Classification",         icon: ICONS.classification },
      { name: "Clustering",             icon: ICONS.clustering },
      { name: "Model Evaluation",       icon: ICONS.modelEval },
      { name: "Hyperparameter Tuning",  icon: ICONS.tuning },
    ],
  },
  {
    num: "04",
    title: "DEVELOPMENT & TOOLS",
    items: [
      { name: "Computer Vision",  icon: ICONS.computerVision },
      { name: "OpenCV",           icon: ICONS.opencv },
      { name: "CNN",              icon: ICONS.cnn },
      { name: "PyMuPDF",          icon: ICONS.pymupdf },
      { name: "HTML",             icon: ICONS.html },
      { name: "CSS",              icon: ICONS.css },
      { name: "JavaScript",       icon: ICONS.javascript },
      { name: "React",            icon: ICONS.react },
      { name: "Git",              icon: ICONS.git },
      { name: "GitHub",           icon: ICONS.github },
      { name: "Jupyter Notebook", icon: ICONS.jupyter },
      { name: "Google Colab",     icon: ICONS.colab },
      { name: "VS Code",          icon: ICONS.vscode },
    ],
  },
];


export function Skills() {
  return (
    <section id="skills" className="scroll-mt-28 py-24 bg-[#FFFDF7] text-[#24221D]">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Section Header */}
        <SectionHeading
          title="SKILLS"
          subtitle="Tools I work with"
        />

        {/* Categories with Reference Layout (Icon on top, Name underneath) */}
        <div className="space-y-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.num} className="pt-2">
              
              {/* Category Title with Thin Trailing Line */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D9A91A] whitespace-nowrap">
                  {cat.num} {cat.title}
                </h3>
                <div className="h-[1px] w-full bg-[#EDE5CF]" />
              </div>

              {/* Compact Capability Icon Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                {cat.items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="group flex flex-col items-center text-center cursor-default select-none p-3 rounded-xl bg-[#FFFFFF] border border-[#EDE5CF] shadow-[0_4px_20px_rgba(80,60,20,0.04)] transition-all duration-300 hover:bg-[#FFF9EC] hover:border-[#F4C542] hover:shadow-[0_8px_24px_rgba(244,197,66,0.18)]"
                  >
                    {/* Icon Container */}
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-[#D9A91A] transition-colors duration-200 group-hover:text-[#24221D]">
                      {item.icon}
                    </div>

                    {/* Skill Label Underneath */}
                    <span className="mt-2 text-[11px] sm:text-[12px] font-medium leading-snug text-[#24221D] transition-colors duration-200 group-hover:text-[#D9A91A] max-w-[96px]">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



