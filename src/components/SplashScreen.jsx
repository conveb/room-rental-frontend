import React, { useState, useEffect } from "react";
import Logo from '../Assets/pngs/logo.png';
import Bonjour from "./Bonjour";

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer for 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false); // Start fade out
      
      // Wait for fade animation to finish before calling onFinish
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 500); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className={` fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full h-full relative text-center flex flex-col items-center justify-center space-y-3">
        <div className="absolute bottom-5 text-center flex flex-col items-center gap-3">
        <img src={Logo} alt="logo" className="w-12"/>
        <h1 className="text-sm md:text-xl font-light text-white">Alive Paris</h1>
        {/* <div className="mt-6 flex justify-center">
          <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
          <span className="mx-1 h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:0.15s]"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:0.3s]"></span>
        </div> */}
        </div>
        
        {/* Your Bonjour handwriting component */}
        <Bonjour />

        {/* Loader */}
      </div>
    </div>
  );
};

export default SplashScreen;