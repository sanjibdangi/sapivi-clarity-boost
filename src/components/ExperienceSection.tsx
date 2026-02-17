import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Code, LineChart, Megaphone, BookOpen, Database, Cpu } from "lucide-react";

const experiences = [
  {
    icon: Users,
    title: "HR Consulting",
    period: "2007 / 2022",
    description:
      "SAPIVI is not just a HR consulting firm. We are an AI based consulting firm using the updated HR technologies.",
  },
  {
    icon: Code,
    title: "Software Development and Implementation",
    period: "2007 / 2022",
    description:
      "SAPIVI has over 14 years of combined Project development and information technology experience.",
  },
  {
    icon: LineChart,
    title: "Consulting",
    period: "2007 / 2022",
    description:
      "Our management consulting services focus on our clients' most critical issues and opportunities: strategy, marketing, organization.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    period: "2007 / 2022",
    description:
      "SAPIVI is a dynamic, versatile and full-service digital marketing agency that doesn't rely on smoke and mirrors to attract new clients.",
  },
  {
    icon: BookOpen,
    title: "Bookkeeping",
    period: "2007 / 2022",
    description:
      "SAPIVI is providing a bookkeeping solution that helps all types of business owners keep their finances on track.",
  },
  {
    icon: Database,
    title: "Data Analytics",
    period: "2007 / 2022",
    description:
      "We know how to separate the signal from the noise. Data, analytics and AI are opening the door to new possibilities for organizations.",
  },
  {
    icon: Cpu,
    title: "Data Processing",
    period: "2007 / 2022",
    description:
      "Get quick access to meaningful information with full-cycle, enterprise-grade data processing solutions.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Our <span className="text-gradient">Experience</span>
          </h2>
          <div className="h-1 w-16 bg-primary rounded mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <exp.icon size={20} className="text-primary" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 text-foreground">
                {exp.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
