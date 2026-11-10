import Head from "next/head";
import Link from "next/link";
import { Scale, ArrowRight, ShieldCheck, FileCheck, Anchor, Globe } from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function TermsPage() {
  const { content, integrations } = useWebsiteData();
  const termsData = content?.legal_terms?.content || {};

  const companyName = integrations?.companyName || "Auronova Exports Pvt. Ltd.";
  const companyEmail = integrations?.email || "exports@auronovaexports.com";
  const companyAddress = integrations?.officeAddress || "Spice Trade Centre, Cochin Port Zone, Kochi, Kerala 682 001, India";

  const lastUpdated = termsData.lastUpdated || "November 2026";
  const title = termsData.title || "Terms & Conditions of Commercial Trade";
  const subtitle = termsData.subtitle || "Standard international trade provisions, commercial quotations, and export contract guidelines.";

  return (
    <>
      <Head>
        <title>Terms & Conditions — Auronova Exports | Export Trade Provisions</title>
        <meta
          name="description"
          content="Terms and conditions governing international export quotations, proforma contracts, Incoterms, and spice shipments from Cochin Port by Auronova Exports Pvt. Ltd."
        />
        <link rel="canonical" href="https://auronovaexports.com/terms" />
      </Head>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-20 lg:pt-28 lg:pb-24 border-b border-[#33322B]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            <Scale size={13} className="text-[#D6A441]" />
            Commercial Trade Framework
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed max-w-2xl mx-auto font-normal">
            {subtitle}
          </p>
          <div className="mt-4 text-xs text-[#FAF7F0]/60">
            Effective Date: {lastUpdated} · Governed by Indian Commercial Law & Incoterms 2020
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-[#E8E0D2] p-8 sm:p-12 shadow-sm space-y-10 text-sm sm:text-base text-[#34332E]/85 leading-relaxed font-normal">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <FileCheck size={20} className="text-[#D6A441]" />
                1. Commercial Quotations & Validity
              </h2>
              <p className="mb-4">
                All proforma invoices, price quotations, and RFQ responses issued by <strong>{companyName}</strong> reflect the prevailing agricultural market prices at the time of quotation. Due to seasonal agricultural price movements on Indian spice exchanges:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#34332E]/80">
                <li>Quotations remain valid for the period explicitly stipulated on the proforma invoice (normally 3 to 7 business days) unless reconfirmed in writing.</li>
                <li>Firm contracts become legally binding upon written buyer acceptance, issuance of a formal Purchase Order (PO), and fulfillment of agreed payment milestones.</li>
                <li>Quotations are presented in United States Dollars (USD) or Euros (EUR) on FOB Cochin, CIF destination, or CFR terms.</li>
              </ul>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <Anchor size={20} className="text-[#526747]" />
                2. Incoterms & Maritime Logistics
              </h2>
              <p className="mb-4">
                International transactions are governed by the International Chamber of Commerce (ICC) Incoterms 2020 rules:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#34332E]/80">
                <li><strong>FOB Cochin Seaport (ICTT Vallarpadam):</strong> Auronova Exports is responsible for origin inland freight, export packing, Indian customs clearance, and loading onto the buyer-designated vessel. Risk transfers to the buyer once goods pass the ship's rail.</li>
                <li><strong>CIF / CFR (Destination Seaport):</strong> Auronova Exports arranges and prepays ocean freight (and maritime marine insurance in CIF contracts) to the agreed international port of discharge.</li>
                <li><strong>Air Cargo:</strong> Dispatched via Cochin International Airport (CIAL) under CIP or CPT terms for urgent lots or high-value spices.</li>
              </ul>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-[#4A2C20]" />
                3. Quality Standards, Sampling & Inspection
              </h2>
              <p className="text-xs sm:text-sm text-[#34332E]/80 mb-3">
                Pre-shipment representative samples reflect current harvest lots. Upon buyer request and commercial agreement, independent pre-shipment inspections (e.g., SGS, Bureau Veritas, or Spices Board recognized laboratories) can be performed prior to container stuffing at Cochin Port.
              </p>
              <p className="text-xs sm:text-sm text-[#34332E]/80">
                Standard shipments include mandatory Government Phytosanitary Certificates issued by the Plant Quarantine Division and official Certificate of Origin.
              </p>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <Globe size={20} className="text-[#D6A441]" />
                4. Governing Law & Dispute Resolution
              </h2>
              <p className="text-xs sm:text-sm text-[#34332E]/80">
                Any commercial agreements originated through this website are governed by and construed in accordance with the laws of the Republic of India. The courts of Ernakulam / Kochi, Kerala, India shall have jurisdiction over any commercial disputes arising from sales contracts executed by {companyName}.
              </p>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <Scale size={20} className="text-[#526747]" />
                5. Registered Legal Address
              </h2>
              <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-xs sm:text-sm space-y-1.5 text-[#24251F]">
                <p className="font-bold">{companyName}</p>
                <p className="text-[#34332E]/70">{companyAddress}</p>
                <p>
                  Trade Email:{" "}
                  <a href={`mailto:${companyEmail}`} className="text-[#4A2C20] font-semibold hover:underline">
                    {companyEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A2C20] text-[#FAF7F0] text-xs sm:text-sm font-semibold hover:bg-[#351E16] transition-colors"
            >
              Submit Commercial RFQ
              <ArrowRight size={14} className="text-[#D6A441]" />
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
      title: "Terms & Conditions — Auronova Exports Pvt. Ltd.",
      description: "Terms and conditions of commercial export contracts, FOB Cochin logistics, and trade provisions for Auronova Exports.",
      canonical: "/terms",
    },
  };
}

