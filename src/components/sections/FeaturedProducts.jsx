import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Filter } from "lucide-react";
import SpiceCard from "@/components/ui/SpiceCard";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { spices } from "@/data/spices";

export default function FeaturedProducts({ onEnquireGlobal }) {
  const [enquirySpice, setEnquirySpice] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Kerala Spices" },
    { id: "peppercorn", label: "Black Pepper" },
    { id: "cardamom", label: "Green Cardamom" },
    { id: "turmeric", label: "Turmeric" },
    { id: "cinnamon-cloves", label: "Cinnamon & Cloves" },
  ];

  const filteredSpices = spices.filter((spice) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "peppercorn") return spice.slug === "black-pepper";
    if (activeCategory === "cardamom") return spice.slug === "cardamom";
    if (activeCategory === "turmeric") return spice.slug === "turmeric";
    if (activeCategory === "cinnamon-cloves") return spice.slug === "cinnamon" || spice.slug === "cloves";
    return true;
  });

  const handleEnquire = (spice) => {
    if (onEnquireGlobal) {
      onEnquireGlobal(spice);
    } else {
      setEnquirySpice(spice);
    }
  };

  return (
    <section id="featured-spices" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#526747]/10 text-[#526747] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles size={12} className="text-[#D6A441]" />
            Direct From The Source
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24251F] leading-tight mb-4">
            Our Export Portfolio
          </h2>
          <div className="w-16 h-[2px] bg-[#D6A441] mx-auto mb-5" />
          <p className="text-base sm:text-lg text-[#24251F]/75 leading-relaxed">
            Hand-harvested, cleaned, and graded to the strictest international food safety standards.
            Supplied in bulk and customized export containers to world ports.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat.id
                  ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                  : "bg-white text-[#24251F]/70 hover:text-[#24251F] border border-[#E8E0D2] hover:border-[#4A2C20]/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Spices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpices.map((spice, i) => (
            <SpiceCard
              key={spice.id}
              spice={spice}
              index={i}
              onEnquire={handleEnquire}
            />
          ))}
        </div>

        {/* Bottom Callout & Catalogue CTA */}
        <div className="mt-14 pt-8 border-t border-[#E8E0D2] flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border">
          <div>
            <h4 className="font-bold text-lg text-[#24251F]">
              Need custom grades, essential oil specifications, or private labeling?
            </h4>
            <p className="text-xs sm:text-sm text-[#24251F]/70 mt-1">
              We process custom bulk orders according to ASTA, ESA, and client-specific microbial specs.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-[#24251F] bg-[#FAF7F0] hover:bg-[#E8E0D2] border border-[#E8E0D2] transition-colors"
            >
              Full Specifications
              <ArrowRight size={14} className="text-[#526747]" />
            </Link>

            <Link
              href="#rfq-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors"
            >
              Enquire Bulk Order
            </Link>
          </div>
        </div>
      </div>

      {/* Spice Specific Enquiry Modal */}
      <EnquiryModal
        spice={enquirySpice}
        isOpen={!!enquirySpice}
        onClose={() => setEnquirySpice(null)}
      />
    </section>
  );
}
