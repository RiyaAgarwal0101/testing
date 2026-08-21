// frontend/src/hooks/useTheme.ts

'use client';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

export type Theme =
  | 'light'
  | 'dark'
  | 'system';

const THEME_KEY =
  'task-manager-theme';

function getSystemTheme(): 'light' | 'dark' {
  if (
    typeof window === 'undefined'
  ) {
    return 'light';
  }

  return window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') {
    return;
  }

  const resolvedTheme =
    theme === 'system'
      ? getSystemTheme()
      : theme;

  const root =
    document.documentElement;

  root.classList.remove(
    'light',
    'dark',
  );

  root.classList.add(
    resolvedTheme,
  );

  root.style.colorScheme =
    resolvedTheme;
}

export function useTheme() {
  const [theme, setThemeState] =
    useState<Theme>('system');

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        THEME_KEY,
      ) as Theme | null;

    const initialTheme =
      savedTheme === 'light' ||
      savedTheme === 'dark' ||
      savedTheme === 'system'
        ? savedTheme
        : 'system';

    setThemeState(initialTheme);

    applyTheme(initialTheme);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    applyTheme(theme);

    localStorage.setItem(
      THEME_KEY,
      theme,
    );
  }, [theme, mounted]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
    },
    [],
  );

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      if (current === 'light') {
        return 'dark';
      }

      if (current === 'dark') {
        return 'light';
      }

      return getSystemTheme() === 'dark'
        ? 'light'
        : 'dark';
    });
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
    resolvedTheme:
      theme === 'system'
        ? getSystemTheme()
        : theme,
  };
}

export default useTheme;