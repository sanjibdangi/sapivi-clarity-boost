import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminContact() {
  const [data, setData] = useState({
    email: "",
    phone: "",
    address: "",
    cin: "",
    businessHours: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // We point to /settings so it doesn't conflict with your /contact messages route
  const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/settings`
    : "/api/settings";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData({
            email: json.data.email || "",
            phone: json.data.phone || "",
            address: json.data.address || "",
            cin: json.data.cin || "",
            businessHours: json.data.business_hours || "",
          });
        }
      })
      .catch(() => toast.error("Failed to load contact info"))
      .finally(() => setLoading(false));
  }, [API_URL]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          phone: data.phone,
          address: data.address,
          cin: data.cin,
          business_hours: data.businessHours, // Matches backend expectation
        }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Contact info updated successfully!");
      } else {
        toast.error(json.message || "Failed to save.");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Server error while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-40">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Public Contact Info</h1>
          <p className="text-muted-foreground mt-1">
            This information is displayed on your website's Footer and Contact page.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "Updating..." : "Publish Changes"}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/70 ml-1">Support Email</label>
              <input
                type="email"
                placeholder="info@yourcompany.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full px-5 py-4 bg-muted/50 rounded-2xl border border-transparent focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/70 ml-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full px-5 py-4 bg-muted/50 rounded-2xl border border-transparent focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-bold text-foreground/70 ml-1">Office Address</label>
            <textarea
              placeholder="123 Business Ave, Suite 100..."
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              rows={3}
              className="w-full px-5 py-4 bg-muted/50 rounded-2xl border border-transparent focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/70 ml-1">Corporate ID (CIN)</label>
              <input
                type="text"
                placeholder="U00000XX0000PTC000000"
                value={data.cin}
                onChange={(e) => setData({ ...data, cin: e.target.value })}
                className="w-full px-5 py-4 bg-muted/50 rounded-2xl border border-transparent focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/70 ml-1">Business Hours</label>
              <input
                type="text"
                placeholder="Mon - Fri: 9:00 AM - 6:00 PM"
                value={data.businessHours}
                onChange={(e) => setData({ ...data, businessHours: e.target.value })}
                className="w-full px-5 py-4 bg-muted/50 rounded-2xl border border-transparent focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}