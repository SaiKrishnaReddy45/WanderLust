const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require('multer');
const {storage}=require("../cloudconfig.js")
const upload=multer({storage});
//index route
router
 .route("/")
 .get(wrapAsync(listingController.index))
 .post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.createListing))
 
//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);
//show route

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;