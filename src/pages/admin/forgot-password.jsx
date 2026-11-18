import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Mail, ArrowRight, ShieldCheck, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok && res.status !== 200) {
        setError(data.message || "Failed to submit request. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setMessage(data.message || "If the account is eligible, password reset instructions will be sent.");
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Admin Password — Auronova Exports</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#24251F] text-[#FAF7F0] flex flex-col justify-between relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] rounded-full bg-[#D6A441] blur-[160px]" />
          <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#4A2C20] blur-[160px]" />
        </div>

        {/* Top bar */}
        <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#D6A441] text-[#24251F] font-extrabold flex items-center justify-center text-base shadow-lg">
              AE
            </span>
            <div>
              <span className="font-bold text-base text-[#FAF7F0] tracking-wide block leading-tight">
                Auronova Exports
              </span>
              <span className="text-[11px] text-[#D6A441] tracking-widest uppercase block font-semibold">
                Cochin, Kerala · India
              </span>
            </div>
          </Link>

          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-[#FAF7F0] border border-white/15 transition-colors shadow-sm"
          >
            <ArrowLeft size={13} />
            <span>Back to Sign In</span>
          </Link>
        </header>

        {/* Main Form */}
        <main className="relative z-10 max-w-md w-full mx-auto px-6 py-10">
          <div className="bg-[#1C1D18] rounded-2xl p-8 sm:p-10 border border-[#3D3A30] shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#D6A441]/10 border border-[#D6A441]/30 text-[#D6A441] flex items-center justify-center mx-auto mb-4">
                <Mail size={22} />
              </div>
              <h1 className="text-2xl font-bold text-[#FAF7F0] tracking-tight">
                Reset Password
              </h1>
              <p className="text-xs text-[#FAF7F0]/70 mt-1.5 leading-relaxed">
                Enter your verified administrator email address to request secure single-use recovery instructions.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-900/30 border border-red-700/50 flex items-start gap-3 text-xs text-red-200">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {submitted ? (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-[#526747]/20 border border-[#526747]/50 text-xs text-[#FAF7F0] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#D6A441]">
                    <CheckCircle2 size={16} />
                    <span>Request Registered</span>
                  </div>
                  <p className="leading-relaxed text-[#FAF7F0]/80">
                    {message}
                  </p>
                  <p className="text-[11px] text-[#FAF7F0]/60">
                    If configured, check your inbox for an encrypted recovery link valid for 60 minutes.
                  </p>
                </div>

                <Link
                  href="/admin/login"
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-[#FAF7F0] border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={14} />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#FAF7F0]/80 uppercase tracking-wider mb-2">
                    Registered Admin Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FAF7F0]/40"
                    />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@auronovaexports.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#24251F] border border-[#3D3A30] text-sm text-[#FAF7F0] placeholder-[#FAF7F0]/30 focus:outline-none focus:ring-2 focus:ring-[#D6A441] transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#D6A441] text-[#24251F] hover:bg-[#E4B85C] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      "Processing..."
                    ) : (
                      <>
                        <span>Send Recovery Instructions</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/admin/login"
                    className="text-xs text-[#FAF7F0]/60 hover:text-[#FAF7F0] transition-colors"
                  >
                    Remembered credentials? Sign In
                  </Link>
                </div>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[#3D3A30] text-center">
              <p className="text-[11px] text-[#FAF7F0]/50 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} className="text-[#526747]" />
                <span>Single-Use Cryptographic Recovery · Anti-Enumeration Protected</span>
              </p>
            </div>
          </div>
        </main>

        <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 text-center text-xs text-[#FAF7F0]/50 border-t border-[#3D3A30]">
          <p>© {new Date().getFullYear()} Auronova Exports Pvt. Ltd. · Cochin Port, Kerala · All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

