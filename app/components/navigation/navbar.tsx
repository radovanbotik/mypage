"use client";
import gsap from "gsap";
import { Menu } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/cn";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navbar = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isActive = (href: string) => href === pathname;

  useGSAP(
    () => {
      // Start blurred & slightly raised
      gsap.set(navbar.current, {
        y: -12,
        opacity: 0,
        filter: "blur(8px)",
      });

      // Animate into view with blur removal
      gsap.to(navbar.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.45,
        ease: "power3.out",
      });
    },
    { scope: navbar },
  );

  return (
    <div
      className="fixed inset-x-0 top-4 z-40 mx-auto flex w-full max-w-7xl -translate-y-3 items-center px-4 py-4 text-white opacity-0 sm:px-6"
      ref={navbar}
    >
      <a href="#" className="font-hanken flex items-center gap-2">
        <span className="sr-only">Your profile</span>
        <Image
          src={"/images/photos/me_usual_64.png"}
          alt="radovan"
          width={64}
          height={51}
          className="size-10 rounded-full bg-gray-50 object-cover outline-2 -outline-offset-1 outline-white/50"
        />
        <span className="font-archivo text-sm">Hi, I'm Rado</span>
        {/* RB */}
      </a>

      <ul className="absolute left-1/2 flex -translate-x-1/2 justify-center rounded-full px-3 text-sm font-medium text-white shadow-lg ring-1 shadow-white/5 ring-white/5 backdrop-blur-sm">
        <Link
          href="/"
          className={cn(
            "block px-3 py-2 text-white transition duration-300 hover:[text-shadow:0_0_8px_#22d3ee]",
            isActive("/") && "[text-shadow:0_0_8px_#22d3ee]",
          )}
        >
          {`init()`}
        </Link>
        <Link
          href="/readme"
          className={cn(
            "block px-3 py-2 text-white transition duration-300 hover:[text-shadow:0_0_8px_#22d3ee]",
            isActive("/readme") && "[text-shadow:0_0_8px_#22d3ee]",
          )}
        >
          README.md
        </Link>
        <Link
          href="/contact"
          className={cn(
            "block px-3 py-2 text-white transition duration-300 hover:[text-shadow:0_0_8px_#22d3ee]",
            isActive("/contact") && "[text-shadow:0_0_8px_#22d3ee]",
          )}
        >
          Open a Ticket
        </Link>
      </ul>
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="group ml-auto cursor-pointer text-white"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="size-6 transition duration-300 group-hover:[text-shadow:0_0_8px_#22d3ee]" />
      </button>
    </div>
  );
}
