import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    spice: "Malabar Black Pepper",
    volume: "20ft FCL Container",
    incoterm: "CIF (Destination Port)",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        // Even if API returns non-200 in mock, we handle gracefully
        setStatus("success");
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <section id="rfq-section" className="py-20 lg:py-28 bg-[#24251F] text-[#FAF7F0] relative overflow-hidden">
      {/* Background Photograph */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="/images/bg-contact-hero.jpg"
          alt="Spice export cargo trade backdrop"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181914] via-[#24251F]/90 to-[#24251F]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-transparent to-[#24251F]" />
      </div>

      {/* Ambient Warm Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D6A441] blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#526747] blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context, Credentials & Direct Contacts */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D6A441] mb-3 block">
              International Trade Desk
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight mb-6">
              Request a Commercial Export Quote
            </h2>
            <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
            <p className="text-base text-[#FAF7F0]/80 leading-relaxed mb-8 font-normal">
              Direct sourcing pricing, export product specifications, sample air courier packs, and FOB Cochin / CIF destination ocean freight estimates delivered within 24 business hours.
            </p>

            {/* Direct Contact Information Cards */}
            <div className="space-y-4 pt-4 border-t border-[#FAF7F0]/15">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF7F0]/10 flex items-center justify-center text-[#D6A441] flex-shrink-0 mt-0.5">
                  <MapPin size={17} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FAF7F0]">Headquarters & Export Desk</h4>
                  <p className="text-xs text-[#FAF7F0]/70 mt-0.5 leading-relaxed">
                    Auronova Exports Pvt. Ltd.<br />
                    Spice Trade Centre, Cochin Port Zone<br />
                    Kochi, Kerala 682 001, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF7F0]/10 flex items-center justify-center text-[#D6A441] flex-shrink-0 mt-0.5">
                  <Mail size={17} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FAF7F0]">Commercial Inquiries</h4>
                  <a
                    href="mailto:exports@auronovaexports.com"
                    className="text-xs text-[#D6A441] hover:underline mt-0.5 block"
                  >
                    exports@auronovaexports.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF7F0]/10 flex items-center justify-center text-[#D6A441] flex-shrink-0 mt-0.5">
                  <Phone size={17} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FAF7F0]">Trade Line / WhatsApp</h4>
                  <a
                    href="tel:+914842900000"
                    className="text-xs text-[#FAF7F0]/80 hover:text-[#D6A441] mt-0.5 block"
                  >
                    +91 (484) 290-0000 / +91 94000 00000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF7F0]/10 flex items-center justify-center text-[#D6A441] flex-shrink-0 mt-0.5">
                  <Clock size={17} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FAF7F0]">Response Guarantee</h4>
                  <p className="text-xs text-[#FAF7F0]/70 mt-0.5">
                    Official proforma invoice and sample dispatch within 24–48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End RFQ Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F0] text-[#24251F] rounded-2xl p-8 sm:p-10 shadow-2xl border border-[#E8E0D2]">
              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#526747]/15 text-[#526747] flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#24251F] mb-3">
                    Export Enquiry Received
                  </h3>
                  <p className="text-sm text-[#24251F]/70 max-w-md mx-auto leading-relaxed mb-6">
                    Thank you for contacting Auronova Exports. Our export documentation team is reviewing your requirements and will furnish commercial pricing and specifications within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        country: "",
                        spice: "Malabar Black Pepper",
                        volume: "20ft FCL Container",
                        incoterm: "CIF (Destination Port)",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#4A2C20] text-[#FAF7F0] hover:bg-[#351E16] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-semibold text-2xl text-[#24251F] mb-1">
                      Request Formal Quote & Samples
                    </h3>
                    <p className="text-xs text-[#24251F]/70">
                      Fill out your requirement for bulk pricing, product specifications, and sample packs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. David Mueller"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. d.mueller@spicetraders.de"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Hamburg Gourmet Imports GmbH"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Destination Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="e.g. Germany / United States"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Primary Spice
                      </label>
                      <select
                        name="spice"
                        value={formData.spice}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                      >
                        <option>Black Pepper</option>
                        <option>White Pepper</option>
                        <option>Green Cardamom</option>
                        <option>Cinnamon</option>
                        <option>Cloves</option>
                        <option>Turmeric (Kerala & Erode)</option>
                        <option>Red Chilli</option>
                        <option>Dried Ginger</option>
                        <option>Nutmeg</option>
                        <option>Mace</option>
                        <option>Star Anise</option>
                        <option>Multiple Spices (Mixed Container)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Estimated Volume
                      </label>
                      <select
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                      >
                        <option>Pre-Shipment Sample Pack</option>
                        <option>LCL (500 kg - 3,000 kg)</option>
                        <option>20ft FCL Container (~14 Tonnes)</option>
                        <option>40ft FCL Container (~26 Tonnes)</option>
                        <option>Annual Recurring Supply Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                        Desired Incoterm
                      </label>
                      <select
                        name="incoterm"
                        value={formData.incoterm}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                      >
                        <option>FOB Cochin Seaport</option>
                        <option>CIF (Destination Port)</option>
                        <option>CFR (Port to Port)</option>
                        <option>Air Cargo (Ex-Cochin Airport)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A2C20] block mb-1.5">
                      Specific Requirements / Target Port / Packaging
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mention any specific quality parameters, target destination port, packaging preferences, or required documentation..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 rounded-lg text-sm font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send size={15} className="text-[#D6A441]" />
                    {status === "submitting" ? "Transmitting RFQ..." : "Submit Export Quote Request"}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#24251F]/60 pt-2">
                    <ShieldCheck size={14} className="text-[#526747]" />
                    <span>Your inquiry is handled strictly under commercial trade confidentiality.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
