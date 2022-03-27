const Product = require("../models/Product");
const User = require("../models/User.js");
const { cloudinary } = require("../utils/cloudinary");

exports.fetchProducts = async (req, res) => {
  try {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1
  
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
  
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).populate("brandId")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  } catch (err) {
    res.status(500);
  }
};

exports.addProduct = async (req, res) => {
  // try {
  //   console.log(req.file)
  //   const newProduct = new Product(req.body)
  //   const result= await cloudinary.uploader.upload(req.file.path,{
  //     public_id : `${newProduct._id}_image`,
  //     width:500,
  //     height:500,
  //     crop:'fill'
  //   })
  //
  //   console.log(result)
  //   res.status(500).send({
  //     result: result });
  // } catch (err) {
  //   res.status(500).send({
  //       message: err.message,});
  // }
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.status(200).send({
//         message: 'Product Added Successfully!',
//     });
// } catch (err) {
//     res.status(500).send({
//         message: err.message,
//     });
// }

  try {
    const name = req.body.product_name;
    const description = req.body.product_description;
    const type = req.body.product_type;
    const price = req.body.product_price;
    const gender = req.body.product_gender;
    const color = req.body.product_color;
    const total_in_stock = req.body.total_in_stock;
    // const image_public_id = req.body.image_public_id;
    // const file = req.files.file;

    const product = new Product({
      name,
      description,
      type,
      image:"" ,
      // image_public_id,
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
}

exports.fetchProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById({ _id: id });

    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchProductByName = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById({ _id: id });

    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.body.productId;

    await Product.deleteOne({ _id: productId });
    const products = await Product.find({});

    return res.status(200).json({ message: "Successfully Deleted", products });
  } catch (err) {
    res.status(500);
  }
};

exports.editProduct = async (req, res) => {
 
  try {
    const imgUrl = `http://localhost:5000/uploads/${req.file.filename}`

    const prodId = req.body.product_id;
    const name = req.body.product_name;
    const description = req.body.product_description;
    const type = req.body.product_type;
    const price = req.body.product_price;
    const color = req.body.product_color;
    
    const total_in_stock = req.body.total_in_stock;

    await Product.updateOne(
      { _id: prodId },
      {
        $set: {
          name,
          description,
          type,
          price,
          color,
          total_in_stock,
          image: imgUrl
        },
      }
    );
    res.status(200).json({
      message: "Product edited",
    })

  } catch(err) {
    res.status(500);
  }

}


// exports.editProduct = async (req, res) => {
 
//   try {
//     const imgUrl = `http://localhost:5000/uploads/${req.file.filename}`

//     const prodId = req.body.product_id;
//     const name = req.body.product_name;
//     const description = req.body.product_description;
//     const type = req.body.product_type;
//     const price = req.body.product_price;
//     const color = req.body.product_color;
//     const gender = req.body.product_gender;

//     const total_in_stock = req.body.total_in_stock;

//     const productEdited = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           name,
//           description,
//           type,
//           price,
//           color,
//           gender,
//           total_in_stock
//         },
//       }
//     );
//     res.status(200).json({
//       message: "Product edited",
//       data : productEdited
//     })

//   } catch(err) {
//     res.status(500);
//   }
// }


// @desc adding wish item to a user list
exports.addWishItem = async(req,res)=>{
try {
  await User.findByIdAndUpdate(req.params.userId,{$push:{wishlist:req.params.prodId}})
  res.status(200).json({msg:'product added to wishlist'})
} catch (error) {
  res.status(500).json({msg:'something went wrong.'})
}
}
// @desc get user with wishlist
exports.getUserInfo = async(req,res)=>{
  try {
   const userInfo = await User.findOne({_id:req.params.userId}).populate('wishlist')
  res.status(200).json(userInfo)
} catch (error) {
    res.status(500).json({msg:'something went wrong.'})
    
  }
  }

  // edit product discount 
  exports.addDiscount = async(req,res)=>{
    try {
      const discount = req.body.discount/100
      await Product.findByIdAndUpdate(req.params.id, {
                $set: {
                  discount,
                },
              })
    res.status(200).json({msg:'discount updated'})
    } catch (error) {
    res.status(500).json({msg:'something went wrong.'})
    }
  }

  // edit product views 
  exports.editNumViews = async(req,res)=>{
    try {
      await Product.findByIdAndUpdate(req.params.id, {
                $set: {
                  numViews:req.body.numViews,
                },
              })
    res.status(200).json({msg:'numViews updated'})
    } catch (error) {
    res.status(500).json({msg:'something went wrong.'})
    }
  }
