import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register once, on the client only.
let registered = false;
export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin);
  registered = true;
}

registerGsap();

// Premium, "expo-out" style easing used across the site for a cohesive feel.
export const EASE = 'expo.out';
export const EASE_SMOOTH = 'power3.out';

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin };
