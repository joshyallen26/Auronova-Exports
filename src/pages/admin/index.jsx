import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import {
  Package,
  Anchor,
  FileText,
  Mail,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Plus,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout title="Overview Dashboard — Auronova Exports Admin">
      {/* Page Header */}
      <AdminHeader
        badge="System Active"
        title="Command Dashboard"
        description="Real-time overview of the Auronova Exports web presence, product catalogue, Kerala port infrastructure, and international trade enquiries."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={fetchStats}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#24251F] bg-white border border-[#E8E0D2] hover:bg-[#FAF7F0] transition-colors"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink size={13} className="text-[#D6A441]" />
            </Link>
          </div>
        }
      />

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Product Catalogue"
          value={stats?.totalProducts ?? "11"}
          subtext={`${stats?.publishedProducts ?? 11} Published · ${stats?.draftProducts ?? 0} Draft`}
          icon={Package}
          badge="11 Spices"
          href="/admin/products"
        />
        <StatCard
          title="Kerala Ports"
          value={stats?.totalPorts ?? "18"}
          subtext="1 Major (Cochin) · 17 Notified Non-Major"
          icon={Anchor}
          badge="All 18 Ports"
          href="/admin/ports"
        />
        <StatCard
          title="Trade Inquiries / RFQ"
          value={stats?.totalEnquiries ?? "0"}
          subtext={`${stats?.newEnquiries ?? 0} unreviewed inquiries`}
          icon={Mail}
          badge={stats?.newEnquiries > 0 ? `${stats?.newEnquiries} New` : "Updated"}
          badgeColor={stats?.newEnquiries > 0 ? "bg-[#D6A441] text-[#24251F]" : "bg-gray-100 text-gray-700"}
          href="/admin/enquiries"
        />
        <StatCard
          title="Website Pages"
          value={stats?.totalPages ?? "6"}
          subtext="Home, About, Products, Certs, FAQ, Contact"
          icon={FileText}
          badge="Managed"
          href="/admin/content"
        />
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#4A2C20] mb-4">
          Quick Management Shortcuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Home Hero", href: "/admin/home", desc: "Hero Slider & CTAs" },
            { label: "About Us", href: "/admin/about", desc: "Mission, Vision & Values" },
            { label: "Products CRUD", href: "/admin/products", desc: "Add / Edit Spices" },
            { label: "18 Ports", href: "/admin/ports", desc: "Kerala Port Network" },
            { label: "SEO Config", href: "/admin/seo", desc: "Meta & OpenGraph" },
            { label: "Media Library", href: "/admin/media", desc: "Upload Spice Assets" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] hover:border-[#D6A441] hover:bg-white transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-xs text-[#24251F] block group-hover:text-[#4A2C20]">
                  {action.label}
                </span>
                <span className="text-[10px] text-[#24251F]/60 mt-0.5 block leading-tight">
                  {action.desc}
                </span>
              </div>
              <div className="mt-3 flex justify-end">
                <ArrowRight size={13} className="text-[#D6A441] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dual Column: Recent Inquiries + Product Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Inquiries Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D2]">
              <div>
                <h3 className="font-bold text-base text-[#24251F]">Recent Commercial Enquiries</h3>
                <p className="text-xs text-[#24251F]/60">Export RFQs submitted through contact forms</p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-[#526747] hover:text-[#4A2C20] inline-flex items-center gap-1"
              >
                <span>View All ({stats?.totalEnquiries || 0})</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-[#FAF7F0] mt-2">
              {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
                stats.recentEnquiries.map((enq) => (
                  <div key={enq._id} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#24251F] truncate">
                          {enq.name}
                        </span>
                        {enq.company && (
                          <span className="text-[11px] text-[#24251F]/60 truncate">
                            · {enq.company}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#526747] font-medium mt-0.5">
                        Product: {enq.product || "General Enquiry"} {enq.volume ? `(${enq.volume})` : ""}
                      </p>
                      <p className="text-[11px] text-[#24251F]/70 truncate max-w-md mt-1">
                        &quot;{enq.message}&quot;
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enq.status === "new"
                            ? "bg-[#D6A441] text-[#24251F]"
                            : enq.status === "contacted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {enq.status || "new"}
                      </span>
                      <span className="text-[10px] text-[#24251F]/50">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#24251F]/50">
                  No trade enquiries received yet. Form submissions on the public site will appear here.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#FAF7F0] flex items-center justify-between text-xs text-[#24251F]/60">
            <span>Enquiries are automatically saved to MongoDB and persistent storage.</span>
            <Link href="/admin/enquiries" className="text-[#526747] font-semibold hover:underline">
              Manage Enquiries →
            </Link>
          </div>
        </div>

        {/* Right: Products Catalogue Snapshot */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D2]">
              <div>
                <h3 className="font-bold text-base text-[#24251F]">Spices Snapshot</h3>
                <p className="text-xs text-[#24251F]/60">11 core products in active catalogue</p>
              </div>
              <Link
                href="/admin/products"
                className="text-xs font-semibold text-[#526747] hover:text-[#4A2C20] inline-flex items-center gap-1"
              >
                <span>Catalogue</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-3 mt-4">
              {stats?.recentProducts?.map((p) => (
                <div
                  key={p.slug}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]/70"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover border border-[#E8E0D2] flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="font-semibold text-xs text-[#24251F] block truncate">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-[#526747] block truncate">
                        {p.origin}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#526747]/10 text-[#526747] flex-shrink-0">
                    {p.status || "published"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#FAF7F0] flex items-center justify-between">
            <Link
              href="/admin/products"
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-center text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] transition-colors"
            >
              Open Product Manager
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
