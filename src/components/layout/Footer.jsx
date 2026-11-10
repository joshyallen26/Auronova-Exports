import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ArrowRight, ShieldCheck, Award, MessageCircle } from "lucide-react";
import { navLinks, spices as defaultSpices } from "@/data/spices";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { products: dynamicProducts, integrations, content } = useWebsiteData();

  const footerData = content?.global_footer?.content || {};

  const spices = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : defaultSpices;
  const companyName = integrations?.companyName || "Auronova Exports Pvt. Ltd.";
  const phone = footerData.customPhone || integrations?.phone || content?.contact?.phone || "+91 (484) 290-0000";
  const whatsapp = integrations?.whatsappNumber || "+91 94000 00000";
  const email = footerData.customEmail || integrations?.email || content?.contact?.email || "exports@auronovaexports.com";
  const address = footerData.customAddress || integrations?.officeAddress || content?.contact?.address || "Auronova Exports Pvt. Ltd.\nSpice Trade Centre, Cochin Port Zone\nKochi, Kerala 682 001, India";
  const brandTagline = footerData.brandTagline || "Connecting international buyers directly with authentic Indian spices and agricultural products, with sourcing operations and primary identity rooted in Kerala. Cleaned, graded, and exported directly through Cochin Port.";
  const showTrustBadge = footerData.showTrustBadge !== false;
  const trustBadgeText = footerData.trustBadgeText || "Government Registered Export Merchant · Cochin Port, Kerala";
  const navigationTitle = footerData.navigationTitle || "Navigation";
  const productsTitle = footerData.productsTitle || "Export Spices";
  const headquartersTitle = footerData.headquartersTitle || "Export Headquarters";
  const portOfLadingLabel = footerData.portOfLadingLabel || "Primary Port of Lading:";
  const portOfLadingValue = footerData.portOfLadingValue || integrations?.portOfLading || "Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo";
  const copyrightText = footerData.copyrightText || `${companyName} All rights reserved. Registered in Kochi, Kerala.`;
  const showSocialLinks = footerData.showSocialLinks !== false;
  const showRfqQuickLink = footerData.showRfqQuickLink !== false;
  const rfqQuickLinkLabel = footerData.rfqQuickLinkLabel || "Request RFQ";

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Sitemap", href: "/sitemap" },
  ];

  const bottomLinks = Array.isArray(footerData.bottomLinks) && footerData.bottomLinks.length > 0
    ? footerData.bottomLinks
    : [
        { label: "About", href: "/about" },
        { label: "Sourcing & Quality", href: "/sourcing" },
        { label: "Shipping & Pricing", href: "/shipping" },
        { label: "FAQ", href: "/faq" },
        { label: "Compliance", href: "/certifications" },
        { label: "Contact", href: "/contact" },
      ];

  return (
    <footer className="bg-[#1C1D18] text-[#FAF7F0] border-t border-[#33322B] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#4A2C20] blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#33322B]">
          {/* Brand & Mission */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6 group">
              <img
                src="/images/logo-white.png"
                alt="Aura Nova Export — Global Trade"
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#FAF7F0]/70 leading-relaxed mb-6 font-normal">
              {brandTagline}
            </p>

            {showTrustBadge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF7F0]/5 border border-white/10 text-xs text-[#FAF7F0]/80">
                <ShieldCheck size={14} className="text-[#D6A441]" />
                <span>{trustBadgeText}</span>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-4">
              {navigationTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F0]/75">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#D6A441] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {showRfqQuickLink && (
                <li>
                  <Link href="#rfq-section" className="hover:text-[#D6A441] transition-colors inline-block">
                    {rfqQuickLinkLabel}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Export Portfolio */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-4">
              {productsTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F0]/75">
              {spices.map((spice) => (
                <li key={spice.id}>
                  <Link
                    href={`/products#${spice.slug}`}
                    className="hover:text-[#D6A441] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D6A441]" />
                    {spice.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trade Office & Dispatch */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-4">
              {headquartersTitle}
            </h4>
            <ul className="space-y-3 text-xs text-[#FAF7F0]/75">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#D6A441] flex-shrink-0 mt-0.5" />
                <span className="whitespace-pre-line leading-relaxed">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#D6A441] flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#D6A441] transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#D6A441] flex-shrink-0" />
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-[#D6A441] transition-colors">
                  {phone}
                </a>
              </li>
              {whatsapp && (
                <li className="flex items-center gap-2.5">
                  <MessageCircle size={15} className="text-[#D6A441] flex-shrink-0" />
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D6A441] transition-colors"
                  >
                    WhatsApp: {whatsapp}
                  </a>
                </li>
              )}
            </ul>

            <div className="mt-5 pt-4 border-t border-[#33322B]">
              <span className="text-[11px] text-[#FAF7F0]/50 block">{portOfLadingLabel}</span>
              <span className="text-xs text-[#FAF7F0] font-medium block mt-0.5">
                {portOfLadingValue}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-[#FAF7F0]/60">
          <p>© {currentYear} {copyrightText}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {bottomLinks.map((link, idx) => (
              <Link key={`bot-${idx}`} href={link.href} className="hover:text-[#FAF7F0] transition-colors">
                {link.label}
              </Link>
            ))}
            <span className="hidden sm:inline text-white/20">|</span>
            {legalLinks.map((link, idx) => (
              <Link key={`legal-${idx}`} href={link.href} className="text-[#D6A441]/80 hover:text-[#D6A441] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
