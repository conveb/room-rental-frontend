export default function PerfectSpace() {
  return (
    < section className="pb-10 relative" >
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        <div className="md:col-span-2">
          <div className="relative h-96 md:h-[600px] rounded overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80')" }} />
            <div className="absolute inset-0 bg-black/35" />
            <h3 className="absolute top-5 right-5 md:right-10 md:top-10 special-font text-end text-4xl md:text-6xl font-extrabold text-white leading-tight">Perfect Space<br />for you</h3>

            {/* horizontal mini overlay items */}
            <div className="absolute left-0 right-0 bottom-5 md:bottom-20 flex justify-between items-center gap-4 bg-white/9 backdrop-blur-sm py-4 px-5 md:px-20">
              <div className=" w-52 md:text-center text-white">
                <div className="font-semibold text-xs md:text-lg">Lorem Ipsum</div>
                <div className="text-xs opacity-80">Lorem ipsum Lorem ipsum Lorem ipsum</div>
              </div>
              <div className=" w-52 md:text-center text-white">
                <div className="font-semibold text-xs md:text-lg">Lorem Ipsum</div>
                <div className="text-xs opacity-80">Lorem ipsum Lorem ipsum Lorem ipsum</div>
              </div>
              <div className=" w-52 md:text-center text-white">
                <div className="font-semibold text-xs md:text-lg">Lorem Ipsum</div>
                <div className="text-xs opacity-80">Lorem ipsum Lorem ipsum Lorem ipsum</div>
              </div>
            </div>
          </div>
        </div>
 
        <div className="md:col-span-1 flex flex-col justify-between pr-5 md:pr-32 text-end">
          <h2 className="special-font text-4xl md:text-5xl font-extrabold leading-tight">Monthly Rentals<br />Available Across<br />France</h2>
          <div className="flex flex-col justify-end text-end gap-5">
          <div className="text-sm text-gray-600 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, repellendus! Ducimus sit officia dolor cupiditate eveniet! Hic facere saepe sint? Mollitia, beatae illum. Voluptates, ex perferendis nemo et officiis illum!</div>
          <div className="text-gray-400">2025</div>
          </div>
        </div>
      </div>
    </section >
  );
}
