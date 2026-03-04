import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/contact", label: "Contact" },
];

export default function ModernNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass shadow-xl" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
        <img
          src="/logo.png"
          alt="SAPIVI Logo"
          className="h-12 w-auto object-contain"
        />

        <span className="text-[11px] text-muted-foreground tracking-wider">
          ISO 9001:2015
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className="relative px-4 py-2 group">
            <span
              className={`text-sm font-medium transition-colors ${location.pathname === item.path
                ? "text-primary"
                : isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
                }`}
            >
              {item.label}
            </span>
            {location.pathname === item.path && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}

        <Link
          to="/contact"
          className="ml-4 px-6 py-2.5 bg-accent text-accent-foreground rounded-full font-medium hover:bg-accent/90 hover:shadow-lg hover:scale-105 transition-all"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden p-2 rounded-xl hover:bg-primary/10 transition-colors ${isScrolled ? "text-foreground" : "text-white"
          }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all ${location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-primary/10"
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/contact"
                className="block px-4 py-3 bg-accent text-accent-foreground rounded-xl font-medium text-center hover:bg-accent/90 transition-all mt-4"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}