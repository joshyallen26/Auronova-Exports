import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { navLinks } from "@/data/spices";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function Header({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useRouter();
  const { integrations, content } = useWebsiteData();

  const phone = integrations?.phone || content?.contact?.phone || "+91 (484) 290-0000";
  const email = integrations?.email || content?.contact?.email || "exports@auronovaexports.com";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* Editorial Top Utility Bar */}
      <div className="bg-[#24251F] text-[#FAF7F0] text-xs py-2.5 border-b border-[#3D3A30]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#D6A441] font-medium tracking-wide">
              <ShieldCheck size={13} className="text-[#D6A441]" />
              Government Registered Spice Exporter · Cochin Port, Kerala
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[#FAF7F0]/70">
              <Globe size={12} className="text-[#D6A441]" />
              Shipping to International Ports (FOB / CIF / CFR)
            </span>
          </div>

          <div className="flex items-center gap-6 text-[#FAF7F0]/80">
            <a
              href={`mailto:${email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-[#D6A441] transition-colors"
            >
              <Mail size={12} className="text-[#D6A441]" />
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#D6A441] transition-colors font-medium"
            >
              <Phone size={12} className="text-[#D6A441]" />
              {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF7F0]/95 backdrop-blur-md shadow-sm border-b border-[#E8E0D2] py-3.5"
            : "bg-[#FAF7F0] border-b border-[#E8E0D2]/70 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo-compact.png"
              alt="Aura Nova Export — Global Trade"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
            {navLinks
              .filter((l) => l.href !== "/contact")
              .map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap ${
                      active
                        ? "text-[#4A2C20] font-semibold bg-[#4A2C20]/5"
                        : "text-[#24251F]/80 hover:text-[#4A2C20] hover:bg-[#4A2C20]/5"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#D6A441] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-lg text-xs xl:text-sm font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-all duration-200 whitespace-nowrap"
            >
              Contact / Quote
              <ArrowRight size={14} className="text-[#D6A441]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[#24251F] hover:bg-[#4A2C20]/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#24251F]/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 z-50 h-full w-80 bg-[#FAF7F0] shadow-2xl flex flex-col justify-between p-6 border-l border-[#E8E0D2]"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#E8E0D2]">
                  <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                    <img
                      src="/images/logo-compact.png"
                      alt="Aura Nova Export"
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg text-[#24251F] hover:bg-[#4A2C20]/10"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? "bg-[#4A2C20] text-[#FAF7F0] font-semibold"
                            : "text-[#24251F] hover:bg-[#4A2C20]/5"
                        }`}
                      >
                        {link.label}
                        <ArrowRight size={14} className={active ? "text-[#D6A441]" : "text-[#24251F]/40"} />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-[#E8E0D2] space-y-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors"
                >
                  Request a Quote
                  <ArrowRight size={14} className="text-[#D6A441]" />
                </Link>
                <div className="text-xs text-[#24251F]/70 space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone size={13} className="text-[#526747]" />
                    {phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={13} className="text-[#526747]" />
                    {email}
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
