"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Javacript } from "@/public/images/techstack/javascript";
import { TypeScript } from "@/public/images/techstack/typescript";
import { Tailwind } from "@/public/images/techstack/tailwindcss";
import { React } from "@/public/images/techstack/react";
import { Next } from "@/public/images/techstack/nextdotjs";
import Hero from "./components/hero-section/hero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}
export default function Home() {
  const grid1 = useRef<HTMLDivElement | null>(null);
  const page = useRef<HTMLDivElement | null>(null);
  const header = useRef<HTMLDivElement | null>(null);
  const hero = useRef<HTMLDivElement | null>(null);
  const mainTimeline = useRef<GSAPTimeline | null>(null);

  const jsLarge = useRef<HTMLDivElement | null>(null);
  const tsLarge = useRef<HTMLDivElement | null>(null);
  const twLarge = useRef<HTMLDivElement | null>(null);
  const nxLarge = useRef<HTMLDivElement | null>(null);
  const rxLarge = useRef<HTMLDivElement | null>(null);

  const sentence1span = useRef<HTMLDivElement | null>(null);
  const sentence2span = useRef<HTMLDivElement | null>(null);
  const sentence3span = useRef<HTMLDivElement | null>(null);
  const sentence4span1 = useRef<HTMLDivElement | null>(null);
  const sentence4span2 = useRef<HTMLDivElement | null>(null);

  const [tech, setTech] = useState<null | "js" | "ts" | "tw" | "rx" | "nx">(
    null,
  );

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // --- DOM collections -----------------------------------------------------
      const iconsInSequence2 = gsap.utils.toArray(".icon2") as HTMLDivElement[];
      const iconsInSequence3 = gsap.utils.toArray(".icon3") as HTMLDivElement[];

      // --- Geometry / baseline measurements -----------------------------------
      const grid = grid1.current as HTMLDivElement;
      const originalOffset =
        -window.innerHeight / 2 + grid.getBoundingClientRect().height / 2;

      // --- Timeline (order preserved verbatim) --------------------------------
      mainTimeline.current = gsap
        .timeline({
          defaults: { ease: "circ.inOut" },
        })

        // Pre-position icon3s relative to icon2s (x only)
        .set(iconsInSequence3[0], {
          x:
            iconsInSequence2[0].getBoundingClientRect().left -
            iconsInSequence3[0].getBoundingClientRect().left,
        })
        .set(iconsInSequence3[1], {
          x:
            iconsInSequence2[1].getBoundingClientRect().left -
            iconsInSequence3[1].getBoundingClientRect().left,
        })
        .set(iconsInSequence3[2], {
          x:
            iconsInSequence2[2].getBoundingClientRect().left -
            iconsInSequence3[2].getBoundingClientRect().left,
        })
        .set(iconsInSequence3[3], {
          x:
            iconsInSequence2[3].getBoundingClientRect().left -
            iconsInSequence3[3].getBoundingClientRect().left,
        })
        .set(iconsInSequence3[4], {
          x:
            iconsInSequence2[4].getBoundingClientRect().left -
            iconsInSequence3[4].getBoundingClientRect().left,
        })
        .set(page.current, {
          overflowY: "auto",
          height: "auto",
        })

        // Lift icon1s into place
        .to(
          [
            jsLarge.current,
            tsLarge.current,
            twLarge.current,
            nxLarge.current,
            rxLarge.current,
          ],
          {
            y: originalOffset,
            stagger: { each: 0.15, from: "start" },
          },
        )

        // Header + hero adjustments (synced)
        .to(header.current, { paddingBottom: 0 }, "<")
        .to(hero.current, { opacity: 0, yPercent: -25 }, "<")

        // Disable interactions while animating
        .set(grid, {
          userSelect: "none",
          pointerEvents: "none",
        })
        // Resize icon1s and keep vertical offset updated
        .to(
          [
            jsLarge.current,
            tsLarge.current,
            twLarge.current,
            nxLarge.current,
            rxLarge.current,
          ],
          {
            width: 60,
            onUpdate: () => {
              const newOffset =
                -window.innerHeight / 2 +
                grid.getBoundingClientRect().height / 2;
              [
                jsLarge.current,
                tsLarge.current,
                twLarge.current,
                nxLarge.current,
                rxLarge.current,
              ].forEach((el) => {
                gsap.set(el, { y: newOffset });
              });
            },
          },
        )
        .to(grid, { gap: 0, userSelect: "none" }, "<")

        // Keep original duplicate width tween + visibility swaps
        .to(
          [
            jsLarge.current,
            tsLarge.current,
            twLarge.current,
            nxLarge.current,
            rxLarge.current,
          ],
          { width: 60 },
        )
        .set(
          [
            jsLarge.current,
            tsLarge.current,
            twLarge.current,
            nxLarge.current,
            rxLarge.current,
          ],
          { opacity: 0 },
        )
        .set(iconsInSequence3, { opacity: 1 }, "<")

        // --- ICON 1 ------------------------------------------------------------
        .set(iconsInSequence2[0], { opacity: 0 }, "<")
        .to(iconsInSequence3[0], { yPercent: -100 })
        .to(iconsInSequence3[0], { x: 0 })
        .to(sentence1span.current, { opacity: 1, x: 0 })
        .to(iconsInSequence3[0], { x: 0 })

        // --- ICON 2+ -----------------------------------------------------------
        .set(iconsInSequence2[1], { opacity: 0 }, "<")
        .to(iconsInSequence3[1], { x: 0 })
        .to(iconsInSequence3[2], { y: 0 }, "<")
        .set(iconsInSequence2[2], { opacity: 0 }, "<")
        .to([iconsInSequence3[3], iconsInSequence3[4]], { y: 0 }, "<")
        .set([iconsInSequence2[3], iconsInSequence2[4]], { opacity: 0 }, "<")
        .to(sentence2span.current, { opacity: 1, x: 0 })
        .to(iconsInSequence3[2], { x: 0 })
        .to(sentence3span.current, { opacity: 1, x: 0 }, "<")
        .to([iconsInSequence3[3], iconsInSequence3[4]], { x: 0 })
        .to([sentence4span1.current, sentence4span2.current], {
          x: 0,
          opacity: 1,
        });

      // --- ScrollTrigger -------------------------------------------------------
      ScrollTrigger.create({
        trigger: header.current,
        pin: header.current,
        pinSpacing: true,
        scrub: 2,
        animation: mainTimeline.current,
        // markers: true,
      });

      // --- Intro -----------------------------------------------------
      // gsap.to(
      //   [
      //     jsLarge.current,
      //     tsLarge.current,
      //     twLarge.current,
      //     nxLarge.current,
      //     rxLarge.current,
      //   ],
      //   {
      //     y: 0,
      //     opacity: 100,
      //     stagger: { each: 0.15, from: "end" },
      //   },
      // );

      return () => {
        mainTimeline.current.kill();
      };
    },
    { scope: page },
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX: mouseX, clientY: mouseY } = e;
    const {
      height: elementHeight,
      width: elementWidth,
      top: elementTop,
      left: elementLeft,
    } = e.currentTarget.getBoundingClientRect();

    const moveElementXto = (mouseX - (elementLeft + elementWidth / 2)) / 2;
    const moveElementYto = (mouseY - (elementTop + elementHeight / 2)) / 2;

    gsap.to(e.currentTarget, {
      x: moveElementXto,
      y: moveElementYto,
      duration: 0.6,
      ease: "elastic.out(1, 0.75)",
      overwrite: "auto",
    });
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.75)",
      overwrite: "auto",
    });
  }

  return (
    <div
      className="//bg-black relative h-dvh overflow-y-hidden text-white"
      ref={page}
    >
      {/* <FloatingCodeArtifacts ref={artifacts} /> */}

      <section
        className="//pt-40 relative flex h-dvh flex-col px-8 pb-4"
        ref={header}
      >
        {/* <Socials /> */}
        <Hero ref={hero} tech={tech} />
        {/* <Stats /> */}

        <div
          className="group relative mx-auto flex w-fit items-start justify-center gap-3 opacity-100 [&>.icon1]:aspect-square [&>.icon1]:w-full [&>.icon1]:max-w-24"
          ref={grid1}
        >
          <div
            className="icon1 cursor-pointer will-change-auto"
            onClick={() => setTech("js")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={jsLarge}
          >
            <Javacript className="size-full rounded-lg border-2 border-black" />
          </div>
          <div
            className="icon1 cursor-pointer will-change-auto"
            onClick={() => setTech("ts")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={tsLarge}
          >
            <TypeScript className="size-full rounded-lg border-2 border-black" />
          </div>
          <div
            className="icon1 cursor-pointer will-change-auto"
            onClick={() => setTech("tw")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={twLarge}
          >
            <Tailwind className="size-full rounded-lg border-2 border-black" />
          </div>
          <div
            className="icon1 cursor-pointer will-change-auto"
            onClick={() => setTech("nx")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={nxLarge}
          >
            <Next className="size-full rounded-lg border-2 border-black" />
          </div>
          <div
            className="icon1 cursor-pointer will-change-auto"
            onClick={() => setTech("rx")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={rxLarge}
          >
            <React className="size-full rounded-lg border-2 border-black" />
          </div>
        </div>

        {/* <div
            className="arrow absolute -top-1/2 -left-4 -translate-x-full rotate-12 opacity-0 group-hover:opacity-100"
            ref={arrow}
          >
            <div className="font-archivo text-2xl whitespace-nowrap">
              {!tech ? "These are clickable" : "Keep going..."}
            </div>
            <ArrowDashed className="//w-56 shrink-0" />
          </div> */}
        {/* <section className="h-screen">yo</section> */}
        <div className="font-archivo absolute top-1/2 left-0 w-full -translate-y-1/2 font-bold tracking-tight">
          <div className="relative mx-auto flex h-full w-fit justify-center opacity-100">
            <div className="sentence1 absolute -top-full left-0 z-10 mx-auto flex w-full items-center justify-center gap-1 text-xl whitespace-nowrap select-none lg:text-6xl">
              <span
                className="text-content -translate-x-[10%] opacity-0"
                ref={sentence1span}
              >
                I tame JavaScript.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] translate-y-full opacity-0 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <Javacript className="size-full" />
                </div>
              </div>
            </div>
            {/* SENTENCE 2 */}
            <div className="sentence2 absolute top-0 left-0 z-10 flex w-full items-center justify-center gap-1 text-xl whitespace-nowrap select-none lg:text-6xl">
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] rounded-xl opacity-0 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <TypeScript className="size-full" />
                </div>
              </div>
              <span className="text-content opacity-0" ref={sentence2span}>
                TypeScript knows I’m lying.
              </span>
            </div>
            {/* SENTENCE 3 */}
            <div className="sentence3 absolute top-full left-0 z-10 flex w-full items-center justify-center gap-1 text-xl whitespace-nowrap select-none lg:text-6xl">
              <span
                className="text-content -translate-x-[10%] opacity-0"
                ref={sentence3span}
              >
                I leave CSS on read with Tailwind.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-full rounded-xl opacity-0 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <Tailwind className="size-full" />
                </div>
              </div>
            </div>
            {/* SENTENCE 4 */}
            <div className="sentence4 absolute top-[200%] left-0 z-10 flex w-full items-center justify-center gap-1 text-xl whitespace-nowrap select-none lg:text-6xl">
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-[200%] rounded-xl opacity-0 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <Next className="size-full" />
                </div>
              </div>
              <span
                className="text-content -translate-x-[10%] opacity-0"
                ref={sentence4span1}
              >
                Next.js routes.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-[200%] justify-center rounded-xl opacity-0 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <React className="size-full" />
                </div>
              </div>

              <span
                className="text-content translate-x-[10%] opacity-0"
                ref={sentence4span2}
              >
                React renders.
              </span>
            </div>

            {/* ICONS */}
            <div className="icon2 invsible aspect-square w-[60px] rounded-xl opacity-0 will-change-transform"></div>
            <div className="icon2 invsible aspect-square w-[60px] rounded-xl opacity-0 will-change-transform"></div>
            <div className="icon2 invsible aspect-square w-[60px] rounded-xl opacity-0 will-change-transform"></div>
            <div className="icon2 invsible aspect-square w-[60px] rounded-xl opacity-0 will-change-transform"></div>
            <div className="icon2 invsible aspect-square w-[60px] rounded-xl opacity-0 will-change-transform"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
