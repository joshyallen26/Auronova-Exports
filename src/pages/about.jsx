import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Globe, Award, CheckCircle2, Compass, Layers, Check } from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    {
      title: "Unyielding Purity",
      description:
        "Every batch is verified 100% natural and unadulterated, free from synthetic dyes, foreign matter, or artificial enhancers.",
      icon: Shield,
    },
    {
      title: "Sustainable Cultivation",
      description:
        "We source through biodiversity-friendly agroforestry systems that protect soil fertility and Western Ghats rainforest ecosystems.",
      icon: Leaf,
    },
    {
      title: "International Compliance",
      description:
        "Strict adherence to international food safety standards, including ASTA cleanliness, European Spice Association limits, and US-FDA requirements.",
      icon: Award,
    },
    {
      title: "Commercial Reliability",
      description:
        "Guaranteed contract fulfillment, transparent Incoterm pricing (FOB Cochin / CIF Worldwide), and real-time shipping documentation.",
      icon: Globe,
    },
  ];

  const buyerBenefits = [
    {
      title: "Direct Port Logistics from Cochin",
      desc: "Strategically situated near Cochin International Seaport (ICTT) and Cochin Airport (CIAL) for swift ocean and air freight consolidation.",
    },
    {
      title: "Single-Origin Traceability",
      desc: "Crops are catalogued back to their harvest clusters in Wayanad, Idukki, and the Malabar coast, ensuring authentic terroir provenance.",
    },
    {
      title: "Custom Export Processing & Packaging",
      desc: "Tailored grinding, destoning, steam sterilization, and nitrogen-barrier packaging suited to your industrial manufacturing specifications.",
    },
    {
      title: "Comprehensive Laboratory Certification",
      desc: "Shipments include rigorous analytical testing for volatile oils, moisture content, piperine, curcumin, and microbiology.",
    },
  ];

  return (
    <>
      {/* Editorial Hero Section with Western Ghats Plantation Background */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-28 lg:pt-28 lg:pb-36 border-b border-[#33322B]">
        {/* Cinematic Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-about-hero.jpg"
            alt="Misty Western Ghats Kerala spice plantation hills at dawn"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          {/* Multi-layer Dark Editorial Vignettes for 100% Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181914]/95 via-[#181914]/85 to-[#181914]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-[#24251F]/30 to-[#181914]/50" />
        </div>

        {/* Subtle Ambient Golden Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] rounded-full bg-[#D6A441] blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-6">
              <Compass size={13} className="text-[#D6A441]" />
              About Auronova Exports
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-[#FAF7F0] mb-6">
              Rooted in Kerala.{" "}
              <span className="italic text-[#D6A441] block mt-1">
                Connecting the World Through Spices.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal mb-8 max-w-2xl">
              Based in Cochin, Kerala, Auronova Exports is an established international merchant exporter
              specializing in bulk commercial supply of premium, single-origin Malabar black pepper,
              green cardamom, turmeric, cinnamon, and whole spices for global food manufacturers,
              importers, and distributors.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#24251F] bg-[#D6A441] hover:bg-[#E4B85C] shadow-md transition-colors"
              >
                Explore Our Spices
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#FAF7F0] border border-white/30 hover:bg-white/10 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story & Heritage */}
      <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
                Heritage & Provenance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-6">
                Born From the Cradle of the Global Spice Trade
              </h2>
              <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />

              <div className="space-y-4 text-base text-[#34332E]/80 leading-relaxed font-normal">
                <p>
                  For over two millennia, the southwest coast of India—the legendary Malabar Spice Coast—has been the epicenter of global maritime spice routes. It was the allure of Malabar black pepper, high-altitude green cardamom, and Cochin ginger that brought Phoenicians, Roman galleons, and Venetian merchants to our ports.
                </p>
                <p>
                  Auronova Exports honors this ancient heritage through a modern, transparent export framework. Based near Cochin Port, we connect international food processors, botanical extractors, and wholesale distributors directly to verified regional estates in Wayanad, Idukki, and Central Travancore.
                </p>
                <p className="p-4 rounded-xl bg-white border border-[#E8E0D2] text-xs sm:text-sm text-[#4A2C20] italic">
                  <strong>Company Note:</strong> [Editable placeholder for founding timeline, leadership profile, and certified grower collective milestones — tailored to company records].
                </p>
              </div>
            </div>

            {/* High-Resolution Plantation Photography Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#E8E0D2] shadow-xl group">
                <img
                  src="/images/plantation.jpg"
                  alt="Highland spice plantation in the Western Ghats of Kerala with pepper vines climbing rainforest trees"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24251F]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#24251F]/85 backdrop-blur-md border border-white/15 text-[#FAF7F0]">
                  <span className="text-xs uppercase tracking-wider text-[#D6A441] font-semibold block mb-1">
                    Western Ghats Terroir (UNESCO World Heritage Zone)
                  </span>
                  <p className="text-xs text-[#FAF7F0]/80">
                    High elevation (800m - 1,500m), rich forest humus, and dual monsoons naturally concentrate essential aromatic oils.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Approach & Quality Commitment */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Ethical Sourcing & Processing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-4">
              Our Farm-to-Vessel Quality Framework
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base sm:text-lg text-[#34332E]/75 leading-relaxed">
              We eliminate complex distributor layers, ensuring fair farmer compensation, full harvest traceability, and strict adherence to international phytosanitary parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <div className="w-12 h-12 rounded-xl bg-[#526747]/10 flex items-center justify-center text-[#526747] mb-6">
                <Leaf size={24} />
              </div>
              <h3 className="font-semibold text-xl text-[#24251F] mb-3">1. Direct Estate Sourcing</h3>
              <p className="text-sm text-[#34332E]/70 leading-relaxed mb-4">
                Partnering directly with smallholder farming clusters and family estates across Kerala&apos;s highland spice zones to secure pure single-origin crops.
              </p>
              <span className="text-xs font-semibold text-[#4A2C20] block">
                ✓ [Editable: Partner cooperative details & regional producer network]
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <div className="w-12 h-12 rounded-xl bg-[#D6A441]/10 flex items-center justify-center text-[#4A2C20] mb-6">
                <Layers size={24} />
              </div>
              <h3 className="font-semibold text-xl text-[#24251F] mb-3">2. Processing & Sterilization</h3>
              <p className="text-sm text-[#34332E]/70 leading-relaxed mb-4">
                Mechanical destoning, density grading, and short-time steam sterilization eliminate pathogens while retaining natural aroma and color.
              </p>
              <span className="text-xs font-semibold text-[#4A2C20] block">
                ✓ Non-irradiated, clean steam processing
              </span>
            </div>

            <div className="p-8 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <div className="w-12 h-12 rounded-xl bg-[#4A2C20]/10 flex items-center justify-center text-[#526747] mb-6">
                <Shield size={24} />
              </div>
              <h3 className="font-semibold text-xl text-[#24251F] mb-3">3. Laboratory Analysis</h3>
              <p className="text-sm text-[#34332E]/70 leading-relaxed mb-4">
                Pre-shipment verification for moisture, volatile oil levels, active phytochemicals (piperine/curcumin), and screening for zero pesticide residues.
              </p>
              <span className="text-xs font-semibold text-[#4A2C20] block">
                ✓ Certified COA furnished with every export container
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Core Values */}
      <section className="py-20 lg:py-28 bg-[#24251F] text-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Mission & Vision Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#2D2E28] border border-white/10">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] block mb-3">
                Our Purpose
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#FAF7F0] mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed">
                To serve as a reliable, transparent bridge between Kerala&apos;s generational spice growers and the global food industry—delivering authentic purity, certified quality, and seamless international shipping logistics.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-[#2D2E28] border border-white/10">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#526747] text-[#D6A441] block mb-3">
                Our Ambition
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#FAF7F0] mb-4">Our Vision</h3>
              <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed">
                To establish Kerala spices as the undisputed global gold standard for botanical integrity, sustainable agro-forestry, and ethical international commerce.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-8 text-center">
              Core Operating Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#D6A441]/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FAF7F0]/10 flex items-center justify-center text-[#D6A441] mb-4">
                      <Icon size={20} />
                    </div>
                    <h4 className="font-semibold text-base text-[#FAF7F0] mb-2">{val.title}</h4>
                    <p className="text-xs sm:text-sm text-[#FAF7F0]/70 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Global Buyers Choose Auronova Exports */}
      <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Commercial Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-4">
              Why International Buyers Choose Us
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#34332E]/75 leading-relaxed">
              We combine deep agronomic roots in Kerala with an international export desk fluent in maritime logistics, customs clearance, and global quality compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {buyerBenefits.map((item) => (
              <div
                key={item.title}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#526747]/10 flex items-center justify-center text-[#526747] flex-shrink-0 mt-1">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#24251F] mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#34332E]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Block */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#4A2C20] text-[#FAF7F0] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] block mb-2">
                Start a Commercial Conversation
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold leading-tight">
                Request Product Specifications & Sample Consignments
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/80 mt-2 max-w-xl">
                Our export team provides detailed specification sheets, laboratory COA documentation, and fast air courier sample packs to qualified commercial buyers worldwide.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/products"
                className="px-6 py-3.5 rounded-lg text-xs font-semibold text-[#24251F] bg-[#D6A441] hover:bg-[#E4B85C] transition-colors"
              >
                View Catalogue
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-lg text-xs font-semibold text-[#FAF7F0] border border-white/30 hover:bg-white/10 transition-colors"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "About Us — Rooted in Kerala. Connecting the World Through Spices | Auronova Exports",
      description:
        "Learn about Auronova Exports, based in Cochin, Kerala. Our heritage, ethical direct-sourcing model, quality commitment, and mission to supply international buyers with authentic Kerala spices.",
      canonical: "/about",
    },
  };
}
