"use client";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

import { Underline1 } from "@/public/images/doodles/underline/underline1";
import Link from "next/link";
import { ComponentPropsWithRef, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

type Props = ComponentPropsWithRef<"div">;

export default function Hero({ ref }: Props) {
  const animatedWord1 = useRef<HTMLDivElement | null>(null);
  const animatedWord2 = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const underline = useRef<SVGSVGElement | null>(null);

  // useGSAP(
  //   () => {
  //     gsap.registerPlugin(TextPlugin);
  //     tl.current = gsap
  //       .timeline({
  //         delay: 3,
  //         defaults: {
  //           ease: "circ.inOut",
  //           duration: 2,
  //         },
  //         yoyo: true,
  //         repeat: -1,
  //       })
  //       .to(underline.current, { opacity: 0 })
  //       .to(animatedWord1.current, {
  //         text: "Interfaces That Just… ",
  //       })
  //       .to(animatedWord2.current, {
  //         text: "React",
  //       });
  //   },
  //   { scope: ref },
  // );
  return (
    <div
      className="z-10 mx-auto grid max-w-7xl flex-1 place-content-center pt-16 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="//bg-gray-900 //shadow-2xl //py-24 relative isolate overflow-hidden px-6 text-center sm:rounded-3xl sm:px-16">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          <span ref={animatedWord1}>Building UIs That Click… </span>
          <span className="relative" ref={animatedWord2}>
            Literally
            <Underline1
              className="absolute top-0 left-0 size-full translate-y-1/2"
              ref={underline}
            />
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
          Performance, accessibility, and a dash of JavaScript sorcery
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="#"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {`<ContactForm />`}
          </Link>
          <Link href="#" className="text-sm/6 font-semibold text-white">
            More Components
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
