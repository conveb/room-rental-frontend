import React, { useState, useEffect } from "react";
import Logo from '../Assets/pngs/logo.png';
import Bonjour from "./Bonjour";

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(false); // Start false, check storage first

  useEffect(() => {
    // Check if splash screen has already been shown in this browser session
    const hasShownSplash = sessionStorage.getItem('splashShown');
    
    if (!hasShownSplash) {
      // First time loading the site in this tab - show splash
      setIsVisible(true);
      
      // Set timer for 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false); // Start fade out
        
        // Wait for fade animation to finish before calling onFinish
        setTimeout(() => {
          // Mark that splash has been shown
          sessionStorage.setItem('splashShown', 'true');
          if (onFinish) onFinish();
        }, 500); 
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Already shown in this session - skip splash
      if (onFinish) onFinish();
    }
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full h-full relative text-center flex flex-col items-center justify-center space-y-3">
        <div className="absolute bottom-5 text-center flex flex-col items-center gap-3">
          <img src={Logo} alt="logo" className="w-12"/>
          <h1 className="text-sm md:text-xl font-light text-white">Alive Paris</h1>
        </div>
        
        {/* Your Bonjour handwriting component */}
        <Bonjour />
      </div>
    </div>
  );
};

export default SplashScreen;