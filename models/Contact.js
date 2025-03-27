const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ }, // Validate 10-digit number
    email: { type: String, required: true, match: /.+\@.+\..+/ }, // Basic email validation
    companyName: { type: String, required: true },
    message: { type: String, required: true, maxlength: 3000 }, // Max length 2000
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Contact", ContactSchema);
