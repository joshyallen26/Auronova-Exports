import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import {
  Save,
  PanelBottom,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Anchor,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  Sliders,
} from "lucide-react";

const DEFAULT_FOOTER = {
  brandTagline:
    "Connecting international buyers directly with authentic Indian spices and agricultural products, with sourcing operations and primary identity rooted in Kerala. Cleaned, graded, and exported directly through Cochin Port.",
  showTrustBadge: true,
  trustBadgeText: "Government Registered Export Merchant",
  navigationTitle: "Navigation",
  productsTitle: "Export Spices",
  headquartersTitle: "Export Headquarters",
  portOfLadingLabel: "Primary Port of Lading:",
  portOfLadingValue: "Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo",
  copyrightText: "Auronova Exports Pvt. Ltd. All rights reserved. Registered in Kochi, Kerala.",
  showSocialLinks: true,
  showRfqQuickLink: true,
  rfqQuickLinkLabel: "Request RFQ",
  customAddress: "",
  customEmail: "",
  customPhone: "",
  bottomLinks: [
    { label: "About Company", href: "/about" },
    { label: "Specifications", href: "/products" },
    { label: "Compliance", href: "/certifications" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function AdminFooterPage() {
  const [data, setData] = useState(DEFAULT_FOOTER);
  const [integrations, setIntegrations] = useState(null);
  const [activeTab, setActiveTab] = useState("branding");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchFooterData = async () => {
    try {
      setLoading(true);
      const [contentRes, integrationsRes] = await Promise.all([
        fetch("/api/admin/content?section=global_footer"),
        fetch("/api/admin/integrations"),
      ]);

      if (contentRes.ok) {
        const json = await contentRes.json();
        if (json.data?.content && Object.keys(json.data.content).length > 0) {
          setData((prev) => ({
            ...prev,
            ...json.data.content,
            bottomLinks: json.data.content.bottomLinks || prev.bottomLinks,
          }));
        }
      }

      if (integrationsRes.ok) {
        const intJson = await integrationsRes.json();
        if (intJson.integrations) {
          setIntegrations(intJson.integrations);
        }
      }
    } catch (err) {
      console.error("Error loading footer config:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBottomLinkChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.bottomLinks || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, bottomLinks: updated };
    });
  };

  const handleAddBottomLink = () => {
    setData((prev) => ({
      ...prev,
      bottomLinks: [...(prev.bottomLinks || []), { label: "New Link", href: "/" }],
    }));
  };

  const handleRemoveBottomLink = (index) => {
    setData((prev) => ({
      ...prev,
      bottomLinks: (prev.bottomLinks || []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: "global_footer",
          page: "global",
          title: "Global Footer Configuration",
          subtitle: "Brand description, trust credentials, export headquarters, navigation, social links, and copyright.",
          data,
          isPublished: true,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Failed to save footer settings.");
      }

      setToast({ type: "success", message: "Global footer settings successfully updated." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const effectiveAddress = data.customAddress || integrations?.officeAddress || "Spice Trade Centre, Cochin Port Zone\nKochi, Kerala 682 001, India";
  const effectiveEmail = data.customEmail || integrations?.email || "exports@auronovaexports.com";
  const effectivePhone = data.customPhone || integrations?.phone || "+91 (484) 290-0000 / +91 94000 00000";
  const effectivePort = data.portOfLadingValue || integrations?.portOfLading || "Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo";

  return (
    <AdminLayout title="Footer Settings — Auronova Exports Admin">
      <AdminHeader
        badge="Global Layout Component"
        title="Footer Configuration & Content Settings"
        description="Configure brand introduction text, trust badges, column headers, registered trade office details, and bottom legal links across all public pages."
        actions={
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
          >
            <Save size={14} className="text-[#D6A441]" />
            <span>{saving ? "Saving..." : "Save Footer Settings"}</span>
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading footer settings...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E0D2] shadow-sm">
            {[
              { id: "branding", label: "Branding & Trust Badge" },
              { id: "office", label: "Trade Office & Dispatch Port" },
              { id: "navigation", label: "Columns & Legal Links" },
              { id: "preview", label: "Live Visual Preview" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                    : "text-[#24251F]/70 hover:text-[#24251F] hover:bg-[#FAF7F0]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Form (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* TAB 1: Branding & Trust Badge */}
              {activeTab === "branding" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
                  <div>
                    <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
                      Brand Narrative & Tagline
                    </h2>
                    <p className="text-xs text-[#24251F]/60 mt-0.5">
                      This concise summary appears directly under the logo in the first column of the footer.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#24251F] block mb-1">
                      Footer Brand Paragraph
                    </label>
                    <textarea
                      rows={4}
                      value={data.brandTagline}
                      onChange={(e) => handleChange("brandTagline", e.target.value)}
                      placeholder="Enter the company description for international buyers..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#D6A441]"
                    />
                  </div>

                  <div className="pt-4 border-t border-[#FAF7F0] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-[#24251F]">
                          Official Trust / Registration Badge
                        </h3>
                        <p className="text-[11px] text-[#24251F]/60">
                          Displays the verification badge pill with shield icon under the brand description.
                        </p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data.showTrustBadge}
                          onChange={(e) => handleChange("showTrustBadge", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#526747]"></div>
                      </label>
                    </div>

                    {data.showTrustBadge && (
                      <div>
                        <label className="text-xs font-semibold text-[#24251F] block mb-1">
                          Trust Badge Label
                        </label>
                        <input
                          type="text"
                          value={data.trustBadgeText}
                          onChange={(e) => handleChange("trustBadgeText", e.target.value)}
                          placeholder="Government Registered Export Merchant"
                          className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: Office & Dispatch Port */}
              {activeTab === "office" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-5">
                  <div>
                    <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
                      Export Headquarters & Port of Lading
                    </h2>
                    <p className="text-xs text-[#24251F]/60 mt-0.5">
                      Leave contact overrides blank to automatically inherit values from Company Contact Profile.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Port Notice Heading
                      </label>
                      <input
                        type="text"
                        value={data.portOfLadingLabel}
                        onChange={(e) => handleChange("portOfLadingLabel", e.target.value)}
                        placeholder="Primary Port of Lading:"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Port & Air Cargo Specification
                      </label>
                      <input
                        type="text"
                        value={data.portOfLadingValue}
                        onChange={(e) => handleChange("portOfLadingValue", e.target.value)}
                        placeholder="Cochin Seaport (ICTT / INCOK) & CIAL Air Cargo"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#FAF7F0] space-y-4">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#24251F]/80">
                      Optional Contact Info Overrides
                    </h3>

                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Footer Address Override (leave empty to use Company Office address)
                      </label>
                      <textarea
                        rows={2}
                        value={data.customAddress}
                        onChange={(e) => handleChange("customAddress", e.target.value)}
                        placeholder={effectiveAddress}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#24251F] block mb-1">
                          Footer Inquiries Email Override
                        </label>
                        <input
                          type="email"
                          value={data.customEmail}
                          onChange={(e) => handleChange("customEmail", e.target.value)}
                          placeholder={effectiveEmail}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#24251F] block mb-1">
                          Footer Phone / WhatsApp Override
                        </label>
                        <input
                          type="text"
                          value={data.customPhone}
                          onChange={(e) => handleChange("customPhone", e.target.value)}
                          placeholder={effectivePhone}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Columns & Legal Links */}
              {activeTab === "navigation" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-6">
                  <div>
                    <h2 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider">
                      Footer Column Titles & Navigation
                    </h2>
                    <p className="text-xs text-[#24251F]/60 mt-0.5">
                      Customize the uppercase headers and quick inquiry links.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Column 2 Header
                      </label>
                      <input
                        type="text"
                        value={data.navigationTitle}
                        onChange={(e) => handleChange("navigationTitle", e.target.value)}
                        placeholder="Navigation"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Column 3 Header
                      </label>
                      <input
                        type="text"
                        value={data.productsTitle}
                        onChange={(e) => handleChange("productsTitle", e.target.value)}
                        placeholder="Export Spices"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Column 4 Header
                      </label>
                      <input
                        type="text"
                        value={data.headquartersTitle}
                        onChange={(e) => handleChange("headquartersTitle", e.target.value)}
                        placeholder="Export Headquarters"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm text-[#24251F]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-xs text-[#24251F] block">
                        Include &quot;Request RFQ&quot; Quick Link in Navigation
                      </span>
                      <span className="text-[11px] text-[#24251F]/60">
                        Adds an instant jump link to the RFQ inquiry form.
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={data.rfqQuickLinkLabel}
                        onChange={(e) => handleChange("rfqQuickLinkLabel", e.target.value)}
                        className="w-32 px-2.5 py-1 text-xs rounded-lg border border-[#E8E0D2] bg-white text-[#24251F]"
                      />
                      <input
                        type="checkbox"
                        checked={data.showRfqQuickLink}
                        onChange={(e) => handleChange("showRfqQuickLink", e.target.checked)}
                        className="rounded text-[#4A2C20]"
                      />
                    </div>
                  </div>

                  {/* Bottom Legal Links */}
                  <div className="pt-4 border-t border-[#FAF7F0] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-[#24251F]">
                          Bottom Bar Links & Legal Navigation
                        </h3>
                        <p className="text-[11px] text-[#24251F]/60">
                          Displayed on the bottom copyright row next to the copyright claim.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddBottomLink}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-[#4A2C20] bg-[#FAF7F0] hover:bg-[#E8E0D2] transition-colors border border-[#E8E0D2]"
                      >
                        <Plus size={13} />
                        <span>Add Link</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(data.bottomLinks || []).map((link, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2]"
                        >
                          <div className="flex-1">
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => handleBottomLinkChange(idx, "label", e.target.value)}
                              placeholder="Link Label (e.g. Terms)"
                              className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs font-medium text-[#24251F]"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={link.href}
                              onChange={(e) => handleBottomLinkChange(idx, "href", e.target.value)}
                              placeholder="URL Path (/terms)"
                              className="w-full px-3 py-1.5 rounded-lg border border-[#E8E0D2] bg-white text-xs font-mono text-[#24251F]"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBottomLink(idx)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove Link"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Copyright Notice Line
                      </label>
                      <input
                        type="text"
                        value={data.copyrightText}
                        onChange={(e) => handleChange("copyrightText", e.target.value)}
                        placeholder="Auronova Exports Pvt. Ltd. All rights reserved. Registered in Kochi, Kerala."
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-xs sm:text-sm text-[#24251F]"
                      />
                      <span className="text-[10px] text-[#24251F]/50 block mt-1">
                        Note: &quot;© {new Date().getFullYear()}&quot; is automatically prepended to this text.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Live Preview in Form Area */}
              {activeTab === "preview" && (
                <div className="bg-[#1C1D18] text-[#FAF7F0] rounded-2xl p-6 sm:p-8 border border-[#33322B] shadow-xl relative overflow-hidden space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#33322B]">
                    <span className="text-xs uppercase font-mono tracking-wider text-[#D6A441]">
                      Live Visual Mockup
                    </span>
                    <span className="text-[11px] text-[#FAF7F0]/50">
                      Real-time interactive rendering
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#33322B] text-xs">
                    <div>
                      <img
                        src="/images/logo-white.png"
                        alt="Logo"
                        className="h-10 w-auto object-contain mb-3"
                      />
                      <p className="text-[11px] text-[#FAF7F0]/70 leading-relaxed mb-4">
                        {data.brandTagline}
                      </p>
                      {data.showTrustBadge && (
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FAF7F0]/5 border border-white/10 text-[10px] text-[#FAF7F0]/80">
                          <ShieldCheck size={12} className="text-[#D6A441]" />
                          <span>{data.trustBadgeText}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D6A441] block">
                        {data.headquartersTitle}
                      </span>
                      <p className="whitespace-pre-line text-[11px] text-[#FAF7F0]/70 leading-relaxed">
                        {effectiveAddress}
                      </p>
                      <p className="text-[11px] text-[#D6A441] font-mono">{effectiveEmail}</p>
                      <p className="text-[11px] text-[#FAF7F0]/80">{effectivePhone}</p>
                      <div className="pt-2 text-[10px] text-[#FAF7F0]/50 border-t border-[#33322B]">
                        <span>{data.portOfLadingLabel} </span>
                        <span className="text-[#FAF7F0] font-medium">{effectivePort}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#FAF7F0]/50">
                    <p>© {new Date().getFullYear()} {data.copyrightText}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      {(data.bottomLinks || []).map((l, idx) => (
                        <span key={idx} className="hover:text-white cursor-default">
                          {l.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Guide & Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-[#4A2C20] uppercase tracking-wider flex items-center gap-2">
                  <PanelBottom size={16} className="text-[#D6A441]" />
                  <span>Footer Component Role</span>
                </h3>

                <p className="text-xs text-[#24251F]/70 leading-relaxed">
                  The footer is rendered consistently across every public page (Home, About, Products, Certifications, FAQ, Contact).
                </p>

                <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#24251F]/70">Trust Badge:</span>
                    <span className="font-semibold text-[#526747]">
                      {data.showTrustBadge ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#24251F]/70">Bottom Links:</span>
                    <span className="font-bold text-[#4A2C20]">
                      {(data.bottomLinks || []).length} items
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#24251F]/70">RFQ Jump Link:</span>
                    <span className="font-semibold text-[#526747]">
                      {data.showRfqQuickLink ? "Active" : "Hidden"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#24251F]/60 leading-relaxed">
                  Tip: Changes saved here reflect instantaneously on the website via the global WebsiteDataContext cache.
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E8E0D2] shadow-sm space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#24251F]/80">
                  Quick Navigation
                </h3>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href="/admin/contact"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF7F0] text-[#24251F]/70 hover:text-[#4A2C20] transition-colors"
                  >
                    <span>Edit Company Contact Details</span>
                    <ExternalLink size={13} />
                  </Link>
                  <Link
                    href="/admin/integrations"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF7F0] text-[#24251F]/70 hover:text-[#4A2C20] transition-colors"
                  >
                    <span>Configure Social & WhatsApp</span>
                    <ExternalLink size={13} />
                  </Link>
                  <Link
                    href="/admin/content"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF7F0] text-[#24251F]/70 hover:text-[#4A2C20] transition-colors"
                  >
                    <span>Manage Other Page Content</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
