const express = require("express");

const router = express.Router();

const Payment =
  require("../models/Payment");

// GET

router.get(
  "/payments",
  async (req, res) => {

    const payments =
      await Payment.find();

    res.json(payments);

  }
);

// POST

router.post(
  "/payments",
  async (req, res) => {

    const payment =
      new Payment(req.body);

    await payment.save();

    res.json({
      message: "Payment Added"
    });

  }
);

// DELETE

router.delete(
  "/payments/:id",
  async (req, res) => {

    await Payment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Payment Deleted"
    });

  }
);

module.exports = router;