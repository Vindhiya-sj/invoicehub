const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

  companyName: {
    type: String,
    required: true
  },

  ownerName: {
    type: String,
    required: true
  },

  jobPosition: {
    type: String,
    required: true
  },

  companyEmail: {
    type: String,
    required: true
  },

  companyPhone: {
    type: String,
    required: true
  },

  companyAddress: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model(
  "Company",
  companySchema
);