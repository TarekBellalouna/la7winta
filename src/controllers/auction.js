const Auction = require("../models/Auction");


const cloudinary = require("../utils/cloudinary");

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


exports.fetchAuctions = async (req, res) => {
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

    const count = await Auction.countDocuments({ ...keyword })
    const auction = await Auction.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    console.log("sssss");
    res.json({ auction, page, pages: Math.ceil(count / pageSize) })
    console.log(auction);
  } catch (err) {
    res.status(500);

  }
};

exports.addAuction =  upload.single('image'),async (req, res) => {
  try {
    console.log(req)
    
    const imgUrl = `http://localhost:5000/uploads/${req.file.filename}`

    

    const {
      productName,
      description,
      Price,
      currentPrice,
      duration,
      timer,
      catergory,
      auctionStarted, 
      auctionEnded, 
      sold,
      owner,
  
      purchasedBy,
      currentBidder, 
      room
    } = req.body;




    const auction = new Auction({
      productName,
      description,
      Price,
      currentPrice,
      duration,
      timer,
      soldAt: new Date().toISOString(),
      catergory,
      auctionStarted,
      auctionEnded,
      sold,
      owner,
      purchasedBy,
      currentBidder,
      image:imgUrl ,


      bids: [],
      room
    });

    await auction.save();

    return res.status(200).json({
      message: "Auction added", auction
    });
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

exports.fetchAuction = async (req, res) => {
  try {
    const id = req.params.auctionId;
    const auction = await Auction.findById({ _id: id });

    res.status(200).json({
      auction,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.deleteAuction = async (req, res) => {
  try {
    const auctionId = req.body.auctionId;

    await Auction.deleteOne({ _id: auctionId });
    const auctions = await Auction.find({});

    return res.status(200).json({ message: "Successfully Deleted", auctions });
  } catch (err) {
    res.status(500);
  }
};


exports.editAuction = async (req, res) => {

  try {
    const {
    
    productName,
    description,
    Price,
    currentPrice,
    duration,
    timer,
    catergory,
    auctionStarted, 
    auctionEnded, 
    sold,
    owner,
    purchasedBy,
    currentBidder, 
    room
  } = req.body;


  
    const image_public_id = req.body.image_public_id;

    await Auction.updateOne(
      { _id: auctionId },
      {
        $set: {
          productName,
          description,
          Price,
          currentPrice,
          duration,
          timer,
          soldAt: new Date().toISOString(),
          catergory,
          auctionStarted,
          auctionEnded,
          sold,
          owner,
          purchasedBy,
          currentBidder,

          image_public_id,
          bids: [],
          room
        },
      }
    );
    res.status(200).json({
      message: "Auction edited",
    })

  } catch (err) {
    res.status(500);
  }
}



exports.addbid = async (req, res) => {

  try {
    const {
    
    
    currentPrice
  } = req.body;

auctionId=req.params.auctionId;
  

    await Auction.updateOne(
      { _id: auctionId },
      {
        $set: {
         
          currentPrice
        
        },
      }
    );
    res.status(200).json({
      message: "bid added",
    })

  } catch (err) {
    res.status(500);
  }
}