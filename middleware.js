let Listings=require("./models/listing.js");
let Reviews=require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("failure","You need to login in to do this");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing =await Listings.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("failure","You don't have permission to do that");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// Middleware to validate listing data
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// Middleware to validate review data
module.exports.validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

module.exports.isReviewOwner = async (req, res, next) => {
    const { id,reviewId } = req.params;
    const review = await Reviews.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("failure", "You do not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};