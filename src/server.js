const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const db = require("./config/db");

const cors = require("cors");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user");
const orderRoutes = require("./routings/order");
const auctionRoutes = require("./routings/auction");
const bidRoutes = require("./routings/bid");

const morgan = require("morgan");

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
app.use(morgan("dev"));
// database connection
db.makeDb();
app.use('/uploads',express.static('uploads'))

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/auction", auctionRoutes);
app.use("/bid", bidRoutes);



app.use(cors());


app.listen(process.env.PORT || 5000);
