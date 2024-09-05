import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useColorScheme() {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined
  );

  const [isDark, setIsDark] = useState(() => {
    const savedPreference = localStorage.getItem("color-scheme");
    return savedPreference !== null ? JSON.parse(savedPreference) : undefined;
  });

  const value = useMemo(
    () => (isDark === undefined ? !!systemPrefersDark : isDark),
    [isDark, systemPrefersDark]
  );

  useEffect(() => {
    if (value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("color-scheme", JSON.stringify(value));
  }, [value]);

  return {
    isDark: value,
    setIsDark,
  };
}
