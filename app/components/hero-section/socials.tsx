import { Github } from "@/public/images/social/github";
import { Gmail } from "@/public/images/social/gmail";
import { LinkedIn } from "@/public/images/social/linkedin";

export function Socials() {
  return (
    <div className="//-translate-y-1/2 //top-1/2 fixed right-6 bottom-6 z-10 hidden flex-col gap-4 lg:flex">
      <div className="gap-2 rounded-full border border-white/20 bg-white/10 p-3 text-center text-sm backdrop-blur-sm">
        {/* <Github className="inline-block size-6 rounded-full" /> */}
        Github
      </div>
      <div className="gap-2 rounded-full border border-white/20 bg-white/10 p-3 text-center text-sm backdrop-blur-sm">
        {/* <LinkedIn className="inline-block size-6 rounded-full" /> */}
        LinkedIn
      </div>

      {/* Vertical line */}
      <div className="mx-auto h-20 w-px bg-gradient-to-b from-white/40 to-transparent"></div>

      {/* Status indicator */}
      <div className="relative flex flex-col items-center gap-1 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
        {/* <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div> */}
        ws://
      </div>
    </div>
  );
}
