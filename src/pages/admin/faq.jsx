import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationToast from "@/components/admin/NotificationToast";
import { Save, HelpCircle, Plus, Trash2, ChevronDown, CheckCircle2 } from "lucide-react";

export default function AdminFaqPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadFaqs() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/content?section=faq_content");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.content?.categories) {
            setCategories(json.data.content.categories);
          }
        }
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionKey: "faq_content",
          page: "faq",
          data: { categories },
        }),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.message || "Failed to save FAQs.");

      setToast({ type: "success", message: "FAQ categories & questions saved successfully." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleCategoryNameChange = (catIdx, val) => {
    const updated = [...categories];
    updated[catIdx].category = val;
    setCategories(updated);
  };

  const handleQuestionChange = (catIdx, qIdx, field, val) => {
    const updated = [...categories];
    updated[catIdx].questions[qIdx][field] = val;
    setCategories(updated);
  };

  const handleAddQuestion = (catIdx) => {
    const updated = [...categories];
    updated[catIdx].questions.push({
      q: "New question prompt?",
      a: "Accurate, transparent answer regarding spice export specifications or procedures.",
    });
    setCategories(updated);
  };

  const handleDeleteQuestion = (catIdx, qIdx) => {
    const updated = [...categories];
    updated[catIdx].questions = updated[catIdx].questions.filter((_, i) => i !== qIdx);
    setCategories(updated);
  };

  const handleAddCategory = () => {
    const newCat = {
      category: "New FAQ Category",
      questions: [
        {
          q: "Sample inquiry question?",
          a: "Sample transparent commercial response.",
        },
      ],
    };
    setCategories([...categories, newCat]);
  };

  const handleDeleteCategory = (catIdx) => {
    setCategories(categories.filter((_, i) => i !== catIdx));
  };

  return (
    <AdminLayout title="FAQ Knowledge Base CMS — Auronova Exports Admin">
      <AdminHeader
        badge="Knowledge Base CMS"
        title="FAQ Content Management"
        description="Add, edit, and organize frequently asked questions covering products, sourcing, MOQ, samples, payment terms, shipping, phytosanitary, and documentation."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddCategory}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#24251F] bg-white border border-[#E8E0D2] hover:bg-[#FAF7F0] transition-colors"
            >
              <Plus size={14} className="text-[#526747]" />
              <span>Add Category</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F0] bg-[#4A2C20] hover:bg-[#351E16] shadow-sm transition-colors disabled:opacity-50"
            >
              <Save size={14} className="text-[#D6A441]" />
              <span>{saving ? "Saving..." : "Save FAQs"}</span>
            </button>
          </div>
        }
      />

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-[#24251F]/60 border border-[#E8E0D2]">
          Loading FAQ questions and categories...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {categories.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D2] shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E0D2]">
                <div className="flex-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#4A2C20] block mb-1">
                    Category Title 0{catIdx + 1}
                  </label>
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => handleCategoryNameChange(catIdx, e.target.value)}
                    className="w-full sm:w-80 px-3.5 py-1.5 rounded-xl border border-[#E8E0D2] bg-[#FAF7F0] text-sm font-bold text-[#24251F]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddQuestion(catIdx)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#526747] bg-[#526747]/10 hover:bg-[#526747]/20 transition-colors"
                  >
                    <Plus size={13} />
                    <span>Add Question</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(catIdx)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete entire category"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {cat.questions?.map((item, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-4 sm:p-5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D2] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <label className="text-xs font-semibold text-[#24251F] block mb-1">
                          Question Prompt #{qIdx + 1}
                        </label>
                        <input
                          type="text"
                          value={item.q}
                          onChange={(e) => handleQuestionChange(catIdx, qIdx, "q", e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#E8E0D2] bg-white text-xs font-bold text-[#24251F]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(catIdx, qIdx)}
                        className="p-1 rounded-lg text-gray-400 hover:text-red-600 transition-colors mt-6"
                        title="Delete question"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#24251F] block mb-1">
                        Answer & Specification Details
                      </label>
                      <textarea
                        rows={3}
                        value={item.a}
                        onChange={(e) => handleQuestionChange(catIdx, qIdx, "a", e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E8E0D2] bg-white text-xs text-[#24251F] resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </form>
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

