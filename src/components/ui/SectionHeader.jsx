import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const alignClass =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
    >
      {eyebrow && (
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: light ? "#D4A017" : "#2D6A4F" }}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight"
        style={{ color: light ? "#FDF6EC" : "#3D1B08" }}
      >
        {title}
      </h2>

      {/* Gold ornament */}
      <div className={`flex items-center gap-3 ${align === "center" ? "self-center" : ""}`}>
        <span style={{ display: "block", height: 1, width: 32, background: "rgba(212,160,23,0.4)" }} />
        <span style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: "#D4A017" }} />
        <span style={{ display: "block", height: 1, width: 32, background: "rgba(212,160,23,0.4)" }} />
      </div>

      {subtitle && (
        <p
          className="text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: light ? "rgba(253,246,236,0.7)" : "#8C7B6B" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
