const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js")
const User=require("./user.js")
const listingSchema= new Schema({
    title:{
       type:String,
       required:true,
    },
    description: String,
    image:{
       url:String,
       filename:String,
    },
    price:Number,
    location: String,
    country: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    owner:{
      type: mongoose.Schema.Types.ObjectId, ref: "User" 
    },
})
listingSchema.post("findOneAndDelete", async function (listing) {
   if (listing && listing.reviews) {
       await Review.deleteMany({ _id: { $in: listing.reviews } });
   }
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;