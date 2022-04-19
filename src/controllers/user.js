//upload image

const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
////////////
 
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../models/User");
//const genAccTkn = require("../helpers/genAccessToken");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const multer = require('multer')
const path = require('path')
const { fileURLToPath } = require('url')
// import { fileURLToPath } from 'url';
const nodemailer =require("nodemailer")

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");

const createToken = (id) => {
  return jwt.sign({ id }, "econixtoken", {
    expiresIn: 360000
  })
};
//////////////
////////////////ALL USERS//////////
exports.AllUsers =  async(req, res) =>{ 
  console.log("haahhhaa");
    res.send(500);  
  } 
;
//////////
module.exports.forgetPassword = async (req, res) => {
  const { email } = req.body 
  const user = await User.findOne({ email });
  if(user!==null){
    const name =user.name;
    const subject='forget Password';
    const message =`http://localhost:3000/reset-password/${user._id}`;
    let transporter =nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:'nourelhouda.zemni@esprit.tn',
        pass:'2522511425'
      },
    });
    const msg ={
      from:'nourelhouda.zemni@esprit.tn',
      to:email,
      subject:`${subject}`,
      text:`Click here:${message}`
    }
    const info = await transporter.sendMail(msg,(err,info)=>{
      if(err){
        console.log(err)
      }
      else{
        res.send('email sent!')
      }
    })
  }
  else{
    res.send('user doesnt exist!')
  }

  
}

//////////////////////////////////////SIGN UP///////////
module.exports.signUp = async (req, res) => {
  const { username, name, phone, gender, email, password, isAdmin, location } = req.body

  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
 
    const hashedPassword= await bcrypt.hash(password,10)
    const user = await User.create({ username, name, gender, phone, email, password:hashedPassword, isAdmin, location });
    

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        phone: user.phone,
        location: user.location,
        email: user.email,
        isAdmin: user.isAdmin,
        
        token: createToken(user._id),
      });
    } else {
      res.send(token);
      res.status(400);
      throw new Error("User not found");
    }
}
//////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////sign in //////////////
/////////
module.exports.signIn = async (req, res) => {
  try{
    const { email, password } = req.body 
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))&&user.status) {
      console.log(user)
      res.json({
        '_id': user._id,
        'name': user.name,
        'username':user.username,
        'profile_picture':user.profile_picture,
        'email': user.email,
        'isAdmin': user.isAdmin,
        'token': createToken(user._id),
        'phone': user.phone,
        'location': user.location,
      });
    } else {
      if(!user.status){
        res.status(401).send({message:"Account has been deleted"})
      }
      if(user.status && user.matchPassword(password))
      res.status(401).send({message:"Invalid Email or Password"});
      throw new Error("Invalid Email or Password");
    }
  }
  catch(err){
    res.send(err)
  } 
    
};
//////////////////////////////////////////////////////////
exports.updateFile = async (req, res) => {
  console.log("first", req.file)
  console.log("bodyyy", req.body)
  var id = req.body.user_id;
  var profilePic = req.file.path;
  userModel.findById(id, function (err, data) {

    data.file = profilePic ? profilePic : data.file;

    data.save()
      .then(doc => {
        res.status(201).json({
          message: "Profile Image Updated Successfully",
          results: doc
        });
      })
      .catch(err => {
        res.json(err);
      })

  });


}


////////////////
// exports.postLogin = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const { errors, valid } = validateLoginInput(email, password);

//     if (!valid) {
//       return res.status(401).json({
//         errors,
//       });
//     }

//     const user = await User.findOne({
//       email,
//     });

//     if (!user) {
//       return res.status(401).json({
//         error: "Email or password isn't matched",
//       });
//     }

//     const isEqual = await bcrypt.compare(password, user.password);

//     if (!isEqual) {
//       return res.status(401).json({
//         error: "Email or password isn't matched",
//       });
//     }

//     const token = genAccTkn.generateAccessToken(user);
//     return res.status(200).json({
//       id: user.id,
//       token,
//       tokenExpiration: "24h",
//     });
//   } catch (err) {
//     res.status(500);
//   }
// };

// exports.postRegister = async (req, res) => {
//   try {
//     const name = req.body.name;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const password = req.body.password;
//     const username = req.body.username;

//     const { valid, errors } = validateRegisterInput(
//       name,
//       username,
//       email,
//       phone,
//       password
//     );

//     if (!valid) {
//       return res.status(401).json({
//         errors,
//       });
//     }

