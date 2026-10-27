import Hero from "@/components/sections/Hero";
import CompanyIntro from "@/components/sections/CompanyIntro";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import KeralaHeritage from "@/components/sections/KeralaHeritage";
import QualityCommitment from "@/components/sections/QualityCommitment";
import ExportCapabilities from "@/components/sections/ExportCapabilities";
import EnquirySection from "@/components/sections/EnquirySection";

export default function HomePage() {
  return (
    <>
      {/* 1. Visually striking Hero Section */}
      <Hero />

      {/* 2. Company Introduction */}
      <CompanyIntro />

      {/* 3. Featured Spices Portfolio */}
      <FeaturedProducts />

      {/* 4. Kerala's Spice Heritage & Western Ghats Terroir */}
      <KeralaHeritage />

      {/* 5. Sourcing & Quality Commitment */}
      <QualityCommitment />

      {/* 6. Global Export Capabilities & Logistics */}
      <ExportCapabilities />

      {/* 7. Strong Final Commercial Enquiry / RFQ Section */}
      <EnquirySection />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Auronova Exports — Premium Kerala Spices Delivered to the World",
      description:
        "Kerala's premier international spice exporter based in Kochi. Supplying Grade A Malabar black pepper, Idukki green cardamom, Alleppey turmeric, cloves, and cinnamon to global food manufacturers and importers.",
      canonical: "/",
    },
  };
}
