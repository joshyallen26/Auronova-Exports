import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, ShieldCheck, Mail, Phone } from "lucide-react";

const faqCategories = [
  {
    category: "Products & Quality Specifications",
    questions: [
      {
        q: "What types of spices does Auronova Exports supply?",
        a: "We supply eleven core Indian spices with sourcing rooted primarily in Kerala alongside premier regional origins: Malabar Black Pepper, White Pepper, Green Cardamom, Cinnamon, Cloves, Turmeric (Alleppey, Kerala and Erode, Tamil Nadu), Red Chilli, Dried Ginger, Nutmeg, Mace, and Star Anise.",
      },
      {
        q: "How is the quality and moisture level of the spices verified?",
        a: "Every shipment is evaluated for physical cleanliness, moisture control, grade sizing, and aroma integrity aligned with commercial buyer specifications and official export parameters.",
      },
      {
        q: "Are the spices treated with radiation or chemical fumigants?",
        a: "No. We utilize clean, high-temperature steam sterilization (HTST) to control microbiological counts without radiation. Any standard phytosanitary fumigation required for customs entry is performed under government-certified protocols with full documentation.",
      },
    ],
  },
  {
    category: "Ordering, Samples & Quotations",
    questions: [
      {
        q: "How can I request pre-shipment sample packs?",
        a: "Qualified commercial buyers can request sample packs through our Contact page or by emailing exports@auronovaexports.com. Samples are packaged in protective barrier pouches and dispatched internationally via DHL or FedEx air courier along with technical product specification sheets.",
      },
      {
        q: "What are the standard Minimum Order Quantities (MOQ)?",
        a: "We accommodate both Less than Container Load (LCL palletized orders from 500 kg to 3,000 kg) and Full Container Loads (20ft FCL ~14 Metric Tonnes; 40ft FCL ~26 Metric Tonnes). Initial trial orders for commercial validation are supported.",
      },
      {
        q: "What commercial payment and trade terms are supported?",
        a: "We operate on standard international trade Incoterms including FOB Cochin Seaport, CIF (Destination Port), and CFR. Payment terms typically include irrevocable Documentary Letter of Credit (L/C at sight) or Telegraphic Transfer (T/T), subject to commercial agreement.",
      },
    ],
  },
  {
    category: "Export Shipping & Documentation",
    questions: [
      {
        q: "From which port do your shipments originate?",
        a: "Ocean freight departs directly from Cochin Seaport (INCOK / ICTT Vallarpadam), Kerala's premier deep-water container transshipment terminal. High-value consignments and urgent samples are air-freighted via Cochin International Airport (CIAL).",
      },
      {
        q: "What export documentation is provided with every shipment?",
        a: "Full export documentation includes: Commercial Invoice, Packing List, Bill of Lading (B/L), Government-issued Phytosanitary Certificate, Certificate of Origin (COO), and Fumigation Certificate.",
      },
      {
        q: "What packaging configurations are available for bulk buyers?",
        a: "Standard bulk packaging options include 25kg and 50kg multi-wall kraft paper bags with food-grade polyethylene liners, double HDPE woven sacks, and heavy-duty vacuum-sealed cartons with nitrogen flushing for high-value aromatics like green cardamom and mace.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({ "0-0": true });

  const toggleItem = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Generate JSON-LD Structured Data
  const allFaqs = faqCategories.flatMap((c) => c.questions);
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      {/* Knowledge Base Header with Spice Merchant Desk Background */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#33322B]">
        {/* Cinematic Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-faq-hero.jpg"
            alt="Spice trade merchant desk with antique logbook, magnifying glass, and specimen jars"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          {/* Dual Layer Gradient Overlays for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181914]/95 via-[#181914]/85 to-[#181914]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-[#24251F]/40 to-[#181914]/60" />
        </div>

        {/* Ambient Warm Golden Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            <HelpCircle size={13} className="text-[#D6A441]" />
            Knowledge Base
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FAF7F0] mb-5">
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal max-w-2xl mx-auto">
            Guidance for international importers, wholesale distributors, and food manufacturers
            regarding product specifications, sample dispatch, order quantities, and export shipping.
          </p>
        </div>
      </section>

      {/* Accordion Categories */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {faqCategories.map((cat, catIdx) => (
              <div key={cat.category}>
                <h2 className="text-xl font-bold text-[#24251F] mb-4 pb-2 border-b border-[#E8E0D2]">
                  {cat.category}
                </h2>

                <div className="space-y-3">
                  {cat.questions.map((item, qIdx) => {
                    const key = `${catIdx}-${qIdx}`;
                    const isOpen = !!openItems[key];
                    return (
                      <div
                        key={item.q}
                        className="rounded-xl border border-[#E8E0D2] overflow-hidden bg-white shadow-sm transition-colors"
                      >
                        <button
                          onClick={() => toggleItem(catIdx, qIdx)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#24251F] hover:bg-[#FAF7F0]/50"
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
                          <div className="px-5 pb-5 text-xs sm:text-sm text-[#34332E]/80 leading-relaxed border-t border-[#E8E0D2]/50 pt-3">
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

          {/* Need Specific Assistance Box */}
          <div className="mt-16 p-8 rounded-2xl bg-white border border-[#E8E0D2] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="font-bold text-lg text-[#24251F]">
                Have a specific commodity or customs inquiry?
              </h3>
              <p className="text-xs sm:text-sm text-[#34332E]/70 mt-1">
                Our export desk is available to assist with contract parameters, container consolidation, and phytosanitary requirements.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg text-xs font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors flex-shrink-0"
            >
              Contact Export Desk
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
        "Frequently asked questions about importing Kerala spices: product specifications, MOQ, sample requests, packaging options, and ocean freight logistics from Cochin Port.",
      canonical: "/faq",
    },
  };
}
