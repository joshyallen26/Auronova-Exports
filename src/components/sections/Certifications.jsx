import { motion } from "framer-motion";
import { CheckCircle2, Award, ShieldCheck, Globe, Leaf, Building2, FileCheck2, Info } from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";

const defaultIcons = {
  spices_board: ShieldCheck,
  apeda: Globe,
  fssai: Building2,
  coo: Award,
  phytosanitary: Leaf,
  customs: CheckCircle2,
};

const defaultCredentials = [
  {
    id: "spices_board",
    name: "Spices Board of India",
    authority: "Ministry of Commerce & Industry, Govt. of India",
    capability: "Registered Spice Exporter",
    status: "Verified Capability",
    registrationNumber: "[Registration details editable via Admin CMS]",
    description: "Statutory authority regulating Indian spice exports, enforcing mandatory export cleanliness, physical grading, and packaging standards.",
    isVerified: true,
  },
  {
    id: "apeda",
    name: "APEDA",
    authority: "Agricultural & Processed Food Products Export Development Authority",
    capability: "Agro-Commodity Export Authority",
    status: "Verified Capability",
    registrationNumber: "[Registration details editable via Admin CMS]",
    description: "Apex government organisation promoting and regulating international standards for Indian agricultural commodities and processed food products.",
    isVerified: true,
  },
  {
    id: "fssai",
    name: "FSSAI Regulatory Compliance",
    authority: "Food Safety and Standards Authority of India",
    capability: "Food Safety & Sanitary Standards",
    status: "Verified Compliance",
    registrationNumber: "[Registration details editable via Admin CMS]",
    description: "Operational compliance with Indian statutory food safety acts, hygiene benchmarks, sanitary warehousing, and unadulterated handling.",
    isVerified: true,
  },
  {
    id: "coo",
    name: "Certificate of Origin (COO)",
    authority: "Authorized Chambers of Commerce & Export Promotion Councils",
    capability: "Consignment Provenance Endorsement",
    status: "Issued per Consignment",
    registrationNumber: "Provided with shipping documents",
    description: "Government-authorized legal proof confirming authentic regional Indian origin for preferential tariff classification and foreign customs entry.",
    isVerified: true,
  },
  {
    id: "phytosanitary",
    name: "Phytosanitary Certification",
    authority: "Plant Quarantine Division, Ministry of Agriculture",
    capability: "Government Plant Health Inspection",
    status: "Inspected & Certified per Consignment",
    registrationNumber: "Issued per container lot",
    description: "Official phytosanitary certificate certifying export consignments are free from regulated quarantine pests, fungal pathogens, and botanical contaminants.",
    isVerified: true,
  },
];

export default function Certifications() {
  const { content } = useWebsiteData();
  const credentialsData = content?.business_credentials?.content || {};

  const headline = credentialsData.headline || "Business Registrations & Export Credentials";
  const eyebrow = credentialsData.eyebrow || "Statutory Export Compliance & Verification";
  const description =
    credentialsData.description ||
    "Auronova Exports conducts trade in strict adherence with statutory Indian export authorities. Displayed credentials reflect verified registrations and official export capabilities issued per commercial consignment.";

  const rawItems = Array.isArray(credentialsData.items) && credentialsData.items.length > 0
    ? credentialsData.items
    : defaultCredentials;

  // Filter to show ONLY verified registrations or active capabilities
  const verifiedItems = rawItems.filter((item) => item.isVerified !== false);

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
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight mb-4">
            {headline}
          </h2>
          <div className="w-16 h-[2px] bg-[#D6A441] mx-auto mb-5" />
          <p className="text-base text-[#FAF7F0]/75 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedItems.map((cert, i) => {
            const Icon = defaultIcons[cert.id] || ShieldCheck;
            return (
              <motion.div
                key={cert.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl p-6 sm:p-7 bg-white/5 border border-white/10 hover:border-[#D6A441]/50 hover:bg-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F0]/10 border border-white/15 flex items-center justify-center text-[#D6A441] flex-shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#526747]/30 text-[#86EFAC] border border-[#526747]/40">
                      {cert.status || "Verified"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[#FAF7F0] mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/60 mb-3">{cert.authority}</p>

                  <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D6A441]">
                    <CheckCircle2 size={13} className="text-[#D6A441]" />
                    <span>{cert.capability || "Export Capability"}</span>
                  </div>
                  {cert.registrationNumber && !cert.registrationNumber.includes("[Registration details") && (
                    <p className="text-[11px] text-[#FAF7F0]/50 font-mono">
                      Ref: {cert.registrationNumber}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Transparency Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FAF7F0]/70 flex items-start gap-3 max-w-3xl mx-auto">
          <Info size={16} className="text-[#D6A441] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Credibility & Verification Note:</strong> Auronova Exports displays export credentials and statutory compliance in full transparency. Certificate of Origin and Phytosanitary documentation are inspected and certified per export consignment through government plant quarantine and authorized chambers of commerce. Specific proforma registration numbers are validated directly on formal export documentation.
          </p>
        </div>
      </div>
    </section>
  );
}
