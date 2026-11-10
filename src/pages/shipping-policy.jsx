import Head from "next/head";
import Link from "next/link";
import { Ship, ArrowRight, Package, Clock, ShieldCheck, MapPin, Anchor, FileText } from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function ShippingPolicyPage() {
  const { content, integrations } = useWebsiteData();
  const policyData = content?.legal_shipping?.content || {};

  const companyName = integrations?.companyName || "Auronova Exports Pvt. Ltd.";
  const companyEmail = integrations?.email || "exports@auronovaexports.com";
  const portOfLading = integrations?.portOfLading || "Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo";

  const lastUpdated = policyData.lastUpdated || "November 2026";
  const title = policyData.title || "Export Shipping & Logistics Policy";
  const subtitle = policyData.subtitle || "Standard shipping routes, container consolidation, export packing, lead times, and customs clearance protocols from Cochin Port.";

  return (
    <>
      <Head>
        <title>Export Shipping Policy — Auronova Exports | Cochin Port Logistics</title>
        <meta
          name="description"
          content="Export shipping policy, lead times, container stuffing, maritime logistics, and Incoterms (FOB Cochin, CIF, CFR) by Auronova Exports Pvt. Ltd."
        />
        <link rel="canonical" href="https://auronovaexports.com/shipping-policy" />
      </Head>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-20 lg:pt-28 lg:pb-24 border-b border-[#33322B]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            <Ship size={13} className="text-[#D6A441]" />
            Maritime Logistics & Dispatch
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed max-w-2xl mx-auto font-normal">
            {subtitle}
          </p>
          <div className="mt-4 text-xs text-[#FAF7F0]/60">
            Primary Seaport: {portOfLading} · Policy Effective: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-[#E8E0D2] p-8 sm:p-12 shadow-sm space-y-10 text-sm sm:text-base text-[#34332E]/85 leading-relaxed font-normal">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <Anchor size={20} className="text-[#D6A441]" />
                1. Port of Lading & Maritime Facilities
              </h2>
              <p className="mb-4">
                <strong>{companyName}</strong> operates directly from Kochi, Kerala. All commercial maritime container shipments are consolidated and loaded through:
              </p>
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-xs sm:text-sm text-[#24251F] space-y-2 mb-4">
                <p><strong>Primary Ocean Seaport:</strong> Cochin Port (ICTT Vallarpadam / Port Code: INCOK) — India&apos;s all-weather, deep-draft container transshipment terminal with direct mainline vessel calls to Europe, Middle East, Mediterranean, and Americas.</p>
                <p><strong>Air Cargo Gateway:</strong> Cochin International Airport (CIAL / Airport Code: COK) — Dedicated international air cargo complex with temperature-controlled cold storage zones.</p>
              </div>
              <p className="text-xs sm:text-sm text-[#34332E]/75">
                <em>Notice:</em> While Kerala features 18 notified ports, Cochin Port is our dedicated, verified commercial gateway for international ocean container cargo. Non-major notified ports in Kerala serve coastal trade, fishing, or lighterage, and are not represented as general international container terminals.
              </p>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <Package size={20} className="text-[#526747]" />
                2. Container Stuffing & Packaging Integrity
              </h2>
              <p className="mb-4">
                Spices are highly sensitive to oceanic humidity, condensation, and temperature shifts. Our export packing protocols include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#34332E]/80">
                <li>Multi-wall export-grade kraft paper bags with inner food-grade polyethylene moisture barrier liners (25kg / 50kg).</li>
                <li>Double high-density polypropylene (HDPE) woven bags with heat-sealed virgin poly liners for peppercorns and seeds.</li>
                <li>Heavy-duty corrugated master cartons with vacuum-sealed nitrogen-flushed inner foil pouches for delicate green cardamom and golden mace.</li>
                <li>Container interior dry-lining with moisture absorbent desiccant bags (container dri-bags) and kraft paper floor liners.</li>
              </ul>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <Clock size={20} className="text-[#4A2C20]" />
                3. Lead Times & Dispatch Schedule
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#34332E]/80">
                <li><strong>Sample Dispatches:</strong> 48 to 72 hours via international air courier (DHL, FedEx) following receipt of full destination details.</li>
                <li><strong>LCL Palletized Consignments:</strong> 7 to 10 working days from order confirmation to port container stuffing and customs gate-in.</li>
                <li><strong>Full Container Loads (20ft / 40ft FCL):</strong> 10 to 18 working days depending on batch sorting, optical grading, and statutory quarantine inspection.</li>
                <li><strong>Transit Times:</strong> Ocean transit times vary by destination port (e.g., GCC / Middle East: 4–8 days; Western Europe: 18–24 days; US East Coast: 24–30 days). Specific vessel schedules are provided on proforma invoices.</li>
              </ul>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <FileText size={20} className="text-[#D6A441]" />
                4. Mandatory Statutory Shipping Documentation
              </h2>
              <p className="mb-4">
                Every commercial export consignment departing Cochin Port is accompanied by a complete legal document dossier required for foreign customs clearance:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#34332E]/80">
                <li>Commercial Invoice & Detailed Packing List (indicating gross, net, and tare weights)</li>
                <li>Ocean Bill of Lading (Clean on Board B/L) or Air Waybill (AWB)</li>
                <li>Government Phytosanitary Certificate issued by Plant Quarantine Division, Govt. of India</li>
                <li>Certificate of Origin (COO) endorsed by authorized Chamber of Commerce / Export Promotion Council</li>
                <li>Government-Authorized Fumigation Certificate (Phosphine or Methyl Bromide as mandated)</li>
                <li>Batch Certificate of Analysis (COA) specifying moisture, volatile oil content, and cleanliness</li>
              </ul>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-[#526747]" />
                5. Commercial Shipping Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-[#34332E]/80 mb-4">
                To request sea freight estimates, booking schedules, or CIF destination pricing for your nearest port of discharge, contact our Kochi logistics desk:
              </p>
              <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-xs sm:text-sm space-y-1.5 text-[#24251F]">
                <p className="font-bold">{companyName} — Logistics & Shipping Operations</p>
                <p className="text-[#34332E]/70">Export Desk, Spice Trade Centre, Cochin Port Zone, Kochi, Kerala</p>
                <p>
                  Shipping Inquiries:{" "}
                  <a href={`mailto:${companyEmail}`} className="text-[#4A2C20] font-semibold hover:underline">
                    {companyEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/shipping"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A2C20] text-[#FAF7F0] text-xs sm:text-sm font-semibold hover:bg-[#351E16] transition-colors mr-3"
            >
              View Shipping & Pricing Page
              <ArrowRight size={14} className="text-[#D6A441]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#E8E0D2] text-[#24251F] text-xs sm:text-sm font-semibold hover:bg-[#FAF7F0] transition-colors"
            >
              Request Quote
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
      title: "Export Shipping Policy — Auronova Exports Pvt. Ltd.",
      description: "Shipping and logistics policy for spice exports from Cochin Port by Auronova Exports Pvt. Ltd.",
      canonical: "/shipping-policy",
    },
  };
}

