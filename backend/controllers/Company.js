const express = require("express");

const router = express.Router();

const Company = require("../models/Company");


// SAVE COMPANY DETAILS

router.post("/company-details", async (req, res) => {

  try {

    const newCompany = new Company(req.body);

    await newCompany.save();

    res.status(201).json({
      message: "Company Details Saved"
    });

  }
  catch (error) {

    res.status(500).json({
      message: "Failed to Save Company Details"
    });

  }

});

module.exports = router;