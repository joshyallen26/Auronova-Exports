import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminHeader({
  badge,
  title,
  description,
  actions,
  backHref,
  backLabel = "Back",
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E0D2]">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526747] hover:text-[#4A2C20] mb-2 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>{backLabel}</span>
          </Link>
        )}
        <div className="flex items-center gap-2.5">
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#526747]/10 text-[#526747]">
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#24251F] tracking-tight">
            {title}
          </h1>
        </div>
        {description && (
          <p className="text-xs sm:text-sm text-[#24251F]/70 mt-1 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex flex-wrap items-center gap-3 flex-shrink-0">{actions}</div>}
    </div>
  );
}
