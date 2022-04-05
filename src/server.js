const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const db = require("./config/db");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user");
const brandRoutes = require("./routings/brand")
const categoryRoutes = require("./routings/category")
const orderRoutes = require("./routings/order");
const couponRoutes = require("./routings/coupon");
const stripeRoutes = require("./routings/stripe");
const auctionRoutes = require("./routings/auction");
const ratingRoutes = require("./routings/rating");
const commentRoutes = require("./routings/comment");

const production = process.env.NODE_ENV === "production";

require("dotenv").config();
const cors = require('cors')

const app = express();
app.use(express.json())

production && app.use(express.static(path.join(__dirname, "../client/build")));

// app.use('/uploads',express.static('uploads'))
app.use('/uploads',express.static('uploads'))
app.use(cors())

app.use(express.urlencoded({ extended: true }));

// database connection
db.makeDb();

app.use("/products", productRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/coupon", couponRoutes);
app.use("/stripe", stripeRoutes);
app.use("/auction", auctionRoutes);
app.use("/ratings", ratingRoutes);
app.use("/comments", commentRoutes);

production && (
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  })
)

app.listen(process.env.PORT || 5000);
