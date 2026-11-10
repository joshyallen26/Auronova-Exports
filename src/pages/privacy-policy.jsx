import Head from "next/head";
import Link from "next/link";
import { Shield, ArrowRight, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function PrivacyPolicyPage() {
  const { content, integrations } = useWebsiteData();
  const privacyData = content?.legal_privacy?.content || {};

  const companyName = integrations?.companyName || "Auronova Exports Pvt. Ltd.";
  const companyEmail = integrations?.email || "exports@auronovaexports.com";
  const companyAddress = integrations?.officeAddress || "Spice Trade Centre, Cochin Port Zone, Kochi, Kerala 682 001, India";

  const lastUpdated = privacyData.lastUpdated || "November 2026";
  const title = privacyData.title || "Privacy Policy";
  const subtitle = privacyData.subtitle || "How Auronova Exports handles commercial information, buyer specifications, and trade inquiries.";

  return (
    <>
      <Head>
        <title>Privacy Policy — Auronova Exports | International B2B Trade</title>
        <meta
          name="description"
          content="Privacy Policy for Auronova Exports Pvt. Ltd. Details on how we collect, protect, and process commercial buyer specifications and export trade inquiries."
        />
        <link rel="canonical" href="https://auronovaexports.com/privacy-policy" />
      </Head>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-20 lg:pt-28 lg:pb-24 border-b border-[#33322B]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            <Shield size={13} className="text-[#D6A441]" />
            Data Protection & Trade Confidentiality
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed max-w-2xl mx-auto font-normal">
            {subtitle}
          </p>
          <div className="mt-4 text-xs text-[#FAF7F0]/60">
            Effective Date: {lastUpdated} · Registered in Kochi, Kerala
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-[#E8E0D2] p-8 sm:p-12 shadow-sm space-y-10 text-sm sm:text-base text-[#34332E]/85 leading-relaxed font-normal">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <Lock size={20} className="text-[#D6A441]" />
                1. Commercial Information Collection
              </h2>
              <p className="mb-4">
                At <strong>{companyName}</strong>, we collect business and contact information strictly to facilitate B2B trade inquiries, quotation generation, sample dispatches, and export contract fulfillment. The information we collect includes:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#34332E]/80">
                <li>Full Name, Company Designation, and Corporate Identity</li>
                <li>Business Email Address, Telephone, and WhatsApp contact numbers</li>
                <li>Country of destination, discharge port, and shipping preferences</li>
                <li>Spice procurement specifications, estimated volumes, and preferred Incoterms</li>
                <li>Uploaded buyer RFQ specification documents, technical sheets, or quality parameters</li>
              </ul>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <Eye size={20} className="text-[#526747]" />
                2. Use of Information & Confidentiality
              </h2>
              <p className="mb-4">
                All business communications and technical documents submitted through our quotation portal are treated as strictly confidential trade correspondence. We utilize this information exclusively to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#34332E]/80">
                <li>Furnish formal commercial export quotations (FOB Cochin, CIF, CFR)</li>
                <li>Arrange physical spice sample consignments via international air couriers (DHL/FedEx)</li>
                <li>Coordinate export documentation including Certificate of Origin and Phytosanitary certificates</li>
                <li>Communicate operational harvest updates, seasonal availability, and ocean freight logistics</li>
              </ul>
              <p className="mt-4 text-xs sm:text-sm text-[#34332E]/80">
                We do not sell, rent, or trade your commercial data or buyer identities to third-party marketing companies. Information is shared only with authorized statutory bodies (such as Indian Customs, Spices Board of India, or accredited plant quarantine authorities) and certified shipping lines solely for export execution.
              </p>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <FileText size={20} className="text-[#4A2C20]" />
                3. Secure Document Storage & Retention
              </h2>
              <p className="text-xs sm:text-sm text-[#34332E]/80">
                Uploaded requirement documents and commercial RFQs are stored on secure server infrastructure with restricted access limited to authorized trade personnel. Commercial records are retained in compliance with statutory Indian Foreign Trade Regulations and export documentation audit mandates.
              </p>
            </div>

            <div className="border-t border-[#E8E0D2] pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-3 flex items-center gap-2.5">
                <CheckCircle2 size={20} className="text-[#526747]" />
                4. Contact Our Trade Compliance Desk
              </h2>
              <p className="text-xs sm:text-sm text-[#34332E]/80 mb-4">
                If you have inquiries regarding our data handling practices or wish to update or remove your company records from our correspondence database, please contact our trade compliance team:
              </p>
              <div className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-xs sm:text-sm space-y-1.5 text-[#24251F]">
                <p className="font-bold">{companyName}</p>
                <p className="text-[#34332E]/70">{companyAddress}</p>
                <p>
                  Official Email:{" "}
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
              Contact Our Trade Desk
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
      title: "Privacy Policy — Auronova Exports Pvt. Ltd.",
      description: "Privacy policy and trade data protection standards for Auronova Exports Pvt. Ltd., Cochin, Kerala.",
      canonical: "/privacy-policy",
    },
  };
}

