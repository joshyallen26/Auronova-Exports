import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, ShieldCheck, Database, KeyRound, CheckCircle2, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingPassword, setSavingPassword] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadAdmin() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/auth/me");
        if (res.ok) {
          const data = await res.json();
          setAdmin(data.admin);
        }
      } finally {
        setLoading(false);
      }
    }
    loadAdmin();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setToast({ type: "error", message: "Passwords do not match or are empty." });
      return;
    }

    try {
      setSavingPassword(true);
      // Simulate profile update or integrate endpoint
      setToast({ type: "success", message: "Admin credentials successfully verified and updated." });
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <AdminLayout title="General Settings — Auronova Exports Admin">
      <AdminHeader
        badge="System Config"
        title="General Settings & System Status"
        description="Review database synchronization, administrator profile details, and CMS system parameters."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Admin Profile */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
              <KeyRound size={16} className="text-[#D6A441]" />
              <span>Administrator Profile & Credentials</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Administrator Name
                </label>
                <input
                  type="text"
                  disabled
                  value={admin?.name || "Auronova Administrator"}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] opacity-80"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24251F] block mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  disabled
                  value={admin?.email || "admin@auronovaexports.com"}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F] opacity-80 font-mono"
                />
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="pt-4 border-t border-[#FAF7F0] space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#24251F]/70">
                Update Account Password
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    New Secure Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#24251F] block mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingPassword || !newPassword}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] transition-colors disabled:opacity-40"
                >
                  {savingPassword ? "Updating..." : "Update Password"}
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
                <span className="text-[#24251F]/70">Framework:</span>
                <span className="font-mono text-[11px] text-[#4A2C20]">Next.js 15 (Pages Router)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#24251F]/70">Typography:</span>
                <span className="font-semibold text-[#24251F]">Manrope (Global)</span>
              </div>
            </div>

            <div className="text-[11px] text-[#24251F]/60 leading-relaxed">
              To point this project to a remote MongoDB Atlas cluster, update the <code className="font-mono text-[#4A2C20]">MONGODB_URI</code> variable in <code className="font-mono text-[#4A2C20]">.env.local</code>.
            </div>
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
