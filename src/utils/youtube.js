// src/utils/youtube.js
const API_BASE = "https://www.googleapis.com/youtube/v3";

// ---- helpers ----
function isoDurationToSeconds(iso) {
  // PT#H#M#S / PT#M#S / PT#S
  const re = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const [, H = "0", M = "0", S = "0"] = re.exec(iso) || [];
  return (+H) * 3600 + (+M) * 60 + (+S);
}

function toInt(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    let body = "";
    try { body = await res.text(); } catch {}
    throw new Error(`HTTP ${res.status}: ${body || res.statusText}`);
  }
  return res.json();
}

// ---- API calls ----
export async function fetchUploadsVideoIds({ uploadsPlaylistId, apiKey, pageToken, max = 50 }) {
  const url = new URL(`${API_BASE}/playlistItems`);
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("playlistId", uploadsPlaylistId);
  url.searchParams.set("maxResults", String(Math.min(max, 50)));
  if (pageToken) url.searchParams.set("pageToken", pageToken);
  url.searchParams.set("key", apiKey);

  const data = await fetchJson(url);
  const ids = (data.items || [])
    .map(i => i.contentDetails?.videoId)
    .filter(Boolean);

  return { ids, nextPageToken: data.nextPageToken || null };
}

export async function fetchVideosMeta({ ids, apiKey }) {
  if (!ids.length) return [];
  const url = new URL(`${API_BASE}/videos`);
  url.searchParams.set("part", "snippet,contentDetails,statistics");
  url.searchParams.set("id", ids.join(","));
  url.searchParams.set("key", apiKey);

  const data = await fetchJson(url);

  return (data.items || []).map(v => {
    const durationSec = isoDurationToSeconds(v.contentDetails?.duration || "PT0S");
    const views = toInt(v.statistics?.viewCount);
    return {
      id: v.id,
      title: v.snippet?.title || "",
      publishedAt: v.snippet?.publishedAt,
      thumbnails: v.snippet?.thumbnails || {},
      durationSec,
      isShort: durationSec > 0 && durationSec <= 60, // Shorts heuristic
      views,
    };
  });
}

/**
 * Fetch up to `limit` uploads (paged), then split into { shorts, videos }.
 * Increase `limit` for more items (mind quota/perf). Each page is 50 ids.
 */
export async function fetchChannelUploadsSplit({ uploadsPlaylistId, apiKey, limit = 150 }) {
  let collected = [];
  let pageToken = undefined;

  while (collected.length < limit) {
    const { ids, nextPageToken } = await fetchUploadsVideoIds({
      uploadsPlaylistId,
      apiKey,
      pageToken,
      max: Math.min(50, limit - collected.length),
    });
    if (!ids.length) break;

    const meta = await fetchVideosMeta({ ids, apiKey });
    collected = collected.concat(meta);

    if (!nextPageToken) break;
    pageToken = nextPageToken;
  }

  // newest first by default
  collected.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const shorts = collected.filter(v => v.isShort);
  const videos = collected.filter(v => !v.isShort);
  return { shorts, videos };
}

// ---- UI helpers ----
export function bestThumb(thumbnails) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    ""
  );
}

export function formatDuration(sec) {
  if (!sec || sec <= 0) return "0:00";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}
