import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminAbout() {
  const [data, setData] = useState({
    mission: "",
    vision: "",
    heroHeadline: "",
    heroDescription: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Points to your real backend
  const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/about` : "/api/about";

  useEffect(() => {
    // 1. Fetch real data from the database
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData({
            mission: json.data.mission || "",
            vision: json.data.vision || "",
            heroHeadline: json.data.hero_headline || "",
            heroDescription: json.data.hero_description || "",
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to load about content from database");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // 2. Send updated data back to your backend
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hero_headline: data.heroHeadline,
          hero_description: data.heroDescription,
          mission: data.mission,
          vision: data.vision,
        }),
      });

      const json = await response.json();

      if (json.success) {
        toast.success("About content saved to database!");
      } else {
        toast.error(json.message || "Failed to update database.");
      }
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
          <h1 className="text-3xl font-bold text-foreground font-display">About Content</h1>
          <p className="text-muted-foreground mt-1">Edit the About page content</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "Saving..." : "Save Changes"}
        </motion.button>
      </div>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-semibold font-display">Hero Section</h2>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Headline</label>
            <input type="text" value={data.heroHeadline} onChange={(e) => setData({ ...data, heroHeadline: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
            <textarea value={data.heroDescription} onChange={(e) => setData({ ...data, heroDescription: e.target.value })} rows={3} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-semibold font-display">Mission & Vision</h2>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Mission Statement</label>
            <textarea value={data.mission} onChange={(e) => setData({ ...data, mission: e.target.value })} rows={4} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Vision Statement</label>
            <textarea value={data.vision} onChange={(e) => setData({ ...data, vision: e.target.value })} rows={4} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
        </div>
      </div>
    </div>
  );
}