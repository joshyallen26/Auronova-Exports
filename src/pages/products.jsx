import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight, Search, Filter, ShieldCheck, FileText, Package, CheckCircle2, Clock } from "lucide-react";
import { spices as defaultSpices } from "@/data/spices";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function ProductsPage() {
  const router = useRouter();
  const { products: dynamicProducts } = useWebsiteData();
  const spices = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : defaultSpices;

  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categories = [
    { id: "all", label: `All Spices (${spices.length})` },
    { id: "peppercorns", label: "Peppercorns" },
    { id: "pods-seeds", label: "Pods, Seeds & Chillies" },
    { id: "bark-flower", label: "Bark & Flower Buds" },
    { id: "roots", label: "Roots & Rhizomes" },
  ];

  const filteredSpices = spices.filter((s) => {
    let matchCat = true;
    if (activeCategory === "peppercorns") {
      matchCat = s.slug === "black-pepper" || s.slug === "white-pepper";
    } else if (activeCategory === "pods-seeds") {
      matchCat =
        s.slug === "cardamom" ||
        s.slug === "nutmeg" ||
        s.slug === "mace" ||
        s.slug === "star-anise" ||
        s.slug === "red-chilli";
    } else if (activeCategory === "bark-flower") {
      matchCat = s.slug === "cinnamon" || s.slug === "cloves";
    } else if (activeCategory === "roots") {
      matchCat = s.slug === "turmeric" || s.slug === "ginger";
    }

    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.botanicalName.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  const handleEnquire = (spiceName) => {
    router.push(`/contact?product=${encodeURIComponent(spiceName)}`);
  };

  return (
    <>
      {/* Editorial Page Header with Raw Kerala Spices Background */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#33322B]">
        {/* Cinematic Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-products-hero.jpg"
            alt="Authentic Kerala raw export spices on dark textured slate"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          {/* Dual Layer Gradient Overlays for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181914]/95 via-[#181914]/85 to-[#181914]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-[#24251F]/40 to-[#181914]/60" />
        </div>

        {/* Ambient Warm Golden Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            B2B Export Catalogue
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FAF7F0] mb-5">
            The Finest of Indian Spices.
          </h1>

          <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
            Commercial bulk supply for international food manufacturers, industrial processors,
            spice distributors, and wholesale importers. Rooted in Kerala and connected with premier
            Indian growing regions, exported directly from Cochin Port.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#FAF7F0]/70 pt-4 border-t border-white/10 max-w-2xl mx-auto">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#D6A441]" />
              FOB Cochin / CIF Worldwide
            </span>
            <span className="flex items-center gap-1.5">
              <Package size={14} className="text-[#D6A441]" />
              Bulk 10kg, 25kg & 50kg Export Packing
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#D6A441]" />
              Courier Sample Packs Available
            </span>
          </div>
        </div>
      </section>

      {/* Product Filter & Catalogue Section */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Controls: Search and Categories */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8E0D2]">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    activeCategory === cat.id
                      ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                      : "bg-white text-[#34332E] hover:bg-[#FAF7F0] border border-[#E8E0D2]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 flex-shrink-0">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#34332E]/50"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search spice or botanical..."
                className="w-full pl-9 pr-4 py-2 rounded-lg text-xs bg-white border border-[#E8E0D2] text-[#34332E] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-xs text-[#34332E]/60 mb-8">
            Showing <strong className="text-[#24251F] font-semibold">{filteredSpices.length}</strong> export spice products
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpices.map((spice) => (
              <div
                key={spice.id}
                id={spice.slug}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#E8E0D2] shadow-sm hover:shadow-xl hover:border-[#D6A441]/50 transition-all duration-300"
              >
                {/* 4:3 Aspect Ratio Product Photograph */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#24251F]">
                  <img
                    src={spice.image}
                    alt={`High-quality Kerala ${spice.name} export crop`}
                    className="w-full h-full object-cover object-center transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded bg-[#24251F]/80 backdrop-blur-sm text-[#FAF7F0] border border-white/10">
                      {spice.category}
                    </span>
                  </div>

                  {/* Bottom Origin Pill */}
                  <div className="absolute bottom-3 left-3 text-xs text-[#FAF7F0] font-medium">
                    {spice.origin}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-1">
                      <h3 className="text-2xl font-bold text-[#24251F] group-hover:text-[#4A2C20] transition-colors">
                        {spice.name}
                      </h3>
                      <p className="text-xs italic text-[#526747] mt-0.5">
                        {spice.botanicalName}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#34332E]/80 leading-relaxed mt-3 mb-4 font-normal">
                      {spice.description}
                    </p>

                    {/* Characteristics & Applications */}
                    <div className="space-y-2 pt-3 border-t border-[#E8E0D2]/70 text-xs">
                      <div>
                        <span className="font-semibold text-[#4A2C20] block mb-0.5">
                          Profile & Characteristics:
                        </span>
                        <span className="text-[#34332E]/70 leading-normal block">
                          {spice.characteristics}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#526747] block mb-0.5">
                          Common Commercial Uses:
                        </span>
                        <span className="text-[#34332E]/70 leading-normal block">
                          {spice.applications}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enquiry Action Button */}
                  <div className="pt-5 mt-5 border-t border-[#E8E0D2]">
                    <button
                      onClick={() => handleEnquire(spice.name)}
                      className="w-full py-3 px-4 rounded-lg text-xs font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-all flex items-center justify-center gap-2 group-hover:bg-[#351E16]"
                    >
                      <span>Enquire About This Product</span>
                      <ArrowRight size={14} className="text-[#D6A441]" />
                    </button>
                    <span className="text-[10px] text-[#34332E]/50 text-center block mt-1.5">
                      Standard Packaging: {spice.packaging}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSpices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-[#E8E0D2]">
              <p className="text-base font-semibold text-[#24251F] mb-1">No spices matched your search</p>
              <p className="text-xs text-[#34332E]/60 mb-4">Try clearing filters or search terms.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#4A2C20] text-[#FAF7F0]"
              >
                Reset Catalogue View
              </button>
            </div>
          )}
        </div>
      </section>

      {/* The B2B Product Enquiry & Export Process Section */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#24251F] leading-tight mb-4">
              Our B2B Spice Enquiry & Supply Process
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#34332E]/75 leading-relaxed">
              We streamline international spice procurement for overseas buyers through transparent commercial quotes, verified export documentation, and dependable shipping schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <span className="text-xs font-bold text-[#D6A441] block mb-2">Step 01</span>
              <h3 className="font-semibold text-base text-[#24251F] mb-2">Submit Enquiry / RFQ</h3>
              <p className="text-xs sm:text-sm text-[#34332E]/70 leading-relaxed">
                Specify your desired spice varieties, estimated tonnage (FCL/LCL), destination port, and packaging preferences.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <span className="text-xs font-bold text-[#D6A441] block mb-2">Step 02</span>
              <h3 className="font-semibold text-base text-[#24251F] mb-2">Commercial Quotation</h3>
              <p className="text-xs sm:text-sm text-[#34332E]/70 leading-relaxed">
                Our export desk issues an official proforma invoice with transparent FOB Cochin or CIF destination pricing within 24 hours.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <span className="text-xs font-bold text-[#D6A441] block mb-2">Step 03</span>
              <h3 className="font-semibold text-base text-[#24251F] mb-2">Sample Verification</h3>
              <p className="text-xs sm:text-sm text-[#34332E]/70 leading-relaxed">
                Pre-shipment production samples dispatched via air courier (DHL/FedEx) accompanied by product specification data.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <span className="text-xs font-bold text-[#D6A441] block mb-2">Step 04</span>
              <h3 className="font-semibold text-base text-[#24251F] mb-2">Customs & Shipping</h3>
              <p className="text-xs sm:text-sm text-[#34332E]/70 leading-relaxed">
                Phytosanitary inspection, clean fumigation, container stuffing at Cochin Port, and swift maritime bill of lading dispatch.
              </p>
            </div>
          </div>

          {/* Final Request a Quote Banner */}
          <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#4A2C20] text-[#FAF7F0] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] block mb-2">
                Have a Commercial Requirement?
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal leading-tight">
                Request a Bulk Export Quote
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/80 mt-1 max-w-xl">
                We accommodate single-commodity containers, mixed-spice consolidations, and recurring commercial contracts.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-lg text-xs font-semibold text-[#24251F] bg-[#D6A441] hover:bg-[#E4B85C] shadow-md transition-colors flex-shrink-0"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Products — Discover the Finest Spices of Kerala | Auronova Exports",
      description:
        "Explore our complete B2B export catalogue of 10 authentic Kerala spices: Black Pepper, White Pepper, Green Cardamom, Cinnamon, Cloves, Turmeric, Ginger, Nutmeg, Mace, and Star Anise.",
      canonical: "/products",
    },
  };
}
