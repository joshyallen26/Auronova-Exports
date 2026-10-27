import { motion } from "framer-motion";
import { Shield, Leaf, Globe, Truck, FlaskConical, Handshake } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const pillars = [
  {
    Icon: Leaf,
    title: "Farm-to-Export Traceability",
    description: "Every batch is traceable back to the farm. We partner directly with certified growers across Kerala's spice belt — eliminating middlemen and ensuring authentic provenance.",
    color: "#2D6A4F", bg: "rgba(45,106,79,0.08)",
  },
  {
    Icon: Shield,
    title: "International Quality Standards",
    description: "Our processing facilities comply with HACCP, ISO 22000:2018, and EU food safety norms. Rigorous lab testing ensures every shipment meets the highest global benchmarks.",
    color: "#D4A017", bg: "rgba(212,160,23,0.08)",
  },
  {
    Icon: FlaskConical,
    title: "Certified Organic Options",
    description: "We offer certified organic variants of all our spice lines, backed by third-party certifications accepted across North America, Europe, and Asia-Pacific.",
    color: "#5C2D0E", bg: "rgba(92,45,14,0.08)",
  },
  {
    Icon: Truck,
    title: "Reliable Global Logistics",
    description: "Full-container and LCL shipping, vacuum-sealed and nitrogen-flushed packaging, and real-time shipment tracking — ensuring freshness from Kochi to your warehouse.",
    color: "#2D6A4F", bg: "rgba(45,106,79,0.08)",
  },
  {
    Icon: Globe,
    title: "40+ Countries Served",
    description: "From the USA and Germany to Japan and Australia, our spices enrich cuisines and supply chains worldwide. Custom documentation for import compliance in every market.",
    color: "#D4A017", bg: "rgba(212,160,23,0.08)",
  },
  {
    Icon: Handshake,
    title: "Dedicated Export Support",
    description: "A dedicated account manager, flexible MOQs for first orders, and end-to-end documentation including phytosanitary certificates, COA, and MSDS.",
    color: "#5C2D0E", bg: "rgba(92,45,14,0.08)",
  },
];

export default function WhyUs() {
  return (
    <section
      style={{
        padding: "6rem 0",
        backgroundColor: "#F5E9D6",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(212,160,23,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="The Aurnova Difference"
          subtitle="We combine generations of Kerala spice expertise with modern export infrastructure to deliver quality you can count on."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {pillars.map(({ Icon, title, description, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative rounded-2xl p-7 transition-all duration-300"
              style={{
                backgroundColor: "#FFFBF5",
                border: "1px solid #E8D5BE",
                overflow: "hidden",
              }}
              whileHover={{ y: -5, boxShadow: "0 16px 36px rgba(92,45,14,0.1)" }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: bg }}
              >
                <Icon size={24} strokeWidth={1.5} style={{ color }} />
              </div>

              <h3
                className="font-semibold text-lg mb-3 transition-colors"
                style={{ color: "#3D1B08" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8C7B6B" }}>
                {description}
              </p>

              {/* Bottom hover accent */}
              <motion.div
                style={{
                  position: "absolute", bottom: 0, left: 24, right: 24,
                  height: 2, borderRadius: 999, backgroundColor: color,
                  scaleX: 0, originX: 0,
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
