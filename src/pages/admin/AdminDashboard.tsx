import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderOpen,
  Mail,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Hero Section",
    description: "Edit hero headline, description, and CTA",
    icon: FileText,
    path: "/admin/hero",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "About Content",
    description: "Update mission, vision, timeline, values",
    icon: FileText,
    path: "/admin/about",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Services",
    description: "Manage your service offerings",
    icon: Briefcase,
    path: "/admin/services",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Portfolio",
    description: "Add, edit, or remove projects",
    icon: FolderOpen,
    path: "/admin/portfolio",
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Clients",
    description: "Manage client logos and info",
    icon: Users,
    path: "/admin/clients",
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Messages",
    description: "View contact form submissions",
    icon: Mail,
    path: "/admin/messages",
    color: "from-rose-500 to-pink-500"
  }
];

export default function AdminDashboard() {
  return (<div> <div className="mb-8"> <h1 className="text-3xl font-bold text-foreground font-display">
    Dashboard </h1> <p className="text-muted-foreground mt-1">
      Welcome to the SAPIVI Admin Console </p> </div>

    ```
    {/* Dashboard Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <Link to={card.path} className="block group">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <card.icon className="text-white" size={22} />
              </div>

              <h3 className="text-lg font-semibold text-foreground font-display mb-1">
                {card.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>

  );
}
