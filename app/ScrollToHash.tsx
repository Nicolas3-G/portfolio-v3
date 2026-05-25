"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToIdFromHash() {
  const hash = window.location.hash;
  if (!hash || hash === "#") return;
  const id = decodeURIComponent(hash.slice(1));
  const run = () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  requestAnimationFrame(() => requestAnimationFrame(run));
}

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    scrollToIdFromHash();
    window.addEventListener("hashchange", scrollToIdFromHash);
    return () => window.removeEventListener("hashchange", scrollToIdFromHash);
  }, [pathname]);

  return null;
}
