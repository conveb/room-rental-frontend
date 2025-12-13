import React from "react";
import Logo from '../Assets/pngs/logo.png';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center flex flex-col items-center justify-center space-y-3">
        <img src={Logo} alt="logo" className="w-26 "/>
       <h1 className="text-3xl font-semibold text-white">Alive Paris</h1>
    <p className="mt-2 text-gray-300">Student rooms across France</p>

        {/* Loader */}
        <div className="mt-6 flex justify-center">
          <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
          <span className="mx-1 h-2 w-2 animate-bounce rounded-full bg-white delay-150"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-white delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
