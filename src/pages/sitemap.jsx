import Head from "next/head";
import Link from "next/link";
import { Compass, ArrowRight, Package, FileText, Anchor, ShieldCheck, Mail, Info, HelpCircle } from "lucide-react";
import { spices } from "@/data/spices";
import { keralaPorts } from "@/data/ports";

export default function SitemapPage() {
  const mainPages = [
    { label: "Home", href: "/", desc: "Homepage, company intro, featured spices, and origin highlights" },
    { label: "Products Catalogue", href: "/products", desc: "11 core Indian & Kerala spices with full technical specifications" },
    { label: "Sourcing & Quality", href: "/sourcing", desc: "Direct farm connections, post-harvest sorting, and quality controls" },
    { label: "Shipping & Pricing", href: "/shipping", desc: "Incoterms (FOB/CIF/CFR), MOQ guidance, packaging, and Kerala ports" },
    { label: "About Us", href: "/about", desc: "Company story, mission, vision, regional terroir, and export markets" },
    { label: "Compliance & Standards", href: "/certifications", desc: "Export credentials, Spices Board, FSSAI, COO, and Phytosanitary" },
    { label: "FAQ", href: "/faq", desc: "Frequently asked questions regarding MOQ, pricing, shipping, and samples" },
    { label: "Contact / Request a Quote", href: "/contact", desc: "B2B commercial quotation form with multi-product selection and file upload" },
  ];

  const legalPages = [
    { label: "Privacy Policy", href: "/privacy-policy", desc: "Commercial trade confidentiality, RFQ protection, and data practices" },
    { label: "Terms & Conditions", href: "/terms", desc: "Proforma contracts, quotation validity, Incoterms, and governing jurisdiction" },
    { label: "Shipping Policy", href: "/shipping-policy", desc: "Port of lading (Cochin Seaport ICTT), lead times, and documentation" },
    { label: "Sitemap", href: "/sitemap", desc: "Complete structural directory of all public pages and products" },
  ];

  return (
    <>
      <Head>
        <title>Sitemap — Auronova Exports | Complete Directory</title>
        <meta
          name="description"
          content="Complete HTML sitemap and directory of Auronova Exports website pages, spice catalogues, sourcing standards, and export logistics."
        />
        <link rel="canonical" href="https://auronovaexports.com/sitemap" />
      </Head>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-20 lg:pt-28 lg:pb-24 border-b border-[#33322B]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            <Compass size={13} className="text-[#D6A441]" />
            Site Navigation & Directory
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight mb-4">
            Website Sitemap
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed max-w-2xl mx-auto font-normal">
            Quickly navigate all public sections, technical spice specifications, trade policies, and export infrastructure of Auronova Exports.
          </p>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {/* Main Navigation Pages */}
          <div className="bg-white rounded-2xl border border-[#E8E0D2] p-8 sm:p-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-6 flex items-center gap-3">
              <Compass size={22} className="text-[#D6A441]" />
              Core Website Pages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mainPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="p-4 rounded-xl border border-[#E8E0D2] hover:border-[#D6A441] hover:bg-[#FAF7F0] transition-all group flex items-start justify-between gap-3"
                >
                  <div>
                    <h3 className="font-bold text-sm text-[#24251F] group-hover:text-[#4A2C20] flex items-center gap-2">
                      {page.label}
                    </h3>
                    <p className="text-xs text-[#34332E]/70 mt-1 leading-relaxed">
                      {page.desc}
                    </p>
                  </div>
                  <ArrowRight size={15} className="text-[#8C7F73] group-hover:text-[#D6A441] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Specifications Catalogue */}
          <div className="bg-white rounded-2xl border border-[#E8E0D2] p-8 sm:p-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-6 flex items-center gap-3">
              <Package size={22} className="text-[#526747]" />
              Export Spice Catalogue (11 Core Commodities)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {spices.map((spice) => (
                <Link
                  key={spice.id}
                  href={`/products#${spice.slug}`}
                  className="p-4 rounded-xl border border-[#E8E0D2] hover:border-[#526747] hover:bg-[#FAF7F0] transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm text-[#24251F] group-hover:text-[#526747]">
                      {spice.name}
                    </h3>
                    <span className="text-[10px] uppercase font-semibold text-[#8C7F73] px-2 py-0.5 rounded bg-gray-100">
                      {spice.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#34332E]/60 italic mb-1.5">{spice.botanicalName}</p>
                  <p className="text-xs text-[#34332E]/80 line-clamp-2">{spice.characteristics}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Legal, Trade Policies & Compliance */}
          <div className="bg-white rounded-2xl border border-[#E8E0D2] p-8 sm:p-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[#24251F] mb-6 flex items-center gap-3">
              <ShieldCheck size={22} className="text-[#4A2C20]" />
              Legal Policies & Compliance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {legalPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="p-4 rounded-xl border border-[#E8E0D2] hover:border-[#4A2C20] hover:bg-[#FAF7F0] transition-all group flex items-start justify-between gap-3"
                >
                  <div>
                    <h3 className="font-bold text-sm text-[#24251F] group-hover:text-[#4A2C20]">
                      {page.label}
                    </h3>
                    <p className="text-xs text-[#34332E]/70 mt-1 leading-relaxed">
                      {page.desc}
                    </p>
                  </div>
                  <ArrowRight size={15} className="text-[#8C7F73] group-hover:text-[#4A2C20] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </Link>
              ))}
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
      title: "Sitemap — Auronova Exports Pvt. Ltd.",
      description: "Directory of all pages, spice products, sourcing guidelines, and shipping information on Auronova Exports.",
      canonical: "/sitemap",
    },
  };
}

