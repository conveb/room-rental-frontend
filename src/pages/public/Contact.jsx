import React from 'react';

const Contact = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* --- HERO SECTION: DARK THEME FOR WHITE NAVBAR --- */}
      <section className="relative bg-slate-950 pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-indigo-400 font-bold tracking-[0.5em] uppercase text-xs mb-6 block">
            Alive Paris Office
          </span>
          <h1 className="text-white text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            Get In <br />
            <span className="text-indigo-400 special-font">Touch.</span>
          </h1>
        </div>
      </section>

      {/* --- MAIN CONTACT CONTENT: 2/10 GRID STYLE --- */}
      <section className="py-20 md:py-32 max-w-6xl mx-auto">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            
            {/* LEFT SIDE: col-span-4 (Contact Details) */}
            <div className="md:col-span-4 flex flex-col justify-between space-y-12">
              <div>
                <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-8 border-b border-slate-900 pb-2 w-fit">
                  General Inquiries
                </h3>
                <div className="space-y-4">
                  <p className="text-2xl font-serif italic text-slate-800">bonjour@aliveparis.com</p>
                  <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">+33 (0) 1 23 45 67 89</p>
                </div>
              </div>

              <div>
                <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-8 border-b border-slate-900 pb-2 w-fit">
                  Our Atelier
                </h3>
                <p className="text-gray-600 leading-relaxed uppercase tracking-widest text-xs">
                  15 Rue de Rivoli<br />
                  75004 Paris, France
                </p>
              </div>

             
            </div>

            {/* RIGHT SIDE: col-span-8 (The Form) */}
            <div className="md:col-span-8 relative">
              {/* Overlapping Background Element */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full z-0" />
              
              <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-2 md:p-10">
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                  <input type="text" placeholder="JEAN DUPONT" className="border-b-2 border-slate-100 py-4 focus:border-indigo-500 outline-none transition-colors uppercase text-sm tracking-widest" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                  <input type="email" placeholder="JEAN@EXAMPLE.COM" className="border-b-2 border-slate-100 py-4 focus:border-indigo-500 outline-none transition-colors uppercase text-sm tracking-widest" />
                </div>

                <div className="md:col-span-2 flex flex-col space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Subject</label>
                  <select className="border-b-2 border-slate-100 py-4 focus:border-indigo-500 outline-none transition-colors uppercase text-sm tracking-widest bg-transparent">
                    <option>Student Inquiry</option>
                    <option>Room Owner Partnership</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex flex-col space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Message</label>
                  <textarea rows="4" placeholder="HOW CAN WE HELP YOU FEEL ALIVE?" className="border-b-2 border-slate-100 py-4 focus:border-indigo-500 outline-none transition-colors uppercase text-sm tracking-widest resize-none"></textarea>
                </div>

                <div className="md:col-span-2 pt-6">
                  <button className="w-full md:w-fit px-16 py-6 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* --- MAP / IMAGE SECTION --- */}
      <section className="h-[500px] w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80" 
          alt="Paris Street" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* --- FOOTER SOCIALS --- */}
      <footer className="py-20 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-slate-900 font-black text-2xl tracking-tighter uppercase">Alive Paris</div>
           <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              <a href="#" className="hover:text-indigo-600 transition-colors">Instagram</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
           </div>
           <div className="text-[10px] text-gray-300 uppercase tracking-widest">
              &copy; 2026 Alive Paris. All Rights Reserved.
           </div>
        </div>
      </footer>
    </main>
  );
};

export default Contact;