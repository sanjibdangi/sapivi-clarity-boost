import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Users, Code, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [stats, setStats] = useState({ years: 0, clients: 0, projects: 0, satisfaction: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const targets = { years: 14, clients: 500, projects: 1000, satisfaction: 98 };
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setStats({
        years: Math.floor(targets.years * progress),
        clients: Math.floor(targets.clients * progress),
        projects: Math.floor(targets.projects * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      });
      if (currentStep >= steps) { setStats(targets); clearInterval(timer); }
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const services = [
    { icon: Code, title: "Application Integration", description: "Seamless API integration and custom software solutions", gradient: "from-cyan-500 to-blue-500" },
    { icon: TrendingUp, title: "Digital Marketing", description: "Data-driven strategies to grow your online presence", gradient: "from-blue-500 to-purple-500" },
    { icon: Shield, title: "Cyber Security", description: "Enterprise-grade security for your digital assets", gradient: "from-purple-500 to-pink-500" },
    { icon: Users, title: "HR Consulting", description: "AI-powered talent acquisition and management", gradient: "from-pink-500 to-rose-500" },
  ];

  const features = [
    "14+ Years of Excellence", "500+ Happy Clients", "1000+ Projects Delivered",
    "98% Satisfaction Rate", "24/7 Support", "Global Reach",
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 overflow-hidden pt-24 md:pt-0">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center space-x-2 px-4 py-2 glass-dark rounded-full mb-8">
              <Sparkles className="text-primary" size={16} />
              <span className="text-sm text-white font-medium">Transforming Businesses Since 2010</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight font-display">
              Innovate.<br />
              <span className="text-primary">Integrate.</span><br />
              Dominate.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              We transform businesses with cutting-edge digital solutions, AI-powered HR consulting, and enterprise-grade technology.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="group px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 hover:shadow-2xl hover:scale-105 transition-all flex items-center space-x-2">
                <span>Start Your Project</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/portfolio" className="px-8 py-4 glass-dark text-white rounded-full font-semibold hover:bg-white/20 transition-all">
                View Our Work
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              {[
                { value: stats.years, label: "Years", suffix: "+" },
                { value: stats.clients, label: "Clients", suffix: "+" },
                { value: stats.projects, label: "Projects", suffix: "+" },
                { value: stats.satisfaction, label: "Satisfaction", suffix: "%" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}{stat.suffix}</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Marquee */}
      <section className="py-8 bg-primary overflow-hidden">
        <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex space-x-12 whitespace-nowrap">
          {[...features, ...features].map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Zap className="text-primary-foreground" size={20} />
              <span className="text-primary-foreground font-semibold text-lg">{feature}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-32 bg-background relative">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">OUR EXPERTISE</div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-display">Services That <span className="gradient-text">Transform</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Comprehensive solutions tailored to your business needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -5 }} className={`group relative p-8 md:p-12 bg-gradient-to-br ${service.gradient} rounded-3xl overflow-hidden cursor-pointer ${index === 0 ? "md:col-span-2" : ""}`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display">{service.title}</h3>
                  <p className="text-white/90 text-lg mb-6">{service.description}</p>
                  <div className="flex items-center text-white font-semibold group-hover:gap-2 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 hover:shadow-xl hover:scale-105 transition-all">
              Explore All Services <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-gradient-to-br from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display">Why Choose <span className="text-primary">SAPIVI</span>?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">Experience, innovation, and dedication combined</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["14+ Years Industry Experience", "500+ Satisfied Clients Worldwide", "AI-Powered Solutions", "24/7 Technical Support", "Agile Development Process", "Competitive Pricing"].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                  <CheckCircle2 size={18} className="text-primary-foreground" />
                </div>
                <span className="text-lg text-white/90">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-display">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">Join 500+ businesses that trust SAPIVI for their digital transformation journey.</p>
            <Link to="/contact" className="inline-flex items-center px-10 py-5 bg-accent text-accent-foreground rounded-full font-bold text-lg hover:bg-accent/90 hover:shadow-2xl hover:scale-105 transition-all">
              Let's Talk <ArrowRight className="ml-2" size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
