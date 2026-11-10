import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  Ship,
  Plane,
  Anchor,
  Package,
  Clock,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  Globe,
  Compass,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import KeralaPortsSection from "@/components/sections/KeralaPortsSection";

export default function ShippingPricingPage() {
  const { content } = useWebsiteData();
  const shippingData = content?.shipping_pricing?.content || {};

  const incotermsList = Array.isArray(shippingData.incoterms) && shippingData.incoterms.length > 0
    ? shippingData.incoterms
    : [
        {
          term: "FOB Cochin",
          fullName: "Free on Board (Cochin Seaport / ICTT Vallarpadam)",
          desc: "Auronova Exports manages origin transport, export packaging, Indian customs clearance, port handling, and vessel loading onto the buyer's designated ocean carrier.",
          idealFor: "Commercial importers with existing volume liner contracts or dedicated freight forwarders.",
        },
        {
          term: "CIF (Destination Port)",
          fullName: "Cost, Insurance & Freight",
          desc: "Auronova Exports arranges, books, and prepays international sea freight and maritime marine cargo insurance to the buyer's nominated overseas port of discharge.",
          idealFor: "Buyers seeking hassle-free ocean delivery directly to their regional seaport without coordinating carriers.",
        },
        {
          term: "CFR (Destination Port)",
          fullName: "Cost and Freight",
          desc: "Auronova Exports books and covers ocean freight to the destination port, while the buyer arranges their preferred cargo insurance policy.",
          idealFor: "Importers with corporate global marine cargo insurance policies.",
        },
        {
          term: "Air Cargo (CIAL)",
          fullName: "CIP / CPT via Cochin International Airport",
          desc: "Rapid international air cargo dispatch via Cochin International Airport (CIAL) for urgent consignments, premium green cardamom, and high-value botanical lots.",
          idealFor: "Time-sensitive commercial orders, pilot production runs, and urgent distributor replenishments.",
        },
      ];

  const moqData = shippingData.moq || {
    lcl: "500 kg to 3,000 kg (palletized export packaging for commercial trial validation)",
    fcl20: "14 to 15 Metric Tonnes (~20ft FCL container, commodity-dependent)",
    fcl40: "25 to 27 Metric Tonnes (~40ft FCL container for large-scale industrial bulk)",
    sample: "200g to 1kg representative sample packs for qualified commercial buyers",
    notes: "[Editable placeholder: Minimum order quantities are negotiable based on commodity value, seasonal availability, and contract duration].",
  };

  const leadTimesData = shippingData.leadTimes || {
    samples: "48 to 72 business hours for courier handover",
    lcl: "7 to 10 working days from PO confirmation to port gate-in",
    fcl: "10 to 18 working days from PO confirmation to container loading and bill of lading issuance",
    transitNotes: "Ocean transit estimates vary by destination: GCC / Middle East: 4–8 days; Western Europe: 18–24 days; Americas: 24–32 days. Exact vessel schedules are confirmed on proforma invoices.",
  };

  const samplePolicyData = shippingData.samplePolicy || {
    headline: "Commercial Sample Evaluation Policy",
    desc: "We supply representative harvest sample kits to verified food manufacturers, wholesale importers, and institutional buyers. Samples are packed in airtight barrier pouches with complete batch specifications and dispatched via DHL or FedEx air courier.",
    terms: "Samples are complimentary for qualified commercial buyers; international courier tariffs may apply for initial exploratory inquiries.",
  };

  return (
    <>
      <Head>
        <title>Shipping & Pricing (Incoterms, MOQ, Kerala Ports) — Auronova Exports</title>
        <meta
          name="description"
          content="Commercial export shipping terms (FOB Cochin, CIF, CFR, Air Cargo), MOQ guidance, lead times, export documentation, and Kerala's 18 maritime ports."
        />
        <link rel="canonical" href="https://auronovaexports.com/shipping" />
      </Head>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#33322B]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-contact-hero.jpg"
            alt="Commercial spice export cargo container port logistics"
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
            <Ship size={13} className="text-[#D6A441]" />
            Commercial Logistics & Terms
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF7F0] leading-tight mb-5">
            Shipping & <span className="text-[#D6A441]">Pricing Guidelines</span>
          </h1>
          <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal max-w-2xl mx-auto">
            Transparent commercial Incoterms, reliable MOQ frameworks, and ocean container logistics departing directly from Cochin Port (ICTT Vallarpadam).
          </p>
        </div>
      </section>

      {/* Incoterms Breakdown */}
      <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              International Trade Terms
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-4">
              Supported Commercial Incoterms
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#34332E]/75 leading-relaxed font-normal">
              We quote according to ICC Incoterms 2020 rules, giving international buyers complete flexibility between self-managed freight or fully delivered ocean consignments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {incotermsList.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm hover:border-[#D6A441] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-[#4A2C20] font-mono">
                      {item.term}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#526747] bg-[#526747]/10 px-3 py-1 rounded-full">
                      Incoterms 2020
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#24251F] mb-2">{item.fullName}</h3>
                  <p className="text-xs sm:text-sm text-[#34332E]/80 leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E0D2] bg-[#FAF7F0] -mx-8 -mb-8 p-5 rounded-b-2xl">
                  <span className="text-xs font-semibold text-[#8C7F73] block mb-1">Recommended For:</span>
                  <p className="text-xs text-[#24251F] font-medium leading-relaxed">
                    {item.idealFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOQ Guidance & Lead Times */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* MOQ Guidance */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-2 block">
                  Volume Framework
                </span>
                <h2 className="text-3xl font-bold text-[#24251F] mb-4">
                  Minimum Order Quantity (MOQ) Guidance
                </h2>
                <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
                <p className="text-xs sm:text-sm text-[#34332E]/75 leading-relaxed font-normal">
                  Our minimum order quantities are calibrated to maintain cost efficiency in export packing, customs clearance, and container stuffing while accommodating initial trial batches.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
                  <span className="text-xs uppercase font-semibold text-[#8C7F73] block mb-1">Commercial Trial (LCL)</span>
                  <h4 className="font-bold text-base text-[#24251F] mb-1">500 kg to 3,000 kg</h4>
                  <p className="text-xs text-[#34332E]/75 leading-relaxed font-normal">
                    {moqData.lcl}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
                  <span className="text-xs uppercase font-semibold text-[#8C7F73] block mb-1">20ft Full Container Load (FCL)</span>
                  <h4 className="font-bold text-base text-[#24251F] mb-1">~14 to 15 Metric Tonnes</h4>
                  <p className="text-xs text-[#34332E]/75 leading-relaxed font-normal">
                    {moqData.fcl20}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
                  <span className="text-xs uppercase font-semibold text-[#8C7F73] block mb-1">40ft Full Container Load (FCL)</span>
                  <h4 className="font-bold text-base text-[#24251F] mb-1">~25 to 27 Metric Tonnes</h4>
                  <p className="text-xs text-[#34332E]/75 leading-relaxed font-normal">
                    {moqData.fcl40}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E8E0D2] text-xs text-[#4A2C20] italic">
                  <strong>Note:</strong> {moqData.notes}
                </div>
              </div>
            </div>

            {/* Lead Times & Dispatch Schedule */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-2 block">
                  Turnaround Timeline
                </span>
                <h2 className="text-3xl font-bold text-[#24251F] mb-4">
                  Operational Lead Times
                </h2>
                <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
                <p className="text-xs sm:text-sm text-[#34332E]/75 leading-relaxed font-normal">
                  Lead times depend on harvest seasonal cycles, batch grading requirements, independent analytical testing, and vessel liner departure schedules from Cochin Seaport.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-start gap-4">
                  <Clock size={20} className="text-[#D6A441] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-base text-[#24251F]">Sample Dispatches</h4>
                    <p className="text-xs text-[#34332E]/75 mt-1 leading-relaxed font-normal">
                      {leadTimesData.samples} via DHL or FedEx international courier.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-start gap-4">
                  <Clock size={20} className="text-[#526747] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-base text-[#24251F]">LCL Palletized Orders</h4>
                    <p className="text-xs text-[#34332E]/75 mt-1 leading-relaxed font-normal">
                      {leadTimesData.lcl}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-start gap-4">
                  <Clock size={20} className="text-[#4A2C20] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-base text-[#24251F]">Full Container Loads (FCL)</h4>
                    <p className="text-xs text-[#34332E]/75 mt-1 leading-relaxed font-normal">
                      {leadTimesData.fcl}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#24251F] text-[#FAF7F0] text-xs space-y-1">
                  <span className="text-[#D6A441] font-semibold block">Ocean Transit Estimates:</span>
                  <p className="text-[#FAF7F0]/80 leading-relaxed font-normal">
                    {leadTimesData.transitNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Policy & Packaging Configurations */}
      <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sample Policy */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#526747]/10 text-xs font-semibold text-[#526747] mb-4">
                  <Package size={13} />
                  Sample Dispatch Framework
                </div>
                <h3 className="text-2xl font-bold text-[#24251F] mb-3">
                  {samplePolicyData.headline}
                </h3>
                <p className="text-xs sm:text-sm text-[#34332E]/80 leading-relaxed mb-6 font-normal">
                  {samplePolicyData.desc}
                </p>
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-xs text-[#24251F] space-y-2 mb-6">
                  <p className="font-semibold text-[#4A2C20]">Included with Sample Kits:</p>
                  <ul className="list-disc pl-5 space-y-1 text-[#34332E]/80">
                    <li>Representative batch specification sheet with grade size & bulk density</li>
                    <li>Certificate of Analysis (COA) specifying moisture & volatile oil values</li>
                    <li>Official harvest lot identification and commercial proforma quote</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-[#8C7F73] italic">
                {samplePolicyData.terms}
              </p>
            </div>

            {/* Packaging Options */}
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A441]/10 text-xs font-semibold text-[#4A2C20] mb-4">
                  <ShieldCheck size={13} />
                  Protective Bulk Packaging
                </div>
                <h3 className="text-2xl font-bold text-[#24251F] mb-3">
                  Export Packaging Standards
                </h3>
                <p className="text-xs sm:text-sm text-[#34332E]/80 leading-relaxed mb-6 font-normal">
                  Every package configuration is engineered to resist maritime humidity, ambient ocean salt, and oxidation across long voyages.
                </p>
                <div className="space-y-3 text-xs sm:text-sm text-[#24251F]">
                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
                    <span className="font-bold block mb-0.5">Multi-Wall Kraft Paper Sacks (25kg / 50kg)</span>
                    <span className="text-xs text-[#34332E]/70 font-normal">Fitted with inner food-grade polyethylene moisture barrier for whole pepper and turmeric.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
                    <span className="font-bold block mb-0.5">Double HDPE Woven Sacks</span>
                    <span className="text-xs text-[#34332E]/70 font-normal">Heavy-duty export grade with double heat-sealed liners for rough bulk sea voyages.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
                    <span className="font-bold block mb-0.5">Vacuum Nitrogen Flush Foil Cartons</span>
                    <span className="text-xs text-[#34332E]/70 font-normal">Airtight inner vacuum packaging preserving green hue and volatile aroma of cardamom and mace.</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#8C7F73] italic mt-4">
                Buyer-customized OEM labeling, private packaging, and barcode markings available on commercial contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Statutory Shipping Documentation */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-3 block">
              Documentation Compliance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#24251F] leading-tight mb-4">
              Mandatory Export Documentation Dossier
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#34332E]/75 leading-relaxed font-normal">
              Every consignment departing Cochin Seaport is accompanied by full legal documentation required for smooth foreign customs clearance and quarantine entry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <FileText size={20} className="text-[#D6A441] mb-3" />
              <h3 className="font-bold text-base text-[#24251F] mb-1">Commercial Invoice & Packing List</h3>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Itemized commercial value, container numbers, gross and net weights, and batch identifiers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <Ship size={20} className="text-[#526747] mb-3" />
              <h3 className="font-bold text-base text-[#24251F] mb-1">Maritime Bill of Lading (B/L)</h3>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Clean on Board Ocean Bill of Lading issued by international mainline shipping lines from Cochin Port.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <ShieldCheck size={20} className="text-[#4A2C20] mb-3" />
              <h3 className="font-bold text-base text-[#24251F] mb-1">Phytosanitary Certificate</h3>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Official plant health certificate issued by Plant Quarantine Division, Ministry of Agriculture, Govt. of India.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <Globe size={20} className="text-[#D6A441] mb-3" />
              <h3 className="font-bold text-base text-[#24251F] mb-1">Certificate of Origin (COO)</h3>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Endorsed by authorized Indian Chambers of Commerce confirming genuine regional origin for tariff clearance.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <CheckCircle2 size={20} className="text-[#526747] mb-3" />
              <h3 className="font-bold text-base text-[#24251F] mb-1">Fumigation Certificate</h3>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Issued by government-accredited pest management agency verifying treatment per destination port requirements.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]">
              <FileText size={20} className="text-[#4A2C20] mb-3" />
              <h3 className="font-bold text-base text-[#24251F] mb-1">Certificate of Analysis (COA)</h3>
              <p className="text-xs text-[#34332E]/70 leading-relaxed font-normal">
                Independent or recognized laboratory test report certifying physical cleanliness, density, and moisture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kerala's 18 Maritime Ports Section with Transparent Commercial Distinctions */}
      <KeralaPortsSection />

      {/* Pricing Transparency & Final RFQ Banner */}
      <section className="py-20 bg-[#24251F] text-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] block">
            Commercial Quotation Request
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            Request Formal Export Pricing for Your Destination Port
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F0]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            Due to agricultural market cycles, exchange rates, and freight tariffs, we do not publish static prices. We provide firm, customized commercial proforma invoices (FOB Cochin, CIF, CFR) within 24 business hours.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D6A441] text-[#24251F] text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#E4B85C] shadow-lg transition-colors"
            >
              Request a Commercial Quote
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent border border-white/20 text-[#FAF7F0] text-xs sm:text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Products
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
      title: "Shipping & Pricing (Incoterms, MOQ, Kerala Ports) — Auronova Exports",
      description:
        "Commercial export shipping terms (FOB Cochin, CIF, CFR, Air Cargo), MOQ guidance, lead times, export documentation, and Kerala's 18 maritime ports.",
      canonical: "/shipping",
    },
  };
}

