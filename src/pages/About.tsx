import { motion } from "framer-motion";
import { Users, Target, Award, TrendingUp, Zap, Shield, Globe, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export default function About() {
  const stats = [
    { value: "14+", label: "Years Experience", icon: Award },
    { value: "500+", label: "Happy Clients", icon: Users },
    { value: "1000+", label: "Projects Done", icon: Target },
    { value: "98%", label: "Satisfaction", icon: Heart },
  ];

  const values = [
    { icon: Zap, title: "Innovation First", description: "We embrace cutting-edge technologies and methodologies to deliver future-ready solutions.", gradient: "from-cyan-500 to-blue-500" },
    { icon: Users, title: "Client-Centric", description: "Your success is our success. We prioritize understanding and exceeding client expectations.", gradient: "from-purple-500 to-pink-500" },
    { icon: Shield, title: "Quality Assured", description: "Rigorous testing and quality checks ensure we deliver nothing but excellence.", gradient: "from-emerald-500 to-teal-500" },
    { icon: Globe, title: "Global Reach", description: "Serving clients worldwide with 24/7 support and seamless collaboration.", gradient: "from-amber-500 to-orange-500" },
  ];

  const timeline = [
    { year: "2010", title: "Foundation", description: "SAPIVI was founded with a vision to transform businesses through technology." },
    { year: "2015", title: "Expansion", description: "Expanded services to include digital marketing and cybersecurity solutions." },
    { year: "2020", title: "Innovation", description: "Launched AI-powered HR consulting and advanced analytics services." },
    { year: "2024", title: "Excellence", description: "Recognized as industry leader with 500+ successful projects delivered." },
  ];

  const team = [
    { role: "Leadership", description: "Visionary leaders with decades of combined industry experience.", icon: Target, color: "text-cyan-500" },
    { role: "Developers", description: "Expert engineers proficient in latest technologies and frameworks.", icon: Zap, color: "text-purple-500" },
    { role: "Designers", description: "Creative minds crafting beautiful and intuitive user experiences.", icon: Sparkles, color: "text-pink-500" },
    { role: "Consultants", description: "Strategic advisors guiding businesses through digital transformation.", icon: Users, color: "text-emerald-500" },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-secondary to-primary/20 text-white overflow-hidden pt-24 md:pt-0">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 glass-dark rounded-full text-sm font-semibold mb-8">
              <Sparkles className="text-primary" size={16} />
              <span>About SAPIVI</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight font-display">
              Crafting Digital<br /><span className="text-primary">Excellence</span> Since 2010
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              We're a team of innovators, designers, and developers passionate about transforming businesses through technology.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }} className="glass-dark p-6 rounded-2xl hover:bg-white/10 transition-all group">
                  <stat.icon className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 bg-background relative">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-12 bg-gradient-to-br from-primary to-cyan-600 text-white rounded-3xl">
              <Target className="mb-6" size={48} />
              <h2 className="text-4xl font-bold mb-6 font-display">Our Mission</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To empower businesses worldwide with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital era.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-12 bg-gradient-to-br from-secondary to-secondary/90 text-white rounded-3xl">
              <TrendingUp className="mb-6" size={48} />
              <h2 className="text-4xl font-bold mb-6 font-display">Our Vision</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To be the global leader in integrated business solutions, recognized for our innovation, expertise, and unwavering commitment to client success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">OUR VALUES</div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-display">What Drives <span className="gradient-text">Us</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -5 }} className={`group p-10 bg-gradient-to-br ${value.gradient} rounded-3xl cursor-pointer`}>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">{value.title}</h3>
                <p className="text-white/90 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-display">Our <span className="gradient-text">Journey</span></h2>
          </motion.div>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className="flex-1" style={{ textAlign: index % 2 === 0 ? "right" : "left" }}>
                  <div className="inline-block p-8 bg-muted rounded-3xl hover:shadow-xl transition-shadow">
                    <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 font-display">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20 hidden md:block" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 bg-gradient-to-br from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display">Meet Our <span className="text-primary">Team</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -10 }} className="glass-dark p-8 rounded-3xl text-center group cursor-pointer">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <member.icon className={member.color} size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-display">{member.role}</h3>
                <p className="text-white/70">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-background relative">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-display">Why Choose <span className="gradient-text">SAPIVI</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["14+ Years Industry Experience", "500+ Satisfied Clients", "AI-Powered Solutions", "24/7 Technical Support", "Agile Development Process", "Competitive Pricing", "Global Team of Experts", "Proven Track Record", "Innovation-Driven Approach"].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-center space-x-4 p-6 bg-muted rounded-2xl hover:bg-primary/10 transition-all group">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="text-primary-foreground" size={20} />
                </div>
                <span className="text-lg font-medium text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
