import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/lib/api";

export default function AdminHero() {
  const [data, setData] = useState({
    badge: "",
    headline: "",
    description: "",
    ctaPrimary: "",
    ctaSecondary: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getHero()
      .then((res) => {
        if (res) {
          setData({
            badge: res.badge || "",
            headline: res.headline || "",
            description: res.description || "",
            ctaPrimary: res.cta_primary || "",
            ctaSecondary: res.cta_secondary || "",
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to load hero content from database");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateHero({
        badge: data.badge,
        headline: data.headline,
        description: data.description,
        cta_primary: data.ctaPrimary,
        cta_secondary: data.ctaSecondary,
      });
      toast.success("Hero section updated!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save. Make sure your API is running.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Hero Section</h1>
          <p className="text-muted-foreground mt-1">Edit the homepage hero content</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "Saving..." : "Save Changes"}
        </motion.button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Badge Text</label>
          <input type="text" value={data.badge} onChange={(e) => setData({ ...data, badge: e.target.value })} className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Headline</label>
          <textarea value={data.headline} onChange={(e) => setData({ ...data, headline: e.target.value })} rows={3} className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
          <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={4} className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Primary CTA Text</label>
            <input type="text" value={data.ctaPrimary} onChange={(e) => setData({ ...data, ctaPrimary: e.target.value })} className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Secondary CTA Text</label>
            <input type="text" value={data.ctaSecondary} onChange={(e) => setData({ ...data, ctaSecondary: e.target.value })} className="w-full px-4 py-3 bg-muted border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8 bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-8 text-white">
        <p className="text-sm font-medium mb-2 opacity-70">Preview</p>
        <div className="text-center">
          <span className="inline-block px-3 py-1 glass-dark rounded-full text-xs mb-4">{data.badge}</span>
          <h2 className="text-3xl font-bold mb-3 font-display whitespace-pre-line">{data.headline}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">{data.description}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium">{data.ctaPrimary}</span>
            <span className="px-4 py-2 glass-dark rounded-full text-sm font-medium">{data.ctaSecondary}</span>
          </div>
        </div>
      </div>
    </div>
  );
}