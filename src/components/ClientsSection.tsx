import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

const defaultClients = [
  { name: "Rebath", logo: "https://sapivi.com/uploads/rebath.svg" },
  { name: "Teach For All", logo: "https://sapivi.com/uploads/teachforall.jpg" },
  { name: "S B D G", subtitle: "Small Biz Dev Group", logo: "https://sapivi.com/uploads/sbdg.jpg" },
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [clients, setClients] = useState(defaultClients);

  useEffect(() => {
    adminApi.getClients()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setClients(data.map((c: any) => ({
            name: c.name,
            logo: c.logo || "",
            subtitle: c.industry || "",
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="clients" className="section-padding section-alt">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Trusted By</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Our Clients</h2>
          <div className="h-1 w-12 bg-primary rounded mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {clients.map((client, i) => (
            <motion.div key={client.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }} className="card-elevated p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center mb-4 overflow-hidden">
                {client.logo && client.logo.startsWith("http") ? (
                  <img src={client.logo} alt={client.name} className="w-14 h-14 object-contain" />
                ) : (
                  <span className="text-xl font-bold text-primary">{client.logo || client.name.substring(0, 2)}</span>
                )}
              </div>
              <h3 className="font-display font-semibold text-foreground">{client.name}</h3>
              {client.subtitle && <p className="text-xs text-muted-foreground mt-1">{client.subtitle}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
