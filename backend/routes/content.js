const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  getHero, updateHero,
  getAbout, updateAbout,
  getServices, createService, updateService, deleteService,
  getPortfolio, createPortfolio, updatePortfolio, deletePortfolio,
  getClients, createClient, updateClient, deleteClient,
  getContact, updateContact,
} = require("../controllers/contentController");

// Hero
router.get("/hero", getHero);
router.put("/hero", authenticate, updateHero);

// About
router.get("/about", getAbout);
router.put("/about", authenticate, updateAbout);

// Services
router.get("/services", getServices);
router.post("/services", authenticate, createService);
router.put("/services/:id", authenticate, updateService);
router.delete("/services/:id", authenticate, deleteService);

// Portfolio
router.get("/portfolio", getPortfolio);
router.post("/portfolio", authenticate, createPortfolio);
router.put("/portfolio/:id", authenticate, updatePortfolio);
router.delete("/portfolio/:id", authenticate, deletePortfolio);

// Clients
router.get("/clients", getClients);
router.post("/clients", authenticate, createClient);
router.put("/clients/:id", authenticate, updateClient);
router.delete("/clients/:id", authenticate, deleteClient);

// Contact
router.get("/contact", getContact);
router.put("/contact", authenticate, updateContact);

module.exports = router;
