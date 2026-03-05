-- =============================================
-- SAPIVI SAMPLE DATA
-- Run AFTER schema.sql
-- =============================================

-- Admin user (password: admin123)
-- Replace the hash below with your generated bcrypt hash if needed
INSERT INTO users (name, email, password, role) VALUES
('Admin', '[admin@sapivi.com](mailto:admin@sapivi.com)', '$2b$10$REPLACE_WITH_YOUR_BCRYPT_HASH', 'admin');

-- Hero
INSERT INTO hero_content (badge, headline, description, cta_primary, cta_secondary) VALUES
('Transforming Businesses Since 2010', 'We Build Digital Excellence', 'Creating innovative solutions that drive growth and transform businesses for the digital age.', 'Get Started', 'View Portfolio');

-- About
INSERT INTO about_content (hero_headline, hero_description, mission, vision) VALUES
('About SAPIVI', 'We are a team of passionate professionals dedicated to delivering exceptional digital solutions.', 'To empower businesses with innovative technology solutions that drive growth and efficiency.', 'To be the leading digital transformation partner for businesses worldwide.');

-- Services
INSERT INTO services (title, description, features) VALUES
('Web Development', 'Custom websites and web applications built with modern technologies.', '["React", "Node.js", "TypeScript", "Responsive Design"]'),
('Mobile Development', 'Native and cross-platform mobile applications.', '["iOS", "Android", "React Native", "Flutter"]'),
('UI/UX Design', 'Beautiful and intuitive user interfaces.', '["Figma", "Prototyping", "User Research", "Design Systems"]');

-- Portfolio
INSERT INTO portfolio (title, category, description, image, tags) VALUES
('E-Commerce Platform', 'Web Development', 'A full-featured online store with payment integration.', '/placeholder.svg', '["React", "Node.js", "Stripe"]'),
('Health App', 'Mobile Development', 'A health tracking mobile application.', '/placeholder.svg', '["React Native", "Firebase"]');

-- Clients
INSERT INTO clients (name, logo, industry) VALUES
('TechCorp', 'TC', 'Technology'),
('DesignHub', 'DH', 'Design'),
('DataFlow', 'DF', 'Analytics');

-- Contact Info
INSERT INTO contact_info (email, phone, address, cin, business_hours) VALUES
('[contact@sapivi.com](mailto:contact@sapivi.com)', '+1 234 567 890', '123 Business Ave, Tech City, TC 12345', 'CIN123456', 'Mon - Fri: 9:00 AM - 6:00 PM');

-- Sample Messages
INSERT INTO messages (name, email, subject, message) VALUES
('John Doe', '[john@example.com](mailto:john@example.com)', 'Project Inquiry', 'I would like to discuss a new web development project.'),
('Jane Smith', '[jane@example.com](mailto:jane@example.com)', 'Partnership', 'Interested in exploring partnership opportunities.');
