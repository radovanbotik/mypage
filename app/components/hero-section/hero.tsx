export default function Hero({ ref }) {
  return (
    <div
      className="mx-auto grid max-w-7xl flex-1 place-content-center pt-16 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="//bg-gray-900 //shadow-2xl //py-24 relative isolate overflow-hidden px-6 text-center sm:rounded-3xl sm:px-16">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Building UIs That Click… Literally
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
          Performance, accessibility, and a dash of JavaScript sorcery
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Summon the Demo
          </a>
          <a href="#" className="text-sm/6 font-semibold text-white">
            More Components
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
