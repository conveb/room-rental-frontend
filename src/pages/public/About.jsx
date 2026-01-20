import React from 'react';
import AbtImg from '../../Assets/Images/heroImg.jpg'
const AboutPage = () => {
    return (
        <div className='my-0'>
            <div className='grid grid-cols-2 md:grid-cols-12 h-auto md:h-dvh'>
                <div className='order-2 md:order-1 col-span-4 bg-white p-4 md:p-8'>
                    <div className='flex flex-col justify-between text-center h-full'>
                        <div>
                            <p className='text-4xl mt-16 md:mt-28 px-20'>Perfect Place For You</p>
                        </div>
                        <div>
                            <p className='py-5 md:py-10 px-8  text-sm border-t border-b'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A consectetur porro maxime corporis cupiditate rem saepe cumque alias illo inventore quas quidem ullam libero ratione veniam, accusantium possimus fugit corrupti!</p>
                            <p className='py-5 md:py-10 px-8  text-sm md:text-2xl border-b'>Est. 2026</p>
                        </div>
                    </div>
                </div>


                <div className='relative order-1 md:order-2 col-span-8 overflow-hidden group'>
                    {/* The Image - Added w-full and transition for a "cool" hover effect */}
                    <img
                        src='https://images.pexels.com/photos/30252650/pexels-photo-30252650.jpeg'
                        alt="Alive Paris"
                        className='w-full h-[600px] md:h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />

                    {/* Gradient Overlay - Essential for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

                    {/* Content Container */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-start p-8 md:p-16 max-w-3xl">
                        {/* Scaled Title - 9xl on desktop, smaller on mobile */}
                        <h1 className="text-white text-5xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter drop-shadow-2xl special-font">
                            Alive <br className="hidden md:block" /> Paris
                        </h1>

                        {/* Subtext - Better width control for readability */}
                        <p className="text-gray-100 text-base md:text-xl leading-relaxed font-medium opacity-90 drop-shadow-md max-w-lg">
                            Experience the heart of France. From cozy studios to vibrant shared spaces,
                            we connect you with the perfect place to call home.
                        </p>

                        {/* Accent Line - Indigo with a glow effect */}
                        <div className="mt-8 w-24 h-2 bg-white rounded-full "></div>
                    </div>
                </div>
            </div>

            <div className="mt-8 py-6 md:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-0 md:gap-8">

                        {/* Rooms Counter */}
                        <div className="flex flex-col items-center group">
                            <div className="special-font text-[2.5rem] md:text-7xl font-black text-slate-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                                500<span className="text-indigo-500">+</span>
                            </div>
                            <div className="w-10 h-1 bg-indigo-500 mb-0 md:mb-4 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <p className=" text-center text-stone-500 uppercase tracking-[0.2em] text-xs md:text-sm font-bold">
                                Verified Rooms
                            </p>
                        </div>

                        {/* Clients Counter */}
                        <div className="flex flex-col items-center group">
                            <div className="special-font text-[2.5rem] md:text-7xl font-black text-slate-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                                12<span className="text-indigo-500">k</span>
                            </div>
                            <div className="w-10 h-1 bg-indigo-500 mb-0 md:mb-4 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <p className=" text-center text-stone-500 uppercase tracking-[0.2em] text-xs md:text-sm font-bold">
                                Happy Students
                            </p>
                        </div>

                        {/* Years Counter */}
                        <div className="flex flex-col items-center group">
                            <div className="special-font text-[2.5rem] md:text-7xl font-black text-slate-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                                08<span className="text-indigo-500">+</span>
                            </div>
                            <div className="w-10 h-1 bg-indigo-500 mb-0 md:mb-4 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <p className=" text-center text-stone-500 uppercase tracking-[0.2em] text-xs md:text-sm font-bold">
                                Years of Expertise
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <section className="bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-5 items-stretch w-full">

                        {/* LEFT SIDE: col-span-2 */}
                        <div className="md:col-span-3 flex flex-col justify-between py-10 relative">
                            <div className="relative z-20">
                                {/* Overlapping Heading */}
                                <h2 className="special-font text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter text-slate-900 uppercase md:w-[500px] pointer-events-none">
                                    Move In.<br />
                                    Settle Fast.<br />
                                    <span className="text-indigo-600">Focus.</span>
                                </h2>

                                <div className="mt-12 md:mt-24 space-y-6 max-w-[280px]">
                                    <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed uppercase tracking-widest">
                                        The ultimate student housing experience. Fully furnished rooms,
                                        high-speed Wi-Fi, and a community of peers—all verified
                                        and ready for your arrival in France.
                                    </p>

                                    <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-900 pb-2 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                                        <a href="/accommodation">Find Your Dorm</a>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>


                        </div>

                        {/* RIGHT SIDE: col-span-10 */}
                        <div className="md:col-span-9 relative z-10">
                            <div className="relative w-full h-[500px] md:h-[850px] overflow-hidden rounded-sm group">
                                {/* Main Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80')",
                                    }}
                                />

                                {/* Refined Overlay for better overlap contrast */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700" />

                                {/* Student-Centric Caption */}
                                <div className="absolute bottom-12 right-12 text-white text-right hidden md:block drop-shadow-md">
                                    <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2 opacity-80">Premium Housing</p>
                                    <p className="text-3xl font-serif italic">Designed for Success</p>
                                    <div className="mt-4 flex justify-end gap-4">
                                        <span className="px-3 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-tighter tracking-widest">All Utilities Included</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="bg-white overflow-hidden border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-stretch w-full">

                        {/* LEFT SIDE: col-span-10 (The Image) */}
                        <div className="md:col-span-10 order-2 md:order-1 relative z-10">
                            <div className="relative w-full h-[500px] md:h-[850px] overflow-hidden rounded-sm group">
                                {/* Professional Interior Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80')",
                                    }}
                                />

                                {/* Reverse Gradient for Right-Side Overlap Clarity */}
                                <div className="absolute inset-0 bg-gradient-to-l from-white/50 via-transparent to-transparent" />

                                {/* Owner-Centric Caption (Left-aligned on image) */}
                                <div className="absolute bottom-12 left-12 text-white text-left hidden md:block drop-shadow-md">
                                    <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2 opacity-80">Portfolio Growth</p>
                                    <p className="text-3xl font-serif italic">Secure Your Revenue</p>
                                    <div className="mt-4 flex gap-2">
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest">Verified Tenants Only</span>
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest">Automated Payments</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: col-span-2 (The Text) */}
                        <div className="md:col-span-2 order-1 md:order-2 flex flex-col justify-between py-10 relative md:pl-10">
                            <div className="relative z-20 flex flex-col items-end text-right">
                                {/* Overlapping Heading - Overlaps to the LEFT over the image */}
                                <h2 className="special-font text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter text-slate-900 uppercase md:w-[600px]  pointer-events-none">
                                    List Your Room.<br />
                                    Earn More.<br />
                                    <span className="text-indigo-600">Grow.</span>
                                </h2>

                                <div className="mt-12 md:mt-24 space-y-6 max-w-[280px]">
                                    <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed uppercase tracking-widest">
                                        Transform your property into a high-yield investment. We connect
                                        professional owners with verified international students,
                                        ensuring 100% occupancy and secure monthly returns.
                                    </p>

                                    <button className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-b-2 border-slate-900 pb-2 hover:text-indigo-600 hover:border-indigo-600 transition-all ml-auto">
                                        <a href="/auth/owner/register">Become a Host</a>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </section>


            <section className="bg-slate-950 py-16 md:py-28 relative overflow-hidden">
               

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                       

                        {/* CENTER/RIGHT: The Content */}
                        <div className="md:col-span-10">
                            <div className="max-w-4xl">
                                <h2 className="special-font text-white text-5xl md:text-8xl font-black tracking-tighter  mb-12 uppercase">
                                    Redefining <br />
                                    The Art of <br />
                                    <span className="text-indigo-400">Living.</span>
                                </h2>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <p className="text-gray-400 text-sm md:text-xl font-light leading-relaxed italic border-l border-indigo-500/30 pl-8">
                                        "We believe that a room is more than a transaction. It is the silent partner in your greatest achievements and the backdrop to your most cherished memories."
                                    </p>

                                    <div className="space-y-6">
                                        <p className="text-gray-300 text-xs md:text-md leading-relaxed tracking-wide uppercase">
                                            Our mission is to eliminate the borders of the French rental market.
                                            By combining radical transparency with a passion for Parisian architecture,
                                            we ensure that every student finds their sanctuary and every owner
                                            finds their legacy.
                                        </p>

                                        <div className="pt-6 flex items-center gap-6">
                                            <div className="h-[1px] w-12 bg-indigo-500" />
                                            <span className="text-white font-bold tracking-[0.3em] uppercase text-[10px]">
                                                Experience the pulse of France
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


        </div>
    );
};

export default AboutPage;