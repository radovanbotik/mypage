"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="//bg-white fixed top-4 left-0 z-40 flex w-full items-center px-4 py-4 text-white sm:px-6">
      {/* <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 hover:text-white lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <div className="size-6">3bars</div>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button> */}
      <ul className="relative mx-auto flex rounded-full px-3 text-sm font-medium text-white shadow-lg ring-1 shadow-white/5 ring-white/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <Link
          href="/about"
          className="block px-3 py-2 text-white transition duration-300 hover:[text-shadow:0_0_8px_#22d3ee]"
        >
          {`init()`}
        </Link>
        <Link
          href="/articles"
          className="block px-3 py-2 text-white transition duration-300 hover:[text-shadow:0_0_8px_#22d3ee]"
        >
          {`<Blog />`}
        </Link>
        <Link
          href="/projects"
          className="block px-3 py-2 text-white transition duration-300 hover:[text-shadow:0_0_8px_#22d3ee]"
        >
          README.md
        </Link>
        <Link
          href="/speaking"
          className="block px-3 py-2 text-white transition duration-300 hover:[text-shadow:0_0_8px_#22d3ee]"
        >
          Open a Ticket
        </Link>
      </ul>
      {/* <a href="#">
        <span className="sr-only">Your profile</span>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="size-8 rounded-full bg-gray-50 outline outline-1 -outline-offset-1 outline-black/5"
        />
      </a> */}
    </div>
  );
}
