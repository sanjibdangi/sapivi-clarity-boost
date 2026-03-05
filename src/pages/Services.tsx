import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, TrendingUp, Layers, Globe, Settings, Search, Shield, Database, Code, Users, Calculator, Smartphone, ArrowRight, Check, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

// We define the type for our fetched services
interface Service {
  id?: string;
  title: string;
  description: string;
  features: string[];
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // A pool of your beautiful icons and gradients to apply to dynamic database items!
  const stylePool = [
    { icon: Code, color: "from-cyan-500 to-blue-500", size: "large" },
    { icon: TrendingUp, color: "from-blue-500 to-purple-500", size: "medium" },
    { icon: Shield, color: "from-purple-500 to-pink-500", size: "medium" },
    { icon: Users, color: "from-pink-500 to-rose-500", size: "medium" },
    { icon: BarChart, color: "from-amber-500 to-orange-500", size: "medium" },
    { icon: Globe, color: "from-emerald-500 to-teal-500", size: "large" },
    { icon: Search, color: "from-indigo-500 to-blue-500", size: "medium" },
    { icon: Database, color: "from-violet-500 to-purple-500", size: "medium" },
    { icon: Calculator, color: "from-fuchsia-500 to-pink-500", size: "medium" },
    { icon: Layers, color: "from-rose-500 to-red-500", size: "medium" },
    { icon: Smartphone, color: "from-sky-500 to-cyan-500", size: "medium" },
    { icon: Settings, color: "from-teal-500 to-emerald-500", size: "medium" },
  ];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/services` : "/api/services";

    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setServices(json.data);
        }
      })
      .catch((err) => console.error("Failed to fetch services:", err))
      .finally(() => setLoading(false));
  }, []);

  const process = [
    { step: "01", title: "Discovery", description: "We dive deep into understanding your business goals.", icon: Search },
    { step: "02", title: "Strategy", description: "Crafting a tailored solution blueprint.", icon: BarChart },
    { step: "03", title: "Execution", description: "Implementing solutions with precision.", icon: Code },
    { step: "04", title: "Support", description: "Ongoing optimization and 24/7 support.", icon: Shield },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-br from-secondary via-secondary to-primary/20 text-white overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 glass-dark rounded-full text-sm font-semibold mb-6">WHAT WE OFFER</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">Services That Drive<br /><span className="text-primary">Real Results</span></h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">Comprehensive solutions tailored to your unique business needs.</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                // Cyclically pick styles from the pool based on the index
                const style = stylePool[index % stylePool.length];
                const IconComponent = style.icon;

                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.02 }} className={`group relative p-8 bg-gradient-to-br ${style.color} rounded-3xl overflow-hidden cursor-pointer ${style.size === "large" ? "md:col-span-2" : ""}`}>
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                        <IconComponent className="text-white" size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 font-display">{service.title}</h3>
                      <p className="text-white/90 mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-white/80 text-sm">
                            <Check className="mr-2 flex-shrink-0" size={16} />{feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center text-white font-semibold group-hover:gap-2 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {services.length === 0 && (
                <p className="text-center text-muted-foreground py-12 col-span-full">No services available at the moment.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-gradient-to-br from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display">Our Proven <span className="text-primary">Process</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative">
                <div className="glass-dark p-8 rounded-3xl hover:bg-white/10 transition-all group">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="text-primary-foreground" size={28} />
                  </div>
                  <div className="text-primary text-5xl font-bold mb-4 opacity-50">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-3 font-display">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </div>
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
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-display">Let's Build Something <span className="gradient-text">Amazing</span></h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">Ready to transform your business? Our team of experts is here to help.</p>
            <Link to="/contact" className="inline-flex items-center px-10 py-5 bg-accent text-accent-foreground rounded-full font-bold text-lg hover:bg-accent/90 hover:shadow-2xl hover:scale-105 transition-all">
              Start Your Project <ArrowRight className="ml-2" size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}