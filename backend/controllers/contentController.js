const db = require("../config/db");

// ==================== HERO ====================
const getHero = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM hero_content LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) {
    next(err);
  }
};

const updateHero = async (req, res, next) => {
  try {
    const { badge, headline, description, cta_primary, cta_secondary } = req.body;
    const [existing] = await db.query("SELECT id FROM hero_content LIMIT 1");

    if (existing.length > 0) {
      await db.query(
        "UPDATE hero_content SET badge=?, headline=?, description=?, cta_primary=?, cta_secondary=? WHERE id=?",
        [badge, headline, description, cta_primary, cta_secondary, existing[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO hero_content (badge, headline, description, cta_primary, cta_secondary) VALUES (?,?,?,?,?)",
        [badge, headline, description, cta_primary, cta_secondary]
      );
    }
    res.json({ message: "Hero content updated successfully." });
  } catch (err) {
    next(err);
  }
};

// ==================== ABOUT ====================
const getAbout = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM about_content LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) {
    next(err);
  }
};

const updateAbout = async (req, res, next) => {
  try {
    const { hero_headline, hero_description, mission, vision } = req.body;
    const [existing] = await db.query("SELECT id FROM about_content LIMIT 1");

    if (existing.length > 0) {
      await db.query(
        "UPDATE about_content SET hero_headline=?, hero_description=?, mission=?, vision=? WHERE id=?",
        [hero_headline, hero_description, mission, vision, existing[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO about_content (hero_headline, hero_description, mission, vision) VALUES (?,?,?,?)",
        [hero_headline, hero_description, mission, vision]
      );
    }
    res.json({ message: "About content updated successfully." });
  } catch (err) {
    next(err);
  }
};

// ==================== SERVICES ====================
const getServices = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM services ORDER BY created_at DESC");
    res.json(rows.map((r) => ({ ...r, features: JSON.parse(r.features || "[]") })));
  } catch (err) {
    next(err);
  }
};

const createService = async (req, res, next) => {
  try {
    const { title, description, features } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required." });

    const [result] = await db.query(
      "INSERT INTO services (title, description, features) VALUES (?,?,?)",
      [title, description, JSON.stringify(features || [])]
    );
    res.status(201).json({ id: result.insertId, title, description, features });
  } catch (err) {
    next(err);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { title, description, features } = req.body;
    await db.query(
      "UPDATE services SET title=?, description=?, features=? WHERE id=?",
      [title, description, JSON.stringify(features || []), req.params.id]
    );
    res.json({ message: "Service updated successfully." });
  } catch (err) {
    next(err);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const [result] = await db.query("DELETE FROM services WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service not found." });
    }
    res.json({ message: "Service deleted successfully." });
  } catch (err) {
    next(err);
  }
};

// ==================== PORTFOLIO ====================
const getPortfolio = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM portfolio ORDER BY created_at DESC");
    res.json(rows.map((r) => ({ ...r, tags: JSON.parse(r.tags || "[]") })));
  } catch (err) {
    next(err);
  }
};

const createPortfolio = async (req, res, next) => {
  try {
    const { title, category, description, image, tags } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required." });

    const [result] = await db.query(
      "INSERT INTO portfolio (title, category, description, image, tags) VALUES (?,?,?,?,?)",
      [title, category, description, image, JSON.stringify(tags || [])]
    );
    res.status(201).json({ id: result.insertId, title, category, description, image, tags });
  } catch (err) {
    next(err);
  }
};

const updatePortfolio = async (req, res, next) => {
  try {
    const { title, category, description, image, tags } = req.body;
    await db.query(
      "UPDATE portfolio SET title=?, category=?, description=?, image=?, tags=? WHERE id=?",
      [title, category, description, image, JSON.stringify(tags || []), req.params.id]
    );
    res.json({ message: "Portfolio updated successfully." });
  } catch (err) {
    next(err);
  }
};

const deletePortfolio = async (req, res, next) => {
  try {
    const [result] = await db.query("DELETE FROM portfolio WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Portfolio item not found." });
    }
    res.json({ message: "Portfolio deleted successfully." });
  } catch (err) {
    next(err);
  }
};

// ==================== CLIENTS ====================
const getClients = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM clients ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

const createClient = async (req, res, next) => {
  try {
    const { name, logo, industry } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required." });

    const [result] = await db.query(
      "INSERT INTO clients (name, logo, industry) VALUES (?,?,?)",
      [name, logo, industry]
    );
    res.status(201).json({ id: result.insertId, name, logo, industry });
  } catch (err) {
    next(err);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const { name, logo, industry } = req.body;
    await db.query("UPDATE clients SET name=?, logo=?, industry=? WHERE id=?", [
      name,
      logo,
      industry,
      req.params.id,
    ]);
    res.json({ message: "Client updated successfully." });
  } catch (err) {
    next(err);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const [result] = await db.query("DELETE FROM clients WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client not found." });
    }
    res.json({ message: "Client deleted successfully." });
  } catch (err) {
    next(err);
  }
};

// ==================== CONTACT INFO ====================
const getContact = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM contact_info LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { email, phone, address, cin, business_hours } = req.body;
    const [existing] = await db.query("SELECT id FROM contact_info LIMIT 1");

    if (existing.length > 0) {
      await db.query(
        "UPDATE contact_info SET email=?, phone=?, address=?, cin=?, business_hours=? WHERE id=?",
        [email, phone, address, cin, business_hours, existing[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO contact_info (email, phone, address, cin, business_hours) VALUES (?,?,?,?,?)",
        [email, phone, address, cin, business_hours]
      );
    }
    res.json({ message: "Contact info updated successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHero, updateHero,
  getAbout, updateAbout,
  getServices, createService, updateService, deleteService,
  getPortfolio, createPortfolio, updatePortfolio, deletePortfolio,
  getClients, createClient, updateClient, deleteClient,
  getContact, updateContact,
};
