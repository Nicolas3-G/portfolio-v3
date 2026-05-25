"use client";

import { useState } from "react";

const HERO_CARDS = [
  {
    title: "4+ Years of experience",
    body: (
      <>
        I have 4 years of experience as a fullstack engineer, often operating as a founding
        engineer, building frontend and backend for mobile and web using{" "}
        <span className="font-medium text-accent-gold">JavaScript</span>,{" "}
        <span className="font-medium text-accent-gold">TypeScript</span>,{" "}
        <span className="font-medium text-accent-gold">React</span>,{" "}
        <span className="font-medium text-accent-gold">Next.js</span>,{" "}
        <span className="font-medium text-accent-gold">React Native</span>,{" "}
        <span className="font-medium text-accent-gold">Node.js</span>, and more.
      </>
    ),
  },
  {
    title: "AI First Approach",
    body: (
      <>
        By pairing strong development skills, a keen design eye, and the latest AI technologies, I
        deliver results quickly and efficiently. I make use of tools like agentic coding, MCP
        servers, and Agent Skills, and have led numerous AI integrations and research
        projects,keeping me on the bleeding edge of the space.
      </>
    ),
  },
  {
    title: "Communication & Teamwork",
    body: (
      <>
        From training and mentoring new team members, conducting interviews and weighing in on
        hiring, to crafting visual documentation and presentations for both technical and
        non-technical audiences, I pride myself on clear communication and strong collaboration. I
        love working on teams, but also thrive independently, with a track record of owning
        projects from initial concept through to delivery.
      </>
    ),
  },
] as const;

export function HeroCards() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
      {HERO_CARDS.map((card, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={card.title}
            className="flex flex-col border border-zinc-200/70 bg-[#F6F3EA]/90 shadow-[0_16px_40px_rgba(15,23,42,0.32)] backdrop-blur-md sm:px-6 sm:py-5"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isExpanded}
              className={`flex w-full items-center justify-between gap-3 px-6 text-left transition-[padding] duration-300 ease-out sm:contents sm:p-0 motion-reduce:transition-none ${isExpanded ? "py-5" : "py-4"}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-gold">
                {card.title}
              </p>
              <svg
                className={`h-4 w-4 shrink-0 text-accent-gold transition-transform duration-300 ease-out sm:hidden motion-reduce:transition-none ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:grid-rows-[1fr] ${isExpanded ? "max-sm:grid-rows-[1fr]" : "max-sm:grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={`px-6 transition-[opacity,padding] duration-300 ease-out motion-reduce:transition-none sm:p-0 ${isExpanded ? "max-sm:pb-5 max-sm:opacity-100 max-sm:delay-75" : "max-sm:pb-0 max-sm:opacity-0"} sm:opacity-100`}
                >
                  <p
                    className={`text-sm leading-relaxed text-zinc-700 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none sm:mt-3 ${isExpanded ? "max-sm:translate-y-0 max-sm:opacity-100 max-sm:delay-100" : "max-sm:translate-y-1 max-sm:opacity-0"} sm:translate-y-0 sm:opacity-100`}
                  >
                    {card.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
