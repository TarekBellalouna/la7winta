const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const ratingController = require("../controllers/rating");

router.get("/", ratingController.fetchRatings);
router.get("/fetch-rating/:ratingId", ratingController.fetchRating);
router.get("/fetch-rating-byprod/:ratingId", ratingController.fetchRatingByproduct);
router.post("/add-rating", ratingController.addRating);
router.post("/edit-rating", ratingController.editRating);
router.post("/delete-rating", ratingController.deleteRating);

module.exports = router;
