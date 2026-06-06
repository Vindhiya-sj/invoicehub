const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  client: String,
  quotationNo: String,
  date: String,
  amount: Number,
  status: String
});

module.exports = mongoose.model(
  "Quotation",
  quotationSchema
);