import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Phone, MessageCircle, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { adminApi } from "@/lib/api";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for dynamic company info
  const [info, setInfo] = useState({
    email: "contact@sapivi.com",
    phone: "+91 80 1234 5678",
    address: "Bangalore, Karnataka",
    cin: "U72900KA2021PTC155725",
    businessHours: "Mon-Fri: 9AM - 6PM IST"
  });

  useEffect(() => {
    // Fetch live settings from your new API
    const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/settings` : "/api/settings";

    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setInfo({
            email: json.data.email || info.email,
            phone: json.data.phone || info.phone,
            address: json.data.address || info.address,
            cin: json.data.cin || info.cin,
            businessHours: json.data.business_hours || info.businessHours,
          });
        }
      })
      .catch((err) => console.error("Error loading live contact info:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminApi.submitMessage(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  const contactCards = [
    { icon: Mail, title: "Email Us", value: info.email, link: `mailto:${info.email}`, gradient: "from-cyan-500 to-blue-500" },
    { icon: Phone, title: "Call Us", value: info.phone, link: `tel:${info.phone.replace(/\s+/g, '')}`, gradient: "from-purple-500 to-pink-500" },
    { icon: MapPin, title: "Visit Us", value: info.address.split(',')[0], link: null, gradient: "from-emerald-500 to-teal-500" },
    { icon: Clock, title: "Business Hours", value: info.businessHours, link: null, gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 bg-gradient-to-br from-secondary via-secondary to-primary/20 text-white overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 glass-dark rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">Get In Touch</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">Let's Build Something<br /><span className="text-primary">Extraordinary</span></h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">Have a project in mind? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background relative -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -8, scale: 1.02 }} className={`group relative p-8 bg-gradient-to-br ${card.gradient} rounded-3xl overflow-hidden cursor-pointer shadow-lg`}>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <card.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-white/80 text-sm font-semibold mb-2">{card.title}</h3>
                  {card.link ? (
                    <a href={card.link} className="text-white font-bold text-lg hover:underline block truncate">{card.value}</a>
                  ) : (
                    <p className="text-white font-bold text-lg">{card.value}</p>
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
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">Your Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground ml-1">Subject *</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Project Inquiry" className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground ml-1">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell us about your project details..." className="w-full px-6 py-4 bg-muted border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
                </div>
                <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-8 py-5 bg-accent text-accent-foreground rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 group disabled:opacity-50">
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send className="group-hover:translate-x-1 transition-transform" size={20} />}
                </motion.button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-secondary to-secondary/90 text-white rounded-3xl shadow-xl">
                <MapPin className="text-primary mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-4 font-display">Head Office</h3>
                <p className="text-white/80 leading-relaxed mb-2 whitespace-pre-line">{info.address}</p>
                <p className="text-white/60 text-sm mt-6 pt-4 border-t border-white/10">CIN: {info.cin}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Response Time", val: "24h" },
                  { label: "Satisfaction", val: "98%" },
                  { label: "Happy Clients", val: "500+" },
                  { label: "Support", val: "24/7" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-card border border-border rounded-2xl text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.val}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-gradient-to-br from-primary to-cyan-600 text-white rounded-3xl shadow-lg">
                <MessageCircle className="mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-3 font-display">Prefer to Chat?</h3>
                <p className="text-white/90 mb-6">Our team is available for a quick call or video meeting to discuss your needs.</p>
                <button className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-all flex items-center space-x-2 group">
                  <span>Schedule a Call</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-display">Find Us Here</h2>
              <p className="text-muted-foreground text-lg">Located in the heart of Bangalore's tech hub</p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-card">
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.375267156934!2d77.7410!3d12.903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzEwLjgiTiA3N8KwNDQnMjcuNiJF!5e0!3m2!1sen!2sin!4v1700000000000"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  allowFullScreen
                  title="SAPIVI Location Map"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}