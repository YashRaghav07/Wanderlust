const Listings = require("../models/listing.js");
const Users = require("../models/user.js");
const locationiqToken = process.env.MAP_TOKEN;
const axios = require("axios");

async function geocode(address) {
  const url = `https://us1.locationiq.com/v1/search?key=${locationiqToken}&q=${encodeURIComponent(
    address
  )}&format=json`;
  try {
    const response = await axios.get(url);
    // The first result is usually the best match
    const result = response.data[0];
    return result;
  } catch (err) {
    console.error(
      "Geocoding error:",
      err.response ? err.response.data : err.message
    );
  }
}

module.exports.index = async (req, res) => {
  let listings = await Listings.find({});
  if (!listings) {
    req.flash("failure", "No listings found!");
    return res.redirect("/");
  }
  res.render("listings/index.ejs", { listings });
};

module.exports.renderNewListing = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let listing = await Listings.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  const ownerId = listing.owner;
  await listing.save();
  const userName = await Users.findById(ownerId);
  if (!listing) {
    req.flash("failure", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing, userName });
};

module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let fileName = req.file.filename;
  let listing = new Listings(req.body.listing);
  listing.owner = req.user._id;
  listing.image = { url, fileName };

  let location = listing.location + "," + listing.country;

  const results = await geocode(location);
  if (results) {
    const lon=results.lon;
    const lat=results.lat;
    console.log(lon,lat);
    listing.geometry = {
      type: "Point",
      coordinates: [parseFloat(lon), parseFloat(lat)],
    };
  } else {
    listing.geometry = {
      type: "Point",
      coordinates: [77.2088, 28.6139], // fallback or handle error as needed
    };
  }

  await listing.save();
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
};

module.exports.renderEditListing = async (req, res) => {
  const listing = await Listings.findById(req.params.id);
  if (!listing) {
    req.flash("failure", "Listing not found");
    return res.redirect("/listings");
  }
  let originalImg = listing.image.url;
  originalImg = originalImg.replace("/upload", "/upload/h_200,w_250");
  res.render("listings/edit.ejs", { listing, originalImg });
};

module.exports.editListing = async (req, res) => {
  let listing = await Listings.findByIdAndUpdate(req.params.id, {
    ...req.body.listing,
  });
  listing.owner = req.user._id;
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let fileName = req.file.filename;
    listing.image = { url, fileName };
  }

  await listing.save();
  if (!listing) {
    req.flash("failure", "Listing not found");
    return res.redirect("/listings");
  }
  req.flash("success", "Successfully updated listing!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyListing = async (req, res) => {
  let listing = await Listings.findByIdAndDelete(req.params.id);
  if (!listing) {
    req.flash("failure", "Listing not found");
    return res.redirect("/listings");
  }
  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};
