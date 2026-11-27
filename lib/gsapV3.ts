import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// The v3 site needs only these two plugins. lib/gsap.ts (used by the old,
// now-unrouted pages) also registers ScrollSmoother and DrawSVG, which would
// otherwise ship in the bundle for nothing.
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
