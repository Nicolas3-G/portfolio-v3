"use client";

import { useEffect, useRef, useState } from "react";

const SLIDE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Outer handles only translate (short) — inner only opacity (longer).
 * If both run on one node with ease-in over ~1.5s, opacity stays ~0 during the slide
 * so the move looks “broken”; splitting avoids tying visibility to the slide timing.
 */
export function ExperienceBullet({
  children,
  html,
}: {
  children?: React.ReactNode;
  html?: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const outerClass = [
    "block max-w-full",
    visible ? "translate-x-0" : "-translate-x-24",
    "transition-transform motion-reduce:transition-none motion-reduce:duration-0",
    "duration-[850ms]",
  ].join(" ");

  const outerStyle = {
    transitionTimingFunction: SLIDE_EASE,
  } as const;

  const innerClass = [
    "flex w-full max-w-full items-start gap-2.5 sm:gap-3",
    visible ? "opacity-100" : "opacity-0",
    "transition-opacity motion-reduce:transition-none motion-reduce:duration-0",
    "duration-[1400ms] ease-out",
  ].join(" ");

  const dot = (
    <span
      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold"
      aria-hidden
    />
  );

  if (html !== undefined) {
    return (
      <li ref={ref} className="list-none">
        <span className={outerClass} style={outerStyle}>
          <span className={innerClass}>
            {dot}
            <span
              className="min-w-0 flex-1"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </span>
        </span>
      </li>
    );
  }

  return (
    <li ref={ref} className="list-none">
      <span className={outerClass} style={outerStyle}>
        <span className={innerClass}>
          {dot}
          <span className="min-w-0 flex-1">{children}</span>
        </span>
      </span>
    </li>
  );
}
