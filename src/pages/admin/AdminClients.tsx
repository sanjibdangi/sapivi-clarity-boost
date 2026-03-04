import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Save, Trash2, Edit2, X, Loader2 } from "lucide-react";
import { adminApi } from "@/lib/api";
import { toast } from "sonner";

interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editing, setEditing] = useState<Client | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchClients = () => {
    adminApi.getClients()
      .then((data) => setClients(data || []))
      .catch(() => toast.error("Failed to load clients"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchClients(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this client?")) return;
    try {
      await adminApi.deleteClient(id);
      toast.success("Client deleted");
      fetchClients();
    } catch { toast.error("Delete failed"); }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (isNew) await adminApi.createClient({ name: editing.name, logo: editing.logo, industry: editing.industry });
      else await adminApi.updateClient(editing.id, { name: editing.name, logo: editing.logo, industry: editing.industry });
      toast.success("Client saved!");
      setEditing(null);
      fetchClients();
    } catch { toast.error("Save failed"); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage client logos and info</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditing({ id: "", name: "", logo: "", industry: "" }); setIsNew(true); }} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90">
          <Plus size={18} /> Add Client
        </motion.button>
      </div>

      {editing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-card rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-display">{isNew ? "Add" : "Edit"} Client</h2>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold mb-2">Name</label><input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="block text-sm font-semibold mb-2">Logo Initials</label><input type="text" value={editing.logo} onChange={(e) => setEditing({ ...editing, logo: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="block text-sm font-semibold mb-2">Industry</label><input type="text" value={editing.industry} onChange={(e) => setEditing({ ...editing, industry: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90"><Save size={18} /> Save</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client, index) => (
          <motion.div key={client.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-primary">{client.logo}</span>
            </div>
            <h3 className="font-semibold text-foreground font-display">{client.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{client.industry}</p>
            <div className="flex gap-2 mt-4 justify-center">
              <button onClick={() => { setEditing({ ...client }); setIsNew(false); }} className="p-2 hover:bg-muted rounded-lg"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(client.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"><Trash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
        {clients.length === 0 && <p className="text-center text-muted-foreground py-12 col-span-3">No clients yet.</p>}
      </div>
    </div>
  );
}
