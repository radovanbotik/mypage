"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

type Props = {
  /** distance between dots (css pixels) */
  spacing?: number;
  /** dot radius (css pixels) */
  dotRadius?: number;
  /** rgba string for dots */
  dotColor?: string;
  /** number of moving streaks */
  streakCount?: number;
  /** min/max streak speed (css px per second) */
  speedRange?: [number, number];
  /** streak length in css px */
  streakLength?: number;
  /** rgba string for streak color (tail will fade) */
  streakColor?: string;
  /** background color */
  background?: string;
  /** optional zIndex */
  zIndex?: number;
};

type Streak = {
  col: number;
  y: number;
  speed: number; // px/sec
  phase: number; // delay offset in seconds
};

export default function BackgroundGridRain({
  spacing = 24,
  dotRadius = 1,
  dotColor = "rgba(255,255,255,0.09)",
  streakCount = 14,
  speedRange = [120, 260],
  streakLength = 140,
  streakColor = "rgba(0, 255, 255, 0.7)", // tweak to match your brand glow
  background = "#0c0e11",
  zIndex = 0,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const streaksRef = useRef<Streak[]>([]);
  const dprRef = useRef(1);
  const colsRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    const makeOffscreen = () => {
      offscreenRef.current = document.createElement("canvas");
    };
    if (!offscreenRef.current) makeOffscreen();

    const onResize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // cap at 2 for perf
      dprRef.current = dpr;

      const wCss = canvas.clientWidth;
      const hCss = canvas.clientHeight;
      canvas.width = Math.floor(wCss * dpr);
      canvas.height = Math.floor(hCss * dpr);

      // build static dotted grid into an offscreen canvas
      const off = offscreenRef.current!;
      off.width = canvas.width;
      off.height = canvas.height;

      const octx = off.getContext("2d", { alpha: false })!;
      octx.fillStyle = background;
      octx.fillRect(0, 0, off.width, off.height);

      // compute columns/rows count in *css* pixels then scale positions by dpr
      const cols = Math.floor(wCss / spacing) + 2;
      const rows = Math.floor(hCss / spacing) + 2;
      colsRef.current = cols;

      octx.fillStyle = dotColor;
      const r = Math.max(0.5, dotRadius) * dpr;
      const step = spacing * dpr;

      // Offset so dots start at half-step from edges (center-ish)
      const x0 = ((wCss % spacing) / 2) * dpr;
      const y0 = ((hCss % spacing) / 2) * dpr;

      for (let i = 0; i < cols; i++) {
        const x = x0 + i * step;
        for (let j = 0; j < rows; j++) {
          const y = y0 + j * step;
          // small rectangle is faster than arc calls; looks like a dot at this size
          octx.fillRect(x - r, y - r, r * 2, r * 2);
        }
      }

      // regenerate streaks so they snap to valid columns
      streaksRef.current = makeStreaks(
        cols,
        hCss,
        spacing,
        speedRange,
        streakCount,
      );
      lastTsRef.current = null;

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenRef.current!, 0, 0);

      canvas.style.opacity = "1";
    };

    const makeStreaks = (
      cols: number,
      hCss: number,
      spacingCss: number,
      speed: [number, number],
      count: number,
    ): Streak[] => {
      const set = new Set<number>();
      const arr: Streak[] = [];
      const chooseCol = () => {
        // avoid adjacent duplicates for nicer distribution
        for (let k = 0; k < 8; k++) {
          const c = Math.floor(Math.random() * cols);
          if (!set.has(c)) return c;
        }
        return Math.floor(Math.random() * cols);
      };
      for (let i = 0; i < count; i++) {
        const col = chooseCol();
        set.add(col);
        arr.push({
          col,
          y: Math.random() * hCss,
          speed: lerp(speed[0], speed[1], Math.random()),
          phase: Math.random() * 2, // seconds
        });
      }
      return arr;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      // paint static grid
      ctx.drawImage(offscreenRef.current!, 0, 0);

      // animate streaks
      const dpr = dprRef.current;
      const wCss = canvas.clientWidth;
      const hCss = canvas.clientHeight;
      const stepCss = spacing;
      const step = stepCss * dpr;

      // Base x offset must match the grid’s!
      const x0 = ((wCss % stepCss) / 2) * dpr;

      for (const s of streaksRef.current) {
        // advance
        s.y += s.speed * dt;
        if (s.y - streakLength > hCss) {
          s.y = -Math.random() * 100; // re-enter above the screen
          s.col = Math.floor(Math.random() * colsRef.current);
          s.speed = lerp(speedRange[0], speedRange[1], Math.random());
        }

        // draw as a vertical gradient line aligned to the column
        const xCss = x0 / dpr + s.col * stepCss;
        const x = x0 + s.col * step;

        const yHead = s.y * dpr;
        const yTail = (s.y - streakLength) * dpr;

        const g = ctx.createLinearGradient(0, yTail, 0, yHead);
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(0.35, streakColor);
        g.addColorStop(1, "rgba(255,255,255,0.0)");

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = g;
        ctx.lineWidth = Math.max(1, Math.round(dpr)); // stay crisp
        ctx.lineCap = "round";
        // subtle glow
        ctx.shadowColor = streakColor;
        ctx.shadowBlur = 6 * dpr;

        ctx.moveTo(x, yTail);
        ctx.lineTo(x, yHead);
        ctx.stroke();
        ctx.restore();

        // small highlight “spark” at the head
        ctx.save();
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.beginPath();
        ctx.arc(x, yHead, 1.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleVis = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        lastTsRef.current = null;
      } else {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", handleVis);
    onResize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    background,
    dotColor,
    dotRadius,
    spacing,
    speedRange,
    streakColor,
    streakCount,
    streakLength,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex,
        pointerEvents: "none",
        display: "block",
      }}
      className="opacity-0 transition-opacity duration-300 ease-in-out"
      aria-hidden
    />
  );
}
