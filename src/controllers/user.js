const bcrypt = require("bcryptjs");

const User = require("../models/User");
const genAccTkn = require("../helpers/genAccessToken");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
     const { errors, valid } = validateLoginInput(email, password);
    
     if (!valid) {
      return res.status(401).json({
         errors,
       });
     }
    console.log('hello')

    const user = await User.findOne({
      email,
    });
    console.log(user)
    if (!user) {
      return res.status(401).json({
        error: "Email  isn't matched",
      });
    }
   
    const isEqual = await bcrypt.compare(password, user.password);
    console.log(password)
    console.log(user.password)
    console.log(isEqual)
    if (!isEqual) {
      return res.status(401).json({
        error: "password isn't matched",
      });
    }

 
  


    const token = genAccTkn.generateAccessToken(user);
    return res.status(200).json({
      id: user.id,
      token,
      tokenExpiration: "24h",
    });
    console.log(token)
    res.status(200).json(token)
  } catch (err) {
    res.status(500);
  }
};
exports.jwtAccessToken = async (req , res) => {
  const token = genAccTkn.generateAccessToken(req.body);
  return res.status(200).json({
    id: user.id,
    token,
    tokenExpiration: "24h",
  });
}
exports.postRegister = async (req, res) => {
  try {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    // const { valid, errors } = validateRegisterInput(
    //   name,
    //   username,
    //   email,
    //   phone,
    //   password
    // );

    // if (!valid) {
    //   return res.status(401).json({
    //     errors,
    //   });
    // }
    const existingUser = await User.findOne({
      email,
    });
    console.log(existingUser)

    if (existingUser) {
      return res.status(401).json({
        error: "Sorry email already registered",
      });
    }
 const hashedPassword =await bcrypt.hash(password,10);
 console.log(hashedPassword);
    const user = new User({
      name,
      username,
      email,
      phone,
      role: "user",
      password:password ,
      orders: [],
    });

    await user.save();

    res.status(200).json({
      message: "User created",
    });
  } catch (err) {
    res.status(500);
  }
};

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
    const email = req.body.email;
    const password = req.body.password;
    const newpassword = req.body.newpassword;

    //check user email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Email isn't matched",
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).json({
        error: "Email or password isn't matched",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 12);

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
