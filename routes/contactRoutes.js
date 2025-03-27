const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.post("/contact", createContact); // Create
router.get("/contacts", getAllContacts); // Read All
router.get("/contact/:id", getContactById); // Read One
router.put("/contact/:id", updateContact); // Update
router.delete("/contact/:id", deleteContact); // Delete

module.exports = router;
