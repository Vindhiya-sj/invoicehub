const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({

  client: String,

  invoiceNo: String,

  date: String,

  amount: String,

  status: String

});

module.exports = mongoose.model(
  "Invoice",
  invoiceSchema
);