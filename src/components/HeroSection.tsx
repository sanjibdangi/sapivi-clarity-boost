import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  "HR Consultation",
  "Staff Sourcing",
  "Digital Marketing",
  "IT Consulting",
  "Cyber Security",
  "Application Integration",
  "Accounting",
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-32">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary font-semibold text-sm tracking-widest uppercase mb-4"
          >
            We are providing
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-tight mb-6"
          >
            Consulting Excellence
            <br />
            <span className="text-gradient">for Modern Business</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground text-lg mb-8 max-w-lg"
          >
            Over 14 years of experience delivering HR, IT, and Digital solutions with our in-house team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {services.map((service) => (
              <span
                key={service}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
              >
                {service}
              </span>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
          >
            Learn More
            <ChevronDown size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
