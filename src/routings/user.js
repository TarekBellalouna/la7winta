const express = require("express");
const router = express.Router();
//
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
//
const userController = require("../controllers/user");
const users = require("../models/User")
//update profile

//import {protect} from "../middlewares/AuthMiddleware.js";
 

router.post('/profile', userController.updateUserProfile);
//
//server post login

router.post("/login", userController.signIn);
//router.post("/login", userController.login);
router.put("/passwordreset", userController.passwordReset);
router.post("/register", userController.signUp);
router.post("/check-role", userController.checkRole);
router.get("/:id", userController.userDetails);
router.get("/", userController.getUsers);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.disableUser);
router.post("/update", userController.updateFile);
router.put("/role/:id", userController.updateRole);
router.post("/forget-password", userController.forgetPassword);


router.get("/all", (req, res) =>{ 
  console.log("hhahah");
        res.json(users)
    });  
         
  //Delete User

router.delete("delete/:id", (req, res) => {

    const found = users.some(user => user.id === parseInt(req.params.id));
  
   
  
    if (found) {
  
      users = users.filter(user => user.id !== parseInt(req.params.id))
  
      res.json({
  
        msg: "User deleted",
  
        users
  
      });
  
    } else {
  
      res.sendStatus(400);
  
    }
  
  });
  
   
  
module.exports = router;
