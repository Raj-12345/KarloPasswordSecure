var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passwordCategoryModel = require('../model/passwordcategorymodel');
var passwordModel=require("../model/passwordmodel");

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

router.get('/', checkAuthrization, function (req, res, next) {
passwordCategoryModel.estimatedDocumentCount((error, result) => {
  if(error)
  {
throw error;
  }

             req.session.passwordsCategoryCount= result;        
             passwordModel.estimatedDocumentCount((error, result) => {
              if(error)
              {
          throw error;
              }
          
                         req.session.passwordsCount= result;           
                  res.render('home', { title: 'Dashboard', session: req.session });
             })
             

 })


});
module.exports = router;
