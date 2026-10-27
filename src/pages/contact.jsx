import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { spices } from "@/data/spices";

const allProductsList = [
  ...spices.map((s) => s.name),
  "Multiple Products / Mixed Container",
  "Other / Custom Sourcing Requirements",
];

const initialForm = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  country: "",
  phoneWhatsApp: "",
  productOfInterest: "Black Pepper",
  estimatedQuantity: "",
  message: "",
};

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  // Read product from URL query parameter (e.g. /contact?product=Green%20Cardamom)
  useEffect(() => {
    if (router.isReady && router.query.product) {
      const paramProduct = router.query.product;
      const matched = allProductsList.find(
        (p) => p.toLowerCase() === paramProduct.toLowerCase()
      );
      if (matched) {
        setForm((prev) => ({ ...prev, productOfInterest: matched }));
      } else {
        setForm((prev) => ({ ...prev, productOfInterest: paramProduct }));
      }
    }
  }, [router.isReady, router.query.product]);

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.businessEmail.trim()) {
      errs.businessEmail = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail)) {
      errs.businessEmail = "Please enter a valid email address";
    }
    if (!form.country.trim()) errs.country = "Country is required";
    if (!form.phoneWhatsApp.trim()) errs.phoneWhatsApp = "Phone / WhatsApp number is required";
    if (!form.message.trim()) errs.message = "Message or requirement details are required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          company: form.companyName,
          email: form.businessEmail,
          country: form.country,
          quantity: form.estimatedQuantity,
          product: form.productOfInterest,
          message: `Phone/WhatsApp: ${form.phoneWhatsApp} | Message: ${form.message}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(
          data.message || "Unable to send enquiry through the server. Please email exports@auronovaexports.com directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "A network error occurred. Please reach our export desk directly at exports@auronovaexports.com or via WhatsApp."
      );
    }
  };

  // WhatsApp click handler
  const waMessage = encodeURIComponent(
    `Hello Auronova Exports, I am contacting you regarding your Kerala spices export catalogue (Product: ${form.productOfInterest}).`
  );
  const waLink = `https://wa.me/919400000000?text=${waMessage}`;

  const contactFaqs = [
    {
      q: "What is your typical turnaround time for quotation and sample dispatch?",
      a: "Our trade desk issues formal proforma quotations (FOB Cochin or CIF destination) within 24 business hours. Analytical pre-shipment sample packs are dispatched via DHL/FedEx air courier within 48 to 72 hours of specification alignment.",
    },
    {
      q: "What are your minimum order quantities (MOQ)?",
      a: "We support both LCL palletized shipments (typically 500 kg to 3,000 kg depending on commodity) and full container loads (20ft FCL ~14MT, 40ft FCL ~26MT). Smaller quantities can be accommodated for initial trial validation.",
    },
    {
      q: "What export documentation is provided with shipments?",
      a: "Every export shipment includes a Certificate of Analysis (COA), Phytosanitary Certificate issued by the Government of India Plant Quarantine authority, Certificate of Origin, Fumigation Certificate, Packing List, and Maritime Bill of Lading.",
    },
    {
      q: "Can you provide customized packaging or private label bagging?",
      a: "Yes. In addition to our standard 25kg / 50kg multi-wall kraft bags and vacuum packs, we offer customized OEM carton packaging, private labeling, and specific moisture-barrier liner configurations.",
    },
  ];

  const inputBase =
    "w-full px-4 py-2.5 rounded-lg border text-xs sm:text-sm bg-white text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441] transition-all";

  return (
    <>
      {/* Editorial Page Hero with Cochin Seaport & Spice Cargo Background */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#33322B]">
        {/* Cinematic Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-contact-hero.jpg"
            alt="Authentic Cochin seaport spice export cargo bags and cargo vessel at twilight"
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            Commercial Enquiries
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FAF7F0] mb-5">
            Let&apos;s Build a Business Relationship.
          </h1>

          <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal max-w-2xl mx-auto">
            We invite international importers, wholesale distributors, food manufacturers, culinary
            brands, and institutional buyers to contact our Kochi trade desk for pricing, certified
            product specifications, and sample consignments.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Commercial Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-2 block">
                  Export Desk Contact
                </span>
                <h2 className="text-2xl sm:text-3xl text-[#24251F] font-bold mb-4">
                  Auronova Exports Pvt. Ltd.
                </h2>
                <p className="text-xs sm:text-sm text-[#34332E]/70 leading-relaxed mb-6">
                  Our commercial team coordinates contract fulfillment, analytical lab testing, and maritime container loadings directly from Cochin Port.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#526747] flex-shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7F73] mb-1">
                      Office & Warehouse Address
                    </h3>
                    <p className="text-xs sm:text-sm text-[#24251F] font-medium leading-relaxed">
                      Auronova Exports Pvt. Ltd.<br />
                      Spice Trade Centre, Cochin Port Zone<br />
                      Kochi, Kerala 682 001, India
                    </p>
                    <span className="text-[11px] text-[#526747] font-semibold mt-1 block">
                      Port of Lading: Cochin Seaport (ICTT Vallarpadam)
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#D6A441] flex-shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7F73] mb-1">
                      Commercial Email
                    </h3>
                    <a
                      href="mailto:exports@auronovaexports.com"
                      className="text-xs sm:text-sm font-semibold text-[#4A2C20] hover:text-[#526747] transition-colors block"
                    >
                      exports@auronovaexports.com
                    </a>
                    <span className="text-[11px] text-[#34332E]/60 mt-0.5 block">
                      General Desk: info@auronovaexports.com
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#4A2C20] flex-shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7F73] mb-1">
                      Phone & Trade Desk
                    </h3>
                    <a
                      href="tel:+914842900000"
                      className="text-xs sm:text-sm font-semibold text-[#24251F] hover:text-[#4A2C20] block"
                    >
                      +91 (484) 290-0000
                    </a>
                    <span className="text-[11px] text-[#34332E]/60 mt-0.5 block">
                      Direct Mobile / International: +91 94000 00000
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#526747] flex-shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7F73] mb-1">
                      Business Hours (IST - UTC+5:30)
                    </h3>
                    <p className="text-xs text-[#24251F] leading-snug">
                      Monday to Friday: 09:00 AM – 06:30 PM IST<br />
                      Saturday: 09:00 AM – 01:30 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>Chat With Our Export Team on WhatsApp</span>
                </a>
              </div>

              {/* Configurable Map Section */}
              <div className="p-5 rounded-xl bg-white border border-[#E8E0D2] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#24251F]">Cochin Port Zone Facility</span>
                  <a
                    href="https://maps.google.com/?q=Kochi,Kerala,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#4A2C20] hover:underline font-semibold"
                  >
                    Open Google Maps →
                  </a>
                </div>
                <div className="w-full h-36 rounded-lg bg-[#FAF7F0] border border-[#E8E0D2] flex flex-col items-center justify-center text-center p-4">
                  <MapPin size={24} className="text-[#D6A441] mb-1" />
                  <span className="text-xs font-semibold text-[#24251F]">Kochi, Kerala 682 001</span>
                  <span className="text-[10px] text-[#34332E]/60 mt-0.5">
                    Strategic access to International Container Transshipment Terminal (ICTT)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Accessible Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E8E0D2] shadow-xl">
                <div className="mb-6 pb-4 border-b border-[#E8E0D2]">
                  <h2 className="text-2xl font-bold text-[#24251F] mb-1">
                    B2B Export Enquiry & Sample Request
                  </h2>
                  <p className="text-xs text-[#34332E]/70">
                    Fields marked with * are required. We review commercial inquiries and respond within 24 business hours.
                  </p>
                </div>

                {status === "success" ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#526747]/15 text-[#526747] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#24251F] mb-2">
                      Enquiry Successfully Transmitted
                    </h3>
                    <p className="text-xs sm:text-sm text-[#34332E]/75 max-w-md mx-auto leading-relaxed mb-6">
                      Thank you for contacting Auronova Exports. Our trade desk has received your request regarding <strong>{form.productOfInterest}</strong> and will furnish official pricing and specifications within 24 business hours.
                    </p>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setForm(initialForm);
                      }}
                      className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#4A2C20] text-[#FAF7F0] hover:bg-[#351E16] transition-colors"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {status === "error" && (
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-red-600" />
                        <div>
                          <strong>Transmission Alert:</strong> {errorMessage}
                        </div>
                      </div>
                    )}

                    {/* Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="e.g. John Henderson"
                          className={`${inputBase} ${errors.fullName ? "border-red-400 focus:ring-red-300" : "border-[#E8E0D2]"}`}
                        />
                        {errors.fullName && (
                          <span className="text-[11px] text-red-600 mt-1 block font-medium">{errors.fullName}</span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                          Company / Business Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleChange}
                          placeholder="e.g. Atlantic Foods Group"
                          className={`${inputBase} border-[#E8E0D2]`}
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          name="businessEmail"
                          value={form.businessEmail}
                          onChange={handleChange}
                          placeholder="j.henderson@atlanticfoods.com"
                          className={`${inputBase} ${errors.businessEmail ? "border-red-400 focus:ring-red-300" : "border-[#E8E0D2]"}`}
                        />
                        {errors.businessEmail && (
                          <span className="text-[11px] text-red-600 mt-1 block font-medium">{errors.businessEmail}</span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                          Phone or WhatsApp Number *
                        </label>
                        <input
                          type="text"
                          name="phoneWhatsApp"
                          value={form.phoneWhatsApp}
                          onChange={handleChange}
                          placeholder="+1 (555) 234-5678"
                          className={`${inputBase} ${errors.phoneWhatsApp ? "border-red-400 focus:ring-red-300" : "border-[#E8E0D2]"}`}
                        />
                        {errors.phoneWhatsApp && (
                          <span className="text-[11px] text-red-600 mt-1 block font-medium">{errors.phoneWhatsApp}</span>
                        )}
                      </div>
                    </div>

                    {/* Country & Product of Interest */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                          Destination Country *
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="e.g. Germany / United Kingdom / USA"
                          className={`${inputBase} ${errors.country ? "border-red-400 focus:ring-red-300" : "border-[#E8E0D2]"}`}
                        />
                        {errors.country && (
                          <span className="text-[11px] text-red-600 mt-1 block font-medium">{errors.country}</span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                          Product of Interest *
                        </label>
                        <select
                          name="productOfInterest"
                          value={form.productOfInterest}
                          onChange={handleChange}
                          className={`${inputBase} border-[#E8E0D2]`}
                        >
                          {allProductsList.map((prod) => (
                            <option key={prod} value={prod}>
                              {prod}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Estimated Quantity (Optional) */}
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Estimated Quantity (Optional)
                      </label>
                      <input
                        type="text"
                        name="estimatedQuantity"
                        value={form.estimatedQuantity}
                        onChange={handleChange}
                        placeholder="e.g. 1 Tonne Trial / 20ft FCL Container / Pre-shipment Sample"
                        className={`${inputBase} border-[#E8E0D2]`}
                      />
                    </div>

                    {/* Message Details */}
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Message & Specific Requirements *
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Please state target specifications, required certificates (COA, Organic, FSSAI), target destination port, and packaging preferences..."
                        className={`${inputBase} ${errors.message ? "border-red-400 focus:ring-red-300" : "border-[#E8E0D2]"} resize-none`}
                      />
                      {errors.message && (
                        <span className="text-[11px] text-red-600 mt-1 block font-medium">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3.5 rounded-lg text-xs font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send size={15} className="text-[#D6A441]" />
                      <span>{status === "submitting" ? "Transmitting Enquiry..." : "Submit Export Enquiry"}</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#34332E]/60 pt-2">
                      <ShieldCheck size={14} className="text-[#526747]" />
                      <span>Your commercial inquiry is processed under strict business confidentiality.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concise Export FAQ Section */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#E8E0D2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-2 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl text-[#24251F] font-bold">
              Product Enquiries & Quotation Guidance
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {contactFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-[#E8E0D2] overflow-hidden bg-[#FAF7F0] transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#24251F]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#D6A441] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#34332E]/80 leading-relaxed border-t border-[#E8E0D2]/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Contact Us — Let's Build a Business Relationship | Auronova Exports",
      description:
        "Contact Auronova Exports in Kochi, Kerala for commercial bulk spice enquiries, proforma pricing (FOB/CIF), pre-shipment sample packs, and export documentation.",
      canonical: "/contact",
    },
  };
}
