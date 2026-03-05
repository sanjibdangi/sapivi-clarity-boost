import { Mail, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ModernFooter() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);

    try {

      const res = await fetch("https://api.sapivi.foxnutfusion.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setEmail("");

        setTimeout(() => {
          setSuccess(false);
        }, 4000);

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Subscription failed");
    }

    setLoading(false);
  };

  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com/sapivi", label: "Facebook" },
    { Icon: Linkedin, href: "https://linkedin.com/company/sapivi", label: "LinkedIn" },
    { Icon: Instagram, href: "https://instagram.com/sapivi", label: "Instagram" },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground relative overflow-hidden">

      <div className="absolute inset-0 mesh-gradient opacity-10" />

      {/* Newsletter */}
      <div className="relative border-b border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Stay Ahead of the Curve
              </h3>

              <p className="text-white/70 text-lg">
                Get the latest insights on digital transformation, tech trends, and business growth.
              </p>
            </motion.div>


            {/* SUBSCRIBE FORM */}
            <motion.form
              onSubmit={handleSubscribe}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl hover:bg-primary/90 hover:shadow-xl transition-all flex items-center justify-center space-x-2 group whitespace-nowrap"
                >

                  <span>
                    {loading ? "Subscribing..." : "Subscribe"}
                  </span>

                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />

                </button>

              </div>

              {success && (
                <p className="text-green-400 mt-3 text-sm">
                  Thanks for subscribing!
                </p>
              )}

            </motion.form>

          </div>
        </div>
      </div>


      {/* Main Footer */}
      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Company Info */}
            <div className="lg:col-span-2">

              <div className="flex items-center gap-3 mb-6">

                <img
                  src="/logo.png"
                  alt="SAPIVI Logo"
                  className="h-12 w-auto object-contain"
                />

                <span className="text-sm text-white/70">
                  ISO 9001:2015
                </span>

              </div>

              <p className="text-white/70 mb-6 max-w-md leading-relaxed">
                Transforming businesses with innovative solutions in HR consulting, digital marketing,
                IT services, and management for over 14 years.
              </p>

              <div className="flex space-x-3">

                {socialLinks.map((social, index) => (

                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-11 h-11 bg-white/10 backdrop-blur-sm hover:bg-primary rounded-xl flex items-center justify-center transition-all"
                  >

                    <social.Icon className="text-white" size={20} />

                  </motion.a>

                ))}

              </div>
            </div>


            {/* Quick Links */}
            <div>

              <h4 className="text-lg font-bold font-display mb-6">
                Quick Links
              </h4>

              <ul className="space-y-3">

                {quickLinks.map((link, index) => (

                  <li key={index}>

                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-primary transition-colors flex items-center group"
                    >

                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all" />

                      {link.label}

                    </Link>

                  </li>

                ))}

              </ul>

            </div>


            {/* Contact Info */}
            <div>

              <h4 className="text-lg font-bold font-display mb-6">
                Get in Touch
              </h4>

              <div className="space-y-4">

                <div className="flex items-start space-x-3">

                  <Mail className="text-primary mt-1 flex-shrink-0" size={20} />

                  <div>
                    <p className="text-sm text-white/50 mb-1">
                      Email
                    </p>

                    <a
                      href="mailto:contact@sapivi.com"
                      className="text-white/90 hover:text-primary transition-colors"
                    >
                      contact@sapivi.com
                    </a>
                  </div>

                </div>


                <div className="flex items-start space-x-3">

                  <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />

                  <div>
                    <p className="text-sm text-white/50 mb-1">
                      Location
                    </p>

                    <p className="text-white/90 text-sm leading-relaxed">
                      No:58, 5th Main Krishna Niwas,
                      Halasahalli, Bangalore
                      Karnataka, India 560087
                    </p>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 py-6">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            <p className="text-white/50 text-sm">
              © 2022 Sapivi Enterprises Private Limited. All rights reserved.
            </p>

            <p className="text-white/50 text-sm">
              CIN: U72900KA2021PTC155725
            </p>

          </div>

        </div>
      </div>

    </footer>
  );
}