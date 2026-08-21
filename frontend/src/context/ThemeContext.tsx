'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

type Accent =
  | 'amber'
  | 'blue'
  | 'pink'
  | 'rose'
  | 'emerald'
  | 'black';

interface ThemeContextValue {
  theme: Theme;
  accent: Accent;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
}

const ThemeContext =
  createContext<ThemeContextValue | null>(
    null,
  );

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>('light');

  const [accent, setAccentState] =
    useState<Accent>('blue');

  useEffect(() => {
    const storedTheme =
      localStorage.getItem(
        'theme',
      ) as Theme | null;

    const storedAccent =
      localStorage.getItem(
        'accent',
      ) as Accent | null;

    if (storedTheme) {
      setThemeState(storedTheme);
    }

    if (storedAccent) {
      setAccentState(storedAccent);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      'theme',
      theme,
    );
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.color =
      accent;

    localStorage.setItem(
      'accent',
      accent,
    );
  }, [accent]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accent,
        setTheme: setThemeState,
        setAccent: setAccentState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider',
    );
  }

  return context;
}