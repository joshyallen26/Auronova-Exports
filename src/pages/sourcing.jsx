import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  Leaf,
  Shield,
  CheckCircle2,
  Package,
  Layers,
  MapPin,
  Clock,
  Sparkles,
  Info,
  Warehouse,
  FileCheck,
} from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";

const defaultSteps = [
  {
    number: "01",
    title: "Grower & Farm Selection",
    subtitle: "Estate Partnerships & Varietal Authenticity",
    description:
      "We partner directly with verified farming cooperatives, smallholder clusters, and family-run estates across Kerala's highland belts (Wayanad, Idukki) and specialized Indian agricultural zones like Erode. This direct connection ensures varietal authenticity, harvest traceability, and fair producer compensation.",
    points: [
      "Direct engagement with estate growers and agricultural cooperatives",
      "Traceability to harvest zones across Kerala and premier Indian growing belts",
      "Fair grower relationships minimizing unnecessary intermediaries",
    ],
  },
  {
    number: "02",
    title: "Product Selection & Incoming Checks",
    subtitle: "Physical Inspection & Density Verification",
    description:
      "Upon intake at our regional collection centers, raw spice harvests undergo rigorous visual, sensory, and physical grading. Peppercorns are assessed for density (grams per liter / g/l) and size (Tellicherry Garbled Extra Bold), cardamom pods for vibrant green hue and pod maturity, and turmeric for color richness.",
    points: [
      "Physical purity inspection and screening for foreign matter",
      "Bulk density and grade size sorting (e.g. 8mm+ AGEB cardamom, 550g/l - 600g/l pepper)",
      "Rejection of sub-standard, immature, or damaged botanical lots",
    ],
  },
  {
    number: "03",
    title: "Post-Harvest Handling & Controlled Drying",
    subtitle: "Moisture Control & Essential Oil Preservation",
    description:
      "Proper drying is critical to preserving volatile aromatic compounds and preventing mold formation. Peppercorns and turmeric fingers are sun-dried on hygienic, raised platforms or dried in controlled low-temperature mechanical driers to achieve optimal export moisture thresholds (under 11–12%).",
    points: [
      "Clean sun-drying on certified platforms or mechanical dehydrators",
      "Strict moisture threshold controls preventing moisture damage",
      "Preservation of delicate volatile essential oils (piperine, cineole, curcumin)",
    ],
  },
  {
    number: "04",
    title: "Warehouse Storage & Moisture Integrity",
    subtitle: "Palletized Climate Management in Cochin Port Zone",
    description:
      "Consignments are stored in our ventilated, dry warehouse facility situated in the Cochin Port zone. Spices are elevated on clean wooden/plastic pallets away from direct flooring, protected from coastal humidity, and monitored continuously under strict pest-exclusion protocols.",
    points: [
      "Palletized storage preventing floor contact and moisture seepage",
      "Continuous atmospheric humidity and temperature monitoring",
      "Zero chemical fumigant cross-contamination in food storage zones",
    ],
  },
  {
    number: "05",
    title: "Protective Export Packaging",
    subtitle: "Moisture Barriers & Heavy-Duty Sacks",
    description:
      "We package spices for maritime voyages using multi-wall kraft paper sacks with food-grade polyethylene moisture barrier liners, double HDPE woven bags, or nitrogen-flushed vacuum pouches for sensitive green cardamom, safeguarding flavor during tropical sea journeys.",
    points: [
      "25kg & 50kg multi-wall export kraft bags with virgin poly liners",
      "Double HDPE woven sacks with heavy-duty heat-sealed liners",
      "Airtight foil vacuum pouches with nitrogen flushing for green cardamom",
    ],
  },
  {
    number: "06",
    title: "Shipment Preparation & Pre-Lading Inspection",
    subtitle: "Container Stuffing & Statutory Clearance at Cochin Port",
    description:
      "Every container is stuffed under our direct supervision at Cochin Port (ICTT Vallarpadam). Dry-linings and desiccant bags are installed to absorb maritime moisture. Government phytosanitary inspections and accredited third-party laboratory analyses (e.g., Spices Board recognized labs) are conducted per buyer contract.",
    points: [
      "Direct container stuffing and seal verification at Cochin Port",
      "Official Phytosanitary inspection by Plant Quarantine Division",
      "Independent accredited third-party testing (SGS / Spices Board) per contract",
    ],
  },
];

