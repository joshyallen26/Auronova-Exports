import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Microscope, FlaskConical, Layers, Award } from "lucide-react";
import Link from "next/link";

export default function QualityCommitment() {
  const qualityPillars = [
    {
      step: "01",
      title: "Farm-to-Port Traceability",
      description:
        "Every incoming batch is logged with estate coordinates, harvest dates, and farmer ID. Importers receive full traceability documentation for every container.",
      icon: ShieldCheck,
    },
    {
      step: "02",
      title: "Steam Sterilization & Destoning",
      description:
        "Non-irradiated, high-temperature short-time (HTST) steam sterilization eliminates microbial load while preserving fragile essential oils and natural aromatics.",
      icon: Layers,
    },
    {
      step: "03",
      title: "Chromatographic Lab Verification",
      description:
        "Every production lot is analyzed by HPLC and GC-MS for active phytochemicals (curcumin, piperine, eugenol) and screened for zero synthetic adulterants or pesticides.",
      icon: FlaskConical,
    },
    {
      step: "04",
      title: "Nitrogen Barrier Packaging",
      description:
        "Multi-layer vacuum pouches, nitrogen-flushed foil bags, and heavy-gauge kraft master cartons ensure zero moisture ingress or oxidation across ocean transits.",
      icon: Microscope,
    },
  ];

  const standards = [
    { name: "ASTA Cleanliness Specs", org: "American Spice Trade Association" },
    { name: "ESA Quality Minima", org: "European Spice Association" },
    { name: "ISO 22000:2018", org: "Food Safety Management" },
    { name: "HACCP Certified", org: "Critical Control Point Standard" },
    { name: "Spices Board India", org: "Ministry of Commerce Registered" },
    { name: "US-FDA Registered", org: "Import Facility Compliance" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Sourcing & Quality Commitment
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24251F] leading-tight">
              Export-Grade Precision: From Plant to Port
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#24251F]/75 leading-relaxed">
              We operate according to stringent international food safety standards. Each consignment is backed by a comprehensive Certificate of Analysis (COA) issued prior to customs dispatch.
            </p>
          </div>
        </div>

        {/* Lab Photograph & Interactive Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Quality Assurance Steps */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {qualityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="p-5 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/50 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#526747] flex-shrink-0 font-bold text-sm">
                    {pillar.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[#24251F] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#24251F]/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Laboratory Inspection Photograph Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8E0D2] shadow-xl group">
              <img
                src="/images/quality-lab.jpg"
                alt="Spice quality assurance technician inspecting cardamom and black pepper under laboratory lighting"
                className="w-full h-[440px] sm:h-[480px] object-cover object-center transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24251F]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#24251F]/90 backdrop-blur-md border border-white/10 text-[#FAF7F0]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D6A441] mb-1">
                  <CheckCircle2 size={14} className="text-[#D6A441]" />
                  Lab Tested Prior to Dispatch
                </div>
                <p className="text-xs text-[#FAF7F0]/80 leading-relaxed">
                  Testing includes volatile oil assay, moisture titration, bulk density, micro-biological screening (Salmonella, E. coli), and heavy metal traces.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Compliance Badges Grid */}
        <div className="pt-10 border-t border-[#E8E0D2]">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C7F73] mb-6 text-center">
            Recognized International Standards & Compliance Frameworks
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {standards.map((std) => (
              <div
                key={std.name}
                className="p-4 rounded-xl bg-white border border-[#E8E0D2] text-center flex flex-col justify-center hover:border-[#D6A441] transition-colors"
              >
                <div className="w-7 h-7 mx-auto mb-2 rounded-full bg-[#526747]/10 flex items-center justify-center text-[#526747]">
                  <Award size={14} />
                </div>
                <span className="font-semibold text-xs text-[#24251F] block">{std.name}</span>
                <span className="text-[10px] text-[#24251F]/60 mt-0.5 block leading-tight">{std.org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
