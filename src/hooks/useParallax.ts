import { useRef, useEffect, useCallback } from 'react';

/**
 * Performant parallax hook that updates transform directly on the DOM
 * element via ref, avoiding React re-renders during scroll.
 */
export const useParallax = (speed = 0.15) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rafId = useRef<number>(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    ticking.current = false;
    if (!containerRef.current || !imgRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    // Skip if not in viewport
    if (rect.bottom < 0 || rect.top > windowH) return;
    const progress = (windowH - rect.top) / (windowH + rect.height);
    const offset = (progress - 0.5) * rect.height * speed;
    imgRef.current.style.transform = `translateY(${offset}px)`;
  }, [speed]);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      rafId.current = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial position
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return { containerRef, imgRef };
};
