var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
// middleware for authrization

function checkAuthrization(req, res, next) {
  var loginToken = req.cookies.loginToken;

  try {

    jwt.verify(loginToken, "1256");
    next();
  } catch (error) {
    res.redirect('/');
  }

}

//midddleware for userLoginOrNot
var userLoginOrNot = (req, res, next) => {
  var loginToken = req.cookies.loginToken;
  if (loginToken) {
    res.redirect("/home");
  }
  else {
    next();
  }


}
router.get('/', userLoginOrNot, function (req, res, next) {
  res.render('index', { title: 'Welcome in Password Management', signup: false, error: false });
});
module.exports = router;
