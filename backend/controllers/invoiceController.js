const express = require("express");

const router = express.Router();

const Invoice = require("../models/Invoice");


// GET ALL INVOICES

router.get("/invoices", async (req, res) => {

  try {

    const invoices = await Invoice.find();

    res.status(200).json(invoices);

  }
  catch(error){

    res.status(500).json({
      message: "Failed to fetch invoices"
    });

  }

});


// DELETE INVOICE

router.delete("/invoices/:id", async (req, res) => {

  try {

    await Invoice.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Invoice Deleted"
    });

  }
  catch(error){

    res.status(500).json({
      message: "Delete Failed"
    });

  }
});
// ADD INVOICE

router.post("/invoices", async (req, res) => {

  try {

    const invoice = new Invoice(req.body);

    await invoice.save();

    res.status(201).json({
      message: "Invoice Saved"
    });

  }
  catch(error){

    res.status(500).json({
      message: "Failed to save invoice"
    });

  }

});


// UPDATE INVOICE

router.put("/invoices/:id", async (req, res) => {

  try {

    await Invoice.findByIdAndUpdate(

      req.params.id,

      req.body

    );

    res.status(200).json({
      message: "Invoice Updated"
    });

  }
  catch(error){

    res.status(500).json({
      message: "Failed to update invoice"
    });

  }

});






module.exports = router;