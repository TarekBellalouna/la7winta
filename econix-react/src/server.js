const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const fileUpload = require("express-fileupload");
var cors = require('cors') 

const db = require("./config/db");
const productRoutes = require("./routings/product");
const ratingRoutes = require("./routings/rating");
const brandRoutes = require("./routings/brand")
const commentRoutes = require("./routings/comment");
const userRoutes = require("./routings/user");
const orderRoutes = require("./routings/order");

const production = process.env.NODE_ENV === "production";

require("dotenv").config();

const app = express();
app.use(cors()) 

production && app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

// database connection
db.makeDb();

app.use("/products", productRoutes);
app.use("/brand", brandRoutes);
app.use("/ratings", ratingRoutes);
app.use("/comments", commentRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

production && (
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  })
)

app.listen(process.env.PORT || 5000);
