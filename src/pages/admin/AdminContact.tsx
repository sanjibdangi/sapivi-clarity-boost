import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { adminApi } from "@/lib/api";
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

  useEffect(() => {
    adminApi.getContactInfo()
      .then((res) => {
        if (res) {
          setData({
            email: res.email || "",
            phone: res.phone || "",
            address: res.address || "",
            cin: res.cin || "",
            businessHours: res.business_hours || "",
          });
        }
      })
      .catch(() => toast.error("Failed to load contact info"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateContactInfo({
        email: data.email,
        phone: data.phone,
        address: data.address,
        cin: data.cin,
        business_hours: data.businessHours,
      });
      toast.success("Contact info saved!");
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Contact Info</h1>
          <p className="text-muted-foreground mt-1">Edit contact details shown on the website</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "Saving..." : "Save Changes"}
        </motion.button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
            <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
          <textarea value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} rows={3} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">CIN</label>
            <input type="text" value={data.cin} onChange={(e) => setData({ ...data, cin: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Business Hours</label>
            <input type="text" value={data.businessHours} onChange={(e) => setData({ ...data, businessHours: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
