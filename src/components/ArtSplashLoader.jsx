import { memo } from "react";

/**
 * ArtSplashLoader
 * - Full-viewport painterly loader.
 * - If fullScreen is false, it still takes the full viewport height.
 *
 * Props:
 *   - fullScreen?: boolean (default: false) -> fixed overlay vs. in-flow block
 *   - message?: string
 */
function ArtSplashLoader({ fullScreen = false, message = "Warming up the canvas…" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "artstage relative overflow-hidden bg-paper grid place-items-center",
        fullScreen
          ? "fixed inset-0 z-[70]" // overlay: covers entire viewport
          : [
              "w-full",                  // block: still fills screen height
              "min-h-screen",            // fallback
              "min-h-[100dvh]",          // modern viewport unit
              "min-h-[100svh]"           // iOS dynamic viewport
            ].join(" ")
      ].join(" ")}
    >
      {/* Paper grain overlay */}
      <div className="paper-grain pointer-events-none absolute inset-0" />

      {/* Palette + message */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="palette animate-palette-tint">
          <div className="hole" />
          <span className="dab dab-1" />
          <span className="dab dab-2" />
          <span className="dab dab-3" />
          <span className="dab dab-4" />
        </div>
        <div className="text-sm font-medium text-black/70 bg-white/70 backdrop-blur px-2 py-1 rounded-full">
          {message}
          <span className="ml-1 inline-block dots">●●●</span>
        </div>
      </div>

      {/* Brush strokes */}
      <svg
        className="
          strokes
          w-[min(96vw,1400px)]
          h-[min(86vh,780px)]
          max-h-[86vh]
        "
        viewBox="0 0 1200 420"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Stroke 1 */}
        <g className="strokeGroup stroke-1">
          <path
            className="strokePath"
            d="M 60 90 C 280 40, 520 140, 1140 60"
            stroke="url(#grad1)"
            strokeLinecap="round"
          />
          <path
            className="bristle"
            d="M 60 90 C 280 40, 520 140, 1140 60"
            stroke="url(#grad1)"
            strokeLinecap="round"
            strokeOpacity=".25"
            filter="url(#noise)"
          />
        </g>

        {/* Stroke 2 */}
        <g className="strokeGroup stroke-2">
          <path
            className="strokePath"
            d="M 40 210 C 300 160, 560 260, 1160 180"
            stroke="url(#grad2)"
            strokeLinecap="round"
          />
          <path
            className="bristle"
            d="M 40 210 C 300 160, 560 260, 1160 180"
            stroke="url(#grad2)"
            strokeLinecap="round"
            strokeOpacity=".22"
            filter="url(#noise)"
          />
        </g>

        {/* Stroke 3 */}
        <g className="strokeGroup stroke-3">
          <path
            className="strokePath"
            d="M 20 330 C 300 300, 620 360, 1180 300"
            stroke="url(#grad3)"
            strokeLinecap="round"
          />
          <path
            className="bristle"
            d="M 20 330 C 300 300, 620 360, 1180 300"
            stroke="url(#grad3)"
            strokeLinecap="round"
            strokeOpacity=".28"
            filter="url(#noise)"
          />
        </g>

        {/* Defs */}
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ef4444" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#10b981" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="overlay" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* Brush head that follows the current stroke */}
      <div className="brushHead" aria-hidden>
        <div className="ferrule" />
        <div className="bristles" />
        <div className="handle" />
      </div>

      <span className="sr-only">Loading, painting strokes on canvas…</span>
    </div>
  );
}

export default memo(ArtSplashLoader);
