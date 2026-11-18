import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Lock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password strength checks
  const hasLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);
  const isStrong = hasLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Password reset token is missing from URL.");
      return;
    }

    if (!isStrong) {
      setError("Please ensure your password satisfies all security criteria.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to reset password. The link may have expired.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/login");
      }, 3000);
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Set New Admin Password — Auronova Exports</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#24251F] text-[#FAF7F0] flex flex-col justify-between relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] rounded-full bg-[#D6A441] blur-[160px]" />
          <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#4A2C20] blur-[160px]" />
        </div>

        {/* Header */}
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
            <span>Sign In</span>
          </Link>
        </header>

        {/* Card */}
        <main className="relative z-10 max-w-md w-full mx-auto px-6 py-10">
          <div className="bg-[#1C1D18] rounded-2xl p-8 sm:p-10 border border-[#3D3A30] shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#D6A441]/10 border border-[#D6A441]/30 text-[#D6A441] flex items-center justify-center mx-auto mb-4">
                <Lock size={22} />
              </div>
              <h1 className="text-2xl font-bold text-[#FAF7F0] tracking-tight">
                Set New Password
              </h1>
              <p className="text-xs text-[#FAF7F0]/70 mt-1.5 leading-relaxed">
                Choose a strong, unique administrative password to secure your export management workspace.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-900/30 border border-red-700/50 flex items-start gap-3 text-xs text-red-200">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-xl bg-[#526747]/20 border border-[#526747]/50 text-xs text-[#FAF7F0] space-y-2">
                  <div className="flex items-center justify-center gap-2 font-bold text-[#D6A441]">
                    <CheckCircle2 size={18} />
                    <span>Password Reset Completed</span>
                  </div>
                  <p className="leading-relaxed text-[#FAF7F0]/80">
                    Your password has been successfully updated. Redirecting to admin sign in...
                  </p>
                </div>
                <Link
                  href="/admin/login"
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#D6A441] text-[#24251F] hover:bg-[#E4B85C] shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Sign In Now</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#FAF7F0]/80 uppercase tracking-wider mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FAF7F0]/40"
                    />
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#24251F] border border-[#3D3A30] text-sm text-[#FAF7F0] placeholder-[#FAF7F0]/30 focus:outline-none focus:ring-2 focus:ring-[#D6A441] transition-all"
                    />
                  </div>
                </div>

                {/* Password strength checklist */}
                {newPassword && (
                  <div className="p-3 bg-[#24251F] rounded-xl border border-[#3D3A30] text-[11px] space-y-1">
                    <p className="font-semibold text-[#D6A441] mb-1">Security Standards:</p>
                    <div className={`flex items-center gap-1.5 ${hasLength ? "text-emerald-400" : "text-[#FAF7F0]/40"}`}>
                      <span>{hasLength ? "✓" : "○"}</span>
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasUpper && hasLower ? "text-emerald-400" : "text-[#FAF7F0]/40"}`}>
                      <span>{hasUpper && hasLower ? "✓" : "○"}</span>
                      <span>Uppercase & lowercase letters</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-400" : "text-[#FAF7F0]/40"}`}>
                      <span>{hasNumber ? "✓" : "○"}</span>
                      <span>At least one number (0-9)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-emerald-400" : "text-[#FAF7F0]/40"}`}>
                      <span>{hasSpecial ? "✓" : "○"}</span>
                      <span>Special symbol (!@#$%^&*...)</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#FAF7F0]/80 uppercase tracking-wider mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FAF7F0]/40"
                    />
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#24251F] border border-[#3D3A30] text-sm text-[#FAF7F0] placeholder-[#FAF7F0]/30 focus:outline-none focus:ring-2 focus:ring-[#D6A441] transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !isStrong}
                    className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#D6A441] text-[#24251F] hover:bg-[#E4B85C] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      "Resetting Password..."
                    ) : (
                      <>
                        <span>Save New Password</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[#3D3A30] text-center">
              <p className="text-[11px] text-[#FAF7F0]/50 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} className="text-[#526747]" />
                <span>Bcrypt Hash Enforced · Immediate Session Invalidation</span>
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

