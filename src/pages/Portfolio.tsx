import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Gradient pool to keep things colorful
  const gradients = [
    "from-cyan-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-blue-500 to-indigo-500",
    "from-rose-500 to-pink-500",
  ];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/portfolio` : "/api/portfolio";

    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setProjects(json.data);
      })
      .catch((err) => console.error("Error fetching portfolio:", err))
      .finally(() => setLoading(false));
  }, []);

  // Dynamically generate filter list from the actual data
  const filters = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const clients = [
    { name: "RE BATH", logo: "RB", industry: "Home Improvement", gradient: "from-cyan-500 to-blue-500" },
    { name: "Teach For All", logo: "TFA", industry: "Education", gradient: "from-purple-500 to-pink-500" },
    { name: "SBDG", logo: "SB", industry: "Business Development", gradient: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-br from-secondary via-secondary to-primary/20 text-white overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 glass-dark rounded-full text-sm font-semibold mb-6">
              <Sparkles className="text-primary" size={16} />
              <span>Our Success Stories</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">Work That <span className="text-primary">Inspires</span></h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">Explore our portfolio of transformative projects.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 py-6 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeFilter === filter ? "bg-primary text-primary-foreground shadow-lg" : "bg-card text-foreground border border-border hover:border-primary/50"}`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-3xl cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    </div>

                    {/* Hover Overlay using Cyclic Gradients */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-95 transition-opacity duration-300`}>
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">{tag}</span>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2 font-display">{project.title}</h3>
                          <p className="text-white/90 mb-4 line-clamp-2">{project.description}</p>
                          <div className="flex items-center text-white font-semibold">
                            <span>View Case Study</span>
                            <ExternalLink className="ml-2" size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-foreground">{project.category}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Clients Section (Static) */}
      <section className="py-32 bg-gradient-to-br from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display">Trusted By <span className="text-primary">Industry Leaders</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.05, y: -10 }} className="glass-dark p-12 rounded-3xl text-center group cursor-pointer">
                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${client.gradient} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                  <span className="text-3xl font-bold text-white">{client.logo}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 font-display">{client.name}</h3>
                <p className="text-white/60">{client.industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-display">Let's Create Your <span className="gradient-text">Success Story</span></h2>
            <Link to="/contact" className="inline-flex items-center px-10 py-5 bg-accent text-accent-foreground rounded-full font-bold text-lg hover:bg-accent/90 hover:shadow-2xl hover:scale-105 transition-all">
              Start Your Project <ArrowRight className="ml-2" size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}