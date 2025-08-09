"use client";

import { ComponentPropsWithRef, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
// import { Underline1 } from "@/public/images/doodles/underline/underline1";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, TextPlugin);
}

type Props = ComponentPropsWithRef<"div"> & {
  tech: null | "js" | "ts" | "tw" | "rx" | "nx";
};

export default function Hero({ ref, tech }: Props) {
  const timeline = useRef<GSAPTimeline | null>(null);

  const headline = useRef<HTMLHeadingElement | null>(null);
  const animatedWord1 = useRef<HTMLSpanElement | null>(null);
  const animatedWord2 = useRef<HTMLSpanElement | null>(null);
  // const underline = useRef<SVGSVGElement | null>(null);

  const subheadline = useRef<HTMLParagraphElement | null>(null);
  const cta = useRef<HTMLAnchorElement | null>(null);
  const secondaryButton = useRef<HTMLAnchorElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Ensure GPU-accelerated props and predictable starting styles
      gsap.set(
        [
          headline.current,
          subheadline.current,
          cta.current,
          secondaryButton.current,
        ],
        { willChange: "transform, opacity" },
      );
      gsap.set(animatedWord1.current, {
        opacity: 0,
        y: 8,
        letterSpacing: "0.02em",
      });
      gsap.set(animatedWord2.current, {
        opacity: 0,
        scale: 0.98,
        filter: "none",
      });

      // Optional underline stroke-draw setup (if you enable the SVG)
      // if (underline.current) {
      //   const len = (underline.current as any).getTotalLength?.() ?? 300;
      //   gsap.set(underline.current, {
      //     strokeDasharray: len,
      //     strokeDashoffset: len,
      //     opacity: 1,
      //   });
      // }

      mm.add(
        {
          // Default path
          all: "(prefers-reduced-motion: no-preference)",
          // Reduced-motion fallback
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            // Simple, accessible fades with minimal movement
            const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
            timeline.current = tl;

            tl.to(headline.current, { opacity: 1, duration: 0.25 })
              .to(subheadline.current, { opacity: 1, duration: 0.2 }, ">-0.05")
              .to(cta.current, { opacity: 1, duration: 0.2 }, ">-0.05")
              .to(
                secondaryButton.current,
                { opacity: 1, duration: 0.2 },
                ">-0.1",
              );

            return () => tl.kill();
          }

          // Full animation path
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });
          timeline.current = tl;

          tl.add("start");

          // 1) Headline container
          tl.to(
            headline.current,
            { y: 0, opacity: 1, duration: 0.38, ease: "power4.out" },
            "start",
          );

          // 1b) Words inside headline
          tl.to(
            animatedWord1.current,
            {
              y: 0,
              opacity: 1,
              letterSpacing: "0em",
              duration: 0.28,
            },
            "start+=0.12",
          );

          tl.to(
            animatedWord2.current,
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
            },
            "start+=0.22",
          )
            // Glow pulse on settle
            .to(
              animatedWord2.current,
              { filter: "drop-shadow(0 0 12px #00fff533)", duration: 0.18 },
              "<",
            )
            .to(
              animatedWord2.current,
              { filter: "none", duration: 0.25 },
              ">-0.02",
            )
            // Tiny glitch tick
            .to(animatedWord2.current, { x: 1, duration: 0.02 }, ">")
            .to(animatedWord2.current, { x: -1, duration: 0.02 })
            .to(animatedWord2.current, { x: 0, duration: 0.02 });

          // Optional underline stroke draw
          // if (underline.current) {
          //   tl.to(
          //     underline.current,
          //     { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" },
          //     "start+=0.26",
          //   );
          // }

          // 2) Subheadline breathe-in
          tl.to(
            subheadline.current,
            { y: 0, opacity: 1, duration: 0.22 },
            "start+=0.30",
          )
            .to(
              subheadline.current,
              { scale: 1.015, duration: 0.1, ease: "back.out(2)" },
              ">-0.02",
            )
            .to(subheadline.current, { scale: 1, duration: 0.08 }, ">");

          // 3) Primary CTA pop + halo
          tl.to(
            cta.current,
            { opacity: 1, scale: 1, duration: 0.32, ease: "back.out(2)" },
            "start+=0.44",
          )
            .fromTo(
              cta.current,
              { boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
              {
                boxShadow: "0 0 20px 2px #ffffff44",
                duration: 0.22,
                ease: "power2.out",
              },
              "<",
            )
            .to(
              cta.current,
              {
                boxShadow: "0 0 10px 0 #ffffff22",
                duration: 0.25,
                ease: "power2.out",
              },
              ">",
            );

          // 4) Secondary button + arrow nudge
          tl.to(
            secondaryButton.current,
            { opacity: 1, y: 0, duration: 0.24 },
            "start+=0.46",
          )
            .to(
              arrowRef.current,
              { x: 4, duration: 0.08, ease: "power2.out" },
              ">",
            )
            .to(arrowRef.current, {
              x: 0,
              duration: 0.08,
              ease: "power2.inOut",
            });

          // 5) Idle micro-motion (subtle, rare)
          // CTA halo pulse every ~11s
          gsap.to(cta.current, {
            boxShadow: "0 0 14px 1px #ffffff33",
            duration: 0.6,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            repeatDelay: 10.5,
          });

          return () => {
            tl.kill();
          };
        },
      );

      return () => {
        mm.revert();
        gsap.set(
          [
            headline.current,
            subheadline.current,
            cta.current,
            secondaryButton.current,
          ],
          { clearProps: "will-change" },
        );
      };
    },

    //@ts-ignore
    { scope: ref },
  );

  const headlineSubheadline = {
    default: {
      headline: "Building UIs That Click… ",
      underline: "Literally",
      subheadline:
        "Performance, accessibility, and a dash of JavaScript sorcery.",
    },
    js: {
      headline: "Because Everything Runs on ",
      underline: "JavaScript",
      subheadline:
        "I bend JavaScript to my will… even when it tries to break everything.",
    },
    ts: {
      headline: "Strongly Typed, Strongly Built - ",
      underline: "TypeScript",
      subheadline:
        "I use TypeScript to fix the bugs JavaScript swore weren’t its fault.",
    },
    tw: {
      headline: "Utility-First, ",
      underline: "Tailwind CSS",
      subheadline: "Turning unreadable class soup into deliciously styled UIs.",
    },
    rx: {
      headline: "Interfaces That Just… ",
      underline: "React",
      subheadline:
        "I build components so smooth, even state and props play nice.",
    },
    nx: {
      headline: "The Future of the Web? Probably ",
      underline: "Next.js",
      subheadline:
        "I harness Next.js for blazing-fast, SEO-friendly apps that make me look even faster.",
    },
  } as const;

  return (
    <div
      className="z-10 mx-auto grid max-w-7xl flex-1 place-content-center pt-16 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="px-6 text-center sm:px-16">
        <h2
          className="translate-y-5 text-4xl font-semibold tracking-normal text-balance text-white opacity-0 sm:text-5xl"
          ref={headline}
        >
          <span ref={animatedWord1 as any}>
            {tech
              ? headlineSubheadline[tech].headline
              : headlineSubheadline["default"].headline}
          </span>
          <span className="relative inline-block" ref={animatedWord2 as any}>
            {tech
              ? headlineSubheadline[tech].underline
              : headlineSubheadline["default"].underline}
            {/* <Underline1
              className="pointer-events-none absolute left-0 top-0 size-full translate-y-1/2"
              ref={underline}
            /> */}
          </span>
        </h2>

        <p
          className="mx-auto mt-6 max-w-xl translate-y-3 text-lg/8 text-pretty text-gray-300 opacity-0"
          ref={subheadline}
        >
          {tech
            ? headlineSubheadline[tech].subheadline
            : headlineSubheadline["default"].subheadline}
        </p>

        <div className="justify mt-6 mb-6 flex flex-col items-center gap-4 lg:flex-row">
          <Link
            href="#"
            className="inline-block w-full rounded-md bg-white px-3.5 py-2.5 text-sm/6 font-semibold whitespace-nowrap text-gray-900 opacity-0 shadow-[0px_0px_8px_2px_#ffffff33] will-change-[transform,opacity] hover:bg-gray-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
            ref={cta}
          >
            {`Get in touch`}
          </Link>

          <Link
            href="#"
            className="inline-block w-full translate-y-[6px] px-3.5 py-2.5 text-sm/6 font-semibold whitespace-nowrap text-white opacity-0"
            ref={secondaryButton}
          >
            More Components{" "}
            <span aria-hidden="true" ref={arrowRef}>
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
