const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const db = require("./config/db");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user");
const orderRoutes = require("./routings/order");

const User = require("./models/User");

//login
const dotenv = require('dotenv'); 
const { OAuth2Client } = require('google-auth-library');
//
const eventRoutes = require("./routings/event");
const donationRoutes = require("./routings/donation");

const production = process.env.NODE_ENV === "production";

require("dotenv").config();


const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();

production && app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const users = [];
//login
function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});



// database connection
db.makeDb();

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

app.use("/donation", donationRoutes);
app.use("/event", eventRoutes);
app.use(cors());
///////////////////////GET
///////////////////////////

production && (
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  })
)




////////////

app.get('/getUsers', async (req,res) => {
  const users = await User.find({})
  try{
      res.status(200).json({
          status : 'Success',
          data : {
              users
          }
      })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
})

app.listen(process.env.PORT || 5000);
