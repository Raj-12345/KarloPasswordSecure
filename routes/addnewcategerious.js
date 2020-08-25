var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');

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
    res.render('addnewcategerious', {errors:null,sucess:null,session: req.session});

})


module.exports = router;