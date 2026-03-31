"use client";

import { useState } from "react";

const SKILLS_CSV_LIST = [
  "Next.js",
  "HTML5",
  "React",
  "JavaScript",
  "TypeScript",
  "React Native",
  "Sass",
  "Tailwind CSS",
  "CSS3",
  "Redux",
  "Node.js",
  "MongoDB",
  "Python",
  "GCP",
  "AWS",
  "Firebase",
  "Supabase",
  "PostgreSQL",
  "Express",
  "REST APIs",
  "JWT",
  "Git",
  "Vercel",
  "Github",
  "Expo",
  "AI Integration",
  "VS Code",
  "Unreal Engine",
];

function copySkillsToClipboard(): string {
  const csv = SKILLS_CSV_LIST.map((s) => (s.includes(",") ? `"${s}"` : s)).join(", ");
  return csv;
}

export function CopySkillsButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const csv = copySkillsToClipboard();
    try {
      await navigator.clipboard.writeText(csv);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-[7.5rem] shrink-0 rounded-md border border-zinc-300 bg-[#F6F3EA] px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-accent-gold hover:bg-zinc-100 focus:outline-none"
      aria-label="Copy skills as CSV"
    >
      {copied ? "Copied!" : "Copy skills"}
    </button>
  );
}
