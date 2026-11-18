import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, ShieldCheck, Database, KeyRound, CheckCircle2, AlertCircle, RefreshCw, Lock, User } from "lucide-react";

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingAccount, setSavingAccount] = useState(false);
  const [toast, setToast] = useState(null);

  // Password criteria indicators
  const hasLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);
  const isStrong = hasLength && hasUpper && hasLower && hasNumber && hasSpecial;

  useEffect(() => {
    async function loadAdmin() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/auth/me");
        if (res.ok) {
          const data = await res.json();
          setAdmin(data.admin);
          setAdminName(data.admin?.name || "");
        }
      } finally {
        setLoading(false);
      }
    }
    loadAdmin();
  }, []);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      setToast({ type: "error", message: "Please enter your current password to authorize changes." });
      return;
    }

    if (newPassword) {
      if (!isStrong) {
        setToast({ type: "error", message: "New password does not meet the required security standards." });
        return;
      }
      if (newPassword !== confirmPassword) {
        setToast({ type: "error", message: "New password and confirmation password do not match." });
        return;
      }
    }

    try {
      setSavingAccount(true);
      const res = await fetch("/api/admin/auth/update-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newName: adminName,
          newPassword: newPassword || undefined,
          confirmPassword: confirmPassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setToast({ type: "error", message: data.message || "Failed to update admin account." });
        return;
      }

      setAdmin(data.admin);
      setToast({ type: "success", message: "Admin credentials successfully updated and active." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setToast({ type: "error", message: "An unexpected error occurred while saving account settings." });
    } finally {
      setSavingAccount(false);
    }
  };

  return (
    <AdminLayout title="General Settings — Auronova Exports Admin">
      <AdminHeader
        badge="System Config"
        title="Admin Security & System Parameters"
        description="Manage administrator credentials, current password verification, and review production system readiness."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Admin Credentials & Security Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F0]">
              <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
                <KeyRound size={16} className="text-[#D6A441]" />
                <span>Administrator Account & Credentials</span>
              </h2>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#526747]/10 text-[#526747] font-semibold">
                Role: {admin?.role || "superadmin"}
              </span>
            </div>

            <form onSubmit={handleUpdateAccount} className="space-y-5">
              {/* Profile Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Administrator Name / Handle
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#24251F]/40" />
                    <input
                      type="text"
                      required
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="Auronova Administrator"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Administrator Email (Registered)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={admin?.email || "admin@auronovaexports.com"}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]/70 font-mono cursor-not-allowed"
                  />
                  <p className="text-[10px] text-[#24251F]/50 mt-1">
                    Registered recovery identity. Protected against arbitrary modification.
                  </p>
                </div>
              </div>

              {/* Security Authorization: Current Password */}
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] space-y-2">
                <div className="flex items-center gap-2">
                  <Lock size={15} className="text-[#D6A441]" />
                  <label className="text-xs font-bold text-[#4A2C20] uppercase tracking-wider">
                    Current Password Verification (Required)
                  </label>
                </div>
                <p className="text-[11px] text-[#24251F]/70">
                  To protect your account against unauthorized modifications, enter your existing password before updating credentials.
                </p>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password to authorize changes"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                />
              </div>

              {/* Change Password Fields (Optional) */}
              <div className="pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#24251F]/70">
                    Update Password (Leave blank to keep unchanged)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-white text-sm text-[#24251F] focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                    />
                  </div>
                </div>

                {/* Password strength checklist */}
                {newPassword && (
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E8E0D2] text-[11px] space-y-1">
                    <p className="font-semibold text-[#4A2C20] mb-1">Password Strength Checklist:</p>
                    <div className={`flex items-center gap-1.5 ${hasLength ? "text-[#526747] font-semibold" : "text-[#24251F]/50"}`}>
                      <span>{hasLength ? "✓" : "○"}</span>
                      <span>At least 8 characters in length</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasUpper && hasLower ? "text-[#526747] font-semibold" : "text-[#24251F]/50"}`}>
                      <span>{hasUpper && hasLower ? "✓" : "○"}</span>
                      <span>Contains uppercase and lowercase letters</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasNumber ? "text-[#526747] font-semibold" : "text-[#24251F]/50"}`}>
                      <span>{hasNumber ? "✓" : "○"}</span>
                      <span>Contains at least one numeric digit (0-9)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-[#526747] font-semibold" : "text-[#24251F]/50"}`}>
                      <span>{hasSpecial ? "✓" : "○"}</span>
                      <span>Contains at least one special symbol (!@#$%^&*...)</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={savingAccount || !currentPassword}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] transition-colors disabled:opacity-40 cursor-pointer flex items-center gap-2"
                >
                  <Save size={14} />
                  <span>{savingAccount ? "Verifying & Updating..." : "Save Account Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Database & Architecture (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
              <Database size={16} className="text-[#526747]" />
              <span>Database Architecture</span>
            </h2>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[#24251F]/70">Database Engine:</span>
                <span className="font-bold text-[#526747]">MongoDB & Mongoose</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#24251F]/70">Persistence Model:</span>
                <span className="font-semibold text-[#24251F]">Dual-Sync Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#24251F]/70">Session Type:</span>
                <span className="font-semibold text-[#526747]">JWT (HttpOnly, 24h)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#24251F]/70">Password Hash:</span>
                <span className="font-semibold text-[#526747]">Bcrypt (12 Rounds)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#24251F]/70">Framework:</span>
                <span className="font-mono text-[11px] text-[#4A2C20]">Next.js 15 (Pages Router)</span>
              </div>
            </div>

            <div className="text-[11px] text-[#24251F]/60 leading-relaxed">
              To point this project to a remote MongoDB Atlas cluster, update the <code className="font-mono text-[#4A2C20]">MONGODB_URI</code> variable in production environment variables.
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-3">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#D6A441]" />
              <span>Security Protocols</span>
            </h2>
            <ul className="text-xs text-[#24251F]/70 space-y-2 list-disc pl-4">
              <li>Rate limiting active on authentication endpoints.</li>
              <li>Brute-force protection with account locking after 5 failed attempts.</li>
              <li>Cryptographic single-use password reset tokens (SHA-256).</li>
              <li>NoSQL injection sanitization on database queries.</li>
            </ul>
          </div>
        </div>
      </div>

      {toast && (
        <NotificationToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </AdminLayout>
  );
}