//     const existingUser = await User.findOne({
//       email,
//     });

//     if (existingUser) {
//       return res.status(401).json({
//         error: "Sorry email already registered",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const user = new User({
//       name, username, email, phone, role: "user",
//       password: hashedPassword, orders: [],
//     });

//     createActivationToken(user)

//     await user.save();


//     res.status(200).json({
//       message: "User created",


//     })
//   }


//   catch (err) {
//     res.status(500).json({
//       message: 'erreur',
//     })
//   }
// };

exports.userDetails = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById({
      _id,
    });
    return res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.checkRole = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById({ _id: userId });

    if (user.role === "user") {
      res.status(200).json({
        role: "user",
      });
    } else {
      res.status(200).json({
        role: "admin",
      });
    }
  } catch (err) {
    res.status(500);
  }
};

exports.passwordReset = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const newpassword = req.body.password1;

    //check user email
    const user = await User.findOne({ _id:user_id });
    
    if (!user) {
      return res.status(401).json({
        error: "User does not exist",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 12);
    console.log(newpassword)
    user.password = hashedPassword;
    const updateUserPassword = await user.save()
    const token = genAccTkn.generateAccessToken(user);
    return res.status(200).json({
      id: user.id,
      token,
      tokenExpiration: "24h",
      message: 'Password has been updated'
    });
  } catch (err) {
    res.status(500);
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users)
};

exports.deleteUser = async (req, res) => {
  console.log("iddd", req.params.id)
  const findUser = await User.findByIdAndRemove(req.params.id);
  if (!findUser) {
    return res.status(404).send("User doesn't exist !");
  }
  return res.send('User Deleted !');
}

exports.disableUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.status = !user.status
    const UpdatedUser = await user.save()
    res.json({
      user: UpdatedUser.status
    })
  } else {
    res.status(404).json({ message: "User Doesn't Exist" })
  }
}

exports.updateRole = async (req, res) => {
  const { role, username, phone, email, name } = req.body
  const user = await User.findById(req.params.id)
  if (user) {
    user.role = user.role;
    user.email = email || user.email;
    user.username = username || user.username;
    user.phone = phone || user.phone;
    const UpdatedRole = await user.save()
    res.json({
      role: UpdatedRole.role,
      email: UpdatedRole.email,
      phone: UpdatedRole.phone,
      username: UpdatedRole.username,
      name: UpdatedRole.name,
    })
  } else {
    res.status(404).json({ message: "User Doesn't Exist" })
  }
}

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
module.exports.updateUserProfile = (async (req, res) => {
  

 var result=null ;
 
  try{  const OldUserPassword =await User.findById(req.params.id)
    if(req.file){
      result = await cloudinary.uploader.upload(req.file.path); 
     }else{
       result=OldUserPassword.profile_picture
     }
 
 
  // await bcrypt.compare(req.body.old_Password,OldUserPassword)
 console.log(req.body.old_Password===null)
  if(!req.body.old_Password && OldUserPassword ){
    console.log("ff")
    const user = await User.findByIdAndUpdate(req.params.id,{
      $set:{
        ...req.body,
        profile_picture: result.secure_url?result.secure_url:OldUserPassword.profile_picture,
      cloudinary_user: result.public_id?result.public_id:OldUserPassword.cloudinary_user,
      }
  
      },
      {new:true}
     
    );
    console.log(user)
    res.status(200).send({message:"Profile Updated",user:user})
  }else{
    
    const isPasswordMatch = await bcrypt.compare(req.body.old_Password,OldUserPassword.password)
  if(isPasswordMatch){
    const currentPassword=await bcrypt.hash(req.body.password,10);
  const user = await User.findByIdAndUpdate(req.params.id,{
    $set:{
      username:req.body.username,
      name:req.body.name,
      phone: req.body.phone,
      profile_picture: result.secure_url||OldUserPassword.profile_picture,
      cloudinary_user: result.public_id||OldUserPassword.cloudinary_user,
      email:req.body.email,
      password: currentPassword,
      location: req.body.location,
    }

    },
    {new:true}
   
  );
  if(!user){
    throw{
      message:`user with id ${req.params.id} not found`
    }
    }
  res.status(200).send({message:"Profile Updated",user:user})
}else{
   
   
    res.status(409).send({ message:"old password incorrect"})
   
  }}


  

}catch(error){

  
      console.log(error)
 
 
}
     
});