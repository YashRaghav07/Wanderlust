if(process.env.NODE_ENV!="production"){
  require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require("connect-mongo");
const flash=require("connect-flash");
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const listingRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/review.js");
const userRoute=require("./routes/user.js");

const db_URL = process.env.ATLUSDB_URL;

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

<<<<<<< HEAD
//Connect to mongoDB
async function main() {
  await mongoose.connect(db_URL);
}
=======
//Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});
>>>>>>> e1e88cb2d3cb1fcf022045c85360e633016cbf0f

const store = MongoStore.create({
  mongoUrl: process.env.ATLUSDB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})

const sessionConfig={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    expires:Date.now()+1000*60*60*24*7,
    maxAge:1000*60*60*24*7
  }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.failure=req.flash("failure");
  res.locals.currUser=req.user;
  next()
});


app.use("/listings",listingRoute);
app.use("/listings/:id/review",reviewRoute);
app.use("/",userRoute);

//Error handling middleware for invalid routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

//Error handling middleware for all errors
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

//Server listening at port 8080
app.listen(8080, () => {
  console.log("Server started at port 8080");
});
