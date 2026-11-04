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
              Rooted in India. Connecting the World Through Spices.
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#24251F]/80 leading-relaxed mb-6 font-normal">
              India has long been the world&apos;s most diverse home of spices and agricultural crops. Based in Cochin, Kerala, <strong>Auronova Exports</strong> focuses on connecting international buyers directly with authentic Indian spice-growing regions—with Kerala&apos;s legendary spice heritage as our primary identity, sourcing center, and operational hub.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#4A2C20] font-semibold bg-[#FAF7F0] p-3.5 rounded-lg border border-[#E8E0D2]">
              <MapPin size={16} className="text-[#D6A441] flex-shrink-0" />
              <span>Export Desk & Operations: Cochin Port Zone, Kerala, India</span>
            </div>
          </div>

          {/* Right: Narrative Detail & Operational Pillars */}
          <div className="lg:col-span-7">
            <p className="text-lg text-[#24251F] leading-relaxed mb-8 italic text-balance">
              &ldquo;Our vision is to build a transparent, dependable sourcing bridge between India&apos;s generational spice producers and overseas food enterprises—minimizing unnecessary intermediaries and honoring Kerala&apos;s historic position in global spice trade.&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E8E0D2]">
              <div className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#526747]/10 flex items-center justify-center text-[#526747] mb-4">
                  <Leaf size={20} />
                </div>
                <h3 className="font-semibold text-lg text-[#24251F] mb-2">Direct Regional Sourcing</h3>
                <p className="text-sm text-[#24251F]/70 leading-relaxed">
                  Partnering directly with grower clusters across Kerala&apos;s highland belts (Wayanad, Idukki) and key Indian agricultural regions such as Erode for turmeric.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#D6A441]/10 flex items-center justify-center text-[#4A2C20] mb-4">
                  <Shield size={20} />
                </div>
                <h3 className="font-semibold text-lg text-[#24251F] mb-2">Transparent Quality Verification</h3>
                <p className="text-sm text-[#24251F]/70 leading-relaxed">
                  Every consignment undergoes rigorous physical examination, moisture checking, and laboratory analysis aligned with commercial buyer contracts.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#4A2C20]/10 flex items-center justify-center text-[#4A2C20] mb-4">
                  <Award size={20} />
                </div>
                <h3 className="font-semibold text-lg text-[#24251F] mb-2">Careful Post-Harvest Handling</h3>
                <p className="text-sm text-[#24251F]/70 leading-relaxed">
                  Thorough cleaning, destoning, size-grading, and hygienic packing preserve natural aroma, color, and bulk physical integrity.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#24251F]/10 flex items-center justify-center text-[#24251F] mb-4">
                  <Anchor size={20} />
                </div>
                <h3 className="font-semibold text-lg text-[#24251F] mb-2">Kerala Port Connectivity</h3>
                <p className="text-sm text-[#24251F]/70 leading-relaxed">
                  Coordinated shipping via Cochin Seaport (ICTT Vallarpadam) and regional air routes, supported by standard export trade documentation.
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
