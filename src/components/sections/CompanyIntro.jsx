import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Award, Anchor, MapPin } from "lucide-react";

export default function CompanyIntro() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Subheading & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Brand Identity & Historical Origin */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Company Introduction
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.2] text-[#24251F] mb-6">
              Centuries of Malabar Heritage. Modern Export Precision.
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#24251F]/80 leading-relaxed mb-6 font-normal">
              Headquartered at Kochi—the historic crossroads of the maritime spice trade—<strong>Auronova Exports</strong> bridges Kerala&apos;s fertile Western Ghats hill estates directly to leading international food processors, tea masters, extraction houses, and gourmet distributors worldwide.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#4A2C20] font-semibold bg-[#FAF7F0] p-3.5 rounded-lg border border-[#E8E0D2]">
              <MapPin size={16} className="text-[#D6A441] flex-shrink-0" />
              <span>Registered Office & Processing: Cochin Port Zone, Kerala, India</span>
            </div>
          </div>

          {/* Right: Narrative Detail & Operational Pillars */}
          <div className="lg:col-span-7">
            <p className="text-lg text-[#24251F] leading-relaxed mb-8 italic text-balance">
              &ldquo;Kerala spices have captivated world trade for over two millennia. Our mission is to honor that legacy by supplying uncompromised purity, rigorous lab verification, and absolute supply chain reliability to discerning global buyers.&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E8E0D2]">
              <div className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#526747]/10 flex items-center justify-center text-[#526747] mb-4">
                  <Leaf size={20} />
                </div>
                <h3 className="font-semibold text-lg text-[#24251F] mb-2">Direct Estate Sourcing</h3>
                <p className="text-sm text-[#24251F]/70 leading-relaxed">
                  We work closely with generational planters and certified cooperatives across Wayanad, Idukki, and the high-altitude Cardamom Hills.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#D6A441]/10 flex items-center justify-center text-[#4A2C20] mb-4">
                  <Shield size={20} />
                </div>
                <h3 className="font-semibold text-lg text-[#24251F] mb-2">Purity & Lab Standards</h3>
                <p className="text-sm text-[#24251F]/70 leading-relaxed">
                  Every batch is rigorously tested for volatile oil content, moisture, piperine/curcumin levels, and strict compliance with EU and ASTA MRLs.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#4A2C20]/10 flex items-center justify-center text-[#4A2C20] mb-4">
                  <Award size={20} />
                </div>
                <h3 className="font-semibold text-lg text-[#24251F] mb-2">Export Quality Grading</h3>
                <p className="text-sm text-[#24251F]/70 leading-relaxed">
                  Mechanical cleaning, destoning, density-grading, and steam sterilization guarantee uniform visual appeal and microbial safety.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#24251F]/10 flex items-center justify-center text-[#24251F] mb-4">
                  <Anchor size={20} />
                </div>
                <h3 className="font-semibold text-lg text-[#24251F] mb-2">Seamless Port Logistics</h3>
                <p className="text-sm text-[#24251F]/70 leading-relaxed">
                  Fast clearance and dispatch from Cochin International Seaport and Airport with comprehensive export documentation (COA, Phytosanitary, BL).
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A2C20] hover:text-[#526747] transition-colors"
              >
                Learn more about our heritage & facility
                <ArrowRight size={15} className="text-[#D6A441]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
