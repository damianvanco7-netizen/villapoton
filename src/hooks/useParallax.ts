import { useRef, useEffect } from 'react';

/**
 * Centralized parallax manager — single scroll listener shared across
 * all parallax instances, with IntersectionObserver gating.
 */

type ParallaxEntry = {
  container: HTMLElement;
  img: HTMLElement;
  speed: number;
  visible: boolean;
};

const entries = new Set<ParallaxEntry>();
let ticking = false;
let listening = false;
let observer: IntersectionObserver | null = null;
const isMobile = () => window.innerWidth < 768;

function updateAll() {
  ticking = false;
  const wH = window.innerHeight;
  const mobile = isMobile();
  entries.forEach((e) => {
    if (!e.visible) return;
    const rect = e.container.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > wH + 100) return;
    const progress = (wH - rect.top) / (wH + rect.height);
    const speed = mobile ? e.speed * 0.5 : e.speed;
    let offset = (progress - 0.5) * rect.height * speed;
    // Clamp on mobile
    if (mobile) offset = Math.max(-30, Math.min(30, offset));
    e.img.style.transform = `translate3d(0,${offset}px,0)`;
  });
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateAll);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', onScroll, { passive: true });

  observer = new IntersectionObserver(
    (ioEntries) => {
      ioEntries.forEach((io) => {
        entries.forEach((e) => {
          if (e.container === io.target) e.visible = io.isIntersecting;
        });
      });
    },
    { rootMargin: '200px 0px' }
  );
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener('scroll', onScroll);
  observer?.disconnect();
  observer = null;
}

export const useParallax = (speed = 0.15) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    const entry: ParallaxEntry = {
      container: containerRef.current,
      img: imgRef.current,
      speed,
      visible: true,
    };

    entries.add(entry);
    startListening();
    observer?.observe(entry.container);

    // Initial position
    requestAnimationFrame(updateAll);

    return () => {
      entries.delete(entry);
      observer?.unobserve(entry.container);
      if (entries.size === 0) stopListening();
    };
  }, [speed]);

  return { containerRef, imgRef };
};
