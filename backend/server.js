const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./controllers/company"));
app.use(
  require("./controllers/clientController")
  );
app.use(
  require("./controllers/invoiceController")
);
app.use(
  require("./controllers/paymentController")
);
app.use(
  require("./controllers/quotationController")
);

// DATABASE CONNECTION

const connectDB = require("./config/db");
connectDB();


// ROUTES

const userRoutes =
  require("./routes/userRoutes");

app.use(userRoutes);


// SERVER

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});
