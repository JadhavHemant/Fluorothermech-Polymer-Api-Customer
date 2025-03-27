const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ **Create Contact & Send Email**
exports.createContact = async (req, res) => {
  try {
    const { name, address, mobileNumber, email, companyName, message } = req.body;

    // Validate fields
    if (!name || !address || !mobileNumber || !email || !companyName || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      return res.status(400).json({ error: "Invalid mobile number!" });
    }

    if (!/.+\@.+\..+/.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    // Save to DB
    const newContact = new Contact({ name, address, mobileNumber, email, companyName, message });
    await newContact.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting us!",
      text: `Hello ${name},\n\nThank you for reaching out. We will get back to you soon.\n\nBest Regards,\nYour Company`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Contact created & email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ **Get All Contacts**
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ **Get Single Contact by ID**
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ **Update Contact by ID**
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json({ message: "Contact updated successfully", contact });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ **Delete Contact by ID**
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
