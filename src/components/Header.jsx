import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { SITE_NAME } from "../constants/site";
import { AnimatePresence, motion } from "framer-motion";

function useInitials(name = "") {
  console.log("hello")
  return useMemo(() => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "•";
    const pick = (s) => s[0]?.toUpperCase() ?? "";
    return (pick(parts[0]) + (parts[1] ? pick(parts[1]) : "")).slice(0, 2);
  }, [name]);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const initials = useInitials(SITE_NAME);

  const navBase =
    "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60";
  const active =
    "text-slate-900 bg-white/90 shadow-sm ring-1 ring-slate-900/10";
  const inactive =
    "text-slate-700 hover:text-slate-900 hover:bg-white/70";

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        bg-[rgba(255,255,255,0.7)] backdrop-blur-md
        border-b border-transparent
      "
    >
      {/* Subtle gradient border at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 via-pink-400 to-emerald-400 opacity-70" />

      <div
        className="
          mx-auto w-full max-w-[min(1600px,96vw)]
          h-16 px-4 sm:px-6 lg:px-8
          flex items-center justify-between
        "
      >
        {/* Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label={`${SITE_NAME} – Home`}
        >
          {/* Brand Mark with gradient */}
          <div
            className="
              relative grid h-10 w-10 place-items-center
              rounded-2xl text-white
              bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
              shadow-md ring-1 ring-white/50
            "
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              {/* minimal paint brush icon */}
              <path
                d="M19.3 4.7a2 2 0 0 1 0 2.8l-6.9 6.9c-.2.2-.3.5-.4.8l-.2 1.1-1.1.2c-.3 0-.6.2-.8.4l-1.8 1.8a2 2 0 0 1-2.8 0c.4-1.8 1.2-2.8 3.1-3.3l1.1-.2c.3-.1.6-.2.8-.4l6.9-6.9a2 2 0 0 1 2.8 0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Wordmark */}
          <div className="flex flex-col leading-none">
            <span className="font-extrabold tracking-tight text-[18px] sm:text-[20px] text-slate-900">
              {SITE_NAME}
            </span>
            <span className="text-xs text-slate-500">
              {initials} • Creative
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navBase} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/buy"
            className={({ isActive }) =>
              `${navBase} ${isActive ? active : inactive}`
            }
          >
            Buy Online
          </NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="
            md:hidden inline-flex items-center justify-center
            h-10 w-10 rounded-xl
            bg-white/80 text-slate-700
            ring-1 ring-slate-900/10 shadow-sm
            transition-colors hover:bg-white
          "
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="
              md:hidden border-t border-slate-200
              bg-[rgba(255,255,255,0.9)] backdrop-blur-md
            "
          >
            <div className="mx-auto w-full max-w-[min(1600px,96vw)] px-4 sm:px-6 lg:px-8 py-3">
              <div className="grid gap-2">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${navBase} block ${
                      isActive ? active : "text-slate-700 hover:bg-white/80"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/buy"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${navBase} block ${
                      isActive ? active : "text-slate-700 hover:bg-white/80"
                    }`
                  }
                >
                  Buy Online
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
