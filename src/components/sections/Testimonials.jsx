import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    id: "1",
    name: "James Holloway",
    company: "Spice Lane Imports",
    country: "🇬🇧 United Kingdom",
    rating: 5,
    message:
      "Aurnova's Malabar black pepper is consistently the finest we've sourced in 15 years of trading. Impeccable aroma, superior piperine content, and always delivered on schedule. A true partner.",
  },
  {
    id: "2",
    name: "Yuki Tanaka",
    company: "Tanaka Food Corp.",
    country: "🇯🇵 Japan",
    rating: 5,
    message:
      "The cardamom quality exceeds Japanese food safety requirements with ease. Their documentation is flawless and their team is incredibly responsive. We've made Aurnova our exclusive Kerala spice supplier.",
  },
  {
    id: "3",
    name: "Amara Osei",
    company: "AfriSpice Distributors",
    country: "🇬🇭 Ghana",
    rating: 5,
    message:
      "Outstanding turmeric — high curcumin content, vibrant colour, and perfectly clean. The organic certification made it simple to sell into European markets. Highly recommend Aurnova to any serious importer.",
  },
  {
    id: "4",
    name: "Sophie Laurent",
    company: "Épices du Monde",
    country: "🇫🇷 France",
    rating: 5,
    message:
      "We tested seven Indian exporters before choosing Aurnova. Their attention to detail in packaging, their EU-compliance documentation, and their consistency batch after batch set them apart entirely.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const t = testimonials[current];

  return (
    <section style={{ padding: "6rem 0", backgroundColor: "#FDF6EC" }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="What Our Clients Say"
          title="Trusted by Importers Worldwide"
          align="center"
          className="mb-14"
        />

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl p-8 md:p-12 relative"
              style={{
                backgroundColor: "#FFFBF5",
                border: "1px solid #E8D5BE",
                boxShadow: "0 8px 40px rgba(92,45,14,0.08)",
              }}
            >
              {/* Large quote icon */}
              <Quote
                size={56}
                style={{
                  position: "absolute", top: 24, right: 32,
                  color: "rgba(212,160,23,0.15)",
                  fill: "rgba(212,160,23,0.15)",
                }}
              />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} style={{ fill: "#D4A017", color: "#D4A017" }} />
                ))}
              </div>

              {/* Message */}
              <p
                className="text-xl md:text-2xl leading-relaxed mb-8 italic"
                style={{ color: "#3D1B08" }}
              >
                &ldquo;{t.message}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: "#5C2D0E", color: "#D4A017" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "#3D1B08" }}>{t.name}</p>
                  <p className="text-sm" style={{ color: "#8C7B6B" }}>
                    {t.company} · {t.country}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ border: "1px solid #E8D5BE", color: "#3D1B08" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#5C2D0E"; e.currentTarget.style.color = "#FDF6EC"; e.currentTarget.style.borderColor = "#5C2D0E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#3D1B08"; e.currentTarget.style.borderColor = "#E8D5BE"; }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 24 : 8, height: 8, borderRadius: 999,
                    backgroundColor: i === current ? "#D4A017" : "#E8D5BE",
                    transition: "all 0.3s",
                    border: "none", cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ border: "1px solid #E8D5BE", color: "#3D1B08" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#5C2D0E"; e.currentTarget.style.color = "#FDF6EC"; e.currentTarget.style.borderColor = "#5C2D0E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#3D1B08"; e.currentTarget.style.borderColor = "#E8D5BE"; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
