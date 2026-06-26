"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  resolved: Theme; // actual applied theme (system + manual override resolved)
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  resolved: "light",
  toggle: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = "attention-token-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [systemDark, setSystemDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read stored preference + system preference on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    setMounted(true);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Apply .dark class to <html>
  const resolved = theme === "dark" || (theme !== "light" && systemDark)
    ? "dark"
    : "light";

  useEffect(() => {
    if (resolved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [resolved]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
  }, []);

  const toggle = useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, resolved, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
