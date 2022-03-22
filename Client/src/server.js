const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const fileUpload = require("express-fileupload");

const db = require("./config/db");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user");
const orderRoutes = require("./routings/order");

const donationRoutes = require("./routings/donation");
const eventRoutes = require("./routings/event"); 

const production = process.env.NODE_ENV === "production";

require("dotenv").config();

const app = express();

production && app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

app.use(express.json({extended: false}));

// database connection
db.makeDb();

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);


//app.use('/event',require('./routings/event'));

//app.use('/donation',require('./routings/donation'));

app.use("/donation", donationRoutes);

app.use("/event", eventRoutes);

production && (
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  })
)

app.listen(process.env.PORT || 5000);
