import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, Briefcase, FolderOpen, Mail, Users, Settings, LogOut, Menu, X, ChevronRight,
} from "lucide-react";

const sidebarItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/hero", label: "Hero Section", icon: FileText },
  { path: "/admin/about", label: "About Content", icon: FileText },
  { path: "/admin/services", label: "Services", icon: Briefcase },
  { path: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { path: "/admin/clients", label: "Clients", icon: Users },
  { path: "/admin/contact", label: "Contact Info", icon: Mail },
  { path: "/admin/messages", label: "Messages", icon: Mail },
  { path: "/admin/subscribers", label: "Subscribers", icon: Users },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin");
  };

  const user = JSON.parse(localStorage.getItem("admin_user") || '{"name":"Admin","email":"admin@sapivi.com"}');

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">

            {/* LOGO */}
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white">
              <img
                src="/logo.png"
                alt="SAPIVI Logo"
                className="w-8 h-8 object-contain"
              />
            </div>

            {/* TEXT */}
            <div>
              <span className="text-lg font-bold font-display text-foreground">
                SAPIVI
              </span>
              <p className="text-xs text-muted-foreground">
                Admin Console
              </p>
            </div>

          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <item.icon size={18} />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="ml-auto" size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">{user.name?.[0] || "A"}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all w-full">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
            <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-50 lg:hidden flex flex-col">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <span className="text-lg font-bold font-display">SAPIVI Admin</span>
                <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                      <item.icon size={18} /><span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-border">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all w-full">
                  <LogOut size={18} /><span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center px-6 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-muted rounded-xl">
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            View Website →
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
