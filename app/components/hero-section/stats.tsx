export function Stats() {
  return (
    <div className="font-hanken-grotesk //top-1/2 //left-6 //-translate-y-1/2 fixed right-4 bottom-4 z-10 hidden lg:block">
      <div className="//backdrop-blur-xs w-80 rounded-2xl border border-white/20 bg-white/10 p-6">
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold text-white">3+</div>
          <div className="text-sm text-gray-300">Years Experience</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* <Code2 className="h-4 w-4 text-teal-400" /> */}
            <div>
              <div className="text-sm font-medium text-white">
                Frontend First
              </div>
              <div className="text-xs text-gray-400">
                React, Next.js, Tailwind — on speed dial
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <Zap className="h-4 w-4 text-yellow-400" /> */}
            <div>
              <div className="text-sm font-medium text-white">
                Backend Curious
              </div>
              <div className="text-xs text-gray-400">
                Node, Express & MySQL without fear
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <Coffee className="h-4 w-4 text-orange-400" /> */}
            <div>
              <div className="text-sm font-medium text-white">Available</div>
              <div className="text-xs text-gray-400">For hire</div>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full cursor-pointer rounded-md bg-[#0b1631] px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-[#0ea5e9]">
          Let's Talk
        </button>
      </div>
    </div>
  );
}
