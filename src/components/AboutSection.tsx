import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "HR Consultation & Staff Sourcing", value: 98 },
  { name: "Digital Marketing", value: 95 },
  { name: "IT Consulting", value: 95 },
  { name: "Cyber Security", value: 93 },
  { name: "Application Integration", value: 96 },
  { name: "Accounting", value: 94 },
];

const SkillBar = ({ name, value, delay }: { name: string; value: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm text-primary font-semibold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
              About <span className="text-gradient">SAPIVI</span>
            </h2>
            <div className="h-1 w-16 bg-primary rounded mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              We have rich experience in HR consultation, Staff sourcing, Digital Marketing, IT services, and management.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We at Sapivi have over 14 years of experience in staff sourcing and delivering IT and Digital solutions with our in-house team. This experience allows our team to offer unique perspectives on talent requisition and architecting solutions, analysis of technology returns, and product recommendations for our clients in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold mb-6">Our Skills</h3>
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
