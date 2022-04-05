const Rating = require("../models/Rating");
const { cloudinary } = require("../utils/cloudinary");

exports.fetchRatings = async (req, res) => {
  try {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1
   console.log(res)
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
  
    const count = await Rating.countDocuments({ ...keyword })
    const ratings = await Rating.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ ratings, page, pages: Math.ceil(count / pageSize) })
  } catch (err) {
    res.status(500);
  }
};

exports.addRating = async (req, res) => {

  try {
    const product = req.body.product;
    const user = req.body.user;
    const nb_etoile = req.body.nb_etoile;

    const rating = new Rating({
        product,
        user,
        nb_etoile,
    });

    await rating.save();

    return res.status(200).json({
      message: "Rating added",
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchRating = async (req, res) => {
  try {
    const id = req.params.ratingId;
    const rating = await Rating.findById({ _id: id });
    res.status(200).json({
      rating,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchRatingByproduct = async (req, res) => {
  try {
    
    const id = req.params.ratingId;
    const rating = await Rating.find({ product: id });
    res.status(200).json({
      rating,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchRatingByuser = async (req, res) => {
  try {
    
    const id = req.params.userId;
    const rating = await Rating.find({ user: id });
    res.status(200).json({
      rating,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const ratingId = req.body.ratingId;

    await Rating.deleteOne({ _id: ratingId });
    const ratings = await Rating.find({});

    return res.status(200).json({ message: "Successfully Deleted", ratings });
  } catch (err) {
    res.status(500);
  }
};


exports.editRating = async (req, res) => {
 
  try {
    const ratId = req.body._id;
    const product = req.body.product;
    const user = req.body.user;
    const nb_etoile = req.body.nb_etoile;

    await Rating.updateOne(
      { _id: ratId },
      {
        $set: {
            product,
            user,
            nb_etoile,
        },
      }
    );
    res.status(200).json({
      message: "Rating edited",
    })

  } catch(err) {
    res.status(500);
  }
}