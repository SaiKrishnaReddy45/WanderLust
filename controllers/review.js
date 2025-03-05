const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
module.exports.createReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New review Created")
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
    //console.log(`Deleting review ${reviewId} for listing ${id}`);
    const updatedListing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    if (!updatedListing) {
        throw new ExpressError(404, "Listing not found");
    }
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`);
}