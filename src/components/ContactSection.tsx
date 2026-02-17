import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Building2 } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <div className="h-1 w-16 bg-primary rounded mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail size={22} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-2 text-foreground">Email Us At</h3>
            <a href="mailto:contact@sapivi.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              contact@sapivi.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin size={22} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-2 text-foreground">Head Office</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No:58, 5th Main Krishna Niwas, Halasahalli, Bangalore, Karnataka, India, 560087
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Building2 size={22} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-2 text-foreground">CIN</h3>
            <p className="text-sm text-muted-foreground">U72900KA2021PTC155725</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
