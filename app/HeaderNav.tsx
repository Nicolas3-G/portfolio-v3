"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SECTIONS = ["top", "experience", "skills", "projects", "about", "contact"] as const;

type SectionId = (typeof SECTIONS)[number];

export function HeaderNav() {
  const [active, setActive] = useState<SectionId>("top");
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const [showResume, setShowResume] = useState(false);
   const [copied, setCopied] = useState(false);

  const linkRefs = useRef<Record<SectionId, HTMLAnchorElement | null>>({
    top: null,
    experience: null,
    skills: null,
    projects: null,
    about: null,
    contact: null,
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleScroll = () => {
      if (window.scrollY < 150) {
        setActive("top");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    SECTIONS.filter((id) => id !== "top").forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id as SectionId);
            }
          });
        },
        {
          root: null,
          threshold: 0.35,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update sliding indicator whenever active changes or on resize
  useEffect(() => {
    const el = linkRefs.current[active];
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    setIndicator({
      left: rect.left - parentRect.left,
      width: rect.width,
    });
  }, [active]);

  useEffect(() => {
    const handleResize = () => {
      const el = linkRefs.current[active];
      if (!el) return;
      const parent = el.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setIndicator({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active]);

  const linkBase =
    "relative z-10 px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-0 transition-colors";

  return (
    <>
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span className="text-lg font-medium text-zinc-900">Nicolas Guimont</span>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-3 text-sm font-medium text-zinc-700">
            {/* Sliding white box */}
            <div
              className="pointer-events-none absolute inset-y-0 rounded-sm border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 ease-out"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.width || 0,
              }}
              aria-hidden
            />
            <a
              href="#top"
              ref={(el) => {
                linkRefs.current.top = el;
              }}
              className={`${linkBase} ${
                active === "top"
                  ? "text-accent-gold"
                  : "text-zinc-700 hover:text-accent-gold"
              }`}
            >
              Home
            </a>
            <a
              href="#experience"
              ref={(el) => {
                linkRefs.current.experience = el;
              }}
              className={`${linkBase} ${
                active === "experience"
                  ? "text-accent-gold"
                  : "text-zinc-700 hover:text-accent-gold"
              }`}
            >
              Employment
            </a>
            <a
              href="#skills"
              ref={(el) => {
                linkRefs.current.skills = el;
              }}
              className={`${linkBase} ${
                active === "skills"
                  ? "text-accent-gold"
                  : "text-zinc-700 hover:text-accent-gold"
              }`}
            >
              Skills
            </a>
            <a
              href="#projects"
              ref={(el) => {
                linkRefs.current.projects = el;
              }}
              className={`${linkBase} ${
                active === "projects"
                  ? "text-accent-gold"
                  : "text-zinc-700 hover:text-accent-gold"
              }`}
            >
              Projects
            </a>
            <a
              href="#about"
              ref={(el) => {
                linkRefs.current.about = el;
              }}
              className={`${linkBase} ${
                active === "about"
                  ? "text-accent-gold"
                  : "text-zinc-700 hover:text-accent-gold"
              }`}
            >
              About Me
            </a>
            <a
              href="#contact"
              ref={(el) => {
                linkRefs.current.contact = el;
              }}
              className={`${linkBase} ${
                active === "contact"
                  ? "text-accent-gold"
                  : "text-zinc-700 hover:text-accent-gold"
              }`}
            >
              Contact
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowResume(true)}
              className="inline-flex items-center gap-2 border border-zinc-200/80 bg-zinc-900 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-zinc-50 shadow-[0_10px_25px_rgba(15,23,42,0.35)] transition-colors hover:bg-zinc-950"
            >
              <span>Resume</span>
            </button>
            <a
              href="https://github.com/Nicolas3-G"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-700 shadow-sm transition-colors hover:border-accent-gold/60 hover:text-accent-gold"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.84 1.32 3.54 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas3/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-700 shadow-sm transition-colors hover:border-accent-gold/60 hover:text-accent-gold"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.564v1.561h.05c.497-.94 1.71-1.931 3.522-1.931 3.767 0 4.46 2.481 4.46 5.708v6.114zM5.337 7.433C4.194 7.433 3.27 6.507 3.27 5.365c0-1.141.924-2.066 2.067-2.066 1.14 0 2.064.925 2.064 2.066 0 1.142-.924 2.068-2.064 2.068zM6.812 20.452H3.862V9h2.95v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {showResume &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            onClick={() => setShowResume(false)}
          >
            <div
              className="relative flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-md border border-zinc-200/70 bg-[#F6F3EA] shadow-[0_18px_45px_rgba(15,23,42,0.55)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-zinc-200/70 bg-[#F6F3EA]/95 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                    Resume
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window === "undefined" || !navigator.clipboard) return;
                      fetch("/resume.txt")
                        .then((res) => res.text())
                        .then((text) => navigator.clipboard.writeText(text))
                        .then(() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        })
                        .catch(() => {});
                    }}
                    className="inline-flex items-center gap-1.5 border border-zinc-200/80 bg-white/80 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-700 shadow-sm transition-colors hover:border-accent-gold/60 hover:text-accent-gold"
                  >
                    {copied ? "Copied!" : "Copy Text"}
                  </button>
                  <a
                    href="/resume.docx"
                    download="resume-nicolas-guimont.docx"
                    className="inline-flex items-center gap-1.5 border border-zinc-200/80 bg-white/80 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-700 shadow-sm transition-colors hover:border-accent-gold/60 hover:text-accent-gold"
                  >
                    Download DOCX
                  </a>
                  <a
                    href="/resume.pdf"
                    download="resume-nicolas-guimont.pdf"
                    className="inline-flex items-center gap-1.5 border border-zinc-200/80 bg-white/80 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-700 shadow-sm transition-colors hover:border-accent-gold/60 hover:text-accent-gold"
                  >
                    Download PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowResume(false)}
                    className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-zinc-500 hover:text-zinc-800"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-zinc-100">
                <iframe
                  src="/resume.pdf"
                  title="Resume PDF"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

