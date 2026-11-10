import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, ShieldCheck, Mail, Phone, Search, FileCheck, Anchor, Package, Clock, Scale } from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";

const defaultFaqCategories = [
  {
    category: "Products, Grades & Sourcing",
    questions: [
      {
        q: "What types of spices does Auronova Exports specialize in?",
        a: "We supply 11 core Indian and Kerala spices: Malabar Black Pepper (Tellicherry Garbled Extra Bold / TGEB), White Pepper, Alleppey Green Cardamom (AGEB 8mm+ & AGB 7mm+), Ceylon Cinnamon, Cloves, Turmeric (Alleppey finger and high-curcumin Erode varieties), Red Chilli, Dried Ginger, Nutmeg, Golden Mace, and Star Anise.",
      },
      {
        q: "What is your sourcing approach and how are farmers connected?",
        a: "We operate a direct sourcing framework, partnering directly with farming cooperatives, family estates, and trusted producer clusters in Kerala's highland belts (Wayanad, Idukki, Cardamom Hills) and premier agricultural regions like Erode in Tamil Nadu. This direct link ensures authentic single-origin provenance, harvest freshness, and transparent pricing without multi-layered intermediary commissions.",
      },
      {
        q: "How are quality inspections and laboratory test reports handled?",
        a: "Every export lot undergoes physical cleanliness grading, bulk density measurement, and moisture meter checks. Standard shipments include a comprehensive Certificate of Analysis (COA). If buyer contracts specify accredited independent testing (such as SGS, Bureau Veritas, or Spices Board of India recognized labs), we coordinate lot sampling and testing prior to container stuffing at Cochin Port.",
      },
    ],
  },
  {
    category: "MOQ, Samples, Pricing & Payment Terms",
    questions: [
      {
        q: "What are your standard Minimum Order Quantities (MOQ)?",
        a: "Our volume framework accommodates: LCL palletized consignments from 500 kg to 3,000 kg for trial market validation; 20ft FCL containers (~14 to 15 Metric Tonnes depending on commodity density); and 40ft FCL containers (~25 to 27 Metric Tonnes). Negotiable trial lots can be evaluated for qualified commercial buyers.",
      },
      {
        q: "How can international buyers request pre-shipment sample packs?",
        a: "Verified food processors, commercial importers, and wholesale distributors can request sample sets through our Request a Quote form. Samples (200g to 1kg) are heat-sealed in protective barrier foil pouches with batch specifications and dispatched via DHL or FedEx air courier within 48 to 72 hours.",
      },
      {
        q: "How are export prices quoted and what is their validity?",
        a: "Prices are quoted in USD or EUR on FOB Cochin Seaport, CIF (destination port), CFR, or Air Cargo terms. Because agricultural spice prices fluctuate on Indian terminal markets and crop harvest yields, formal proforma invoice quotes generally remain firm for 3 to 7 business days.",
      },
      {
        q: "What commercial payment terms are accepted?",
        a: "We operate under recognized international banking instruments, including: 1) Irrevocable Documentary Letter of Credit (L/C at sight) issued or confirmed by a prime international bank; and 2) Telegraphic Transfer (T/T advance deposit with balance payable against presentation of export shipping documents / bill of lading).",
      },
    ],
  },
  {
    category: "Shipping, Incoterms & Cochin Port Logistics",
    questions: [
      {
        q: "From which port do your maritime shipments originate?",
        a: "All commercial maritime container consignments depart directly from Cochin Seaport (ICTT Vallarpadam / Port Code: INCOK), Kerala's premier deep-draft international container transshipment terminal. Urgent orders, high-value cardamom, and analytical samples are dispatched via Cochin International Airport (CIAL).",
      },
      {
        q: "What Incoterms do you support for international buyers?",
        a: "We support FOB Cochin (Free on Board at Cochin Port), CIF (Cost, Insurance & Freight to your destination seaport), CFR (Cost and Freight), and Air Cargo (CIP/CPT via CIAL). Detailed explanations of each term are available on our Shipping & Pricing page.",
      },
      {
        q: "What are your standard lead times from purchase order to shipment?",
        a: "Sample courier handover: 48 to 72 hours. LCL palletized orders: 7 to 10 working days. Full container loads (20ft / 40ft FCL): 10 to 18 working days for batch cleaning, density grading, protective packing, quarantine inspection, and port gate-in. Ocean transit times vary by destination port (GCC 4–8 days; Western Europe 18–24 days; Americas 24–32 days).",
      },
      {
        q: "Does Auronova Exports operate out of all 18 ports in Kerala?",
        a: "No. Kerala features 18 notified ports (1 Major Port and 17 state-notified non-major ports administered by the Kerala Maritime Board). Cochin Port is our dedicated, verified commercial gateway for all international containerized spice cargo. Non-major ports serve domestic coastal trade, fishing, or lighterage, and are not represented as general international container facilities.",
      },
    ],
  },
  {
    category: "Documentation, Phytosanitary & Packaging",
    questions: [
      {
        q: "What statutory export documents accompany each consignment?",
        a: "Full export documentation dossiers include: 1) Commercial Invoice, 2) Detailed Packing List, 3) Ocean Bill of Lading (Clean on Board B/L) or Air Waybill, 4) Government Phytosanitary Certificate, 5) Certificate of Origin (COO), 6) Fumigation Certificate, and 7) Batch Certificate of Analysis (COA).",
      },
      {
        q: "How is Certificate of Origin (COO) issued?",
        a: "A Certificate of Origin endorsed by the authorized Indian Chamber of Commerce or Export Promotion Council is issued with every export consignment to legally certify regional Indian origin for destination customs entry and preferential tariff treatment.",
      },
      {
        q: "What is Phytosanitary documentation and how is it verified?",
        a: "Every export lot is inspected by the Plant Quarantine Division under the Ministry of Agriculture & Farmers Welfare, Govt. of India. An official Phytosanitary Certificate is issued certifying that the consignment is free from quarantine pests, fungal pathogens, and botanical contaminants.",
      },
      {
        q: "What bulk export packaging configurations do you offer?",
        a: "Standard packaging includes: 25kg & 50kg multi-wall kraft paper sacks with food-grade polyethylene moisture barrier liners; double-stitched HDPE woven bags; and heavy-duty corrugated master cartons with nitrogen-flushed foil vacuum pouches for green cardamom and mace. Custom OEM bagging and private labeling are available upon contract agreement.",
      },
    ],
  },
];

