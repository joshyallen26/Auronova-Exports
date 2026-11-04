import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

export default function NotificationToast({ type = "success", message, onClose }) {
  if (!message) return null;

  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-xs sm:text-sm font-medium animate-in slide-in-from-bottom duration-300 ${
        isSuccess
          ? "bg-[#526747] text-white border-[#526747]/80"
          : isError
          ? "bg-red-700 text-white border-red-800"
          : "bg-[#24251F] text-[#FAF7F0] border-[#3D3A30]"
      }`}
    >
      {isSuccess && <CheckCircle2 size={16} className="text-[#D6A441] flex-shrink-0" />}
      {isError && <AlertCircle size={16} className="text-white flex-shrink-0" />}
      {!isSuccess && !isError && <Info size={16} className="text-[#D6A441] flex-shrink-0" />}

      <span className="leading-snug">{message}</span>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-black/20 text-white/80 hover:text-white transition-colors ml-2"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
