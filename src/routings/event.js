var express = require('express');
var router = express.Router();

const User = require('../models/User');
const Event = require('../models/Event');

const EventController = require('../controllers/eventController');

const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
//////////

  
    //////////
    
    
router.get('/countLikes',EventController.getLikesCount);
router.post('/addLikes',EventController.addLikes);
router.get('/all',EventController.getAll);
router.get('/getUserEvent',EventController.getUserEvent);


router.get('/get/:id',EventController.findById);
router.get('/delete/:id',EventController.delete);
router.post('/new',upload.single("image"), async (req, res) => {
    try {
      console.log(req)
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      var event=new Event(
        {
            title:req.body.title,
            description:req.body.description, 
            location:req.body.location,
            Startdate: req.body.Startdate,
            Enddate: req.body.Enddate,
            user: req.body.user, 
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        }
        ) 
        console.log(req.body);
        await event.save();
        res.send(event);
    } catch (err) {
      console.log(err);
    }
  });

/* UPDATE BOOK */
router.put("/update/:id" , EventController.put);
module.exports = router;