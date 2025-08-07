"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Javacript } from "@/public/images/techstack/javascript";
import { TypeScript } from "@/public/images/techstack/typescript";
import { Tailwind } from "@/public/images/techstack/tailwindcss";
import { React } from "@/public/images/techstack/react";
import { Next } from "@/public/images/techstack/nextdotjs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}
export default function Home() {
  const grid1 = useRef<HTMLDivElement | null>(null);
  const page = useRef<HTMLDivElement | null>(null);
  const header = useRef<HTMLDivElement | null>(null);
  const h1 = useRef<HTMLDivElement | null>(null);
  const scrollUpAnimation = useRef<GSAPTimeline | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const iconsInSequence1 = gsap.utils.toArray(".icon1") as HTMLDivElement[];
      const iconsInSequence2 = gsap.utils.toArray(".icon2") as HTMLDivElement[];
      const iconsInSequence3 = gsap.utils.toArray(".icon3") as HTMLDivElement[];
      const wordsInSentence1 = gsap.utils.toArray(
        ".sentence1 .text-content",
      ) as HTMLDivElement[];
      const wordsInSentence2 = gsap.utils.toArray(
        ".sentence2 .text-content",
      ) as HTMLDivElement[];
      const wordsInSentence3 = gsap.utils.toArray(
        ".sentence3 .text-content",
      ) as HTMLDivElement[];
      const wordsInSentence4 = gsap.utils.toArray(
        ".sentence4 .text-content",
      ) as HTMLDivElement[];

      const grid = grid1.current;
      // Initial translation based on original size
      const originalOffset =
        -window.innerHeight / 2 + grid.getBoundingClientRect().height / 2;

      // Timeline setup
      scrollUpAnimation.current = gsap
        .timeline()
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
        .to(iconsInSequence1, {
          y: originalOffset,
          stagger: { each: 0.15, from: "start" },
          ease: "power2.out",
        })
        .to(
          h1.current,
          {
            opacity: 0,
            yPercent: -25,
          },
          "<",
        )
        .to(iconsInSequence1, {
          width: 60,
          onUpdate: () => {
            // Recalculate each time the width has changed
            const newOffset =
              -window.innerHeight / 2 + grid.getBoundingClientRect().height / 2;

            // Apply updated y value directly
            iconsInSequence1.forEach((el) => {
              gsap.set(el, { y: newOffset });
            });
          },
        })
        .to(grid, { gap: 0 }, "<")
        .to(page.current, {
          backgroundColor: "white",
          color: "black",
        })
        .set(iconsInSequence1, { opacity: 0 }, "<")
        // .set(iconsInSequence2, { opacity: 1 }, "<")
        .set(iconsInSequence3, { opacity: 1 }, "<")
        //ICON1
        .set(
          iconsInSequence2[0],
          {
            opacity: 0,
          },
          "<",
        )
        .to(iconsInSequence3[0], {
          yPercent: -100,
        })

        .to(iconsInSequence3[0], {
          x: 0,
          // backgroundColor: "black",
        })
        .to(wordsInSentence1[0], {
          opacity: 1,
        })
        .to(
          wordsInSentence1,
          {
            x: 0,
          },
          "<",
        )
        .to(iconsInSequence3[0], {
          x: 0,
          // backgroundColor: "black",
        })
        //ICON2
        .set(
          iconsInSequence2[1],
          {
            opacity: 0,
          },
          "<",
        )
        .to(
          wordsInSentence1[1],
          {
            opacity: 1,
          },
          "<",
        )
        .to(iconsInSequence3[1], {
          x: 0,
          // backgroundColor: "black",
        })
        .to(iconsInSequence3[2], { y: 0 }, "<")
        .set(iconsInSequence2[2], { opacity: 0 }, "<")
        .to([iconsInSequence3[3], iconsInSequence3[4]], { y: 0 }, "<")
        .set([iconsInSequence2[3], iconsInSequence2[4]], { opacity: 0 }, "<")
        .to(
          wordsInSentence2[0],
          {
            opacity: 1,
            x: 0,
          },
          "<",
        )
        .to(
          wordsInSentence2[1],
          {
            opacity: 1,
          },
          "<",
        )
        .to(iconsInSequence3[2], { x: 0 })
        .to(wordsInSentence3, { opacity: 1, x: 0 }, "<")
        .to([iconsInSequence3[3], iconsInSequence3[4]], { x: 0 })
        // .to(wordsInSentence4[1], { opacity: 1 })
        .to(wordsInSentence4, { x: 0, opacity: 1 });

      ScrollTrigger.create({
        trigger: header.current,
        pin: header.current,
        pinSpacing: true,
        scrub: 1,
        animation: scrollUpAnimation.current,
        // markers: true,
      });
    },
    { scope: page },
  );

  return (
    <div className="h-[200vh] bg-black px-8 text-white" ref={page}>
      <section className="//pb-4 relative flex h-dvh flex-col" ref={header}>
        <div className="w-full flex-1">
          <div
            className="flex size-full flex-col items-center justify-center space-y-6"
            ref={h1}
          >
            <h1 className="font-hanken-grotesk mx-auto text-center text-4xl font-black text-white lg:max-w-6xl xl:text-6xl">
              Building the web, one pixel at a time
            </h1>
            <p className="font-semibold">Witty comment about me</p>
            <button className="font-archivo bg-lime-400 px-3 py-2.5 font-semibold">
              pill buton
            </button>
          </div>
        </div>
        <div
          className="//absolute //bottom-0 flex w-full items-start justify-center gap-3 opacity-100 [&>*]:aspect-square [&>*]:w-full [&>*]:max-w-60"
          ref={grid1}
        >
          <div className="icon1 overflow-hidden rounded-xl object-cover will-change-transform">
            <Javacript className="size-full" />
          </div>
          <div className="icon1 overflow-hidden rounded-xl will-change-transform">
            <TypeScript className="size-full" />
          </div>
          <div className="icon1 overflow-hidden rounded-xl will-change-transform">
            <Tailwind className="size-full" />
          </div>
          <div className="icon1 overflow-hidden rounded-xl will-change-transform">
            <React className="size-full" />
          </div>
          <div className="icon1 overflow-hidden rounded-xl will-change-transform">
            <Next className="size-full" />
          </div>
        </div>
        <div className="font-hanken-grotesk absolute top-1/2 w-full -translate-y-1/2 font-black">
          <div className="relative mx-auto flex h-full w-fit justify-center opacity-100">
            {/* SENTENCE 1 */}
            <div className="sentence1 absolute -top-full left-0 z-10 flex w-full items-center justify-center gap-1 text-5xl whitespace-nowrap select-none">
              <span className="text-content -translate-x-[10%] opacity-0">
                Old faithful,
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] translate-y-full opacity-0 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <Javacript className="size-full" />
                </div>
              </div>
              <span className="text-content -translate-x-[10%] opacity-0">
                still breaking ground.
              </span>
            </div>
            {/* SENTENCE 2 */}
            <div className="sentence2 absolute top-0 left-0 z-10 flex w-full items-center justify-center gap-1 text-5xl whitespace-nowrap select-none">
              <span className="text-content -translate-x-[10%] opacity-0">
                Typings matter.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] rounded-xl opacity-0 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <TypeScript className="size-full" />
                </div>
              </div>
              <span className="text-content opacity-0">
                Ship with confidence.
              </span>
            </div>
            {/* SENTENCE 3 */}
            <div className="sentence3 absolute top-full left-0 z-10 flex w-full items-center justify-center gap-1 text-5xl whitespace-nowrap select-none">
              <span className="text-content -translate-x-[10%] opacity-0">
                No stylesheets,
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-full rounded-xl opacity-0 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <Tailwind className="size-full" />
                </div>
              </div>
              <span className="text-content translate-x-[10%] opacity-0">
                just utility bliss.
              </span>
            </div>
            {/* SENTENCE 4 */}
            <div className="sentence4 absolute top-[200%] left-0 z-10 flex w-full items-center justify-center gap-1 text-5xl whitespace-nowrap select-none">
              <span className="text-content -translate-x-[10%] opacity-0">
                Reacting quickly.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-[200%] rounded-xl opacity-1 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <React className="size-full" />
                </div>
              </div>
              {/* <span className="text-content //translate-x-[10%] opacity-0"></span> */}
              <span className="text-content translate-x-[10%] opacity-0">
                Routing smarter.
              </span>
              <div className="icon3 inline-block aspect-square h-[60px] w-[60px] -translate-y-[200%] rounded-xl opacity-1 will-change-transform">
                <div className="overflow-hidden rounded-md border-2 border-black">
                  <Next className="size-full" />
                </div>
              </div>
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
