
var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
var passCategoryController = require('../controller/passwordcategory');
/* GET home page. */
// middleware for authrization

function checkAuthrization(req,res,next){
  var loginToken=req.cookies.loginToken;

  try {
             
      jwt.verify(loginToken,"1256");
      next();
  } catch (error) {
         res.redirect('/');
  }

}


router.get('/',checkAuthrization,function(req, res, next){
    var userName=req.session.userName;
            passCategoryController.showPasswords(req,res,userName);
  
  
  })
  module.exports = router;