export default function MonthlyRentals() {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-0 py-10">
     <section className="mb-20">
              <div className="relative grid md:grid-cols-7 gap-5 items-start">
                <div className=" md:col-span-2 flex flex-col justify-end h-full">
                  <h2 className="absolute top-0 md:top-20 left-0 z-10 max-w-6xl special-font text-4xl md:text-6xl font-extrabold leading-tight">Monthly Rentals<br />Available Across<br />France</h2>

                  <div className="mt-32 md:mt-0">
                    <p className=" mt-6 text-sm text-gray-600 max-w-md">Monthly rentals are available across France, offering flexible stays, furnished options, and convenient locations for anyone needing a comfortable home for a month or more.</p>

                    <button className="mt-6 px-4 py-2 bg-black text-white rounded">View all cities</button>

                    <div className="mt-6 text-2xl text-gray-400">2025</div>
                  </div>
                </div>

                <div className="md:col-span-3 ">
                  {/* Large central image card */}
                  <div className="relative md:w-[470px] h-96 md:h-[700px] bg-gray-200 overflow-hidden rounded">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80')" }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-black/30 to-black/80" />


                    <div className="absolute bottom-5 left-0 right-0 flex justify-between items-center text-white px-5 w-full ">
                      <div className="text-4xl md:text-5xl font-bold  special-font  text-center">
                        <p >
                          Bordeaux
                        </p>
                      </div>

                      <button className="w-20 h-20 md:h-[100px] md:w-[100px] rounded-full border border-white/60 text-white text-5xl md:text-6xl flex items-center justify-center  pb-4 md:pb-2">→</button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 ">
                  {/* Right small grid 3x2 */}
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="relative h-[160px] rounded overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60')` }} />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute inset-0 flex items-center justify-center  px-3 py-1 rounded text-sm">
                          <p className='bg-black/50 px-4 py-2 text-white rounded-md special-font'>
                          
                            {i % 2 === 0 ? 'Paris' : 'Bordeaux'}
                            </p>
                        </div>

                        <div className="absolute right-3 bottom-3 bg-white rounded-full pb-2 md:pb-1 px-2  text-2xl">→</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
    </div>
  );
}
