const express = require("express");

const router = express.Router();

const Quotation = require("../models/Quotation");


// GET ALL QUOTATIONS

router.get("/quotations", async (req, res) => {

  try {

    const quotations =
      await Quotation.find();

    res.json(quotations);

  }
  catch (error) {

    res.status(500).json(error);

  }

});


// ADD QUOTATION

router.post("/quotations", async (req, res) => {

  try {

    const quotation =
      new Quotation(req.body);

    await quotation.save();

    res.json({
      message: "Quotation Added"
    });

  }
  catch (error) {

    res.status(500).json(error);

  }

});


// DELETE QUOTATION

router.delete("/quotations/:id", async (req, res) => {

  try {

    await Quotation.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Quotation Deleted"
    });

  }
  catch (error) {

    res.status(500).json(error);

  }

});
router.put(
  "/quotations/:id",
  async (req, res) => {

    try {

      await Quotation.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      res.json({
        message: "Quotation Updated"
      });

    }
    catch(error){

      res.status(500).json({
        message: "Error"
      });

    }

  }
);

module.exports = router;