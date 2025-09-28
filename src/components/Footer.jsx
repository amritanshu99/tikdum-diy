export default function Footer() {
  return (
    <footer
      className="
        fixed inset-x-0 bottom-0 z-[90]
        bg-[rgba(255,255,255,0.7)] backdrop-blur-md
        border-t border-transparent
      "
    >
      {/* Gradient top border for visual pop */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 via-pink-400 to-emerald-400 opacity-70" />

      <div
        className="
          relative mx-auto w-full max-w-[min(1600px,96vw)]
          px-4 sm:px-6 lg:px-8
          py-3 flex flex-col sm:flex-row items-center justify-between gap-3
          text-sm text-slate-600
        "
      >
        {/* Brand section */}
        <div className="flex items-center gap-2">
          <div
            className="
              grid h-8 w-8 place-items-center
              rounded-xl text-white text-xs font-bold tracking-wider
              bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
              shadow-sm ring-1 ring-white/40
            "
          >
            TD
          </div>
          <span className="font-semibold text-slate-800">
            Tikdum Diy
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/about"
            className="hover:text-slate-900 transition-colors"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-slate-900 transition-colors"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="hover:text-slate-900 transition-colors"
          >
            Privacy
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} Tikdum Diy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
