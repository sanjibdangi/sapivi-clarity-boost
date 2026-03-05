import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { BarChart3, Megaphone, FileText, Globe, Puzzle, Search } from "lucide-react";
import { adminApi } from "@/lib/api";

const iconMap: Record<string, any> = {
  "Google Analytics": BarChart3, "Digital Marketing": Megaphone,
  "Content Management": FileText, "Web Development": Globe,
  "API Integration": Puzzle, "Search Engine": Search,
};

const defaultServices = [
  { icon: BarChart3, title: "Google Analytics", desc: "Data-driven insights for growth" },
  { icon: Megaphone, title: "Digital Marketing", desc: "Full-service marketing solutions" },
  { icon: FileText, title: "Content Management", desc: "Strategic content creation" },
  { icon: Globe, title: "Web Development", desc: "Modern web applications" },
  { icon: Puzzle, title: "API Integration", desc: "Seamless system connectivity" },
  { icon: Search, title: "Search Engine", desc: "SEO and visibility optimization" },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    adminApi.getServices()
      .then((res) => {
        const data = res?.data || res;
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.map((s: any) => ({
            icon: iconMap[s.title] || Globe,
            title: s.title,
            desc: s.description,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Our Services</h2>
          <div className="h-1 w-12 bg-primary rounded mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} className="card-elevated p-6 md:p-8 text-center group cursor-pointer">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                  <Icon size={26} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm md:text-base mb-1">{service.title}</h3>
                <p className="text-xs text-muted-foreground hidden md:block">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
