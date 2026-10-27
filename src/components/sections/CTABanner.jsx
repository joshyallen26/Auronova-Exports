import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Compass } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20 bg-[#FAF7F0] border-b border-[#E8E0D2]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden text-center px-8 py-16 bg-[#24251F] text-[#FAF7F0] border border-[#4A2C20] shadow-2xl"
        >
          {/* Subtle Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#4A2C20] blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#526747] blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-5 bg-[#FAF7F0]/10 text-[#D6A441] border border-white/10">
              <Compass size={13} className="text-[#D6A441]" />
              International Trade Partnerships
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FAF7F0] mb-4">
              Start Importing Authentic<br />
              <span className="italic text-[#D6A441]">Kerala Spices Today</span>
            </h2>

            <p className="text-base text-[#FAF7F0]/80 leading-relaxed mb-8">
              Competitive proforma pricing (FOB Cochin / CIF Worldwide), verified Certificate of Analysis documentation, and courier sample packs provided within 24 business hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-xs font-semibold text-[#24251F] bg-[#D6A441] hover:bg-[#E4B85C] shadow-md transition-colors"
              >
                <span>Request a Commercial Quote</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href="mailto:exports@auronovaexports.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-xs font-semibold text-[#FAF7F0] border border-white/20 hover:bg-white/10 transition-colors"
              >
                <Mail size={15} className="text-[#D6A441]" />
                <span>Email Our Trade Desk</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
