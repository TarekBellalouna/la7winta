const Comment = require("../models/Comment");
const { cloudinary } = require("../utils/cloudinary");

exports.fetchComments = async (req, res) => {
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
  
    const count = await Comment.countDocuments({ ...keyword })
    const comments = await Comment.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ comments, page, pages: Math.ceil(count / pageSize) })
  } catch (err) {
    res.status(500);
  }
};

exports.addComment = async (req, res) => {

  try {
    const title = req.body.title;
    const contenue = req.body.contenue;
    const product = req.body.product;
    const user = req.body.user;

    const comment = new Comment({
        title,
        contenue,
        product,
        user,
        comment_date: new Date().toISOString(),
    });

    await comment.save();

    return res.status(200).json({
      message: "Comment added",
      comment,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchComment = async (req, res) => {
  try {
    const id = req.params.commentId;
    const comment = await Comment.findById({ _id: id });
    res.status(200).json({
      comment,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchCommentByproduct = async (req, res) => {
  try {
    
    const id = req.params.commentId;
    const comment = await Comment.find({ product: id });
    res.status(200).json({
      comment,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.body._id;

    await Comment.deleteOne({ _id: commentId });
    const comments = await Comment.find({});

    return res.status(200).json({ message: "Successfully Deleted", comments });
  } catch (err) {
    res.status(500);
  }
};


exports.editComment = async (req, res) => {
 
  try {
    const commId = req.body._id;
    const title = req.body.title;
    const contenue = req.body.contenue;
    const product = req.body.product;
    const user = req.body.user;

    await Comment.updateOne(
      { _id: commId },
      {
        $set: {
            title,
            contenue,
            product,
            user,
            comment_date: new Date().toISOString(),
        },
      }
    );
    res.status(200).json({
      message: "Comment edited",
    })

  } catch(err) {
    res.status(500);
  }
}