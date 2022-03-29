const Product = require("../models/Product");
const User = require("../models/User.js");
const { cloudinary } = require("../utils/cloudinary");

exports.fetchProducts = async (req, res) => {
  try {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1
    const sortBy = req.query.sortBy || 'name';
    const searchByCat = req.query.searchByCat || ''
    const searchByBrand = req.query.searchByBrand || ''
    const keyword = req.query.keyword || ''
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
  
    const count = await Product.countDocuments({ ...keyword })
    const oldProducts = await Product.find({ ...keyword,type:{$regex:searchByCat}})
    .populate("brandId user")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(sortBy);
      const products =await oldProducts.filter(product => product?.brandId?.name.toLowerCase().includes(searchByBrand.toLowerCase()))
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

    const user = req.body.user;
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
      user,
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

exports.fetchProductByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById({ user: id });

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
    const user = req.body.user;
    const description = req.body.product_description;
    const type = req.body.product_type;
    const price = req.body.product_price;
    const color = req.body.product_color;
    
    const total_in_stock = req.body.total_in_stock;

    await Product.updateOne(
      { _id: prodId },
      {
        $set: {
          user,
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



// @desc adding wish item to a user list
exports.addWishItem = async(req,res)=>{
try {
  await User.findByIdAndUpdate(req.params.userId,{$push:{wishlist:req.params.prodId}})
  res.status(200).json({msg:'product added to wishlist'})
} catch (error) {
  res.status(500).json({msg:'something went wrong.'})
}
}

exports.RemoveWishItem = async(req,res)=>{
  try {
    await User.findByIdAndUpdate(req.params.userId,{$pull:{wishlist:req.params.prodId}})
    res.status(200).json({msg:'product removed from wishlist'})
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
