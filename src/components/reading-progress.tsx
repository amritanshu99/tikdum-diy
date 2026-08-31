"use client";

import { useEffect, useRef } from "react";

type ReadingProgressProps = {
  targetId: string;
};

export function ReadingProgress({ targetId }: ReadingProgressProps) {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const bar = barRef.current;

    if (!target || !bar) return;

    let frame = 0;

    const updateProgress = () => {
      const bounds = target.getBoundingClientRect();
      const scrollableDistance = Math.max(
        target.offsetHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(
        Math.max(-bounds.top / scrollableDistance, 0),
        1,
      );

      bar.style.transform = `scaleX(${progress})`;
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetId]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  );
}
