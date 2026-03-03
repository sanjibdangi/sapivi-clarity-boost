import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    { icon: Mail, title: "Email Us", value: "contact@sapivi.com", link: "mailto:contact@sapivi.com", gradient: "from-cyan-500 to-blue-500" },
    { icon: Phone, title: "Call Us", value: "+91 80 1234 5678", link: "tel:+918012345678", gradient: "from-purple-500 to-pink-500" },
    { icon: MapPin, title: "Visit Us", value: "Bangalore, Karnataka", link: null, gradient: "from-emerald-500 to-teal-500" },
    { icon: Clock, title: "Business Hours", value: "Mon-Fri: 9AM - 6PM IST", link: null, gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-br from-secondary via-secondary to-primary/20 text-white overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 glass-dark rounded-full text-sm font-semibold mb-6">GET IN TOUCH</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">Let's Build Something<br /><span className="text-primary">Extraordinary</span></h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">Have a project in mind? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background relative -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -8, scale: 1.02 }} className={`group relative p-8 bg-gradient-to-br ${info.gradient} rounded-3xl overflow-hidden cursor-pointer`}>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <info.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-white/80 text-sm font-semibold mb-2">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-white font-bold text-lg hover:underline">{info.value}</a>
                  ) : (
                    <p className="text-white font-bold text-lg">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 mesh-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-foreground mb-4 font-display">Send Us a Message</h2>
                <p className="text-muted-foreground text-lg">Fill out the form and our team will get back to you within 24 hours.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help you?" className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell us about your project..." className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-8 py-5 bg-accent text-accent-foreground rounded-2xl font-bold text-lg hover:bg-accent/90 hover:shadow-xl transition-all flex items-center justify-center space-x-2 group">
                  <span>Send Message</span>
                  <Send className="group-hover:translate-x-1 transition-transform" size={20} />
                </motion.button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-secondary to-secondary/90 text-white rounded-3xl">
                <MapPin className="text-primary mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-4 font-display">Head Office</h3>
                <p className="text-white/80 leading-relaxed mb-2">No:58, 5th Main Krishna Niwas,<br />Halasahalli, Bangalore,<br />Karnataka, India 560087</p>
                <p className="text-white/60 text-sm mt-4">CIN: U72900KA2021PTC155725</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-muted rounded-2xl text-center"><div className="text-3xl font-bold text-primary mb-1">24h</div><div className="text-sm text-muted-foreground">Response Time</div></div>
                <div className="p-6 bg-muted rounded-2xl text-center"><div className="text-3xl font-bold text-primary mb-1">98%</div><div className="text-sm text-muted-foreground">Satisfaction</div></div>
                <div className="p-6 bg-muted rounded-2xl text-center"><div className="text-3xl font-bold text-primary mb-1">500+</div><div className="text-sm text-muted-foreground">Happy Clients</div></div>
                <div className="p-6 bg-muted rounded-2xl text-center"><div className="text-3xl font-bold text-primary mb-1">24/7</div><div className="text-sm text-muted-foreground">Support</div></div>
              </div>
              <div className="p-8 bg-gradient-to-br from-primary to-cyan-600 text-white rounded-3xl">
                <MessageCircle className="mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-3 font-display">Prefer to Chat?</h3>
                <p className="text-white/90 mb-6">Our team is available for a quick call or video meeting.</p>
                <button className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-all flex items-center space-x-2 group">
                  <span>Schedule a Call</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-24 bg-muted" id="map">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-display">Find Us Here</h2>
              <p className="text-muted-foreground text-lg">Visit our office in Bangalore</p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto mb-4 text-primary" size={64} />
                  <p className="text-2xl font-bold text-foreground mb-2 font-display">Bangalore, Karnataka, India</p>
                  <p className="text-muted-foreground">Interactive map integration available</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
