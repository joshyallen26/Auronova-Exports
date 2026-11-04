import { motion } from "framer-motion";
import { Mountain, CloudRain, Sun, Trees, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function KeralaHeritage() {
  const terroirPoints = [
    {
      region: "Wayanad Highlands (Kerala)",
      altitude: "850m - 1,150m MSL",
      crop: "Malabar Black Pepper",
      description: "Steep rainforest slopes and volcanic laterite loam yield bold, dense berries packed with natural piperine and complex piney aroma.",
    },
    {
      region: "Idukki & Cardamom Hills (Kerala)",
      altitude: "900m - 1,400m MSL",
      crop: "Green Cardamom",
      description: "Misty highland ridges, perpetual cool canopy, and rich humus foster extra-bold, bright emerald pods with intense natural aroma.",
    },
    {
      region: "Erode (Tamil Nadu) & Alleppey (Kerala)",
      altitude: "Agricultural & Alluvial plains",
      crop: "Erode & Alleppey Turmeric",
      description: "Rich agricultural belts across southern India renowned for vibrant golden-yellow rhizomes, high curcumin content, and dependable commercial volumes.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#24251F] text-[#FAF7F0] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D6A441] blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Editorial Eyebrow & Title */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0]/10 text-[#D6A441] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Compass size={12} className="text-[#D6A441]" />
            Indian Regional Origins & Kerala Provenance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight mb-4">
            From India&apos;s Rich Agricultural Belts to Kerala&apos;s Western Ghats
          </h2>
          <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
          <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal">
            India has enriched global cuisines for thousands of years through diverse agro-climatic zones. Within this vast landscape, Kerala holds a historic preeminence as the primary spice coast, complemented by specialized regional origins such as Erode for turmeric and southern agricultural clusters for whole spices.
          </p>
        </div>

        {/* Plantation Photograph Showcase with Inset Terroir Data */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Main Plantation Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#FAF7F0]/15 shadow-2xl group">
              <img
                src="/images/plantation.jpg"
                alt="Lush misty Kerala spice plantation in the Western Ghats with pepper vines growing on towering rainforest trees"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24251F]/90 via-[#24251F]/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#24251F]/80 backdrop-blur-md border border-[#FAF7F0]/15">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D6A441] block mb-1">
                  Biodiverse Agro-Forestry System
                </span>
                <p className="text-sm text-[#FAF7F0]/90 leading-relaxed">
                  Our partner estates cultivate spices under multi-layered native forest canopies. Pepper vines climb natural silver oak shade trees, while cardamom thrives in the sheltered moist understory below.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Terroir Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-[#FAF7F0]/5 border border-[#FAF7F0]/10 hover:border-[#D6A441]/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#D6A441]/20 flex items-center justify-center text-[#D6A441]">
                  <Mountain size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-[#FAF7F0]">High Altitude Microclimates</h4>
                  <span className="text-xs text-[#FAF7F0]/60">800m to 1,500m elevation</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed">
                Cool tropical mountain air slows berry maturation, resulting in heavier grain density, firmer berries, and concentrated aromatic oils.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0]/5 border border-[#FAF7F0]/10 hover:border-[#D6A441]/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#526747]/30 flex items-center justify-center text-[#D6A441]">
                  <CloudRain size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-[#FAF7F0]">Dual Monsoon Nourishment</h4>
                  <span className="text-xs text-[#FAF7F0]/60">Edavappathi & Thulavarsham rains</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed">
                Over 3,000mm of annual rainfall across two distinct monsoon seasons charges the fertile soil without waterlogging the roots.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0]/5 border border-[#FAF7F0]/10 hover:border-[#D6A441]/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#4A2C20]/40 flex items-center justify-center text-[#D6A441]">
                  <Trees size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-[#FAF7F0]">Organic-Rich Forest Soils</h4>
                  <span className="text-xs text-[#FAF7F0]/60">Humus & naturally drained loam</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed">
                Centuries of decomposed rainforest leaf litter create loose, well-aerated soils naturally abundant in organic nutrients.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Regional Estates Card Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[#FAF7F0]/15">
          {terroirPoints.map((point) => (
            <div
              key={point.region}
              className="p-6 rounded-xl bg-[#2D2E28] border border-[#FAF7F0]/10 hover:border-[#D6A441]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#D6A441] font-semibold mb-2">
                  <span>{point.altitude}</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF7F0]/10 text-[#FAF7F0]">Terroir</span>
                </div>
                <h3 className="font-bold text-xl text-[#FAF7F0] mb-1">{point.region}</h3>
                <span className="text-xs font-medium text-[#526747] text-[#FAF7F0]/80 block mb-3">
                  Signature Specialty: {point.crop}
                </span>
                <p className="text-xs text-[#FAF7F0]/70 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
