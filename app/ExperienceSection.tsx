"use client";

import { useEffect, useRef, useState } from "react";
import { ExperienceCard } from "./ExperienceCard";

const EXPERIENCE_ITEMS = [
  {
    companyName: "DPD Framework",
    description: "Founding Fullstack Engineer · April 2025 - Present",
    bullets: [
      "Developed a React Native iOS & Android mobile app.",
      "Automated business flows, reducing manual processes by nearly 100%.",
      "Delivered a 3-month scheduled MVP in just 1 month.",
    ],
  },
  {
    companyName: "Overview World News",
    description: "Founding Fullstack Engineer · December 2023 - Present",
    bullets: [
      "Increased categorization accuracy by 35% for 450,000+ articles using embeddings.",
      "Shipped 10+ major features with Node.js that increased daily active users by 45-60%.",
      "Built Next.js app leveraging SSG, ISR, SSR for near-instant load times.",
      "Built Node.js and Express backend with 99% uptime over 2 years.",
    ],
  },
  {
    companyName: "Fiverr",
    description: "Fullstack Software Engineer - Contractor · December 2023 - June 2024",
    bullets: [
      "Consistently delivered projects on or before deadlines.",
      "Regularly debugged and fixed large unfamiliar codebases, quickly adapting to new technologies.",
      "Maintained a 5-star contractor rating throughout engagements.",
      "Built, deployed, and troubleshooted Next.js and React web apps.",
    ],
  },
  {
    companyName: "Pre Framing Corp",
    description: "Junior Software Engineer · March 2023 - June 2024",
    bullets: [
      "Built fullstack web applications using React, Next.js, and JavaScript.",
      "Developed Unreal Engine 3D modeling mobile application.",
      "Built PDF processing system, cutting manual work and processing time by 80%.",
    ],
  },
  {
    companyName: "MinuteZero",
    description: "Software Engineer - Intern · December 2022 - June 2023",
    bullets: [
      // internships: no bullets shown
    ],
  },
  {
    companyName: "GrantAide",
    description: "Software Engineer - Intern · August 2022 - November 2022",
    bullets: [
      // internships: no bullets shown
    ],
  },
];

