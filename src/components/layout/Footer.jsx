import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { navLinks, spices } from "@/data/spices";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              Premier international spice export house based in Cochin, Kerala. Sourcing authentic Malabar black pepper, green cardamom, turmeric, and whole spices directly from high-elevation Western Ghats estates for global commercial importers.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF7F0]/5 border border-white/10 text-xs text-[#FAF7F0]/80">
              <ShieldCheck size={14} className="text-[#D6A441]" />
              <span>Government Registered Export Merchant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-4">
              Navigation
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
              <li>
                <Link href="#rfq-section" className="hover:text-[#D6A441] transition-colors inline-block">
                  Request RFQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Export Portfolio */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-4">
              Export Spices
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
              Export Headquarters
            </h4>
            <ul className="space-y-3 text-xs text-[#FAF7F0]/75">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#D6A441] flex-shrink-0 mt-0.5" />
                <span>
                  Auronova Exports Pvt. Ltd.<br />
                  Spice Trade Centre, Cochin Port Zone<br />
                  Kochi, Kerala 682 001, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#D6A441] flex-shrink-0" />
                <a href="mailto:exports@auronovaexports.com" className="hover:text-[#D6A441] transition-colors">
                  exports@auronovaexports.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#D6A441] flex-shrink-0" />
                <a href="tel:+914842900000" className="hover:text-[#D6A441] transition-colors">
                  +91 (484) 290-0000 / +91 94000 00000
                </a>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-[#33322B]">
              <span className="text-[11px] text-[#FAF7F0]/50 block">Primary Port of Lading:</span>
              <span className="text-xs text-[#FAF7F0] font-medium block mt-0.5">
                Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F0]/50">
          <p>© {currentYear} Auronova Exports Pvt. Ltd. All rights reserved. Registered in Kochi, Kerala.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#FAF7F0] transition-colors">About Company</Link>
            <Link href="/products" className="hover:text-[#FAF7F0] transition-colors">Specifications</Link>
            <Link href="/contact" className="hover:text-[#FAF7F0] transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
