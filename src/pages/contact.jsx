import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
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
  Upload,
  FileText,
  X,
  Building2,
  Globe,
  Anchor,
} from "lucide-react";
import { spices } from "@/data/spices";
import { useWebsiteData } from "@/context/WebsiteDataContext";

const initialForm = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  phoneWhatsApp: "",
  country: "",
  selectedProducts: ["Black Pepper"],
  quantity: "",
  unit: "MT",
  incoterm: "FOB Cochin",
  message: "",
  fileAttachmentUrl: "",
  fileAttachmentName: "",
  honeypot: "",
};

export default function ContactPage() {
  const router = useRouter();
  const { integrations } = useWebsiteData();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const companyName = integrations?.companyName || "Auronova Exports Pvt. Ltd.";
  const address = integrations?.officeAddress || "Spice Trade Centre, Cochin Port Zone, Kochi, Kerala 682 001, India";
  const phone = integrations?.phone || "+91 (484) 290-0000";
  const whatsapp = integrations?.whatsappNumber || "+91 94000 00000";
  const email = integrations?.email || "exports@auronovaexports.com";
  const portOfLading = integrations?.portOfLading || "Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo";

  // Pre-select product from URL query parameter (e.g. /contact?product=cardamom)
  useEffect(() => {
    if (router.isReady && router.query.product) {
      const qProduct = router.query.product;
      const matched = spices.find(
        (s) => s.slug === qProduct || s.name.toLowerCase() === qProduct.toLowerCase()
      );
      if (matched) {
        setForm((prev) => ({
          ...prev,
          selectedProducts: [matched.name],
        }));
      }
    }
  }, [router.isReady, router.query.product]);

  const toggleProduct = (prodName) => {
    setForm((prev) => {
      const exists = prev.selectedProducts.includes(prodName);
      if (exists) {
        // Keep at least one product selected or allow empty
        return {
          ...prev,
          selectedProducts: prev.selectedProducts.filter((p) => p !== prodName),
        };
      } else {
        return {
          ...prev,
          selectedProducts: [...prev.selectedProducts, prodName],
        };
      }
    });
    if (errors.products) setErrors((prev) => ({ ...prev, products: undefined }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File exceeds the 10MB limit. Please upload a smaller document.");
      return;
    }

    setUploadingFile(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "File upload failed.");
      }

      setForm((prev) => ({
        ...prev,
        fileAttachmentUrl: data.fileUrl,
        fileAttachmentName: data.originalName,
      }));
    } catch (err) {
      setUploadError(err.message || "Upload failed. You can still submit without an attachment.");
    } finally {
      setUploadingFile(false);
    }
  };

  const removeFile = () => {
    setForm((prev) => ({
      ...prev,
      fileAttachmentUrl: "",
      fileAttachmentName: "",
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.companyName.trim()) errs.companyName = "Company name is required for commercial RFQs";
    if (!form.businessEmail.trim()) {
      errs.businessEmail = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail)) {
      errs.businessEmail = "Please enter a valid email address";
    }
    if (!form.phoneWhatsApp.trim()) errs.phoneWhatsApp = "Phone / WhatsApp number is required";
    if (!form.country.trim()) errs.country = "Destination country / port of discharge is required";
    if (form.selectedProducts.length === 0) {
      errs.products = "Please select at least one product of interest";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
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
          fullName: form.fullName,
          companyName: form.companyName,
          businessEmail: form.businessEmail,
          phoneWhatsApp: form.phoneWhatsApp,
          country: form.country,
          products: form.selectedProducts,
          quantity: form.quantity,
          unit: form.unit,
          incoterm: form.incoterm,
          message: form.message,
          fileAttachmentUrl: form.fileAttachmentUrl,
          fileAttachmentName: form.fileAttachmentName,
          honeypot: form.honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setSubmittedId(data.enquiryId || "");
        setForm(initialForm);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit quotation request. Please contact exports@auronovaexports.com directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network connection error. Please reach our export desk directly at exports@auronovaexports.com or via WhatsApp.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border text-xs sm:text-sm bg-white text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441] transition-all";

  return (
    <>
      <Head>
        <title>Request a Commercial Export Quote — Auronova Exports | Cochin Port Trade Desk</title>
        <meta
          name="description"
          content="Request formal export quotations (FOB Cochin, CIF destination), bulk spice specifications, and air courier sample kits from Auronova Exports Pvt. Ltd."
        />
        <link rel="canonical" href="https://auronovaexports.com/contact" />
      </Head>

      {/* Editorial Page Hero */}
      <section className="relative overflow-hidden bg-[#24251F] text-[#FAF7F0] pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-[#33322B]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/bg-contact-hero.jpg"
            alt="Cochin seaport spice cargo export dispatch"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181914]/95 via-[#181914]/85 to-[#181914]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24251F] via-[#24251F]/40 to-[#181914]/60" />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#D6A441] blur-[150px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#526747] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F0]/10 border border-white/15 text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] mb-5">
            <Anchor size={13} className="text-[#D6A441]" />
            Commercial Trade Desk · Cochin Port
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FAF7F0] mb-5">
            Request an Export Quotation
          </h1>

          <p className="text-base sm:text-lg text-[#FAF7F0]/80 leading-relaxed font-normal max-w-2xl mx-auto">
            Submit your commercial volume requirements, destination port, and Incoterm preferences. Our Kochi trade desk provides formal proforma pricing within 24 business hours.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Commercial Details & Credentials */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#526747] mb-2 block">
                  Export Desk Contact
                </span>
                <h2 className="text-2xl sm:text-3xl text-[#24251F] font-bold mb-3">
                  {companyName}
                </h2>
                <p className="text-xs sm:text-sm text-[#34332E]/70 leading-relaxed mb-6 font-normal">
                  Our commercial export team coordinates contract fulfillment, independent laboratory testing, container stuffing, and customs clearance directly at Cochin Seaport.
                </p>
              </div>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#526747] flex-shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7F73] mb-1">
                      Office & Warehouse Address
                    </h3>
                    <p className="text-xs sm:text-sm text-[#24251F] font-medium leading-relaxed whitespace-pre-line">
                      {address}
                    </p>
                    <span className="text-[11px] text-[#526747] font-semibold mt-1 block">
                      Port of Lading: {portOfLading}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#D6A441] flex-shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7F73] mb-1">
                      Official Commercial Email
                    </h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs sm:text-sm font-semibold text-[#4A2C20] hover:text-[#526747] transition-colors block"
                    >
                      {email}
                    </a>
                    <span className="text-[11px] text-[#8C7F73] block mt-0.5">
                      Proforma requests & sample specifications
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#4A2C20] flex-shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8C7F73] mb-1">
                      Phone & WhatsApp Desk
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#24251F]">
                      Phone: <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-[#D6A441]">{phone}</a>
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#526747] mt-0.5">
                      WhatsApp:{" "}
                      <a
                        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {whatsapp}
                      </a>
                    </p>
                    <span className="text-[11px] text-[#8C7F73] block mt-0.5">
                      Available Mon - Sat (09:00 - 18:30 IST)
                    </span>
                  </div>
                </div>
              </div>

              {/* Trade Credibility Badge */}
              <div className="p-5 rounded-2xl bg-[#24251F] text-[#FAF7F0] border border-[#3D3A30] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D6A441]">
                  <ShieldCheck size={16} />
                  <span>Statutory Export Credentials</span>
                </div>
                <p className="text-xs text-[#FAF7F0]/80 leading-relaxed font-normal">
                  Statutory alignment with Spices Board of India, APEDA, FSSAI standards, and Government Phytosanitary inspection per container consignment departing Cochin Port.
                </p>
              </div>
            </div>

            {/* Right Column: Full B2B Quotation Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E0D2] shadow-lg">
                <div className="border-b border-[#E8E0D2] pb-6 mb-8">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6A441] block mb-1">
                    B2B Commercial RFQ
                  </span>
                  <h3 className="text-2xl font-bold text-[#24251F]">
                    Submit Commercial Specification
                  </h3>
                  <p className="text-xs sm:text-sm text-[#34332E]/70 mt-1 font-normal">
                    Fill out your import parameters. All information is handled under strict commercial confidentiality.
                  </p>
                </div>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-[#526747]/10 border border-[#526747]/30 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#526747] text-[#FAF7F0] mx-auto flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-[#24251F]">
                      Quotation Request Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#34332E]/80 max-w-md mx-auto leading-relaxed font-normal">
                      Thank you for submitting your commercial RFQ. Our Kochi trade desk has received your request and will provide formal proforma pricing, technical specifications, and sample details within <strong>24 business hours</strong>.
                    </p>
                    {submittedId && (
                      <div className="inline-block px-4 py-1.5 rounded-lg bg-white border border-[#E8E0D2] text-xs font-mono text-[#4A2C20]">
                        Reference ID: {submittedId}
                      </div>
                    )}
                    <div className="pt-4">
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-6 py-2.5 rounded-xl text-xs font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Anti-spam Honeypot (hidden from human visitors) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="honeypot"
                        tabIndex="-1"
                        autoComplete="off"
                        value={form.honeypot}
                        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                      />
                    </div>

                    {status === "error" && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
                        <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Buyer Identity: Full Name & Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#24251F] uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={(e) => {
                            setForm({ ...form, fullName: e.target.value });
                            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                          }}
                          placeholder="e.g. Johannes Becker"
                          className={`${inputClass} ${errors.fullName ? "border-red-400" : "border-[#E8E0D2]"}`}
                        />
                        {errors.fullName && (
                          <span className="text-[11px] text-red-600 mt-1 block font-medium">
                            {errors.fullName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#24251F] uppercase tracking-wider mb-1.5">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.companyName}
                          onChange={(e) => {
                            setForm({ ...form, companyName: e.target.value });
                            if (errors.companyName) setErrors({ ...errors, companyName: undefined });
                          }}
                          placeholder="e.g. Hanseatic Spices GmbH"
                          className={`${inputClass} ${errors.companyName ? "border-red-400" : "border-[#E8E0D2]"}`}
                        />
                        {errors.companyName && (
                          <span className="text-[11px] text-red-600 mt-1 block font-medium">
                            {errors.companyName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Business Email & Phone / WhatsApp */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#24251F] uppercase tracking-wider mb-1.5">
                          Business Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.businessEmail}
                          onChange={(e) => {
                            setForm({ ...form, businessEmail: e.target.value });
                            if (errors.businessEmail) setErrors({ ...errors, businessEmail: undefined });
                          }}
                          placeholder="name@company.com"
                          className={`${inputClass} ${errors.businessEmail ? "border-red-400" : "border-[#E8E0D2]"}`}
                        />
                        {errors.businessEmail && (
                          <span className="text-[11px] text-red-600 mt-1 block font-medium">
                            {errors.businessEmail}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#24251F] uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={form.phoneWhatsApp}
                          onChange={(e) => {
                            setForm({ ...form, phoneWhatsApp: e.target.value });
                            if (errors.phoneWhatsApp) setErrors({ ...errors, phoneWhatsApp: undefined });
                          }}
                          placeholder="+49 40 12345678"
                          className={`${inputClass} ${errors.phoneWhatsApp ? "border-red-400" : "border-[#E8E0D2]"}`}
                        />
                        {errors.phoneWhatsApp && (
                          <span className="text-[11px] text-red-600 mt-1 block font-medium">
                            {errors.phoneWhatsApp}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Country / Destination Port */}
                    <div>
                      <label className="block text-xs font-semibold text-[#24251F] uppercase tracking-wider mb-1.5">
                        Country / Destination Port <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.country}
                        onChange={(e) => {
                          setForm({ ...form, country: e.target.value });
                          if (errors.country) setErrors({ ...errors, country: undefined });
                        }}
                        placeholder="e.g. Hamburg, Germany or Jebel Ali, UAE"
                        className={`${inputClass} ${errors.country ? "border-red-400" : "border-[#E8E0D2]"}`}
                      />
                      {errors.country && (
                        <span className="text-[11px] text-red-600 mt-1 block font-medium">
                          {errors.country}
                        </span>
                      )}
                    </div>

                    {/* Multi-Product Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-[#24251F] uppercase tracking-wider">
                          Product Selection (Multiple Allowed) <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[11px] text-[#8C7F73]">
                          {form.selectedProducts.length} selected
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {spices.map((spice) => {
                          const isSelected = form.selectedProducts.includes(spice.name);
                          return (
                            <button
                              type="button"
                              key={spice.id}
                              onClick={() => toggleProduct(spice.name)}
                              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                isSelected
                                  ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                                  : "bg-[#FAF7F0] text-[#24251F] border border-[#E8E0D2] hover:bg-white"
                              }`}
                            >
                              <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#D6A441]" : "bg-gray-300"}`} />
                              {spice.name}
                            </button>
                          );
                        })}
                      </div>
                      {errors.products && (
                        <span className="text-[11px] text-red-600 mt-1.5 block font-medium">
                          {errors.products}
                        </span>
                      )}
                    </div>

                    {/* Quantity & Unit and Preferred Incoterm */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#24251F] uppercase tracking-wider mb-1.5">
                          Required Quantity & Unit
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={form.quantity}
                            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                            placeholder="e.g. 14 or 500"
                            className={`${inputClass} flex-1`}
                          />
                          <select
                            value={form.unit}
                            onChange={(e) => setForm({ ...form, unit: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-[#E8E0D2] bg-white text-xs sm:text-sm font-semibold text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                          >
                            <option value="MT">MT (Metric Tonnes)</option>
                            <option value="kg">kg (Kilograms)</option>
                            <option value="Containers (20ft FCL)">20ft FCL</option>
                            <option value="Containers (40ft FCL)">40ft FCL</option>
                            <option value="Sample Pack">Sample Pack</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#24251F] uppercase tracking-wider mb-1.5">
                          Preferred Incoterm
                        </label>
                        <select
                          value={form.incoterm}
                          onChange={(e) => setForm({ ...form, incoterm: e.target.value })}
                          className={`${inputClass} border-[#E8E0D2] font-medium`}
                        >
                          <option value="FOB Cochin">FOB Cochin (Seaport / ICTT)</option>
                          <option value="CIF (Destination Port)">CIF (Destination Port)</option>
                          <option value="CFR (Destination Port)">CFR (Destination Port)</option>
                          <option value="Air Cargo (CIAL)">Air Cargo (CIAL Express)</option>
                        </select>
                      </div>
                    </div>

                    {/* Additional Requirements / Message */}
                    <div>
                      <label className="block text-xs font-semibold text-[#24251F] uppercase tracking-wider mb-1.5">
                        Additional Requirements / Specifications
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Please include details such as desired grade size (e.g. TGEB pepper or AGEB cardamom), moisture threshold, target delivery timeframe, or customized packaging preferences."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Secure File Upload for Buyer Specifications */}
                    <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-dashed border-[#D6A441]/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-[#24251F] uppercase tracking-wider flex items-center gap-2">
                          <Upload size={14} className="text-[#D6A441]" />
                          Upload Buyer Specifications / RFQ File (Optional)
                        </label>
                        <span className="text-[11px] text-[#8C7F73]">Max 10MB (PDF, DOCX, XLS, JPG)</span>
                      </div>

                      {form.fileAttachmentUrl ? (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E0D2]">
                          <div className="flex items-center gap-2.5 truncate">
                            <FileText size={18} className="text-[#526747] flex-shrink-0" />
                            <span className="text-xs font-medium text-[#24251F] truncate">
                              {form.fileAttachmentName || "Specification Document Attached"}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
                            aria-label="Remove uploaded file"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                            disabled={uploadingFile}
                            className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#4A2C20] file:text-[#FAF7F0] hover:file:bg-[#351E16] file:cursor-pointer cursor-pointer"
                          />
                          {uploadingFile && (
                            <span className="text-xs text-[#D6A441] mt-1.5 block font-medium">
                              Uploading document securely...
                            </span>
                          )}
                          {uploadError && (
                            <span className="text-xs text-red-600 mt-1.5 block font-medium">
                              {uploadError}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting" || uploadingFile}
                      className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <span>Processing Commercial Quotation...</span>
                      ) : (
                        <>
                          <Send size={15} className="text-[#D6A441]" />
                          <span>Submit Request for Quotation (RFQ)</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-[#8C7F73]">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy-policy" className="underline hover:text-[#4A2C20]">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="underline hover:text-[#4A2C20]">
                        Terms of Commercial Trade
                      </Link>
                      . Proforma issued within 24 business hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Contact & Commercial RFQ — Auronova Exports | Export Desk Cochin",
      description:
        "Contact Auronova Exports trade desk for proforma invoices, FOB Cochin or CIF destination ocean freight estimates, specifications, and sample consignments.",
      canonical: "/contact",
    },
  };
}
