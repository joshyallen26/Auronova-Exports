import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle2, FileText } from "lucide-react";

export default function SpiceCard({ spice, index = 0, onEnquire }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#E8E0D2] shadow-sm hover:shadow-xl hover:border-[#D6A441]/50 transition-all duration-300"
    >
      {/* High-Resolution Spice Photography Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#24251F]">
        <img
          src={spice.image}
          alt={`Authentic Kerala ${spice.name} - ${spice.grade}`}
          className="w-full h-full object-cover object-center transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded bg-[#24251F]/80 backdrop-blur-sm text-[#FAF7F0] border border-white/10">
            {spice.category}
          </span>
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded bg-[#D6A441] text-[#24251F] shadow-sm">
            {spice.grade}
          </span>
        </div>

        {/* Bottom Image Inset: Origin & Botanical */}
        <div className="absolute bottom-3 left-3 right-3 text-[#FAF7F0]">
          <div className="flex items-center gap-1.5 text-xs text-[#FAF7F0]/90 font-medium">
            <MapPin size={12} className="text-[#D6A441]" />
            {spice.origin}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <h3 className="font-bold text-xl text-[#24251F] group-hover:text-[#4A2C20] transition-colors">
              {spice.name}
            </h3>
          </div>
          <p className="text-xs italic text-[#526747] mb-3">
            {spice.botanicalName}
          </p>

          <p className="text-sm text-[#24251F]/75 leading-relaxed mb-4 line-clamp-3">
            {spice.description}
          </p>

          {/* Key Export Specs */}
          {spice.specs && (
            <div className="mb-5 pt-3 border-t border-[#E8E0D2]/70 grid grid-cols-2 gap-2 text-xs">
              {Object.entries(spice.specs).slice(0, 2).map(([key, value]) => (
                <div key={key} className="bg-[#FAF7F0] p-2 rounded border border-[#E8E0D2]/50">
                  <span className="text-[10px] uppercase font-semibold text-[#8C7F73] block">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="font-medium text-[#24251F]">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="pt-4 border-t border-[#E8E0D2] flex items-center gap-2">
          {onEnquire && (
            <button
              onClick={() => onEnquire(spice)}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors text-center"
            >
              Request Quote
            </button>
          )}

          <Link
            href={`/products#${spice.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium text-[#24251F] bg-[#FAF7F0] hover:bg-[#E8E0D2] border border-[#E8E0D2] transition-colors"
            title="View specifications & packing options"
          >
            <span>Specs</span>
            <ArrowRight size={13} className="text-[#526747]" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
