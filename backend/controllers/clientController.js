const express = require("express");

const router = express.Router();

const Client = require("../models/Client");

// GET CLIENTS

router.get("/clients", async (req, res) => {

  try {

    const clients = await Client.find();

    res.status(200).json(clients);

  }
  catch(error){

    res.status(500).json({
      message: "Failed to fetch clients"
    });

  }

});


// ADD CLIENT

router.post("/clients", async (req, res) => {

  try {

    const { name, company, email } =
      req.body;

    const newClient = new Client({

      name,
      company,
      email

    });

    await newClient.save();

    res.status(201).json({
      message: "Client Added"
    });

  }
  catch(error){

    res.status(500).json({
      message: "Failed to add client"
    });

  }

});


// UPDATE CLIENT

router.put("/clients/:id", async (req, res) => {

  try {

    const updatedClient =
      await Client.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }

      );

    res.status(200).json({

      message: "Client Updated",

      updatedClient

    });

  }
  catch(error){

    res.status(500).json({
      message: "Failed to update client"
    });

  }

});


// DELETE CLIENT

router.delete("/clients/:id", async (req, res) => {

  try {

    await Client.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Client Deleted"
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message: "Delete Failed"
    });

  }

});

module.exports = router;