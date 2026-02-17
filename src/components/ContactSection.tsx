import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Building2 } from "lucide-react";

const contactCards = [
  {
    icon: Mail,
    title: "Email Us At",
    content: "contact@sapivi.com",
    href: "mailto:contact@sapivi.com",
  },
  {
    icon: MapPin,
    title: "Head Office",
    content: "No:58, 5th Main Krishna Niwas, Halasahalli, Bangalore, Karnataka, India, 560087",
  },
  {
    icon: Building2,
    title: "CIN",
    content: "U72900KA2021PTC155725",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Contact Us
          </h2>
          <div className="h-1 w-12 bg-primary rounded mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="card-elevated p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <card.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{card.title}</h3>
              {card.href ? (
                <a
                  href={card.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {card.content}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
