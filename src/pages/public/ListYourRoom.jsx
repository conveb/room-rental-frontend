import React from 'react';

const ListYourRoom = () => {
  return (
    <main className="bg-white min-h-screen font-sans ">
      {/* --- HERO SECTION: THE INVITATION --- */}
      <section className="grid grid-cols-1 md:grid-cols-12 min-h-[90vh] border-b border-gray-100">
        {/* Left: Branding & Visual */}
        <div className="md:col-span-5 bg-slate-900 relative p-8 md:p-20 flex flex-col justify-between overflow-hidden h-auto md:h-screen">
          <div 
            className="absolute inset-0 opacity-30 bg-cover bg-center grayscale"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')" }}
          />
          <div className="relative z-10 mt-20">
            <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
              Host <br />
              With <br />
              <span className="text-indigo-500 font-serif italic lowercase tracking-normal">Alive.</span>
            </h1>
            <p className="mt-8 text-slate-400 text-lg font-light leading-relaxed max-w-sm">
              Your property is more than an asset; it is a home for the next generation of global talent.
            </p>
          </div>

          <div className="relative z-10">
            <div className="text-white/20 text-9xl font-black select-none tracking-tighter">01</div>
          </div>
        </div>

        {/* Right: The Account Gatekeeper */}
        <div className="md:col-span-7 flex flex-col justify-center p-8 md:p-24 relative">
          <div className="max-w-lg">
            <span className="text-indigo-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block italic">Requirement</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-8">
              Establish Your <br />Partnership.
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              To list a room on Alive Paris, you must first create a <strong>Room Owner Account</strong>. This ensures all financial transactions and legal contracts are handled securely.
            </p>

            <div className="space-y-4">
              <a 
                href="/auth/owner/signup" 
                className="group flex items-center justify-between w-full p-8 border-2 border-slate-900 hover:bg-slate-900 transition-all duration-500"
              >
                <span className="text-xl font-bold uppercase tracking-tight group-hover:text-white transition-colors">Create Owner Account</span>
                <svg className="w-6 h-6 group-hover:text-white transform group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mt-4">
                Already registered? <a href="/login" className="text-slate-900 font-black border-b border-slate-900">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 02: THE PROCESS --- */}
      <section className="py-24  max-w-6xl mx-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <span className="text-indigo-600 font-serif italic text-4xl">01.</span>
              <h3 className="text-xl font-black uppercase tracking-tight">Identity</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Register as an owner and verify your identity to protect our student community.</p>
            </div>
            <div className="space-y-4">
              <span className="text-indigo-600 font-serif italic text-4xl">02.</span>
              <h3 className="text-xl font-black uppercase tracking-tight">Curation</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Upload your room details, professional photos, and house rules to our dashboard.</p>
            </div>
            <div className="space-y-4">
              <span className="text-indigo-600 font-serif italic text-4xl">03.</span>
              <h3 className="text-xl font-black uppercase tracking-tight">Launch</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Your listing goes live to thousands of verified students arriving in France.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 03: TRUST MATTERS --- */}
      <section className="py-24 border-t border-gray-100  max-w-7xl mx-auto">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 items-center gap-20">
            <div className="md:col-span-8 relative">
                {/* Overlapping Text Effect */}
                <h2 className="special-font text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter text-slate-900 uppercase absolute -top-10 left-0 z-20 md:w-[800px] pointer-events-none">
                  Safety Is Our <br /> <span className="text-indigo-600">Standard.</span>
                </h2>
                <div className="h-[400px] md:h-[600px] w-full bg-gray-200 overflow-hidden rounded-sm relative z-10">
                   <img 
                     src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80" 
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                     alt="Real Estate Professional"
                   />
                </div>
            </div>
            <div className="md:col-span-4 space-y-8">
               <h4 className="text-2xl font-black uppercase tracking-tighter">Why we require an account.</h4>
               <ul className="space-y-6">
                 <li className="flex gap-4">
                    <span className="text-indigo-600 font-bold italic">/</span>
                    <p className="text-sm text-gray-600 font-medium tracking-wide">Secure holding of security deposits via French banking standards.</p>
                 </li>
                 <li className="flex gap-4">
                    <span className="text-indigo-600 font-bold italic">/</span>
                    <p className="text-sm text-gray-600 font-medium tracking-wide">Automated legal contract generation compliant with local laws.</p>
                 </li>
                 <li className="flex gap-4">
                    <span className="text-indigo-600 font-bold italic">/</span>
                    <p className="text-sm text-gray-600 font-medium tracking-wide">Direct encrypted messaging with prospective student tenants.</p>
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="bg-slate-900 py-20 text-center">
        <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">
          Ready to Host?
        </h2>
        <a 
          href="/auth/owner/signup" 
          className="inline-block px-12 py-5 bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-slate-900 transition-all duration-300"
        >
          Begin Registration
        </a>
      </footer>
    </main>
  );
};

export default ListYourRoom;