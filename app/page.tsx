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

export default function Home() {
  const techstack = useRef<HTMLDivElement | null>(null);
  const page = useRef<HTMLDivElement | null>(null);
  const hero = useRef<HTMLDivElement | null>(null);
  const section1TL = useRef<GSAPTimeline | null>(null);
  const section2TL = useRef<GSAPTimeline | null>(null);
  const section1 = useRef<HTMLDivElement | null>(null);
  const section2 = useRef<HTMLDivElement | null>(null);
  const section3 = useRef<HTMLDivElement | null>(null);

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

  /*useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      // const onVVResize = () => ScrollTrigger.refresh();
      // window.visualViewport?.addEventListener("resize", onVVResize);
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
      //     opacity: 1,
      //     stagger: { each: 0.15, from: "end" },
      //     onComplete: initST,
      //   },
      // );

      // function initST() {
      //   if ((initST as any)._done) return;
      //   (initST as any)._done = true;
      // --- DOM collections -----------------------------------------------------
      const iconsInSequence2 = gsap.utils.toArray(".icon2") as HTMLDivElement[];
      const iconsInSequence3 = gsap.utils.toArray(".icon3") as HTMLDivElement[];

      // --- Geometry / baseline measurements -----------------------------------
      const originalOffset =
        -window.innerHeight / 2 +
        techstack.current!.getBoundingClientRect().height / 2;

      // --- Intro -----------------------------------------------------

      // --- Timeline (order preserved verbatim) --------------------------------
      section1TL.current = gsap
        .timeline({
          defaults: { ease: "circ.inOut" },
        })
        // Header + hero adjustments (synced)
        // .to(section1.current, { paddingBottom: 0 }, "<")
        .to(hero.current, { opacity: 0, y: -20 })
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
        .set(techstack.current, {
          userSelect: "none",
          pointerEvents: "none",
        })
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
                techstack.current!.getBoundingClientRect().height / 2;
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
          "<",
        )
        .to(
          techstack.current,
          {
            gap: 0,
            //  paddingBottom: 0, userSelect: "none"
          },
          "<",
        )
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
        .set(iconsInSequence3, { opacity: 1 });

      section2TL.current = gsap
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
      const section1TS = ScrollTrigger.create({
        trigger: section2.current,
        pin: section1.current,
        pinSpacing: false,
        anticipatePin: 1,
        start: "top bottom", // section2 enters the viewport from the bottom
        end: "top top", // when section2's top reaches the top (now fully visible)
        scrub: true,
        animation: section1TL.current,
        invalidateOnRefresh: true,
        // markers: true,
      });

      const section2TS = ScrollTrigger.create({
        trigger: section3.current,
        pin: section2.current,
        pinSpacing: false,
        anticipatePin: 1,
        start: "top bottom", // section2 enters the viewport from the bottom
        end: "top top", // when section2's top reaches the top (now fully visible)
        scrub: true,
        animation: section2TL.current,
        invalidateOnRefresh: true,
        // markers: true,
      });
      // }

      return () => {
        // window.visualViewport?.removeEventListener("resize", onVVResize);
        section1TL.current?.kill();
        section2TL.current?.kill();
      };
    },
    { scope: page },
  );
*/

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
      ease: "elastic.out(2, 0.75)",
      overwrite: "auto",
    });
  }

  return (
    <div className="relative text-white" ref={page}>
      <section className="flex h-svh items-end justify-center" ref={section1}>
        <div className="//w-fit //mx-auto mt-auto">
          {/* <div
            className="icon1 //will-change-auto inline-block cursor-pointer"
        
          >
            <Javacript className="size-full h-16 w-16 rounded-lg border-2 border-black" />
          </div> */}
          <div className="size-16 bg-blue-400"></div>
        </div>
      </section>

      {/* <section className="h-screen min-h-svh" ref={section1}>
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex-1"></div>
          <Hero ref={hero} tech={tech} />

          <div
            className="group //[&>.icon1]:w-full //pb-4 //relative //flex //absolute //inset-x-0 bottom-0 left-0 mx-auto justify-center gap-1 overflow-x-clip opacity-100 lg:gap-3 [&>.icon1]:h-14 [&>.icon1]:w-14"
            ref={techstack}
          >
            <div
              className="icon1 inline-block cursor-pointer will-change-auto"
              onClick={() => setTech("js")}
              // onMouseMove={handleMouseMove}
              // onMouseLeave={handleMouseLeave}
              ref={jsLarge}
            >
              <Javacript className="size-full rounded-lg border-2 border-black" />
            </div>
            <div
              className="icon1 inline-block cursor-pointer will-change-auto"
              onClick={() => setTech("ts")}
              // onMouseMove={handleMouseMove}
              // onMouseLeave={handleMouseLeave}
              ref={tsLarge}
            >
              <TypeScript className="size-full rounded-lg border-2 border-black" />
            </div>
            <div
              className="icon1 inline-block cursor-pointer will-change-auto"
              onClick={() => setTech("tw")}
              // onMouseMove={handleMouseMove}
              // onMouseLeave={handleMouseLeave}
              ref={twLarge}
            >
              <Tailwind className="size-full rounded-lg border-2 border-black" />
            </div>
            <div
              className="icon1 inline-block cursor-pointer will-change-auto"
              onClick={() => setTech("nx")}
              // onMouseMove={handleMouseMove}
              // onMouseLeave={handleMouseLeave}
              ref={nxLarge}
            >
              <Next className="size-full rounded-lg border-2 border-black" />
            </div>
            <div
              className="icon1 inline-block cursor-pointer will-change-auto"
              onClick={() => setTech("rx")}
              // onMouseMove={handleMouseMove}
              // onMouseLeave={handleMouseLeave}
              ref={rxLarge}
            >
              <React className="size-full rounded-lg border-2 border-black" />
            </div>
          </div>
        </div>
      </section> */}
      {/* <section
        className="relative flex h-screen min-h-svh flex-col"
        ref={section2}
      >
        <div className="font-archivo absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-x-clip font-bold tracking-tight">
          <div className="relative mx-auto flex h-full w-full justify-center overflow-x-clip opacity-100">
            <div className="sentence1 absolute -top-full left-0 z-10 mx-auto flex w-full items-center justify-center gap-1 text-xl whitespace-nowrap select-none lg:text-6xl">
              <span
                className="text-content -translate-x-[10%] opacity-0"
                ref={sentence1span}
              >
                I tame JavaScript.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] translate-y-full opacity-0 will-change-transform">
                <Javacript className="size-full rounded-lg border-2 border-black" />
              </div>
            </div>
            <div className="sentence2 absolute top-0 left-0 z-10 flex w-full items-center justify-center gap-1 text-xl whitespace-nowrap select-none lg:text-6xl">
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] rounded-xl opacity-0 will-change-transform">
                <TypeScript className="size-full rounded-lg border-2 border-black" />
              </div>
              <span className="text-content opacity-0" ref={sentence2span}>
                TypeScript knows I’m lying.
              </span>
            </div>
            <div className="sentence3 absolute top-full left-0 z-10 flex w-full items-center justify-center gap-1 text-xl whitespace-nowrap select-none lg:text-6xl">
              <span
                className="text-content -translate-x-[10%] opacity-0"
                ref={sentence3span}
              >
                I leave CSS on read with Tailwind.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-full rounded-xl opacity-0 will-change-transform">
                <Tailwind className="size-full rounded-lg border-2 border-black" />
              </div>
            </div>
            <div className="sentence4 absolute top-[200%] left-0 z-10 flex w-full items-center justify-center gap-1 text-xl whitespace-nowrap select-none lg:text-6xl">
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-[200%] rounded-xl opacity-0 will-change-transform">
                <Next className="size-full rounded-lg border-2 border-black" />
              </div>
              <span
                className="text-content -translate-x-[10%] opacity-0"
                ref={sentence4span1}
              >
                Next.js routes.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-[200%] justify-center rounded-xl opacity-0 will-change-transform">
                <React className="size-full rounded-lg border-2 border-black" />
              </div>

              <span
                className="text-content translate-x-[10%] opacity-0"
                ref={sentence4span2}
              >
                React renders.
              </span>
            </div>

            <div className="icon2 invsible h-[60px] w-[60px] rounded-lg border-2 border-black opacity-0 will-change-transform"></div>
            <div className="icon2 invsible h-[60px] w-[60px] rounded-lg border-2 border-black opacity-0 will-change-transform"></div>
            <div className="icon2 invsible h-[60px] w-[60px] rounded-lg border-2 border-black opacity-0 will-change-transform"></div>
            <div className="icon2 invsible h-[60px] w-[60px] rounded-lg border-2 border-black opacity-0 will-change-transform"></div>
            <div className="icon2 invsible h-[60px] w-[60px] rounded-lg border-2 border-black opacity-0 will-change-transform"></div>
          </div>
        </div>
      </section> */}
      <section className="h-screen min-h-svh" ref={section3}></section>
    </div>
  );
}
