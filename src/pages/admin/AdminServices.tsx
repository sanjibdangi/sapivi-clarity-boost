import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Save, Trash2, Edit2, X } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

const defaultServices: Service[] = [
  { id: "1", title: "Application Integration", description: "Seamless API integration and microservices architecture.", features: ["RESTful API Development", "Third-party Integrations", "Microservices Architecture"] },
  { id: "2", title: "Digital Marketing", description: "Data-driven strategies to amplify your brand.", features: ["Social Media Marketing", "Content Strategy", "PPC Advertising"] },
  { id: "3", title: "Cyber Security", description: "Enterprise-grade security solutions.", features: ["Security Audits", "Penetration Testing", "Compliance Management"] },
  { id: "4", title: "HR Consulting", description: "AI-powered talent acquisition.", features: ["Talent Acquisition", "Staff Sourcing", "HR Technology"] },
];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm("Delete this service?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const handleEdit = (service: Service) => {
    setEditing({ ...service });
    setIsNew(false);
  };

  const handleAdd = () => {
    setEditing({ id: Date.now().toString(), title: "", description: "", features: [""] });
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      setServices([...services, editing]);
    } else {
      setServices(services.map((s) => (s.id === editing.id ? editing : s)));
    }
    setEditing(null);
    alert("Service saved! (Connect your MySQL API to persist)");
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Services</h1>
          <p className="text-muted-foreground mt-1">Manage service offerings</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAdd} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
          <Plus size={18} /> Add Service
        </motion.button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-display">{isNew ? "Add Service" : "Edit Service"}</h2>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Features (one per line)</label>
                <textarea value={editing.features.join("\n")} onChange={(e) => setEditing({ ...editing, features: e.target.value.split("\n") })} rows={4} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90">
                <Save size={18} /> Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Services List */}
      <div className="grid gap-4">
        {services.map((service, index) => (
          <motion.div key={service.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-card border border-border rounded-2xl p-6 flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-foreground font-display">{service.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {service.features.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">{f}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <button onClick={() => handleEdit(service)} className="p-2 hover:bg-muted rounded-lg transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"><Trash2 size={16} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
