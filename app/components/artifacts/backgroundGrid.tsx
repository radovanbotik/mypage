// components/GridRainGSAP.tsx
"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  spacing?: number; // px between dots/columns
  dotColor?: string; // rgba(...)
  background?: string; // hex/rgb/rgba
  streakCount?: number; // number of falling lines
  streakLength?: number; // px
  widthsPx?: number; // line thickness in px
  colors?: string[]; // streak colors to pick from
  speedRange?: [number, number]; // px/s
  zIndex?: number;
};

export default function GridRainGSAP({
  spacing = 24,
  dotColor = "rgba(255,255,255,0.09)",
  background = "#0b0d10",
  streakCount = 14,
  streakLength = 160,
  widthsPx = 2,
  colors = ["#12E1ED", "#30D7A9", "#F3A34F"], // tweak to brand
  speedRange = [140, 260],
  zIndex = 0,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [cols, setCols] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const streaksRef = useRef<HTMLDivElement[]>([]);

  // adaptive count for small screens
  const count = useMemo(() => {
    if (typeof window === "undefined") return streakCount;
    const w = window.innerWidth;
    if (w < 480) return Math.max(4, Math.round(streakCount * 0.4));
    if (w < 768) return Math.round(streakCount * 0.7);
    return streakCount;
  }, [streakCount]);

  useLayoutEffect(() => {
    const el = wrapRef.current!;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      setSize({ w, h });

      // center the dot grid; compute leftover space per axis
      setOffsetX((w % spacing) / 2);
      setOffsetY((h % spacing) / 2);
      setCols(Math.floor(w / spacing) + 1);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [spacing]);

  // build streak elements whenever column count or count changes
  useLayoutEffect(() => {
    const host = wrapRef.current!;
    // Clear old nodes & timelines
    gsap.killTweensOf(streaksRef.current);
    host.querySelectorAll(".streak").forEach((n) => n.remove());
    streaksRef.current = [];

    if (cols === 0 || size.h === 0) return;

    // helper random
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // pick distinct-ish columns
    const chooseCol = () => Math.floor(Math.random() * cols);

    for (let i = 0; i < count; i++) {
      const node = document.createElement("div");
      node.className = "streak";
      const col = chooseCol();

      // static style (no per-frame work)
      const color = colors[i % colors.length];
      Object.assign(node.style, {
        position: "absolute",
        top: `-${streakLength}px`,
        left: `${Math.round(offsetX + col * spacing)}px`,
        width: `${widthsPx}px`,
        height: `${streakLength}px`,
        pointerEvents: "none",
        willChange: "transform",
        // vertical gradient that fades the tail
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), ${color} 40%, rgba(255,255,255,0))`,
        filter: "drop-shadow(0 0 6px currentColor)",
        color, // used by filter
        borderRadius: `${widthsPx}px`,
        transform: `translate3d(0, ${Math.round(rand(0, size.h))}px, 0)`,
      } as CSSStyleDeclaration);

      host.appendChild(node);
      streaksRef.current.push(node);

      const duration =
        (size.h + streakLength) / rand(speedRange[0], speedRange[1]); // seconds
      // Animate only Y and wrap with modifiers for infinite flow
      gsap.to(node, {
        y: size.h + streakLength + rand(0, 80),
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: (y) => {
            const v = parseFloat(y);
            // wrap into [-streakLength, h]
            const wrapped =
              ((v + streakLength) % (size.h + streakLength)) - streakLength;
            return `${wrapped}px`;
          },
        },
      });
    }

    return () => {
      gsap.killTweensOf(streaksRef.current);
    };
  }, [
    cols,
    count,
    spacing,
    offsetX,
    size.h,
    streakLength,
    colors,
    speedRange,
    widthsPx,
  ]);

  // update streak x positions when resizing (keeps column lock)
  useLayoutEffect(() => {
    streaksRef.current.forEach((n) => {
      const col = Math.round((parseFloat(n.style.left) - offsetX) / spacing);
      n.style.left = `${Math.round(offsetX + col * spacing)}px`;
    });
  }, [offsetX, spacing]);

  // reduced motion: disable animation
  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) gsap.globalTimeline.pause();
      else gsap.globalTimeline.play();
    };
    mq.addEventListener("change", apply);
    apply();
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex,
        pointerEvents: "none",
        // dotted grid
        backgroundColor: background,
        backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
        // force own layer for cheap transforms
        contain: "strict",
      }}
      aria-hidden
    />
  );
}
