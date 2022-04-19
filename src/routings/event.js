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


router.get('/get/:id',EventController.findById2);
router.delete('/delete/:id',EventController.delete);
router.post('/new',upload.single("image"),EventController.add )

/* UPDATE BOOK */
router.put("/update/" ,upload.single("image"), EventController.put);
module.exports = router;