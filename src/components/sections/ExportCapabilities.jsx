import { motion } from "framer-motion";
import { Ship, Plane, Package, FileCheck, Globe, CheckCircle2 } from "lucide-react";

export default function ExportCapabilities() {
  const capabilities = [
    {
      icon: Ship,
      title: "Direct Cochin Ocean Freight",
      description: "Direct sailings from Cochin Seaport (ICTT Vallarpadam) offering competitive transit times to Europe, Americas, Middle East, and Asia.",
      specs: ["20ft & 40ft FCL Shipments", "LCL Palletized Consolidation", "Reefer Containers for Cardamom"],
    },
    {
      icon: Plane,
      title: "Air Cargo & Sample Courier",
      description: "Rapid dispatch via Cochin International Airport (CIAL) for urgent consignments, high-grade green cardamom, and pre-shipment sample approvals.",
      specs: ["48-Hour Sample Dispatch", "IATA Cargo Compliant", "Door-to-Door Courier with DHL/FedEx"],
    },
    {
      icon: Package,
      title: "Export Packing & Preservation",
      description: "Engineered packaging solutions guarding against tropical humidity, salt air corrosion, and oxidation throughout maritime transit.",
      specs: ["Nitrogen Flush Vacuum Bricks", "Multi-Wall Kraft Poly Sacks", "Custom Private Label Cartons"],
    },
    {
      icon: FileCheck,
      title: "End-to-End Trade Compliance",
      description: "Complete export paperwork processed by experienced maritime customs brokers, guaranteeing hassle-free destination clearance.",
      specs: ["Phytosanitary & COA Included", "Certificate of Origin (COO)", "Fumigation & Non-GMO Declarations"],
    },
  ];

  const tradeTerms = [
    { term: "FOB", title: "Free On Board", desc: "Cochin Seaport (INCOK)" },
    { term: "CIF", title: "Cost, Insurance & Freight", desc: "Delivered to any destination port" },
    { term: "CFR", title: "Cost and Freight", desc: "Port-to-port ocean freight included" },
    { term: "DDP", title: "Delivered Duty Paid", desc: "Available for select corporate contracts" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
            Global Logistics Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24251F] leading-tight mb-4">
            International Export Capabilities
          </h2>
          <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
          <p className="text-base sm:text-lg text-[#24251F]/75 leading-relaxed">
            From single pallet orders to multi-container contracts, our strategic presence at Cochin Port guarantees seamless ocean and air logistics with complete trade documentation.
          </p>
        </div>

        {/* 4 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="p-6 rounded-xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#4A2C20] mb-5">
                    <Icon size={22} className="text-[#526747]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#24251F] mb-2">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-[#24251F]/70 leading-relaxed mb-5">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E0D2]/70 space-y-2">
                  {cap.specs.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-[#24251F]/80">
                      <CheckCircle2 size={13} className="text-[#D6A441] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Incoterms & Trade Terms Banner */}
        <div className="bg-[#24251F] text-[#FAF7F0] rounded-2xl p-8 lg:p-10 border border-[#4A2C20] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] block mb-2">
                Commercial Flexibility
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
                Standard International Incoterms
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed">
                We accommodate established buyers with flexible terms and transparent freight calculations. Letter of Credit (L/C) and standard T/T payment terms supported.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tradeTerms.map((t) => (
                <div
                  key={t.term}
                  className="p-4 rounded-xl bg-[#FAF7F0]/5 border border-white/10 text-center"
                >
                  <span className="font-bold text-2xl text-[#D6A441] block mb-1">
                    {t.term}
                  </span>
                  <span className="text-xs font-semibold text-[#FAF7F0] block leading-snug">
                    {t.title}
                  </span>
                  <span className="text-[10px] text-[#FAF7F0]/60 mt-1 block">
                    {t.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
