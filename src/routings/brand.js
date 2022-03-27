const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");

const BrandController = require("../controllers/brand");


const multer = require('multer')


const storage =multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./uploads/');
    },
    filename: function (req, file , cb){
        cb(null, file.originalname);
    }
});
// to reject a file
const fileFilter = (req, file ,cb)=>{
    if(file.mimetype==='image/png'|| file.mimetype==='image/jpeg' ) {
        cb(null, true)
    }else{
        cb(null,false)
    }
}

const upload = multer({
    storage:storage,
    // fileFilter:fileFilter
})

router.get("/", BrandController.getAllBrands);
router.get("/fetch-brand/:id", BrandController.getBrandById);
router.post("/upload", upload.single('image'), async (req, res) => {
//    console.log(req.body)
//    console.log(req.file)

    const imgUrl = `http://localhost:5000/uploads/brands/${req.file.filename}`
   
    try {
        const name = req.body.name;
        console.log("1")

        const brand = new Brand({
          name,
          image:imgUrl 
         
        });
        console.log("2")
        await brand.save();
        console.log("3")
    
        return res.status(200).json({
          message: "Brand added",
        
        });
      } catch (err) {
        res.status(500);
      }

});

module.exports = router;
