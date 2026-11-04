import { useState } from "react";
import { keralaPorts as defaultPorts } from "@/data/ports";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { Anchor, Ship, Navigation, CheckCircle2, Clock, Info } from "lucide-react";

export default function KeralaPortsSection() {
  const [filter, setFilter] = useState("all");
  const { ports: dynamicPorts } = useWebsiteData();

  const portsList = dynamicPorts && dynamicPorts.length > 0 ? dynamicPorts : defaultPorts;

  const majorPort = portsList.find((p) => p.classification === "Major Port");
  const nonMajorPorts = portsList.filter((p) => p.classification !== "Major Port");

  const filteredPorts =
    filter === "all"
      ? portsList
      : filter === "operational"
      ? portsList.filter((p) => (p.status || "").toLowerCase().includes("operational"))
      : filter === "non-major"
      ? nonMajorPorts
      : portsList.filter((p) => !(p.status || "").toLowerCase().includes("operational"));

  return (
    <section id="ports" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8E0D2] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#526747]/10 text-[#526747] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Anchor size={13} className="text-[#526747]" />
            Maritime Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24251F] leading-tight mb-4">
            Kerala&apos;s Ports and Export Connectivity
          </h2>
          <div className="w-16 h-[2px] bg-[#D6A441] mb-6" />
          <p className="text-base sm:text-lg text-[#34332E]/80 leading-relaxed font-normal">
            Kerala possesses an extensive 590-kilometre coastline with 18 officially notified ports comprising <strong>one Major Port (Cochin Port)</strong> and <strong>17 notified Non-Major Ports</strong> administered under the Kerala Maritime Board. This maritime infrastructure forms the backbone of the state&apos;s trade legacy, linking agricultural and spice-growing hinterlands to international sea lanes.
          </p>
        </div>

        {/* Major Gateway Spotlight: Cochin Port */}
        {majorPort && (
          <div className="mb-12 p-8 sm:p-10 rounded-2xl bg-[#24251F] text-[#FAF7F0] border border-[#3D3A30] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D6A441]/10 blur-[120px] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A441]/20 border border-[#D6A441]/40 text-[#D6A441] text-xs font-semibold uppercase tracking-wider mb-4">
                  <Ship size={13} />
                  Primary Commercial Export Gateway · Major Port of India
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF7F0] mb-3">
                  {majorPort.name}
                </h3>
                <p className="text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed mb-6 font-normal">
                  {majorPort.details} {majorPort.type}. Auronova Exports coordinates commercial container loading and international bill of lading dispatch primarily through Cochin Seaport&apos;s International Container Transshipment Terminal (ICTT Vallarpadam).
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#FAF7F0]/70">
                  <span className="flex items-center gap-1.5 text-[#D6A441]">
                    <CheckCircle2 size={14} />
                    Direct Liner Services to Europe, US, Middle East & Asia
                  </span>
                  <span className="flex items-center gap-1.5 text-[#FAF7F0]/60">
                    District: {majorPort.district}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-4 p-6 rounded-xl bg-[#FAF7F0]/5 border border-white/10 text-center">
                <span className="text-xs uppercase tracking-wider text-[#D6A441] block mb-1">Port Network Overview</span>
                <span className="text-4xl font-bold text-[#FAF7F0] block mb-1">18</span>
                <span className="text-xs text-[#FAF7F0]/70 block leading-snug">
                  1 Major Port + 17 Notified Non-Major Ports along Kerala&apos;s coastline
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E0D2]">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All 18 Ports" },
              { id: "operational", label: "Operational Ports" },
              { id: "non-major", label: "17 Notified Non-Major Ports" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  filter === tab.id
                    ? "bg-[#4A2C20] text-[#FAF7F0] shadow-sm"
                    : "bg-white text-[#34332E] hover:bg-[#FAF7F0] border border-[#E8E0D2]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#34332E]/60 flex items-center gap-1.5">
            <Info size={14} className="text-[#526747]" />
            <span>Official classification as notified by the Kerala Maritime Board</span>
          </div>
        </div>

        {/* Port Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPorts.map((port, idx) => {
            const isMajor = port.classification === "Major Port";
            const isOperational = port.status.toLowerCase().includes("operational");

            return (
              <div
                key={port.id}
                className={`p-6 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isMajor
                    ? "bg-white border-[#D6A441] shadow-md ring-1 ring-[#D6A441]/30"
                    : "bg-white border-[#E8E0D2] shadow-sm hover:border-[#D6A441]/50"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-[#8C7F73]">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold ${
                          isMajor
                            ? "bg-[#D6A441]/15 text-[#9C6D15] border border-[#D6A441]/30"
                            : "bg-[#526747]/10 text-[#526747]"
                        }`}
                      >
                        {port.classification}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          isOperational
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {port.status.split("/")[0].trim()}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-[#24251F] mb-1">
                    {port.name}
                  </h4>
                  <span className="text-xs text-[#526747] font-semibold block mb-3">
                    District: {port.district} · {port.type}
                  </span>

                  <p className="text-xs sm:text-sm text-[#34332E]/75 leading-relaxed mb-4">
                    {port.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E0D2]/70 text-xs text-[#8C7F73] flex items-center justify-between">
                  <span className="text-[11px] italic truncate pr-2">
                    {port.spiceExportRole}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimers & Notes */}
        <div className="mt-12 p-5 rounded-xl bg-white border border-[#E8E0D2] text-xs text-[#34332E]/70 space-y-2">
          <p>
            <strong>Maritime Infrastructure Note:</strong> Port information is presented as part of Kerala&apos;s maritime and trade infrastructure, based on notified classifications by the Kerala Maritime Board (KMB) and Ministry of Ports, Shipping and Waterways.
          </p>
          <p>
            Commercial spice consignments from Auronova Exports are primarily coordinated through Cochin Seaport, which offers container handling facilities and regular international liner services. Other notified ports represent historical trade routes, coastal cargo, regional lighterage, and upcoming infrastructure projects along the Kerala coast.
          </p>
        </div>
      </div>
    </section>
  );
}
