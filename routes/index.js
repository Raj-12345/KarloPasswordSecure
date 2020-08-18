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

//midddleware for userLoginOrNot
var userLoginOrNot =(req,res, next)=>{
  var loginToken=req.cookies.loginToken;
   if(loginToken)
   {
          res.redirect("/home");
   }
   else
   {
                        next();
   }


}



router.get('/', userLoginOrNot,function(req, res, next) {
  res.render('index', { title: 'Welcome in Password Management',signup:false ,error:false});
});

 router.get('/home', checkAuthrization,function(req, res, next) {
  res.render('home', { title: 'Dashboard', session: req.session });

 });


router.get('/signup', userLoginOrNot,function(req, res, next) {
  res.render('signup', { title:'Sign Up', user_name_error: false,user_email_error: false,message: ' ' });
});

router.get('/addnewcategerious',checkAuthrization,function(req, res, next){
          res.render('addnewcategerious', {errors:null,sucess:null,session: req.session});

})

router.get('/viewallcategerious',checkAuthrization,function(req, res, next){

          var userName=req.session.userName;
                  passCategoryController.showCategories(req,res,userName);


})

module.exports = router;
