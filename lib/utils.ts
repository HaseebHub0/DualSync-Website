/**
 * Lightweight `cn` (className) helper.
 *
 * The project runs Tailwind via the Play CDN, so we can't pull in the full
 * `clsx` + `tailwind-merge` stack that shadcn normally uses. This mirrors the
 * ergonomics of shadcn's `cn()` — accepts strings, arrays, and conditional
 * objects — which is all we need for authoring the UI primitives.
 */
type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue) => {
    if (!value) return;
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (typeof value === 'object') {
      for (const key in value) {
        if (value[key]) out.push(key);
      }
    }
  };

  inputs.forEach(walk);
  return out.join(' ');
}
