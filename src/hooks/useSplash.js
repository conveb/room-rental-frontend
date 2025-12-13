import { useEffect, useState } from "react";

const SPLASH_KEY = "splashShown";

export const useSplash = (duration = 1800) => {
  const [showSplash, setShowSplash] = useState(true); // start true

  useEffect(() => {
    const hasShown = sessionStorage.getItem(SPLASH_KEY);

    if (!hasShown) {
      sessionStorage.setItem(SPLASH_KEY, "true");
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Splash already shown this session → hide immediately
      setShowSplash(false);
    }
  }, [duration]);

  return showSplash;
};
