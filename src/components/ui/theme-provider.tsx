import { cx } from "class-variance-authority";
import {
  useContext,
  createContext,
  useEffect,
  useState,
  useRef,
  RefObject,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  createRoot?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeRootRef: RefObject<HTMLDivElement> | null;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  themeRootRef: null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "sy-ui-theme",
  createRoot,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const themeRoot = useRef<HTMLDivElement>(null);

  const setWithMediaQuery = (e: MediaQueryListEvent) => {
    setTheme(e.matches ? "dark" : "light");
  };

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const attachMediaListener = () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setWithMediaQuery);
  };

  const removeMediaListener = () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", setWithMediaQuery);
  };

  const content = () => {
    if (createRoot) {
      if (theme === "system") {
        attachMediaListener();
      } else {
        removeMediaListener();
      }

      return (
        <div
          ref={themeRoot}
          className={cx(
            "text-foreground",
            theme === "system" ? getSystemTheme() : theme
          )}
        >
          {children}
        </div>
      );
    }

    return children;
  };

  useEffect(() => {
    if (!createRoot) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      if (theme === "system") {
        root.classList.add(getSystemTheme());
        attachMediaListener();
        return;
      }

      removeMediaListener();

      root.classList.add(theme);
    }

    return () => {
      removeMediaListener();
    };
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    themeRootRef: themeRoot,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {content()}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const [themeRoot, setThemeRoot] = useState<HTMLDivElement | null>(null);

  const context = useContext(ThemeProviderContext);

  useEffect(() => {
    setThemeRoot(context?.themeRootRef?.current ?? null);
  }, [context?.themeRootRef?.current]);

  if (context === undefined) {
    throw new Error("useTheme only inside a ThemeProvider");
  }

  const { themeRootRef, ...rest } = context;

  return {
    ...rest,
    themeRoot,
  };
};
