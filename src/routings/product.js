const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const checkAuth = require("../middlewares/check-auth");
const productController = require("../controllers/product");


const multer = require('multer')


const storage =multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./uploads/');
    },
    filename: function (req, file , cb){
        cb(null, file.originalname);
    }
});
//to reject a file
// const fileFilter = (req, file ,cb)=>{
//     if(file.mimetype==='image/png'|| file.mimetype==='image/jpeg' ) {
//         cb(null, true)
//     }else{
//         cb(null,false)
//     }
// }

const upload = multer({
    storage:storage,
    // fileFilter:fileFilter
})
router.post('/discount/:id/',productController.addDiscount)
router.post('/numViews/:id/',productController.editNumViews)

router.get('/wishList/:userId',productController.getUserInfo)
router.post('/wishList/:prodId/:userId',productController.addWishItem)
router.get("/", productController.fetchProducts);
router.get("/fetch-product/:productId", productController.fetchProduct);
router.post("/add-product", upload.single('image'), productController.addProduct);
router.put("/edit-product", productController.editProduct);
router.post("/delete-product", productController.deleteProduct);
router.post("/upload", upload.single('image'), async (req, res) => {
   //console.log(req)

    const imgUrl = `http://localhost:5000/uploads/${req.file.filename}`
   
    try {
        const name = req.body.product_name;
        const description = req.body.product_description;
        const type = req.body.product_type;
        const price = req.body.product_price;
        const color = req.body.product_color;
        const gender = req.body.product_gender;
        const brandId = req.body.brandId;
        const total_in_stock = req.body.total_in_stock;
       
    
        const product = new Product({
          name,
          description,
          type,
          image:imgUrl ,
          brandId,
          price,
          color,
          gender,
          reviews: [],
          total_in_stock,
          createdAt: new Date().toISOString(),
        });
    
        await product.save();
    
        return res.status(200).json({
          message: "Product added",
        });
      } catch (err) {
        res.status(500);
      }

    // const product = new Product({
    //     name: req.body.product_name,
    //     price: req.body.product_price,
    //     type: req.body.product_type,
    //     image: imgUrl,
    //     description:req.body.product_description,
    //     brandId:req.body.brandId,
    //     color:req.body.product_color,
    //     total_in_stock:req.body.product_totalInStock,
    // });
    // //console.log(product)
    // product
    //     .save()
    //     .then(result => {
    //         //console.log(result);
    //         res.status(201).json({
    //             message: "Created product successfully",
    //             createdProduct: {
    //                 name: result.name,
    //                 price: result.price,
    //                 _id: result._id,
    //                 request: {
    //                     type: 'GET',
    //                     url: "http://localhost:3000/products/" + result._id
    //                 }
    //             }
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
});

module.exports = router;
