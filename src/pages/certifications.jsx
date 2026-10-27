import Certifications from "@/components/sections/Certifications";
import CTABanner from "@/components/sections/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";

export default function CertificationsPage() {
  return (
    <>
      {/* Hero Section with Botanical Food Testing Lab Background */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#33322B]">
        {/* Cinematic Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-certifications-hero.jpg"
            alt="High-end botanical food testing laboratory table with whole spices and analytical glassware"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          {/* Dual Layer Gradient Overlays for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181914]/95 via-[#181914]/85 to-[#181914]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-[#24251F]/40 to-[#181914]/60" />
        </div>

        {/* Ambient Warm Golden Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5"
          >
            Quality & Compliance
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5 text-[#FAF7F0]"
          >
            Our <span className="text-[#D6A441]">Certifications</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal"
          >
            Every certification we hold represents our unwavering commitment to food safety, quality, and ethical sourcing.
          </motion.p>
        </div>
      </section>

      {/* Why certifications matter */}
      <section style={{ padding: "4rem 1.5rem", backgroundColor: "#FDF6EC" }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            eyebrow="Why It Matters"
            title="Certified Quality, Guaranteed Trust"
            subtitle="Importing food products internationally demands rigorous compliance. Our certifications ensure every shipment meets the regulatory requirements of your market."
            align="center"
          />
        </div>
      </section>

      <Certifications />
      <CTABanner />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Certifications — Aurnova Exports | FSSAI, HACCP, ISO 22000, Organic",
      description: "Aurnova Exports holds FSSAI, HACCP, ISO 22000:2018, EU Organic, and Spices Board India certifications ensuring the highest global food safety standards.",
      canonical: "/certifications",
    },
  };
}
