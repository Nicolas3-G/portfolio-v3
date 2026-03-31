"use client";

import { useState } from "react";

export function ProjectCard({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        setPos({ x: e.clientX, y: e.clientY });
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: hovered ? "none" : undefined }}
    >
      {children}
      {hovered && (
        <div
          className="pointer-events-none fixed z-[100] rounded-full bg-zinc-900/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          Learn more
        </div>
      )}
    </div>
  );
}
