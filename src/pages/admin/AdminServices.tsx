import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Save, Trash2, Edit2, X, Loader2 } from "lucide-react";
import { adminApi } from "@/lib/api";
import { toast } from "sonner";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    adminApi.getServices()
      .then((data) => setServices(data || []))
      .catch(() => toast.error("Failed to load services"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await adminApi.deleteService(id);
      toast.success("Service deleted");
      fetchServices();
    } catch { toast.error("Delete failed"); }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (isNew) {
        await adminApi.createService({ title: editing.title, description: editing.description, features: editing.features });
      } else {
        await adminApi.updateService(editing.id, { title: editing.title, description: editing.description, features: editing.features });
      }
      toast.success("Service saved!");
      setEditing(null);
      fetchServices();
    } catch { toast.error("Save failed"); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Services</h1>
          <p className="text-muted-foreground mt-1">Manage service offerings</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditing({ id: "", title: "", description: "", features: [""] }); setIsNew(true); }} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
          <Plus size={18} /> Add Service
        </motion.button>
      </div>

      {editing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-display">{isNew ? "Add Service" : "Edit Service"}</h2>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold mb-2">Title</label><input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="block text-sm font-semibold mb-2">Description</label><textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" /></div>
              <div><label className="block text-sm font-semibold mb-2">Features (one per line)</label><textarea value={editing.features.join("\n")} onChange={(e) => setEditing({ ...editing, features: e.target.value.split("\n") })} rows={4} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" /></div>
              <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90"><Save size={18} /> Save</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="grid gap-4">
        {services.map((service, index) => (
          <motion.div key={service.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-card border border-border rounded-2xl p-6 flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-foreground font-display">{service.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {service.features.map((f, i) => <span key={i} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">{f}</span>)}
              </div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <button onClick={() => { setEditing({ ...service }); setIsNew(false); }} className="p-2 hover:bg-muted rounded-lg transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"><Trash2 size={16} /></button>
            </div>
          </motion.div>
        ))}
        {services.length === 0 && <p className="text-center text-muted-foreground py-12">No services yet. Add one to get started.</p>}
      </div>
    </div>
  );
}