export default function SourcingPage() {
  const { content } = useWebsiteData();
  const sourcingData = content?.sourcing_steps?.content || content?.sourcing_overview?.content || {};

  const headline = sourcingData.headline || "Our Sourcing Approach & Quality Framework";
  const intro =
    sourcingData.intro ||
    "We work directly with primary farming cooperatives and estate clusters across Kerala and selected Indian agricultural belts. Our structured process guarantees product selection, hygienic post-harvest handling, and shipment preparation without claiming unverified internal laboratory facilities.";

  const steps = Array.isArray(sourcingData.steps) && sourcingData.steps.length > 0 ? sourcingData.steps : defaultSteps;

  return (
    <>
      <Head>
        <title>Sourcing & Quality Care — Auronova Exports | Farm-to-Vessel Standards</title>
        <meta
          name="description"
          content="Learn about Auronova Exports' direct sourcing framework in Kerala and India. Grower partnerships, incoming quality checks, post-harvest drying, storage, and Cochin Port preparation."
        />
        <link rel="canonical" href="https://auronovaexports.com/sourcing" />
      </Head>

      {/* Editorial Hero */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#33322B]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/plantation.jpg"
            alt="Spice plantation slopes in the Western Ghats of Kerala"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181914]/95 via-[#181914]/85 to-[#181914]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-[#24251F]/40 to-[#181914]/60" />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            <Compass size={13} className="text-[#D6A441]" />
            Farm-to-Vessel Quality Care
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF7F0] leading-tight mb-5">
            Direct Sourcing & <span className="text-[#D6A441]">Quality Care</span>
          </h1>
          <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal max-w-2xl mx-auto">
            Connecting verified Indian spice growers directly with international commercial buyers through ethical sourcing, physical sorting, and container consolidation from Cochin Port.
          </p>
        </div>
      </section>

      {/* Sourcing Philosophy & Direct Connections */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
                Ethical Grower Partnerships
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-5">
                Bridging Growers with Global Markets
              </h2>
              <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
              <div className="space-y-4 text-base text-[#34332E]/80 leading-relaxed font-normal">
                <p>
                  At Auronova Exports, our sourcing approach is anchored in direct producer relationships. Rather than acquiring unknown commingled commodities from multi-tiered open auction middlemen, we collaborate with primary farming clusters, family estates, and trusted producer cooperatives in Kerala&apos;s highland spice zones (Wayanad, Idukki) and specialized agricultural regions such as Erode for golden turmeric.
                </p>
                <p>
                  This direct bridge provides our international commercial buyers with transparent origin traceability, authentic harvest freshness, and consistent physical cleanliness, while ensuring sustainable remuneration for local growers.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
                  <span className="text-2xl font-bold text-[#4A2C20] block mb-1">Direct</span>
                  <span className="text-xs text-[#34332E]/70">Grower & estate procurement network</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
                  <span className="text-2xl font-bold text-[#526747] block mb-1">Cochin Port</span>
                  <span className="text-xs text-[#34332E]/70">Direct container consolidation hub</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#E8E0D2] shadow-xl relative group">
                <img
                  src="/images/plantation.jpg"
                  alt="Highland spice plantation in Kerala"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24251F]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#24251F]/85 backdrop-blur-md text-[#FAF7F0] border border-white/10">
                  <span className="text-xs uppercase font-semibold text-[#D6A441] block mb-1">
                    Traceable Harvest Origin
                  </span>
                  <p className="text-xs text-[#FAF7F0]/80">
                    Sourced from agro-ecological microclimates known for intense natural volatile oils and bold berries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Step-by-Step Layout */}
      <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Step-by-Step Quality Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-4">
              {headline}
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#34332E]/75 leading-relaxed font-normal">
              {intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.number || idx}
                className="p-8 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-xl bg-[#4A2C20]/10 text-[#4A2C20] font-bold text-lg flex items-center justify-center font-mono">
                      {step.number || `0${idx + 1}`}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#526747] bg-[#526747]/10 px-2.5 py-1 rounded-full">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-[#24251F] mb-1">
                    {step.title}
                  </h3>
                  {step.subtitle && (
                    <p className="text-xs font-semibold text-[#8C7F73] mb-3">
                      {step.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#34332E]/75 leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                {Array.isArray(step.points) && step.points.length > 0 && (
                  <div className="pt-4 border-t border-[#E8E0D2]/70 space-y-2">
                    {step.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-[#24251F]/80">
                        <CheckCircle2 size={13} className="text-[#D6A441] flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Independent Laboratory Testing & Credibility Callout */}
          <div className="mt-16 p-8 rounded-2xl bg-[#24251F] text-[#FAF7F0] border border-white/10 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D6A441] mb-3">
                  <Shield size={13} className="text-[#D6A441]" />
                  Independent Laboratory Testing & Compliance
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#FAF7F0] mb-2">
                  Transparent Testing & Analytical Reports
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed font-normal">
                  We do not make misleading claims of operating internal testing facilities. Instead, we coordinate with government-authorized Spices Board testing laboratories and accredited independent inspection agencies (e.g. SGS / Bureau Veritas) to verify moisture, piperine, curcumin, pesticide residues, and microbial parameters according to the buyer&apos;s commercial contract specifications.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D6A441] text-[#24251F] text-xs sm:text-sm font-semibold hover:bg-[#E4B85C] transition-colors"
                >
                  Request Batch Specifications
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Regions Showcase */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
            Regional Origins
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] mb-4">
            Key Spice-Growing Regions We Source From
          </h2>
          <div className="w-16 h-[2px] bg-[#D6A441] mx-auto mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <div className="w-10 h-10 rounded-xl bg-[#526747]/10 flex items-center justify-center text-[#526747] mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-base text-[#24251F] mb-1">Wayanad, Kerala</h3>
              <span className="text-xs font-semibold text-[#D6A441] block mb-2">Malabar Black Pepper</span>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                High-altitude evergreen forests offering rich volcanic loam and mist-clad hills that produce dense Tellicherry peppercorns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <div className="w-10 h-10 rounded-xl bg-[#D6A441]/10 flex items-center justify-center text-[#4A2C20] mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-base text-[#24251F] mb-1">Cardamom Hills, Idukki</h3>
              <span className="text-xs font-semibold text-[#D6A441] block mb-2">Alleppey Green Cardamom</span>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Dense shade-canopy rainforests at 1,000m+ elevation nurturing bold green cardamom pods with intense camphor-citrus aroma.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <div className="w-10 h-10 rounded-xl bg-[#4A2C20]/10 flex items-center justify-center text-[#526747] mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-base text-[#24251F] mb-1">Erode, Tamil Nadu</h3>
              <span className="text-xs font-semibold text-[#D6A441] block mb-2">High-Curcumin Turmeric</span>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Celebrated agricultural heartland famous worldwide for vibrant deep yellow turmeric fingers rich in active curcumin compounds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <div className="w-10 h-10 rounded-xl bg-[#526747]/10 flex items-center justify-center text-[#D6A441] mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-base text-[#24251F] mb-1">Central Travancore</h3>
              <span className="text-xs font-semibold text-[#D6A441] block mb-2">Cloves, Nutmeg & Mace</span>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Rich coastal river valleys with alluvial soils that nurture aromatic whole cloves, fresh nutmeg, and golden mace flower blades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#FAF7F0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#24251F] mb-4">
            Source Verified Indian Spices from Cochin Port
          </h2>
          <p className="text-sm sm:text-base text-[#34332E]/75 mb-8 max-w-xl mx-auto font-normal">
            Request formal proforma quotations, laboratory analysis certificates, and DHL/FedEx air courier sample packs for your commercial review.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-[#24251F] text-[#FAF7F0] text-xs sm:text-sm font-semibold hover:bg-[#34332E] transition-colors"
            >
              View Spice Catalogue
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#D6A441] text-[#24251F] text-xs sm:text-sm font-semibold hover:bg-[#E4B85C] transition-colors"
            >
              Request a Commercial Quote
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
      title: "Sourcing & Quality Care — Direct Indian Spice Sourcing | Auronova Exports",
      description: "Direct spice sourcing framework in Kerala and India. Grower partnerships, incoming quality checks, post-harvest drying, warehousing, and Cochin Port preparation.",
      canonical: "/sourcing",
    },
  };
}

