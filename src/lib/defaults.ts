// Default services and portfolio data matching the live website
// Used as fallback when database is empty

export const defaultServices = [
  {
    id: "default-1",
    title: "Application Integration",
    description: "Seamless API integration and custom software solutions",
    features: ["REST & GraphQL APIs", "Third-party Integrations", "Custom Middleware", "Microservices Architecture"],
  },
  {
    id: "default-2",
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence",
    features: ["SEO Optimization", "Social Media Marketing", "PPC Campaigns", "Content Strategy"],
  },
  {
    id: "default-3",
    title: "Cyber Security",
    description: "Enterprise-grade security for your digital assets",
    features: ["Penetration Testing", "Vulnerability Assessment", "Security Audits", "Compliance Management"],
  },
  {
    id: "default-4",
    title: "HR Consulting",
    description: "AI-powered talent acquisition and management",
    features: ["Talent Acquisition", "Employee Engagement", "HR Analytics", "Performance Management"],
  },
];

export const defaultPortfolio = [
  {
    id: "default-1",
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A full-featured online store with payment integration, inventory management, and real-time analytics dashboard.",
    image: "/images/portfolio-ecommerce.jpg",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
  },
  {
    id: "default-2",
    title: "Health Tracker App",
    category: "Mobile Development",
    description: "A health tracking mobile application with fitness analytics, heart rate monitoring, and personalized workout plans.",
    image: "/images/portfolio-health-app.jpg",
    tags: ["React Native", "Firebase", "HealthKit"],
  },
  {
    id: "default-3",
    title: "Enterprise CRM System",
    category: "Web Development",
    description: "A comprehensive CRM platform with sales pipeline management, customer analytics, and automated reporting.",
    image: "/images/portfolio-crm.jpg",
    tags: ["TypeScript", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "default-4",
    title: "Food Delivery App",
    category: "Mobile Development",
    description: "A modern food delivery platform with real-time order tracking, restaurant management, and payment processing.",
    image: "/images/portfolio-food-app.jpg",
    tags: ["Flutter", "Node.js", "Google Maps API"],
  },
  {
    id: "default-5",
    title: "Real Estate Portal",
    category: "Web Development",
    description: "Property listing platform with advanced search filters, virtual tours, and integrated mortgage calculator.",
    image: "/images/portfolio-realestate.jpg",
    tags: ["Next.js", "Mapbox", "Elasticsearch"],
  },
  {
    id: "default-6",
    title: "Security Operations Center",
    category: "Cyber Security",
    description: "Network monitoring and threat detection dashboard with real-time alerts and incident response automation.",
    image: "/images/portfolio-cybersecurity.jpg",
    tags: ["Python", "Elasticsearch", "Grafana", "Docker"],
  },
];
