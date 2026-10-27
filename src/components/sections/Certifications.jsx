import { motion } from "framer-motion";
import { CheckCircle2, Award, ShieldCheck, Globe, Leaf, Building2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const certs = [
  {
    id: "fssai",
    Icon: Building2,
    name: "FSSAI Certified",
    body: "Food Safety & Standards Authority of India",
    description: "Compliant with Indian export regulations and sanitary benchmarks for global food trade.",
    color: "#D6A441",
  },
  {
    id: "haccp",
    Icon: ShieldCheck,
    name: "HACCP Compliant",
    body: "Hazard Analysis Critical Control Points",
    description: "Systematic preventive protocols eliminating biological, chemical, and physical hazards across processing.",
    color: "#526747",
  },
  {
    id: "iso",
    Icon: Globe,
    name: "ISO 22000:2018",
    body: "Food Safety Management System",
    description: "International standard for comprehensive food safety across sourcing, handling, and export packaging.",
    color: "#4A2C20",
  },
  {
    id: "organic",
    Icon: Leaf,
    name: "Certified Organic Lots",
    body: "NPOP & Global Organic Compliance",
    description: "Certified zero-chemical, non-pesticide organic lots available for discerning clean-label markets.",
    color: "#526747",
  },
  {
    id: "eu",
    Icon: Award,
    name: "EU & ASTA Standards",
    body: "Maximum Residue Limits & Cleanliness",
    description: "Rigorous testing assuring full compliance with European and American Spice Trade Association purity specs.",
    color: "#D6A441",
  },
  {
    id: "spiceboard",
    Icon: ShieldCheck,
    name: "Spices Board India",
    body: "Ministry of Commerce & Industry",
    description: "Officially registered merchant exporter under the Spices Board of India, Kochi headquarters.",
    color: "#526747",
  },
];

export default function Certifications() {
  return (
    <section className="py-20 lg:py-28 bg-[#24251F] text-[#FAF7F0] relative overflow-hidden border-b border-[#33322B]">
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4A2C20] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D6A441] mb-3 block">
            Quality Assurance & Standards
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F0] leading-tight mb-4">
            Recognized International Compliance
          </h2>
          <div className="w-16 h-[2px] bg-[#D6A441] mx-auto mb-5" />
          <p className="text-base text-[#FAF7F0]/75 leading-relaxed">
            Our trade operations and processing workflows adhere to verified international standards recognized across North America, Europe, Asia-Pacific, and the Middle East.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => {
            const Icon = cert.Icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-[#D6A441]/50 hover:bg-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F0]/10 border border-white/15 flex items-center justify-center text-[#D6A441] flex-shrink-0">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#FAF7F0] mb-0.5">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-[#FAF7F0]/60">{cert.body}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D6A441] pt-3 border-t border-white/10">
                  <CheckCircle2 size={13} className="text-[#D6A441]" />
                  <span>Compliant Export Framework</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
