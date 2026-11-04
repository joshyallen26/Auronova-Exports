import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  badge,
  badgeColor = "text-[#526747] bg-[#526747]/10",
  href,
}) {
  const content = (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E0D2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-[#24251F]/60 block mb-1">
            {title}
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#24251F] tracking-tight block">
            {value}
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-center text-[#4A2C20] group-hover:text-[#D6A441] transition-colors flex-shrink-0">
          {Icon && <Icon size={22} />}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#FAF7F0] flex items-center justify-between text-xs">
        <span className="text-[#24251F]/70">{subtext}</span>
        {badge && (
          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${badgeColor}`}>
            {badge}
          </span>
        )}
        {href && (
          <span className="text-[#526747] font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            View <ArrowUpRight size={13} />
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
