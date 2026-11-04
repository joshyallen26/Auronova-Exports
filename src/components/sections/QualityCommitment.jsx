import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Microscope, FlaskConical, Layers, Award } from "lucide-react";
import Link from "next/link";

export default function QualityCommitment() {
  const qualityPillars = [
    {
      step: "01",
      title: "Direct Regional Sourcing",
      description:
        "We source directly from farmer clusters and cooperatives across Kerala's spice belts and verified agricultural centers like Erode for turmeric, ensuring authentic provenance.",
      icon: ShieldCheck,
    },
    {
      step: "02",
      title: "Mechanical Cleaning & Destoning",
      description:
        "Modern grading, destoning, and air-aspiration remove dust and foreign matter, preserving the natural color, aroma, and seed integrity of whole spices.",
      icon: Layers,
    },
    {
      step: "03",
      title: "Analytical Quality Verification",
      description:
        "Consignments are inspected for moisture percentage, physical density, natural piperine or curcumin levels, and freedom from artificial colorants.",
      icon: FlaskConical,
    },
    {
      step: "04",
      title: "Protective Export Packaging",
      description:
        "Heavy-duty multi-wall kraft paper sacks, double-lined HDPE bags, or vacuum barrier pouches safeguard spice freshness against tropical humidity during sea transit.",
      icon: Microscope,
    },
  ];

  const standards = [
    { name: "Government Registered Exporter", org: "Cochin Port, Kerala" },
    { name: "Commercial Lab Testing", org: "Analytical Parameter Verification" },
    { name: "Phytosanitary Certification", org: "Plant Quarantine Authorities" },
    { name: "Certificate of Origin", org: "Official Chamber & Trade Authorities" },
    { name: "Non-Irradiated Processing", org: "Hygienic Clean Handling" },
    { name: "Direct Port Logistics", org: "Cochin Seaport (ICTT Vallarpadam)" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Sourcing & Quality Care
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24251F] leading-tight">
              Careful Handling: From Indian Farms to Overseas Ports
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#24251F]/75 leading-relaxed">
              We focus on product integrity, honest origin labeling, and dependable bulk delivery. Each export consignment is accompanied by standard commercial export documentation.
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
                  Quality Checked Prior to Dispatch
                </div>
                <p className="text-xs text-[#FAF7F0]/80 leading-relaxed">
                  Batches are sampled and verified for moisture levels, bulk density, visual cleanliness, and freedom from extraneous materials per commercial contracts.
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
