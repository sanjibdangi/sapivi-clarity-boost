import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Save, Trash2, Edit2, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/lib/api";
import { defaultPortfolio } from "@/lib/defaults";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export default function AdminPortfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    setLoading(true);
    adminApi.getPortfolio()
      .then((res) => {
        const data = res?.data || res;
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.map((p: any) => ({
            ...p,
            id: String(p.id),
            tags: Array.isArray(p.tags) ? p.tags :
              (typeof p.tags === 'string' ? JSON.parse(p.tags) : [])
          })));
        } else {
          setProjects(defaultPortfolio);
        }
      })
      .catch(() => toast.error("Failed to load portfolio"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await adminApi.deletePortfolio(id);
      toast.success("Project deleted");
      fetchProjects();
    } catch { toast.error("Delete failed"); }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      const payload = {
        title: editing.title,
        category: editing.category,
        description: editing.description,
        image: editing.image,
        tags: editing.tags
      };

      if (isNew) {
        await adminApi.createPortfolio(payload);
      } else {
        await adminApi.updatePortfolio(editing.id, payload);
      }
      toast.success("Project saved!");
      setEditing(null);
      fetchProjects();
    } catch { toast.error("Save failed"); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div className="p-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Manage portfolio projects</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditing({ id: "", title: "", category: "", description: "", image: "", tags: [] }); setIsNew(true); }} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
          <Plus size={18} /> Add Project
        </motion.button>
      </div>

      {editing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-card rounded-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-display">{isNew ? "Add Project" : "Edit Project"}</h2>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold mb-2">Title</label><input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="block text-sm font-semibold mb-2">Category</label><input type="text" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="block text-sm font-semibold mb-2">Description</label><textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none" /></div>
              <div><label className="block text-sm font-semibold mb-2">Image URL</label><input type="url" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="block text-sm font-semibold mb-2">Tags (comma separated)</label><input type="text" value={editing.tags.join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((t) => t.trim()) })} className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90"><Save size={18} /> Save</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-card border border-border rounded-2xl overflow-hidden">
            {project.image && <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground font-display">{project.title}</h3>
              <p className="text-xs text-primary font-medium mt-1">{project.category}</p>
              <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((t, i) => <span key={i} className="px-3 py-1 bg-muted rounded-full text-xs">{t}</span>)}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => { setEditing({ ...project }); setIsNew(false); }} className="flex items-center gap-1.5 px-4 py-2 bg-muted rounded-lg text-sm hover:bg-primary/10 transition-colors"><Edit2 size={14} /> Edit</button>
                <button onClick={() => handleDelete(project.id)} className="flex items-center gap-1.5 px-4 py-2 bg-destructive/10 text-destructive rounded-lg text-sm hover:bg-destructive/20 transition-colors"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
