"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}
export default function Home() {
  const iconContainer = useRef<HTMLDivElement | null>(null);
  const grid1 = useRef<HTMLDivElement | null>(null);
  const grid2 = useRef<HTMLDivElement | null>(null);
  const header = useRef<HTMLDivElement | null>(null);
  const h1 = useRef<HTMLDivElement | null>(null);
  const loopingAnimation = useRef<GSAPTimeline | null>(null);
  const scrollUpAnimation = useRef<GSAPTimeline | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const iconSet1 = gsap.utils.toArray(".icon1");
      const iconSet2 = gsap.utils.toArray(".icon2");
      //initial looping animation
      loopingAnimation.current = gsap
        .timeline({
          repeat: -1,
          defaults: {
            ease: "power4.inOut",
          },
        })
        // .set(grid1.current, {
        //   opacity: 1,
        // })
        .to(iconSet1, {
          scale: 0,
          // delay: 1,
          stagger: {
            each: 0.5,
            from: "edges",
          },
        })
        .set(grid1.current, {
          opacity: 0,
        })
        .set(grid2.current, {
          opacity: 1,
        })
        .from(iconSet2, {
          scale: 0,
          stagger: {
            each: 0.5,
            from: "edges",
          },
        })
        .to(iconSet2, {
          scale: 0,
          stagger: {
            each: 0.5,
            from: "edges",
          },
        })
        .set(grid1.current, {
          opacity: 1,
        })
        .set(grid2.current, {
          opacity: 0,
        })
        .to(iconSet1, {
          scale: 1,
          // delay: 1,
          stagger: {
            each: 0.5,
            from: "edges",
          },
        });

      //scrollup and scale animation
      scrollUpAnimation.current = gsap
        .timeline({})
        .to(iconContainer.current, {
          yPercent: -100,
        })
        .to(
          h1.current,
          {
            opacity: 0,
            yPercent: -25,
          },
          "<",
        )
        .to(iconContainer.current, { scale: 0.2 });

      //stop initial animation on scroll
      ScrollTrigger.create({
        trigger: header.current,
        start: "top+=50 top",
        end: "top+=50 top",
        onEnter: () => {
          // Optional: animate to end smoothly
          gsap.to(loopingAnimation.current, {
            time: loopingAnimation.current?.duration(),
            // duration: 0.5,
            onComplete: () => loopingAnimation.current?.pause(),
          });
        },
        onEnterBack: () => {
          loopingAnimation.current?.restart(true);
        },
      });

      //control scrollup and scale animation progress through scrolling
      ScrollTrigger.create({
        trigger: header.current,
        pin: header.current,
        pinSpacing: true,
        scrub: 1,
        animation: scrollUpAnimation.current,
        markers: true,
      });

      // ScrollTrigger.create({
      //   trigger: header.current,
      //   pin: header.current,
      //   pinSpacing: true,
      //   scrub: true,
      //   animation: scrollUpAnimation.current,
      //   onUpdate: (self) => {
      //     const scrolledDown = self.direction === 1 && self.progress > 0;
      //     const scrolledUp = self.direction === -1 && self.progress === 0;

      //     if (scrolledDown && loopingAnimation.current?.isActive()) {
      //       loopingAnimation.current.pause(loopingAnimation.current.duration());
      //     }

      //     if (
      //       scrolledUp &&
      //       loopingAnimation.current?.time() ===
      //         loopingAnimation.current.duration()
      //     ) {
      //       loopingAnimation.current.restart(true);
      //     }
      //   },
      //   markers: true,
      // });
    },
    { scope: iconContainer },
  );

  return (
    <div className="h-[200vh] px-8">
      <section className="flex h-dvh flex-col pb-4" ref={header}>
        <div className="w-full flex-1 pt-20">
          <div
            className="flex size-full flex-col items-center justify-center space-y-8"
            ref={h1}
          >
            <h1 className="font-hanken-grotesk mx-auto text-center text-8xl font-black text-black lg:max-w-6xl xl:text-9xl">
              Building the web, one pixel at a time
            </h1>
            <p className="font-semibold">Witty comment about me</p>
            <button className="font-archivo bg-lime-400 px-3 py-2.5 font-semibold">
              pill buton
            </button>
          </div>
        </div>
        <div className="relative h-80" ref={iconContainer}>
          <div
            className="absolute bottom-0 left-0 grid h-full w-full grid-cols-5 gap-3 opacity-100"
            ref={grid1}
          >
            <div className="icon1 rounded-xl bg-green-400 will-change-transform">
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
          <div
            className="absolute bottom-0 left-0 grid h-full w-full grid-cols-5 gap-3 opacity-0"
            ref={grid2}
          >
            <div className="icon2 rounded-xl bg-amber-400 will-change-transform">
              6
            </div>
            <div className="icon2 rounded-xl bg-sky-400 will-change-transform">
              7
            </div>
            <div className="icon2 rounded-xl bg-orange-400 will-change-transform">
              8
            </div>
            <div className="icon2 rounded-xl bg-violet-400 will-change-transform">
              9
            </div>
            <div className="icon2 rounded-xl bg-green-400 will-change-transform">
              10
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
