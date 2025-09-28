import { useRef } from "react";
import { motion } from "framer-motion";
import { bestThumb, formatDuration } from "../utils/youtube";

export default function YouTubeCarousel({ title, items = [] }) {
  const scrollerRef = useRef(null);

  const scrollBy = (delta) => scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  if (!items.length) return null;

  return (
    <section className="mb-10">
      {/* Header with title and scroll buttons */}
      <div className="mb-3 flex items-center justify-between px-2 lg:px-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>

        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scrollBy(-500)}
            className="rounded-lg border border-black/10 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50 active:translate-y-px"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(500)}
            className="rounded-lg border border-black/10 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50 active:translate-y-px"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal scroll-snap container (the ONLY element that overflows on X) */}
      <div
        ref={scrollerRef}
        className="
          w-full
          flex gap-5
          overflow-x-auto pb-3
          snap-x snap-mandatory
          scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400
        "
      >
        {items.map((v) => {
          const thumb = bestThumb(v.thumbnails);
          const watchUrl = `https://www.youtube.com/watch?v=${v.id}`;

          return (
            <motion.a
              key={v.id}
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              className="group snap-start shrink-0 w-72 md:w-80 focus:outline-none"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-black/5 bg-white/80 backdrop-blur-sm shadow-sm transition-all"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={v.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-100" />
                  )}

                  {/* Duration pill */}
                  {v.durationSec != null && (
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-semibold text-white shadow">
                      {formatDuration(v.durationSec)}
                    </span>
                  )}

                  {/* gradient overlay for contrast */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>

                {/* Meta info */}
                <div className="p-3.5">
                  <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-slate-900 group-hover:underline">
                    {v.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-slate-600/90">
                    <span>{new Date(v.publishedAt).toLocaleDateString()}</span>
                    {typeof v.views === "number" && (
                      <>
                        <span aria-hidden>•</span>
                        <span>{Intl.NumberFormat().format(v.views)} views</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Focus / hover ring */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 transition group-hover:ring-black/10 group-focus:ring-slate-900/20" />
              </motion.div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
