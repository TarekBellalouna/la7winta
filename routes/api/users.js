const express= require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const { restart } = require('nodemon');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt =require ('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
//@route POST api/users
//@access public
router.post('/',
    [   check('name', 'name is required')
    .not()
    .isEmpty(),
    check('email','please include a valid e mail').isEmail(),
    check('password', 
    'please enter a valid password').isLength({min: 6})
    ],
           async     (req, res)=> {
    
                            const errors = validationResult(req);
                            if (!errors.isEmpty()){
                            return res.status(400).json({ errors: errors.array() });
                              }

    const {name, email , password, date} = req.body;

     try{
//if user exist
let user = await User.findOne({email})
 if (user){
    return res.status(400).json({errors: [{msg: 'User exists deja'}]})
 }


//get user gravatar
const avatar = gravatar.url(email,{
    //size  default
    s:'200',
    r:'pg',
    d: 'mm'
})
user = new User({
    name,
    email,
    avatar,
    password,
    date
})

//encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.date = Date.now();
        await user.save();
//jwt classrroom
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

//return jsonwebtoken
 const payload = {
     user:{
         id: user.id
     }
 };
 jwt.sign(
     payload, 
     config.get('jwtSecret'),
         {expiresIn: 360000} ,
         (err, token)=> {
             if (err) throw err;
             res.json({token})
         }
          );

     }catch(err)
     {
console.error(err.message);
res.status(500).send('User added');

     }
});

module.exports = router;