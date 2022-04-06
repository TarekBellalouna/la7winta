var express = require('express');
var router = express.Router();

  

const EventController = require('../controllers/eventController');
 
const upload = require("../utils/multer");
//////////

  
    //////////
    
    
router.get('/countLikes',EventController.getLikesCount);
router.post('/addLikes',EventController.addLikes);
router.get('/all',EventController.getAll);
router.get('/getUserEvent',EventController.getUserEvent);


router.get('/get/:id',EventController.findById2);
router.get('/delete/:id',EventController.delete);
router.post('/new',upload.single("image"),EventController.add )

/* UPDATE BOOK */
router.put("/update/" ,upload.single("image"), EventController.put);
module.exports = router;