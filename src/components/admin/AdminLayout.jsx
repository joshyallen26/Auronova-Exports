import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  LayoutDashboard,
  FileText,
  Home,
  Info,
  Package,
  Compass,
  Anchor,
  Phone,
  Mail,
  Search,
  Sliders,
  Image as ImageIcon,
  Settings,
  PanelBottom,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Bell,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  Ship,
  HelpCircle,
  Scale,
  ShieldCheck,
} from "lucide-react";

const navigationGroups = [
  {
    title: "OVERVIEW",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "CONTENT & PAGES",
    items: [
      { label: "Website Content", href: "/admin/content", icon: FileText },
      { label: "Home Page", href: "/admin/home", icon: Home },
      { label: "About Us", href: "/admin/about", icon: Info },
      { label: "Sourcing & Quality", href: "/admin/sourcing", icon: Compass },
      { label: "Shipping & Pricing", href: "/admin/shipping", icon: Ship },
      { label: "FAQ Knowledge Base", href: "/admin/faq", icon: HelpCircle },
      { label: "Legal Policies", href: "/admin/legal", icon: Scale },
      { label: "Kerala Ports (18)", href: "/admin/ports", icon: Anchor },
      { label: "Footer Settings", href: "/admin/footer", icon: PanelBottom },
    ],
  },
  {
    title: "CATALOGUE & CREDENTIALS",
    items: [
      { label: "Products Catalogue", href: "/admin/products", icon: Package },
      { label: "Export Credentials", href: "/admin/credentials", icon: ShieldCheck },
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    title: "COMMERCIAL & LEADS",
    items: [
      { label: "Export Enquiries / RFQ", href: "/admin/enquiries", icon: Mail, badgeKey: "enquiries" },
      { label: "Contact Details", href: "/admin/contact", icon: Phone },
    ],
  },
  {
    title: "CONFIG & SEO",
    items: [
      { label: "SEO Settings", href: "/admin/seo", icon: Search },
      { label: "Integrations", href: "/admin/integrations", icon: Sliders },
      { label: "General Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({ children, title = "Admin Portal — Auronova Exports" }) {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [unreadEnquiries, setUnreadEnquiries] = useState(0);

  // Check authentication
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (isMounted) {
          setAdmin(data.admin);
          setLoading(false);
        }
      } catch (e) {
        router.replace("/admin/login");
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router]);

  // Fetch pending badge counts
  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch("/api/admin/enquiries?status=new");
        if (res.ok) {
          const data = await res.json();
          setUnreadEnquiries(data.enquiries?.length || 0);
        }
      } catch (e) {}
    }
    if (admin) fetchCounts();
  }, [admin, router.pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#24251F] flex flex-col items-center justify-center text-[#FAF7F0]">
        <div className="relative w-16 h-16 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-[#D6A441]/20 border-t-[#D6A441] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#D6A441]">
            AE
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#D6A441] font-semibold">
          Authenticating Admin Portal...
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#FAF7F0] text-[#24251F] flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#24251F] text-[#FAF7F0] border-b border-[#3D3A30] shadow-sm">
          <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            {/* Left: Mobile hamburger & Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#FAF7F0]/80 hover:text-[#D6A441] hover:bg-white/5 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex p-2 rounded-lg text-[#FAF7F0]/80 hover:text-[#D6A441] hover:bg-white/5 transition-colors"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Menu size={18} />
              </button>

              <Link href="/admin" className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#D6A441] text-[#24251F] font-extrabold flex items-center justify-center text-sm shadow-md">
                  AE
                </span>
                <div className="hidden sm:block">
                  <span className="font-bold text-sm text-[#FAF7F0] tracking-wide block leading-tight">
                    Auronova Exports
                  </span>
                  <span className="text-[10px] text-[#D6A441] tracking-widest uppercase block font-semibold">
                    CMS Admin Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Actions, Live Website Button & User Profile */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* LIVE WEBSITE BUTTON - ALWAYS PROMINENT ON ALL DEVICES */}
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-semibold bg-[#D6A441] text-[#24251F] hover:bg-[#E4B85C] shadow transition-all duration-200 flex-shrink-0"
                title="Open public website in new tab"
              >
                <span className="hidden xs:inline">Live Website</span>
                <span className="xs:hidden">Live</span>
                <ExternalLink size={13} strokeWidth={2.2} />
              </Link>

              {/* Enquiries Notification Bell */}
              <Link
                href="/admin/enquiries"
                className="relative p-2 rounded-lg text-[#FAF7F0]/80 hover:text-[#D6A441] hover:bg-white/5 transition-colors"
                title="View recent enquiries"
              >
                <Bell size={18} />
                {unreadEnquiries > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D6A441] text-[#24251F] text-[9px] font-bold flex items-center justify-center ring-2 ring-[#24251F]">
                    {unreadEnquiries > 9 ? "9+" : unreadEnquiries}
                  </span>
                )}
              </Link>

              {/* Admin Profile & Logout */}
              <div className="flex items-center gap-2 pl-2 border-l border-[#3D3A30]">
                <div className="w-8 h-8 rounded-full bg-[#4A2C20] text-[#D6A441] border border-[#D6A441]/40 flex items-center justify-center text-xs font-bold">
                  {admin?.name?.charAt(0) || "A"}
                </div>
                <div className="hidden md:block text-left">
                  <span className="text-xs font-semibold text-[#FAF7F0] block leading-tight">
                    {admin?.name || "Admin"}
                  </span>
                  <span className="text-[10px] text-[#FAF7F0]/60 capitalize block">
                    {admin?.role || "Administrator"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-[#FAF7F0]/60 hover:text-red-400 hover:bg-white/5 transition-colors ml-1"
                  title="Sign out of Admin Portal"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Shell: Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Desktop Sidebar */}
          <aside
            className={`hidden lg:flex flex-col bg-[#1C1D18] text-[#FAF7F0] border-r border-[#33322B] transition-all duration-300 ${
              sidebarCollapsed ? "w-20" : "w-64"
            } flex-shrink-0`}
          >
            <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
              {navigationGroups.map((group) => (
                <div key={group.title}>
                  {!sidebarCollapsed && (
                    <div className="px-3 text-[10px] uppercase font-bold tracking-[0.2em] text-[#D6A441]/75 mb-2">
                      {group.title}
                    </div>
                  )}
                  <nav className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active =
                        router.pathname === item.href ||
                        (item.href !== "/admin" && router.pathname.startsWith(item.href));
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                            active
                              ? "bg-[#D6A441] text-[#24251F] font-semibold shadow-sm"
                              : "text-[#FAF7F0]/75 hover:text-[#FAF7F0] hover:bg-white/5"
                          }`}
                          title={sidebarCollapsed ? item.label : undefined}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              size={17}
                              className={active ? "text-[#24251F]" : "text-[#D6A441]"}
                            />
                            {!sidebarCollapsed && <span>{item.label}</span>}
                          </div>
                          {!sidebarCollapsed && item.badgeKey === "enquiries" && unreadEnquiries > 0 && (
                            <span
                              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                                active ? "bg-[#24251F] text-[#FAF7F0]" : "bg-[#D6A441] text-[#24251F]"
                              }`}
                            >
                              {unreadEnquiries}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            {/* Sidebar Footer Link to Public Website */}
            <div className="p-3 border-t border-[#33322B] bg-[#141512]">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-[#FAF7F0] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors w-full ${
                  sidebarCollapsed ? "px-2" : "px-3"
                }`}
              >
                <ExternalLink size={14} className="text-[#D6A441]" />
                {!sidebarCollapsed && <span>Open Public Site</span>}
              </Link>
            </div>
          </aside>

          {/* Mobile Drawer Backdrop */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Mobile Drawer */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1C1D18] text-[#FAF7F0] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-16 px-5 border-b border-[#33322B] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#D6A441] text-[#24251F] font-extrabold flex items-center justify-center text-sm">
                  AE
                </span>
                <span className="font-bold text-sm text-[#FAF7F0]">Auronova CMS</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-[#FAF7F0]/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
              {navigationGroups.map((group) => (
                <div key={group.title}>
                  <div className="px-3 text-[10px] uppercase font-bold tracking-[0.2em] text-[#D6A441]/75 mb-2">
                    {group.title}
                  </div>
                  <nav className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active =
                        router.pathname === item.href ||
                        (item.href !== "/admin" && router.pathname.startsWith(item.href));
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                            active
                              ? "bg-[#D6A441] text-[#24251F] font-semibold"
                              : "text-[#FAF7F0]/75 hover:text-[#FAF7F0] hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              size={17}
                              className={active ? "text-[#24251F]" : "text-[#D6A441]"}
                            />
                            <span>{item.label}</span>
                          </div>
                          {item.badgeKey === "enquiries" && unreadEnquiries > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D6A441] text-[#24251F]">
                              {unreadEnquiries}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            {/* Mobile Drawer Footer with Live Website Button */}
            <div className="p-4 border-t border-[#33322B] bg-[#141512] space-y-2">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold bg-[#D6A441] text-[#24251F] hover:bg-[#E4B85C] transition-colors w-full shadow"
              >
                <span>View Live Website</span>
                <ExternalLink size={14} />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Main Workspace Area */}
          <main className="flex-1 overflow-y-auto bg-[#FAF7F0] p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
