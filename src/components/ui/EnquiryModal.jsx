import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  company: "",
  country: "",
  quantity: "",
  message: "",
};

export default function EnquiryModal({ spice, isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.country.trim()) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product: spice?.name }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setStatus("idle");
    setErrors({});
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border text-sm placeholder:text-[#8C7B6B]/60 bg-[#FDF6EC] focus:outline-none focus:ring-2 transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(26,10,4,0.6)", backdropFilter: "blur(4px)" }}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="pointer-events-auto w-full max-w-lg flex flex-col"
              style={{
                backgroundColor: "#FFFBF5",
                borderRadius: "1rem",
                boxShadow: "0 25px 60px rgba(92,45,14,0.25)",
                maxHeight: "90vh",
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-start justify-between px-6 py-5"
                style={{ borderBottom: "1px solid #E8D5BE", backgroundColor: "#FDF6EC" }}
              >
                <div>
                  <h3 className="font-semibold text-xl" style={{ color: "#3D1B08" }}>
                    Request a Quote
                  </h3>
                  {spice && (
                    <p className="text-sm mt-0.5" style={{ color: "#8C7B6B" }}>
                      Product:{" "}
                      <span className="font-semibold" style={{ color: "#2D6A4F" }}>
                        {spice.name}
                      </span>
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "#8C7B6B" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(92,45,14,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <CheckCircle size={52} style={{ color: "#2D6A4F", margin: "0 auto 1rem" }} />
                    <h4 className="font-semibold text-2xl mb-2" style={{ color: "#3D1B08" }}>
                      Enquiry Sent!
                    </h4>
                    <p className="text-sm" style={{ color: "#8C7B6B" }}>
                      Thank you! Our team will get back to you within 24 business hours.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 px-8 py-3 rounded-xl text-sm font-semibold"
                      style={{ backgroundColor: "#2D6A4F", color: "#FDF6EC" }}
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {status === "error" && (
                      <div
                        className="flex items-center gap-2 p-3 rounded-lg text-sm"
                        style={{ backgroundColor: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}
                      >
                        <AlertCircle size={15} />
                        Something went wrong. Please try again or email us directly.
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Full Name *" error={errors.name}>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`${inputBase} ${errors.name ? "border-red-300 focus:ring-red-200" : "border-[#E8D5BE] focus:ring-[#D4A017]/30"}`}
                          style={{ color: "#3D1B08" }}
                        />
                      </Field>
                      <Field label="Email *" error={errors.email}>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className={`${inputBase} ${errors.email ? "border-red-300 focus:ring-red-200" : "border-[#E8D5BE] focus:ring-[#D4A017]/30"}`}
                          style={{ color: "#3D1B08" }}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Company">
                        <input
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Your company"
                          className={`${inputBase} border-[#E8D5BE] focus:ring-[#D4A017]/30`}
                          style={{ color: "#3D1B08" }}
                        />
                      </Field>
                      <Field label="Country *" error={errors.country}>
                        <input
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="e.g. United States"
                          className={`${inputBase} ${errors.country ? "border-red-300 focus:ring-red-200" : "border-[#E8D5BE] focus:ring-[#D4A017]/30"}`}
                          style={{ color: "#3D1B08" }}
                        />
                      </Field>
                    </div>

                    <Field label="Quantity Required">
                      <input
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="e.g. 500 kg / month"
                        className={`${inputBase} border-[#E8D5BE] focus:ring-[#D4A017]/30`}
                        style={{ color: "#3D1B08" }}
                      />
                    </Field>

                    <Field label="Additional Requirements">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Specific quality, grade, or packaging requirements…"
                        className={`${inputBase} border-[#E8D5BE] focus:ring-[#D4A017]/30 resize-none`}
                        style={{ color: "#3D1B08" }}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold transition-all disabled:opacity-60"
                      style={{ backgroundColor: "#2D6A4F", color: "#FDF6EC" }}
                      onMouseEnter={(e) => { if (status !== "submitting") e.currentTarget.style.backgroundColor = "#1E4D38"; }}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2D6A4F")}
                    >
                      <Send size={15} />
                      {status === "submitting" ? "Sending…" : "Send Enquiry"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(61,27,8,0.75)" }}>
        {label}
      </label>
      {children}
      {error && <p className="text-xs" style={{ color: "#B91C1C" }}>{error}</p>}
    </div>
  );
}
