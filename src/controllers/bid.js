const Auction = require('../models/Auction');
const io = require('../socket');

// @route   POST /bid/:adId
// @desc    Post a new ad
exports.addBid = async (req, res, next) => {
  const { adId } = req.params;
  const { amount } = req.query;

  try {
    const auction = await Auction.findById(auctionId).populate('owner', { password: 0 });
    if (!auction) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    // Check bid validity
    if (parseFloat(auction.currentPrice) >= parseFloat(amount)) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Bid amount less than existing price' }] });
    }
    if (auction.sold || auction.auctionEnded || !auction.auctionStarted) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Auction has ended or has not started' }] });
    }
    auction.bids.push({ user: req.user.id, amount: amount });
    auction.currentPrice = amount;
    auction.currentBidder = req.user.id;
    const savedAd = await auction.save();
    // io.getIo().emit('bidPosted', { action: 'bid', data: ad });
    console.log(`Emitting to ${auction._id}`);
    io.getAdIo().to(auction._id.toString()).emit('bidPosted', { action: 'post', data: auction });
    res.status(200).json(savedAd);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /bid/:adId?option=<highest>
// @desc    List of bids on an ad
exports.listBids = async (req, res, next) => {
  const { adId } = req.params;
  let { option } = req.query;
  option = option ? option : 'default';

  try {
    const auction = await Auction.findById(adId);
    await auction.populate('bids.user', { password: 0 });
    if (!auction) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    const bidList = auction.bids;
    if (option.toString() === 'highest') {
      res.status(200).json([bidList[bidList.length - 1]]);
    } else {
      res.status(200).json(bidList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};