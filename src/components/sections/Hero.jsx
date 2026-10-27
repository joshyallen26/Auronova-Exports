import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";

const slides = [
  {
    id: "spice-selection",
    tagline: "Premium Spice Selection — Kerala's spice heritage for global markets",
    headlineMain: "The Finest Spices of Kerala.",
    headlineHighlight: "Delivered to the World.",
    description:
      "Direct from the fertile Western Ghats highlands, supplying authentic Kerala black pepper, green cardamom, cinnamon, and turmeric to international business buyers.",
    image: "/images/hero-spices.jpg",
    alt: "Authentic Kerala spices: Malabar black peppercorns, Idukki green cardamom, Alleppey turmeric, Ceylon cinnamon sticks, and star anise on dark slate",
    shortName: "Spice Selection",
  },
  {
    id: "black-pepper",
    tagline: "Kerala Black Pepper — Bold character. Authentic origin.",
    headlineMain: "The Finest Spices of Kerala.",
    headlineHighlight: "Delivered to the World.",
    description:
      "Sun-cured Tellicherry black peppercorns renowned for their robust heat, high piperine content, and distinct Malabar terroir.",
    image: "/images/black-pepper.jpg",
    alt: "Bold Tellicherry Malabar black peppercorns in dark ceramic artisan bowl on slate",
    shortName: "Black Pepper",
  },
  {
    id: "green-cardamom",
    tagline: "Green Cardamom — Distinctive aroma. Natural richness.",
    headlineMain: "The Finest Spices of Kerala.",
    headlineHighlight: "Delivered to the World.",
    description:
      "Hand-picked from the misty Cardamom Hills of Idukki, prized globally for intense camphoraceous sweetness and high essential oil content.",
    image: "/images/cardamom.jpg",
    alt: "Vibrant green cardamom pods hand-harvested in the high ranges of Idukki, Kerala",
    shortName: "Green Cardamom",
  },
  {
    id: "cinnamon-turmeric",
    tagline: "Cinnamon & Turmeric — Pure botanical integrity. Sun-cured quality.",
    headlineMain: "The Finest Spices of Kerala.",
    headlineHighlight: "Delivered to the World.",
    description:
      "Paper-thin Ceylon cinnamon quills and high-curcumin golden turmeric, tested and exported under strict international food safety standards.",
    image: "/images/cinnamon.jpg",
    alt: "Ceylon cinnamon quills tied with natural twine and golden spices on dark stone",
    shortName: "Cinnamon & Turmeric",
  },
];

const SLIDE_DURATION = 6500; // 6.5 seconds per slide

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Automatic slide interval with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const slide = slides[current];

  return (
    <section
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Kerala Spices Showcase Slider"
      className="relative w-full overflow-hidden bg-[#181914] text-[#FAF7F0] focus:outline-none min-h-[580px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[780px] flex items-center select-none"
    >
      {/* Background Slides with Cross-Fade & Subtle Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The High-Resolution Hero Photograph */}
            <motion.img
              src={slide.image}
              alt={slide.alt}
              initial={reducedMotion ? {} : { scale: 1.0 }}
              animate={reducedMotion ? {} : { scale: 1.06 }}
              transition={{ duration: 7, ease: "linear" }}
              className="w-full h-full object-cover object-center lg:object-[center_right]"
              loading={current === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Refined Directional Vignette Overlays for 100% Text Readability */}
        {/* Left-to-right gradient for desktop: heavy contrast on left, reveals gorgeous image on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#181914] via-[#181914]/85 sm:via-[#181914]/70 to-[#181914]/20 lg:to-transparent pointer-events-none" />
        
        {/* Top & bottom subtle darkening for balanced framing */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181914]/90 via-transparent to-[#181914]/40 pointer-events-none" />
        
        {/* Delicate golden accent glow in top-left */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#D6A441]/10 blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 md:py-24 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Slide Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24251F]/70 border border-[#D6A441]/40 backdrop-blur-md mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#D6A441]">
                <Sparkles size={12} className="text-[#D6A441] flex-shrink-0" />
                <span className="truncate">{slide.tagline}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.14] tracking-tight text-[#FAF7F0] mb-5">
                {slide.headlineMain}{" "}
                <span className="text-[#D6A441] block sm:inline italic mt-1 sm:mt-0">
                  {slide.headlineHighlight}
                </span>
              </h1>

              {/* Concise Supporting Description */}
              <p className="text-sm sm:text-base md:text-lg text-[#FAF7F0]/85 font-normal leading-relaxed mb-8 max-w-xl text-balance">
                {slide.description}
              </p>

              {/* Exactly Two Clean CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-lg text-xs sm:text-sm font-semibold text-[#24251F] bg-[#D6A441] hover:bg-[#E4B85C] shadow-lg shadow-[#D6A441]/20 transition-all duration-200 group"
                >
                  <span>Explore Our Spices</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-lg text-xs sm:text-sm font-semibold text-[#FAF7F0] bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/40 backdrop-blur-sm transition-all duration-200"
                >
                  <span>Request a Quote</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Minimal Navigation Arrows (Left & Right) */}
      <div className="absolute inset-y-0 left-3 sm:left-6 z-20 flex items-center pointer-events-none">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#181914]/60 hover:bg-[#D6A441] text-[#FAF7F0] hover:text-[#24251F] border border-white/15 hover:border-[#D6A441] backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-3 sm:right-6 z-20 flex items-center pointer-events-none">
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#181914]/60 hover:bg-[#D6A441] text-[#FAF7F0] hover:text-[#24251F] border border-white/15 hover:border-[#D6A441] backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Refined Bottom Pagination Indicators & Progress Bar */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Slide Indicators with Progress Line */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {slides.map((item, index) => {
              const isActive = index === current;
              return (
                <button
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${item.shortName}`}
                  aria-current={isActive ? "true" : "false"}
                  className={`group relative text-left py-2 px-1 transition-all ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#D6A441]">
                      0{index + 1}
                    </span>
                    <span className="hidden md:inline text-xs font-semibold text-[#FAF7F0] truncate max-w-[120px]">
                      {item.shortName}
                    </span>
                  </div>

                  {/* Indicator Bar with Animated Progress when Active */}
                  <div className="w-12 sm:w-16 md:w-24 h-[3px] bg-white/20 rounded-full overflow-hidden">
                    {isActive ? (
                      <motion.div
                        key={`bar-${index}-${current}`}
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused ? "100%" : "100%" }}
                        transition={{
                          duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                          ease: "linear",
                        }}
                        className="h-full bg-[#D6A441] rounded-full"
                      />
                    ) : (
                      <div className="w-0 h-full bg-[#D6A441] rounded-full group-hover:w-1/3 transition-all duration-200" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Autoplay status / Pause indicator */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#FAF7F0]/60">
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="p-1.5 rounded-md hover:bg-white/10 text-[#FAF7F0]/70 hover:text-[#D6A441] transition-colors flex items-center gap-1.5"
              aria-label={isPaused ? "Play slide rotation" : "Pause slide rotation"}
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
              <span>{isPaused ? "Paused" : "Auto-playing"}</span>
            </button>
            <span className="text-white/20">•</span>
            <span>Use ← → arrows to navigate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
