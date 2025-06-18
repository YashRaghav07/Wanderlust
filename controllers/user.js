const User = require("../models/user.js");

module.exports.renderSignupPage = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.createAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const user = await User.register(newUser, password);
    req.login(user, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "Welcome to wanderlust");
      return res.redirect("/listings");
    });
  } catch (e) {
    req.flash("failure", "User already exists");
    return res.redirect("/signup");
  }
};

module.exports.renderLoginPage = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res, next) => {
  req.flash("success", "Welcome back to wanderlust!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You logged out");
    res.redirect(res.locals.redirectUrl || "/listings");
  });
};
