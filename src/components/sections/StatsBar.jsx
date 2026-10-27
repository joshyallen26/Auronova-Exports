import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const stats = [
  { value: 40,   suffix: "+", label: "Countries Served",        icon: "🌍" },
  { value: 20,   suffix: "+", label: "Years of Experience",      icon: "📅" },
  { value: 6,    suffix: "",  label: "Premium Spice Varieties",  icon: "🌿" },
  { value: 200,  suffix: "+", label: "Global Importers",         icon: "🤝" },
  { value: 5000, suffix: "+", label: "Tonnes Exported Yearly",   icon: "⚖️" },
];

function AnimatedNumber({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => { if (inView) motionVal.set(value); }, [inView, value, motionVal]);
  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    });
    return unsub;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section
      style={{
        backgroundColor: "#FDF6EC",
        borderBottom: "1px solid #E8D5BE",
        padding: "3.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle vertical grid lines */}
      <div
        style={{
          position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, transparent 79px, #E8D5BE 79px, #E8D5BE 80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center group"
            >
              <motion.span
                className="text-2xl mb-2"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.span>

              <div
                className="font-bold text-3xl md:text-4xl mb-1"
                style={{ color: "#3D1B08" }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>

              <p
                className="text-xs font-medium uppercase tracking-wide leading-tight"
                style={{ color: "#8C7B6B" }}
              >
                {stat.label}
              </p>

              <div
                style={{
                  marginTop: 8, height: 2, width: 32,
                  backgroundColor: "rgba(212,160,23,0.4)", borderRadius: 999,
                  transition: "width 0.3s, backgroundColor 0.3s",
                }}
                className="group-hover:!bg-[#D4A017] group-hover:!w-12"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
