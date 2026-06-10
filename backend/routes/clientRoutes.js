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

    res.status(500).json({
      message: "Delete Failed"
    });

  }

});