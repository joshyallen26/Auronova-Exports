import Hero from "@/components/sections/Hero";
import CompanyIntro from "@/components/sections/CompanyIntro";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import KeralaHeritage from "@/components/sections/KeralaHeritage";
import QualityCommitment from "@/components/sections/QualityCommitment";
import KeralaPortsSection from "@/components/sections/KeralaPortsSection";
import ExportCapabilities from "@/components/sections/ExportCapabilities";
import EnquirySection from "@/components/sections/EnquirySection";

export default function HomePage() {
  return (
    <>
      {/* 1. Visually striking Hero Section */}
      <Hero />

      {/* 2. Company Introduction */}
      <CompanyIntro />

      {/* 3. Featured Spices & Agricultural Products Portfolio */}
      <FeaturedProducts />

      {/* 4. Regional Origins & Kerala's Spice Heritage */}
      <KeralaHeritage />

      {/* 5. Sourcing & Quality Care */}
      <QualityCommitment />

      {/* 6. Kerala's Ports and Export Connectivity (All 18 Ports) */}
      <KeralaPortsSection />

      {/* 7. Global Export Capabilities & Logistics */}
      <ExportCapabilities />

      {/* 8. Strong Final Commercial Enquiry / RFQ Section */}
      <EnquirySection />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Auronova Exports — The Finest of Indian Spices. Rooted in Kerala. Delivered to the World.",
      description:
        "Indian spice and agricultural export business based in Cochin, Kerala. Connecting global buyers directly with Malabar black pepper, Idukki green cardamom, Erode and Alleppey turmeric, red chilli, cloves, and whole spices.",
      canonical: "/",
    },
  };
}
