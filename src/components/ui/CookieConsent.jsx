import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("auronova_cookie_consent");
      if (!consent) {
        // Small delay so it does not jump abruptly on page mount
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("auronova_cookie_consent", "all");
    } catch (e) {}
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem("auronova_cookie_consent", "essential");
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#24251F] text-[#FAF7F0] rounded-2xl p-5 border border-[#3D3A30] shadow-2xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#D6A441]/15 text-[#D6A441] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Cookie size={18} />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#D6A441]">
            Cookie & Privacy Notice
          </h3>
          <p className="text-xs text-[#FAF7F0]/80 leading-relaxed">
            We use essential cookies to maintain secure sessions, verify inquiry submissions, and analyze export traffic. Learn more in our{" "}
            <Link
              href="/privacy-policy"
              className="text-[#D6A441] underline underline-offset-2 hover:text-[#FAF7F0] transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#D6A441] text-[#24251F] hover:bg-[#E4B85C] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check size={13} />
              <span>Accept All</span>
            </button>
            <button
              onClick={handleAcceptEssential}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-[#FAF7F0] transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={handleAcceptEssential}
          aria-label="Close cookie notice"
          className="text-[#FAF7F0]/40 hover:text-[#FAF7F0] transition-colors p-1"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}

