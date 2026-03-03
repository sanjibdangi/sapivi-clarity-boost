import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Save, Trash2, Edit2, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const defaultProjects: Project[] = [
  { id: "1", title: "E-Commerce Platform", category: "Web Development", description: "Modern shopping experience with AI recommendations", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop", tags: ["React", "Node.js", "AI"] },
  { id: "2", title: "Social Media Campaign", category: "Digital Marketing", description: "Viral campaign reaching 2M+ impressions", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop", tags: ["Social", "Analytics"] },
];

export default function AdminPortfolio() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) setProjects(projects.filter((p) => p.id !== id));
  };

  const handleEdit = (project: Project) => { setEditing({ ...project }); setIsNew(false); };

  const handleAdd = () => {
    setEditing({ id: Date.now().toString(), title: "", category: "", description: "", image: "", tags: [] });
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) setProjects([...projects, editing]);
    else setProjects(projects.map((p) => (p.id === editing.id ? editing : p)));
    setEditing(null);
    alert("Project saved! (Connect your MySQL API to persist)");
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Manage portfolio projects</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAdd} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
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
                <button onClick={() => handleEdit(project)} className="flex items-center gap-1.5 px-4 py-2 bg-muted rounded-lg text-sm hover:bg-primary/10 transition-colors"><Edit2 size={14} /> Edit</button>
                <button onClick={() => handleDelete(project.id)} className="flex items-center gap-1.5 px-4 py-2 bg-destructive/10 text-destructive rounded-lg text-sm hover:bg-destructive/20 transition-colors"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
