"use client";

import { useLayoutEffect, useRef } from "react";

type Props = {
  spacing?: number;
  dotRadius?: number;
  dotColor?: string;
  streakCount?: number;
  speedRange?: [number, number];
  streakLength?: number;
  streakColor?: string;
  background?: string;
  zIndex?: number;
};

type Streak = {
  col: number;
  y: number;
  speed: number; // px/sec
};

export default function BackgroundGridRain({
  spacing = 24,
  dotRadius = 1,
  dotColor = "rgba(255,255,255,0.09)",
  streakCount = 14,
  speedRange = [120, 260],
  streakLength = 140,
  streakColor = "rgba(0, 255, 255, 0.7)",
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
  const fpsRef = useRef(60);
  const nextFrameAtRef = useRef(0);
  const viewWRef = useRef(0);
  const viewHRef = useRef(0);
  const stepCssRef = useRef(0);
  const x0CssRef = useRef(0);
  const fastModeRef = useRef(false); // no gradients/shadows when true
  const runningRef = useRef(true);

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement("canvas");
    }

    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isNarrow = window.matchMedia("(max-width: 800px)").matches;

    // Heuristics for mobile/weak devices
    const deviceMemory =
      // @ts-ignore
      (navigator as any).deviceMemory &&
      Number((navigator as any).deviceMemory);
    const likelyLowEnd = isNarrow || (deviceMemory && deviceMemory <= 2);

    fastModeRef.current = likelyLowEnd || mqReduced.matches;
    fpsRef.current = fastModeRef.current ? 30 : 60;

    // build streaks array
    const makeStreaks = (
      cols: number,
      hCss: number,
      count: number,
      speed: [number, number],
    ): Streak[] => {
      const set = new Set<number>();
      const arr: Streak[] = [];
      const pickCol = () => {
        for (let i = 0; i < 8; i++) {
          const c = Math.floor(Math.random() * cols);
          if (!set.has(c)) return c;
        }
        return Math.floor(Math.random() * cols);
      };
      for (let i = 0; i < count; i++) {
        const col = pickCol();
        set.add(col);
        arr.push({
          col,
          y: Math.random() * hCss,
          speed: speed[0] + Math.random() * (speed[1] - speed[0]),
        });
      }
      return arr;
    };

    const onResize = () => {
      const rect = canvas.getBoundingClientRect();
      const wCss = Math.max(1, Math.floor(rect.width));
      const hCss = Math.max(1, Math.floor(rect.height));
      viewWRef.current = wCss;
      viewHRef.current = hCss;

      // Cap DPR aggressively on mobile / large pixel counts
      const rawDpr = window.devicePixelRatio || 1;
      let dpr = fastModeRef.current ? 1 : Math.min(2, rawDpr);

      // If the pixel count explodes, clamp further
      const estPixels = wCss * hCss * dpr * dpr;
      if (estPixels > 2_000_000) dpr = Math.min(dpr, 1.0); // ~2MP cap

      dprRef.current = dpr;

      canvas.width = Math.floor(wCss * dpr);
      canvas.height = Math.floor(hCss * dpr);

      // Build static dotted grid in offscreen canvas
      const off = offscreenRef.current!;
      off.width = canvas.width;
      off.height = canvas.height;

      const octx = off.getContext("2d", { alpha: false })!;
      octx.fillStyle = background;
      octx.fillRect(0, 0, off.width, off.height);

      // Adapt density on mobile / reduced motion
      const spacingCss = fastModeRef.current
        ? Math.max(28, spacing * 1.2)
        : spacing;
      stepCssRef.current = spacingCss;

      const cols = Math.floor(wCss / spacingCss) + 2;
      const rows = Math.floor(hCss / spacingCss) + 2;
      colsRef.current = cols;

      octx.fillStyle = dotColor;
      const r = Math.max(0.5, dotRadius) * dpr;
      const step = spacingCss * dpr;

      // center-ish offset so the grid stays pretty
      const x0Css = (wCss % spacingCss) / 2;
      const y0Css = (hCss % spacingCss) / 2;
      x0CssRef.current = x0Css;

      const x0 = x0Css * dpr;
      const y0 = y0Css * dpr;

      for (let i = 0; i < cols; i++) {
        const x = x0 + i * step;
        for (let j = 0; j < rows; j++) {
          const y = y0 + j * step;
          octx.fillRect(x - r, y - r, r * 2, r * 2);
        }
      }

      // Adapt streak count/speed on mobile
      const targetStreaks = fastModeRef.current
        ? Math.max(6, Math.floor(streakCount * 0.5))
        : streakCount;

      const speed: [number, number] = fastModeRef.current
        ? [speedRange[0] * 0.8, speedRange[1] * 0.8]
        : speedRange;

      streaksRef.current = makeStreaks(cols, hCss, targetStreaks, speed);

      // paint once
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenRef.current!, 0, 0);

      lastTsRef.current = null;
      nextFrameAtRef.current = 0;
      canvas.style.opacity = "1";
    };

    const draw = (ts: number) => {
      if (!runningRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      if (!lastTsRef.current) {
        lastTsRef.current = ts;
        nextFrameAtRef.current = ts;
      }
      const targetDelta = 1000 / fpsRef.current;
      if (ts < nextFrameAtRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      nextFrameAtRef.current += targetDelta;

      const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000); // clamp big jumps
      lastTsRef.current = ts;

      // Repaint static grid
      ctx.drawImage(offscreenRef.current!, 0, 0);

      const dpr = dprRef.current;
      const wCss = viewWRef.current;
      const hCss = viewHRef.current;
      const stepCss = stepCssRef.current;
      const step = stepCss * dpr;
      const x0 = x0CssRef.current * dpr;

      const useFancy = !fastModeRef.current;

      for (const s of streaksRef.current) {
        // advance
        s.y += s.speed * dt;
        const len = fastModeRef.current
          ? Math.max(90, streakLength * 0.7)
          : streakLength;

        if (s.y - len > hCss) {
          s.y = -Math.random() * 100;
          s.col = Math.floor(Math.random() * colsRef.current);
          s.speed =
            speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
        }

        const x = x0 + s.col * step;
        const yHead = s.y * dpr;
        const yTail = (s.y - len) * dpr;

        if (useFancy) {
          // gradient + small shadow (still heavy, but desktop can take it)
          const g = ctx.createLinearGradient(0, yTail, 0, yHead);
          g.addColorStop(0, "rgba(0,0,0,0)");
          g.addColorStop(0.35, streakColor);
          g.addColorStop(1, "rgba(255,255,255,0.0)");
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = g;
          ctx.lineWidth = Math.max(1, Math.round(dpr));
          ctx.lineCap = "round";
          ctx.shadowColor = streakColor;
          ctx.shadowBlur = 3 * dpr; // lower than before
          ctx.moveTo(x, yTail);
          ctx.lineTo(x, yHead);
          ctx.stroke();
          ctx.restore();

          // head spark
          ctx.save();
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.beginPath();
          ctx.arc(x, yHead, 1.2 * dpr, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // FAST MODE: solid stroke, no gradients/shadows
          ctx.save();
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.strokeStyle = streakColor;
          ctx.lineWidth = Math.max(1, Math.round(dpr));
          ctx.lineCap = "round";
          ctx.moveTo(x, yTail);
          ctx.lineTo(x, yHead);
          ctx.stroke();
          ctx.restore();

          // tiny head dot
          ctx.save();
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(x, yHead, 1 * dpr, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    // Visibility + viewport intersection handling
    const handleVis = () => {
      const hidden = document.hidden;
      runningRef.current = !hidden;
      if (!hidden) {
        lastTsRef.current = null;
        nextFrameAtRef.current = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVis);

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        runningRef.current = e?.isIntersecting ?? true;
        if (runningRef.current) {
          lastTsRef.current = null;
          nextFrameAtRef.current = 0;
        }
      },
      { root: null, threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("resize", onResize, { passive: true });

    // respond to motion preference changes live
    const motionListener = () => {
      fastModeRef.current = isNarrow || mqReduced.matches;
      fpsRef.current = fastModeRef.current ? 30 : 60;
      onResize();
    };
    mqReduced.addEventListener?.("change", motionListener);

    onResize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVis);
      io.disconnect();
      mqReduced.removeEventListener?.("change", motionListener);
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