const TIMELINE_LENGTH =
  EXPERIENCE_ITEMS.length > 2 ? EXPERIENCE_ITEMS.length - 2 : EXPERIENCE_ITEMS.length;

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [rowHeights, setRowHeights] = useState<number[]>([]);
  const [accentHeight, setAccentHeight] = useState(0);
  const [showInternships, setShowInternships] = useState(false);

  // Measure row heights when refs are set or on resize
  useEffect(() => {
    const measure = () => {
      const heights = rowRefs.current
        .filter((r): r is HTMLDivElement => r != null)
        .map((el) => el.offsetHeight);
      if (heights.length === TIMELINE_LENGTH) setRowHeights(heights);
    };
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 100);
    const ro = new ResizeObserver(measure);
    const scheduleObserve = () => {
      requestAnimationFrame(() => {
        rowRefs.current
          .filter((r): r is HTMLDivElement => r != null)
          .forEach((el) => ro.observe(el));
      });
    };
    scheduleObserve();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  // Scroll progress: starts late (section well in view), ends early (fill complete before section scrolls off)
  const SCROLL_START_THRESHOLD = 0.25; // start when section top is this far down viewport (25%)
  const SCROLL_END_FACTOR = 0.55; // reach full when section top is at -sectionHeight * this (55% scrolled past = end sooner)
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (section) {
        const heights = rowRefs.current
          .filter((r): r is HTMLDivElement => r != null)
          .map((el) => el.offsetHeight);
        if (heights.length === TIMELINE_LENGTH)
          setRowHeights((prev) =>
            prev.length === TIMELINE_LENGTH ? prev : heights
          );
      }
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const sectionHeight = rect.height;
      const startY = vh * SCROLL_START_THRESHOLD;
      const endY = -sectionHeight * SCROLL_END_FACTOR; // progress = 1 when section has scrolled this much
      const p =
        rect.top >= startY
          ? 0
          : Math.max(
              0,
              Math.min(1, (startY - rect.top) / (startY - endY))
            );
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Accent height: start at circle + ~1/3 of first line, then grow with progress
  const totalHeight = rowHeights.reduce((a, b) => a + b, 0);
  const firstRowHeight = rowHeights[0] ?? 0;
  const circleH = 12;
  const firstLineH = Math.max(0, firstRowHeight - circleH - 4);
  const minAccent = circleH + firstLineH / 3;
  const maxAccent = totalHeight;
  const targetAccent = minAccent + progress * (maxAccent - minAccent);

  useEffect(() => {
    if (totalHeight <= 0) return;
    setAccentHeight(targetAccent);
  }, [targetAccent, totalHeight]);

  const fullTimeItems = EXPERIENCE_ITEMS.slice(0, TIMELINE_LENGTH);
  const internshipItems = EXPERIENCE_ITEMS.slice(TIMELINE_LENGTH);

  const getLogoForCompany = (companyName: string) => {
    switch (companyName) {
      case "DPD Framework":
        return (
          <img
            src="/logos/dpd-logo.png"
            alt="DPD Framework logo"
            className="h-9 w-9 object-contain"
          />
        );
      case "Overview World News":
        return (
          <img
            src="/logos/overview-logo.png"
            alt="Overview World News logo"
            className="h-11 w-11 object-contain"
          />
        );
      case "Fiverr":
        return (
          <img
            src="/logos/fiverr-logo.png"
            alt="Fiverr logo"
            className="h-9 w-9 object-contain"
          />
        );
      case "Pre Framing Corp":
        return (
          <img
            src="/logos/PF-logo.png"
            alt="Pre Framing Corp logo"
            className="h-9 w-9 object-contain"
          />
        );
      case "MinuteZero":
        return (
          <img
            src="/logos/minutezero_logo.png"
            alt="MinuteZero logo"
            className="h-9 w-9 object-contain"
          />
        );
      case "GrantAide":
        return (
          <img
            src="/logos/grantaide-logo.png"
            alt="GrantAide logo"
            className="h-9 w-9 object-contain"
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="flex min-h-screen flex-col bg-[#F6F3EA] px-4 pt-16 pb-16 scroll-mt-28 sm:px-8"
    >
      <div className="flex justify-center">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Work History
        </h2>
      </div>
      <div className="relative mt-12 flex flex-col">
        {/* Accent overlay: orange timeline from top, height moves with scroll — same size/position as gray column */}
        {totalHeight > 0 && (
          <div
            className="absolute left-0 top-0 w-[12px] overflow-hidden transition-[height] duration-150 ease-out"
            style={{ height: accentHeight }}
            aria-hidden
          >
            <div className="flex w-[12px] flex-col items-center">
              {Array.from({ length: TIMELINE_LENGTH }).map((_, i) => (
                <div
                  key={i}
                  className="flex w-[12px] shrink-0 flex-col items-center"
                  style={{
                    height: rowHeights[i] ?? 0,
                  }}
                >
                  <div className="h-3 w-3 shrink-0 rounded-full border-2 border-accent-gold bg-[#F6F3EA]" />
                  {i < TIMELINE_LENGTH - 1 ? (
                    <div className="mt-1 flex flex-1 flex-col items-center">
                      <div className="w-0.5 flex-1 min-h-0 bg-accent-gold" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gray timeline + full-time cards */}
        {fullTimeItems.map((item, i, arr) => (
          <div
            key={item.companyName}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className={`flex gap-4 sm:gap-5 ${i < arr.length - 1 ? "pb-10" : ""}`}
          >
            <div className="flex w-[12px] shrink-0 flex-col items-center">
              <div
                className="h-3 w-3 rounded-full border-2 border-zinc-300 bg-[#F6F3EA]"
                aria-hidden
              />
              {i < arr.length - 1 ? (
                <div className="mt-1 flex flex-1 flex-col items-center">
                  <div className="w-0.5 flex-1 min-h-0 bg-zinc-300" />
                </div>
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <ExperienceCard
                companyName={item.companyName}
                description={item.description}
                bullets={item.bullets}
                logo={getLogoForCompany(item.companyName)}
              />
            </div>
          </div>
        ))}

        {/* Internships toggle + cards */}
        {internshipItems.length > 0 && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setShowInternships((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:border-accent-gold/60 hover:text-accent-gold"
            >
              <span>{showInternships ? "Hide internships" : "Show internships"}</span>
              <span
                aria-hidden
                className={`transition-transform duration-150 ${showInternships ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {showInternships &&
              internshipItems.map((item) => (
                <div key={item.companyName} className="mt-6">
                  <ExperienceCard
                    companyName={item.companyName}
                    description={item.description}
                    bullets={item.bullets}
                    logo={getLogoForCompany(item.companyName)}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
