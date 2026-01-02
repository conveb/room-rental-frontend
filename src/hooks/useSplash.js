import { useEffect, useState } from "react";

const SPLASH_KEY = "splashShown";

export const useSplash = (duration = 1800) => {
  const [showSplash, setShowSplash] = useState(true); 

  useEffect(() => {
    const hasShown = sessionStorage.getItem(SPLASH_KEY);

    if (!hasShown) {
      sessionStorage.setItem(SPLASH_KEY, "true");
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [duration]);

  return showSplash;
};
