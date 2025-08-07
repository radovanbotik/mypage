"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}
export default function Home() {
  const grid1 = useRef<HTMLDivElement | null>(null);
  const page = useRef<HTMLDivElement | null>(null);
  const header = useRef<HTMLDivElement | null>(null);
  const h1 = useRef<HTMLDivElement | null>(null);
  const scrollUpAnimation = useRef<GSAPTimeline | null>(null);

  //icon-sequence1
  const icon_1_sequence_1 = useRef<HTMLDivElement | null>(null);
  const icon_2_sequence_1 = useRef<HTMLDivElement | null>(null);
  const icon_3_sequence_1 = useRef<HTMLDivElement | null>(null);
  const icon_4_sequence_1 = useRef<HTMLDivElement | null>(null);
  const icon_5_sequence_1 = useRef<HTMLDivElement | null>(null);

  //icon-sequence2
  const icon_1_sequence_2 = useRef<HTMLDivElement | null>(null);
  const icon_2_sequence_2 = useRef<HTMLDivElement | null>(null);
  const icon_3_sequence_2 = useRef<HTMLDivElement | null>(null);
  const icon_4_sequence_2 = useRef<HTMLDivElement | null>(null);
  const icon_5_sequence_2 = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const iconsInSequence1 = gsap.utils.toArray(".icon1") as HTMLDivElement[];
      const iconsInSequence2 = gsap.utils.toArray(".icon2") as HTMLDivElement[];
      const iconsInSequence3 = gsap.utils.toArray(".icon3") as HTMLDivElement[];
      const wordsInSentence1 = gsap.utils.toArray(
        ".sentence1 .text-content",
      ) as HTMLDivElement[];
      console.log(iconsInSequence2);
      const grid = grid1.current;
      // Initial translation based on original size
      const originalOffset =
        -window.innerHeight / 2 + grid.getBoundingClientRect().height / 2;

      // Timeline setup
      scrollUpAnimation.current = gsap
        .timeline()
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
        .to(page.current, {
          backgroundColor: "white",
          color: "black",
        })
        .set(iconsInSequence1, { opacity: 0 }, "<")
        .set(iconsInSequence2, { opacity: 1 }, "<")
        .set(iconsInSequence3, { opacity: 1 }, "<")
        .set(iconsInSequence2[0], { opacity: 0 })
        .to(iconsInSequence3[0], {
          yPercent: -100,
        })
        .to(iconsInSequence3[0], {
          xPercent: 200,
        })
        .set(wordsInSentence1[0], {
          opacity: 1,
        })
        .to(iconsInSequence3[0], {
          xPercent: 300,
        })
        .to(
          wordsInSentence1,
          {
            xPercent: 10,
          },
          "<",
        )
        .set(
          wordsInSentence1[1],
          {
            opacity: 1,
          },
          "<",
        );

      ScrollTrigger.create({
        trigger: header.current,
        pin: header.current,
        pinSpacing: true,
        scrub: 1,
        animation: scrollUpAnimation.current,
        markers: true,
      });
    },
    { scope: page },
  );

  return (
    <div className="h-[200vh] bg-black px-8 text-white" ref={page}>
      <section className="//pb-4 relative flex h-dvh flex-col" ref={header}>
        <div className="w-full flex-1">
          <div
            className="flex size-full flex-col items-center justify-center space-y-8"
            ref={h1}
          >
            <h1 className="font-hanken-grotesk mx-auto text-center text-4xl font-black text-white lg:max-w-6xl xl:text-9xl">
              Building the web, one pixel at a time
            </h1>
            <p className="font-semibold">Witty comment about me</p>
            <button className="font-archivo bg-lime-400 px-3 py-2.5 font-semibold">
              pill buton
            </button>
          </div>
        </div>
        <div
          className="//absolute //bottom-0 flex w-full items-start justify-center opacity-100 [&>*]:aspect-square [&>*]:w-full"
          ref={grid1}
        >
          <div className="icon1 rounded-xl bg-green-400 object-cover will-change-transform">
            1
          </div>
          <div className="icon1 rounded-xl bg-amber-400 will-change-transform">
            2
          </div>
          <div className="icon1 rounded-xl bg-sky-400 will-change-transform">
            3
          </div>
          <div className="icon1 rounded-xl bg-orange-400 will-change-transform">
            4
          </div>
          <div className="icon1 rounded-xl bg-violet-400 will-change-transform">
            5
          </div>
        </div>
        <div className="absolute top-1/2 w-full -translate-y-1/2">
          <div className="relative inset-0 mx-auto flex h-full w-fit opacity-100">
            <div className="sentence1 div absolute -top-full left-0 z-10 flex text-6xl whitespace-nowrap select-none">
              <span className="text-content -translate-x-[10%] opacity-0">
                a word
              </span>
              <div className="icon3 inline-block aspect-square w-[60px] -translate-x-[300%] translate-y-full rounded-xl bg-green-300 object-cover opacity-0 will-change-transform"></div>
              <span className="text-content -translate-x-[10%] opacity-0">
                b word
              </span>
            </div>
            <div className="icon2 aspect-square w-[60px] rounded-xl bg-green-300 opacity-0 will-change-transform">
              12
            </div>
            <div className="icon2 aspect-square w-[60px] rounded-xl bg-amber-300 opacity-0 will-change-transform">
              22
            </div>
            <div className="icon2 aspect-square w-[60px] rounded-xl bg-sky-300 opacity-0 will-change-transform">
              32
            </div>
            <div className="icon2 aspect-square w-[60px] rounded-xl bg-orange-300 opacity-0 will-change-transform">
              42
            </div>
            <div className="icon2 aspect-square w-[60px] rounded-xl bg-violet-300 opacity-0 will-change-transform">
              52
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
