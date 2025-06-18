const Listings = require("../models/listing.js");
const Reviews = require("../models/review.js");

module.exports.createNewReview = async (req, res) => {
  const listing = await Listings.findById(req.params.id);
  const review = new Reviews(req.body.review);
  review.author = req.user._id;
  listing.reviews.push(review);
  await review.save();
  await listing.save();
  req.flash("success", "Successfully created a new review!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const listing = await Listings.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  const review = await Reviews.findByIdAndDelete(reviewId);
  if (!listing || !review) {
    req.flash("failure", "Review not found");
    return res.redirect(`/listings/${id}`);
  }
  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/listings/${id}`);
};
