const mongoose = require("mongoose");

const paymentSchema =
  new mongoose.Schema({

    client: String,

    paymentId: String,

    amount: Number,

    method: String,

    status: String

  });

module.exports =
  mongoose.model(
    "Payment",
    paymentSchema
  );