import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  { name: "Rebath", logo: "https://sapivi.com/uploads/rebath.svg" },
  { name: "Teach For All", logo: "https://sapivi.com/uploads/teachforall.jpg" },
  { name: "S B D G", subtitle: "Small Biz Dev Group", logo: "https://sapivi.com/uploads/sbdg.jpg" },
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="clients" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Our <span className="text-gradient">Clients</span>
          </h2>
          <p className="text-muted-foreground">SAPIVI works with</p>
          <div className="h-1 w-16 bg-primary rounded mx-auto mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-xl p-8 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-xl bg-foreground/10 flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg">{client.name}</h3>
              {client.subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{client.subtitle}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
