import { useMemo } from "react";

/**
 * Converts a YouTube channel ID (UC...) to its "Uploads" playlist (UU...)
 * No API key needed. Works for public channels.
 */
export default function useUploadsPlaylistId(channelId) {
  return useMemo(() => {
    if (!channelId || !channelId.startsWith("UC")) return null;
    return "UU" + channelId.slice(2);
  }, [channelId]);
}
