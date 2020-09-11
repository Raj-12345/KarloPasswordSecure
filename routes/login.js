var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

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
  res.render('login', { title: 'Login', error:false,signup: false,resetpassword:false,message: ' ' });
});
module.exports = router;