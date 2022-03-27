const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
//const fileUpload = require("express-fileupload");
const db = require("./config/db");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user");
const brandRoutes = require("./routings/brand")
const categoryRoutes = require("./routings/category")
const orderRoutes = require("./routings/order");
const { cloudinary } = require("./utils/cloudinary");


const production = process.env.NODE_ENV === "production";

require("dotenv").config();
const cors = require('cors')

const app = express();
app.use(express.json())

production && app.use(express.static(path.join(__dirname, "../client/build")));

app.use('/uploads',express.static('uploads'))

app.use(cors())

//app.use(formidable());
app.use(express.urlencoded({ extended: true }));
//app.use(fileUpload());

// database connection
db.makeDb();

app.use("/products", productRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);


production && (
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  })
)

app.listen(process.env.PORT || 5000);
