import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Globe, Award, CheckCircle2, Compass, Layers, Check, MapPin, Building2, Calendar, Target, Eye } from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function AboutPage() {
  const { content, integrations } = useWebsiteData();
  const aboutDetails = content?.about_details?.content || {};
  const missionVisionData = content?.about_mission_vision?.content || {};

  const registeredBusinessName = aboutDetails.registeredBusinessName || integrations?.companyName || "Auronova Exports Pvt. Ltd.";
  const establishmentYear = aboutDetails.establishmentYear || "Rooted in Malabar spice trade heritage";
  const establishmentYearPlaceholder = aboutDetails.establishmentYearPlaceholder || "[Editable: e.g. Established 2024 / 2026 — manage via CMS]";
  const portZoneAddress = aboutDetails.portZoneAddress || integrations?.officeAddress || "Spice Trade Centre, Cochin Port Zone, Kochi, Kerala 682 001, India";
  const phone = aboutDetails.phone || integrations?.phone || "+91 (484) 290-0000";
  const whatsapp = aboutDetails.whatsapp || integrations?.whatsappNumber || "+91 94000 00000";
  const email = aboutDetails.email || integrations?.email || "exports@auronovaexports.com";

  const missionText =
    missionVisionData.missionText ||
    "To connect India's spice-growing regions and agricultural producers with international buyers through a direct, transparent, and dependable sourcing approach. We aim to make authentic Indian spices and products more accessible to global markets while building meaningful business relationships between producers and buyers.";
  const visionText =
    missionVisionData.visionText ||
    "To build a trusted bridge between the source of Indian spices and products and the businesses that need them across the world. We envision a more direct and transparent sourcing network where international buyers can access authentic Indian products closer to their origins, with fewer unnecessary intermediaries and a clearer connection to the people and regions behind them.";

  const sourcingOrigins = Array.isArray(aboutDetails.sourcingOrigins) && aboutDetails.sourcingOrigins.length > 0
    ? aboutDetails.sourcingOrigins
    : [
        { crop: "Malabar Black Pepper & White Pepper", origin: "Wayanad & Idukki highland estates, Kerala" },
        { crop: "Alleppey Green Cardamom", origin: "Cardamom Hills rainforest canopy, Idukki, Kerala" },
        { crop: "Turmeric (High Curcumin)", origin: "Alleppey (Kerala) & Erode (Tamil Nadu) agricultural belts" },
        { crop: "Cloves, Nutmeg & Golden Mace", origin: "Central Travancore & Malabar coastal plantations" },
        { crop: "Red Chilli & Dried Ginger", origin: "South Indian spice clusters & Cochin ginger growing belts" },
      ];

  const exportMarkets = Array.isArray(aboutDetails.exportMarkets) && aboutDetails.exportMarkets.length > 0
    ? aboutDetails.exportMarkets
    : [
        {
          region: "Middle East & GCC",
          countries: "United Arab Emirates, Saudi Arabia, Oman, Qatar, Kuwait",
          focus: "High demand for Alleppey Green Extra Bold cardamom, whole cloves, black pepper, and golden turmeric.",
        },
        {
          region: "Europe & United Kingdom",
          countries: "Germany, United Kingdom, Netherlands, France, Italy",
          focus: "Demand for strict physical cleanliness, moisture control, low microbiological counts, and full origin traceability.",
        },
        {
          region: "North America",
          countries: "United States, Canada",
          focus: "Industrial food processors, extraction houses, private label repackagers, and spice distributors.",
        },
        {
          region: "Southeast Asia & Asia-Pacific",
          countries: "Singapore, Malaysia, Japan, Australia",
          focus: "Bulk peppercorns, whole nutmeg, mace quills, and specialized blending spices.",
        },
      ];

  const coreValues = [
    {
      title: "Direct Sourcing Transparency",
      description: "Open communication regarding origins, harvest seasons, processing methods, and fair commercial pricing.",
      icon: Shield,
    },
    {
      title: "Sustainable Cultivation",
      description: "We source through biodiversity-friendly agroforestry systems that protect soil fertility and Western Ghats rainforest ecosystems.",
      icon: Leaf,
    },
    {
      title: "Quality Alignment",
      description: "Commitment to export physical cleanliness, moisture thresholds, and buyer quality specifications.",
      icon: Award,
    },
    {
      title: "Commercial Reliability",
      description: "Transparent Incoterm pricing (FOB Cochin / CIF Worldwide), prompt response, and reliable shipping documentation.",
      icon: Globe,
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
          {/* Multi-layer Dark Editorial Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181914]/95 via-[#181914]/85 to-[#181914]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-[#24251F]/30 to-[#181914]/50" />
        </div>

        {/* Ambient Warm Golden Glow */}
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
              The Finest of Indian Spices.{" "}
              <span className="italic text-[#D6A441] block mt-1">
                Rooted in Kerala. Delivered to the World.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal mb-8 max-w-2xl">
              India is globally celebrated as the cradle of diverse, aromatic spices. At Auronova Exports, based in Cochin, Kerala, we connect verified spice growers and agricultural product sources directly with international importers, food manufacturers, and wholesalers—reducing unnecessary intermediaries and making sourcing more transparent and dependable.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#24251F] bg-[#D6A441] hover:bg-[#E4B85C] shadow-md transition-colors"
              >
                Explore Spice Catalogue
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#FAF7F0] border border-white/30 hover:bg-white/10 transition-colors"
              >
                Request Export Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Business Identity Bar */}
      <section className="bg-[#FAF7F0] border-b border-[#E8E0D2] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm text-[#24251F]">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E8E0D2]">
              <Building2 size={18} className="text-[#D6A441] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7F73] block">Registered Business</span>
                <span className="font-bold text-[#24251F]">{registeredBusinessName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E8E0D2]">
              <Calendar size={18} className="text-[#526747] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7F73] block">Heritage & Establishment</span>
                <span className="font-medium text-[#24251F]">{establishmentYear}</span>
                <span className="text-[10px] text-[#4A2C20]/70 block italic mt-0.5">{establishmentYearPlaceholder}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E8E0D2]">
              <MapPin size={18} className="text-[#4A2C20] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7F73] block">Port Zone Headquarters</span>
                <span className="font-medium text-[#24251F] leading-tight block">Kochi, Kerala, India</span>
                <span className="text-[10px] text-[#526747] font-semibold">Cochin Seaport (ICTT / INCOK)</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E8E0D2]">
              <Globe size={18} className="text-[#D6A441] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7F73] block">Export Scope</span>
                <span className="font-medium text-[#24251F] leading-tight block">FOB Cochin & CIF Worldwide</span>
                <span className="text-[10px] text-[#8C7F73]">Official Indian Registrations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story & Heritage (Indian Spices first, then Kerala) */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
                Heritage & Provenance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-6">
                The Heritage of Indian Spices, Anchored in Kerala
              </h2>
              <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />

              <div className="space-y-4 text-base text-[#34332E]/80 leading-relaxed font-normal">
                <p>
                  India has enriched world gastronomy and trade for thousands of years through its unparalleled diversity of spices and agro-climatic zones. Within this vast subcontinental heritage, the state of Kerala on India&apos;s southwest coast has stood as the historic epicenter of maritime trade—the fabled Malabar Spice Coast that drew Phoenicians, Romans, and Arabs in search of black pepper, cardamom, and ginger.
                </p>
                <p>
                  Auronova Exports honors this legacy through a contemporary, transparent export model. Based in Cochin, we connect international food processors, brand packagers, and wholesale distributors directly to verified regional estates in Wayanad, Idukki, and agricultural sourcing regions across India such as Erode for turmeric.
                </p>
                <p>
                  By eliminating redundant intermediary layers, we provide overseas buyers with traceable single-origin commodities, physical grading consistency, and direct container consolidation departing Cochin Port.
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
                    High elevation (800m - 1,500m), rich forest humus, and dual monsoons naturally concentrate rich aroma, color, and robust flavor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Network & Regional Belts */}
      <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Origin Traceability
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-4">
              Our Regional Sourcing Network
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#34332E]/75 leading-relaxed font-normal">
              We partner directly with smallholder farming clusters, family estates, and trusted producer cooperatives across Kerala and specialized Indian growing belts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sourcingOrigins.map((origin, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#526747]/10 flex items-center justify-center text-[#526747] flex-shrink-0 mt-0.5">
                  <Leaf size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#24251F] mb-1">{origin.crop}</h3>
                  <p className="text-xs text-[#526747] font-semibold mb-1 flex items-center gap-1">
                    <MapPin size={12} />
                    {origin.origin}
                  </p>
                  <span className="text-[11px] text-[#34332E]/65 block">
                    Direct origin sourcing with harvest lot traceability and cleanliness grading.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="py-20 lg:py-28 bg-[#24251F] text-[#FAF7F0] border-b border-[#33322B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#2D2E28] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] block mb-3 flex items-center gap-2">
                  <Target size={14} className="text-[#D6A441]" />
                  Our Purpose
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF7F0] mb-4">Our Mission</h3>
                <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed font-normal">
                  {missionText}
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-[#2D2E28] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] block mb-3 flex items-center gap-2">
                  <Eye size={14} className="text-[#D6A441]" />
                  Our Ambition
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF7F0] mb-4">Our Vision</h3>
                <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed font-normal">
                  {visionText}
                </p>
              </div>
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
                    <p className="text-xs sm:text-sm text-[#FAF7F0]/70 leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Key Export Markets Section */}
      <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Global Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-4">
              Key Commercial Export Markets
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#34332E]/75 leading-relaxed font-normal">
              Auronova Exports supplies verified commercial importers, culinary repackagers, and food manufacturers across key international destinations with tailored shipping and packaging specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {exportMarkets.map((market, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-xl text-[#24251F]">{market.region}</h3>
                  <span className="text-xs uppercase font-semibold text-[#526747] bg-[#526747]/10 px-3 py-1 rounded-full">
                    Target / Served Hubs
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#4A2C20] mb-2">
                  Destinations: {market.countries}
                </p>
                <p className="text-xs sm:text-sm text-[#34332E]/75 leading-relaxed font-normal">
                  {market.focus}
                </p>
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
                Our export team provides detailed specification sheets, export documentation, and air courier sample packs to qualified commercial buyers worldwide.
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
        "Learn about Auronova Exports, based in Cochin, Kerala. Our heritage, direct sourcing network, registered business identity, mission, and key export markets.",
      canonical: "/about",
    },
  };
}
