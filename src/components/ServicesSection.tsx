import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Megaphone, FileText, Globe, Puzzle, Search } from "lucide-react";

const services = [
  { icon: BarChart3, title: "Google Analytics" },
  { icon: Megaphone, title: "Digital Marketing" },
  { icon: FileText, title: "Content Management" },
  { icon: Globe, title: "Web Development" },
  { icon: Puzzle, title: "API Integration" },
  { icon: Search, title: "Search Engine" },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Our <span className="text-gradient">Services</span>
          </h2>
          <div className="h-1 w-16 bg-primary rounded mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-card rounded-xl p-8 text-center hover:border-primary/30 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-[var(--shadow-glow)] transition-all">
                <service.icon size={26} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
