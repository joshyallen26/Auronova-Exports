import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Delete",
  confirmVariant = "danger", // danger | primary
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E8E0D2] shadow-2xl relative">
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 text-[#24251F]/40 hover:text-[#24251F] transition-colors p-1"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              confirmVariant === "danger"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-[#D6A441]/10 text-[#4A2C20] border border-[#D6A441]/30"
            }`}
          >
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#24251F]">{title}</h3>
            <p className="text-xs sm:text-sm text-[#24251F]/70 mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#E8E0D2]">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-[#24251F] hover:bg-[#FAF7F0] border border-[#E8E0D2] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors disabled:opacity-50 flex items-center gap-2 ${
              confirmVariant === "danger"
                ? "bg-red-600 hover:bg-red-700 shadow-sm"
                : "bg-[#4A2C20] hover:bg-[#351E16] shadow-sm"
            }`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
