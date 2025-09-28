import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import useUploadsPlaylistId from "../hooks/useUploadsPlaylistId";
import { CHANNEL_ID } from "../constants/site";
import { fetchChannelUploadsSplit } from "../utils/youtube";
import YouTubeCarousel from "../components/YouTubeCarousel";
import ArtSplashLoader from "../components/ArtSplashLoader";

const SORTS = [
  { key: "new", label: "Newest" },
  { key: "old", label: "Oldest" },
  { key: "popular", label: "Most Popular" },
];

const TYPES = [
  { key: "all", label: "All" },
  { key: "videos", label: "Videos" },
  { key: "shorts", label: "Shorts" },
];

export default function Home() {
  const uploadsPlaylistId = useUploadsPlaylistId(CHANNEL_ID);
  const apiKey = process.env.REACT_APP_YT_API_KEY;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rawShorts, setRawShorts] = useState([]);
  const [rawVideos, setRawVideos] = useState([]);

  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("new");

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!uploadsPlaylistId) {
        setError("Invalid CHANNEL_ID (must start with UC…) in src/constants/site.js");
        setLoading(false);
        return;
      }
      if (!apiKey) {
        setError("Missing REACT_APP_YT_API_KEY in .env");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const { shorts, videos } = await fetchChannelUploadsSplit({
          uploadsPlaylistId,
          apiKey,
          limit: 150,
        });
        if (!alive) return;
        setRawShorts(shorts);
        setRawVideos(videos);
        setError("");
      } catch (e) {
        if (!alive) return;
        setError(e.message || "Failed to load videos.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [uploadsPlaylistId, apiKey]);

  const sortItems = (arr) => {
    if (sortBy === "new") return [...arr].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    if (sortBy === "old") return [...arr].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    if (sortBy === "popular") return [...arr].sort((a, b) => (b.views || 0) - (a.views || 0));
    return arr;
  };

  const shorts = useMemo(() => sortItems(rawShorts), [rawShorts, sortBy]);
  const videos = useMemo(() => sortItems(rawVideos), [rawVideos, sortBy]);

  const showVideos = typeFilter === "all" || typeFilter === "videos";
  const showShorts = typeFilter === "all" || typeFilter === "shorts";

  const hasContent = !loading && !error && ((showVideos && videos.length) || (showShorts && shorts.length));

  if (loading) return <ArtSplashLoader fullScreen message="Blending colors…" />;

  return (
    <div className="h-[calc(100dvh-4rem)] overflow-hidden">
      {/* ==== Vibrant, Modern Gradient Background ==== */}
      <div className="relative h-full overflow-hidden bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100">
        {/* Soft flowing pastel blobs */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(800px 300px at 15% 15%, rgba(59,130,246,0.15), transparent 70%),
              radial-gradient(600px 260px at 85% 12%, rgba(236,72,153,0.12), transparent 70%),
              radial-gradient(700px 300px at 25% 85%, rgba(16,185,129,0.12), transparent 70%),
              radial-gradient(500px 240px at 80% 80%, rgba(250,204,21,0.10), transparent 70%)
            `,
          }}
        />

        {/* Gentle paper-like grain */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 .02 .05 0'/></feComponentTransfer></filter><rect width='48' height='48' filter='url(%23n)' fill='black'/></svg>\")",
            backgroundSize: "220px 220px",
          }}
        />

        {/* ==== Foreground Content ==== */}
        <main
          className={[
            "relative z-[1]",
            "w-full max-w-[min(1600px,96vw)] mx-auto",
            "px-4 sm:px-6 lg:px-10 py-6",
            "h-full",
            hasContent ? "pb-24" : "",
          ].join(" ")}
        >
          {/* ==== Header ==== */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900/90"
            >
              Channel Library
            </motion.h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Type Filter */}
              <div className="inline-flex rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-1 py-1 shadow-sm">
                {TYPES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTypeFilter(t.key)}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      typeFilter === t.key
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-900 hover:bg-slate-900/5"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Sort Filter */}
              <div className="inline-flex rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-1 py-1 shadow-sm">
                {SORTS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key)}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      sortBy === s.key
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-900 hover:bg-slate-900/5"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ==== Error Message ==== */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/90 backdrop-blur px-4 py-3 text-red-800 shadow">
              {error}
              <div className="mt-2 text-sm text-red-700">
                Ensure <code>.env</code> has <code>REACT_APP_YT_API_KEY</code> and restart <code>npm start</code>.
              </div>
            </div>
          )}

          {/* ==== Carousels ==== */}
          {!error && (
            <div className="mt-6 h-[calc(100%-5.5rem)] overflow-y-auto overflow-x-hidden">
              <div className="rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-white/60 p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                {showVideos && <YouTubeCarousel title="Videos" items={videos} />}
                {showShorts && <YouTubeCarousel title="Shorts" items={shorts} />}

                {!showVideos && !showShorts && (
                  <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur p-4 text-slate-700">
                    Nothing to show with current filters.
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
