import { useState } from "react";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminAbout() {
  const [data, setData] = useState({
    mission: "To empower businesses worldwide with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital era.",
    vision: "To be the global leader in integrated business solutions, recognized for our innovation, expertise, and unwavering commitment to client success.",
    heroHeadline: "Crafting Digital Excellence Since 2010",
    heroDescription: "We're a team of innovators, designers, and developers passionate about transforming businesses through technology.",
  });

  const handleSave = () => {
    alert("About content saved! (Connect your MySQL API to persist)");
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">About Content</h1>
          <p className="text-muted-foreground mt-1">Edit the About page content</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90">
          <Save size={18} /> Save Changes
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