export default function FAQPage() {
  const { content } = useWebsiteData();
  const faqData = content?.faq_content?.content || {};

  const categories =
    Array.isArray(faqData.categories) && faqData.categories.length > 0
      ? faqData.categories
      : defaultFaqCategories;

  const [openItems, setOpenItems] = useState({ "0-0": true, "1-0": true });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const toggleItem = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => selectedCategory === "all" || cat.category === selectedCategory)
      .map((cat, catIdx) => {
        const filteredQ = cat.questions.filter((item) => {
          if (!searchTerm) return true;
          const q = searchTerm.toLowerCase();
          return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
        });
        return {
          ...cat,
          catOriginalIdx: catIdx,
          questions: filteredQ,
        };
      })
      .filter((cat) => cat.questions.length > 0);
  }, [categories, searchTerm, selectedCategory]);

  // Generate JSON-LD Structured Data
  const allFaqs = categories.flatMap((c) => c.questions);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>FAQ — International Spice Export Questions & Answers | Auronova Exports</title>
        <meta
          name="description"
          content="Frequently asked questions about importing Indian spices: product specifications, MOQ, sample requests, payment terms, Incoterms, and ocean freight logistics from Cochin Port."
        />
        <link rel="canonical" href="https://auronovaexports.com/faq" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#33322B]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-faq-hero.jpg"
            alt="Spice trade merchant desk with logbook and specimen jars"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181914]/95 via-[#181914]/85 to-[#181914]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-[#24251F]/40 to-[#181914]/60" />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            <HelpCircle size={13} className="text-[#D6A441]" />
            Commercial Knowledge Base
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FAF7F0] mb-5">
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
            Clear commercial guidance regarding product varieties, direct sourcing, MOQ, samples, payment terms, ocean shipping, Phytosanitary, and Cochin Port export operations.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF7F0]/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics (e.g. MOQ, samples, Cochin port, phytosanitary, payment)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-sm text-[#FAF7F0] placeholder-[#FAF7F0]/50 focus:outline-none focus:ring-2 focus:ring-[#D6A441] backdrop-blur-md"
            />
          </div>
        </div>
      </section>

      {/* Category Filter Pills & Accordion */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-4xl mx-auto px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E8E0D2]">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#4A2C20] text-[#FAF7F0]"
                  : "bg-white text-[#34332E] border border-[#E8E0D2] hover:bg-[#FAF7F0]"
              }`}
            >
              All Topics ({allFaqs.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.category}
                onClick={() => setSelectedCategory(c.category)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === c.category
                    ? "bg-[#4A2C20] text-[#FAF7F0]"
                    : "bg-white text-[#34332E] border border-[#E8E0D2] hover:bg-[#FAF7F0]"
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>

          {/* Questions Accordion List */}
          {filteredCategories.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E8E0D2] text-sm text-[#34332E]/70">
              No questions matched &quot;{searchTerm}&quot;. Please try a different search or contact our trade desk directly.
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((cat) => (
                <div key={cat.category}>
                  <h2 className="text-xl font-bold text-[#24251F] mb-4 pb-2 border-b border-[#E8E0D2]">
                    {cat.category}
                  </h2>

                  <div className="space-y-3">
                    {cat.questions.map((item, qIdx) => {
                      const key = `${cat.catOriginalIdx ?? 0}-${qIdx}`;
                      const isOpen = !!openItems[key];
                      return (
                        <div
                          key={item.q}
                          className="rounded-xl border border-[#E8E0D2] overflow-hidden bg-white shadow-sm transition-all"
                        >
                          <button
                            onClick={() => toggleItem(cat.catOriginalIdx ?? 0, qIdx)}
                            className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#24251F] hover:bg-[#FAF7F0]/60 transition-colors"
                          >
                            <span>{item.q}</span>
                            <ChevronDown
                              size={16}
                              className={`text-[#D6A441] flex-shrink-0 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 text-xs sm:text-sm text-[#34332E]/80 leading-relaxed border-t border-[#E8E0D2]/50 pt-3 font-normal">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Need Specific Assistance Box */}
          <div className="mt-16 p-8 rounded-2xl bg-white border border-[#E8E0D2] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="font-bold text-lg text-[#24251F]">
                Have a specific commodity, volume, or customs inquiry?
              </h3>
              <p className="text-xs sm:text-sm text-[#34332E]/70 mt-1 font-normal">
                Our export trade desk provides formal proforma invoices, Certificate of Origin details, and freight estimates within 24 business hours.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg text-xs font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors flex-shrink-0"
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
      title: "FAQ — International Spice Export Questions & Answers | Auronova Exports",
      description:
        "Frequently asked questions about importing Indian spices: product specifications, MOQ, sample requests, packaging options, and ocean freight logistics from Cochin Port.",
      canonical: "/faq",
    },
  };
}
