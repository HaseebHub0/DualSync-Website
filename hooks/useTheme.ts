import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const listeners = new Set<() => void>();

function readStored(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

/** Source of truth is the class already on <html> (set by the boot script). */
function current(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('light', theme === 'light');
  root.classList.toggle('dark', theme !== 'light');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage can be unavailable in private modes — the class still applies */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Follow the OS only while the user has not made an explicit choice.
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  const onSystem = () => {
    if (!readStored()) apply(systemTheme());
  };
  mq.addEventListener('change', onSystem);
  // Another tab may change the preference.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
      apply(e.newValue);
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(cb);
    mq.removeEventListener('change', onSystem);
    window.removeEventListener('storage', onStorage);
  };
}

/**
 * Shared theme state. Every consumer reads the same value — the class on
 * <html> — so the toggle can live anywhere without components disagreeing
 * about which theme is active. The initial class is set by a blocking
 * script in index.html, so there is no flash of the wrong theme.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, current, () => 'dark' as Theme);

  const setTheme = useCallback((next: Theme) => apply(next), []);
  const toggle = useCallback(() => apply(current() === 'dark' ? 'light' : 'dark'), []);

  return { theme, setTheme, toggle };
}
