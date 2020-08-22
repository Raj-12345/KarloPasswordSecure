var express = require('express');
var router = express.Router();
var userController = require('../controller/user');
var userModel = require('../model/usermodel');
var passCategoryController = require('../controller/passwordcategory.js');
var passwordCategoryModel = require("../model/passwordcategorymodel");
var passwordModel=require("../model/passwordmodel");
const { body, validationResult } = require('express-validator');

/* GET users listing. */



// All Middleware for validation 


var userEmailValidation = (req, res, next) => {
  var email = req.body.email;
  userModel.findOne({ email: email }, (err, result) => {
    if (err) {
      throw err
    }

    if (result) {

      return res.render('signup', { title: 'Sign Up', user_email_error: true, user_name_error: false, message: "Email already  existes!!!" });

    }
    else {
      next();
    }

  })

}



var userNameValidation = (req, res, next) => {
  var userName = req.body.userName;
  userModel.findOne({ userName: userName }, (err, result) => {
    if (err) {
      throw err
    }

    if (result) {

      return res.render('signup', { title: 'Sign Up', user_name_error: true, user_email_error: false, message: "User  Name already  existes!!!" });

    }
    else {
      next();
    }

  })

}

var userLoginOrNot = (req, res, next) => {
  var loginToken = req.cookies.loginToken;
  if (loginToken) {

    next();
  }
  else {

    res.redirect('/');
  }
}




router.post('/login', function (req, res, next) {

  var user = req.body;
  userController.loginUser(req, res, user);


});

router.get('/logout', function (req, res, next) {


  userController.logoutUser(req, res);


});

router.post('/signup', userNameValidation, userEmailValidation, function (req, res, next) {

  var user = req.body;
  userController.userSignup(req, res, user);


});





router.post('/addnewcategerious', userLoginOrNot, [body('categoryName').isLength({ min: 2 }).withMessage("Please Provide Categery Name")], function (req, res, next) {

  const errors = validationResult(req);
  var data = req.body;
  if (errors.isEmpty() == false) {
    res.render("addnewcategerious", { errors: errors.mapped(), sucess: null, session: req.session });
  }
  else {
    var categoryName = data.categoryName;
    var userName = req.session.userName;
    passCategoryController.addCategory(req, res, userName, categoryName);
  }

});

router.post('/addnewpassword', [body('userName').isLength({ min: 2 }).withMessage("Please Provide user Name"),
body('password').isLength({ min: 8 }).withMessage("Please provide password greater than 8 characters")], function (req, res, next) {

  const errors = validationResult(req);
  var data = req.body;
  const userName = req.session.userName;
  if (errors.isEmpty() == false) {

    passwordCategoryModel.find({ userName: userName }, (error, result) => {
      if (error) {
        throw error;
      }


      res.render("addnewpassword", { errors: errors.mapped(), categories: result, sucess: null, session: req.session });
    })

  }
  else {
    passCategoryController.addPassword(req, res, userName, data)
  }

});




router.get('/deletecategerious/:_id', userLoginOrNot, function (req, res, next) {
  const _id = req.params._id;
  passCategoryController.deleteCategory(req, res, _id);
});
router.get("/editcategerious/:_id", userLoginOrNot, function (req, res, next) {
  const _id = req.params._id;
  passCategoryController.editCategory(req, res, _id);
});
router.post("/editcategerious/:_id", userLoginOrNot,[body('categoryName').isLength({ min: 2 }).withMessage("Please Provide Categery Name")], function (req, res, next) {
  const _id = req.params._id;
  var data = req.body;
  const errors = validationResult(req);
  
  if (errors.isEmpty() == false) {
    console.log("sending errors");
           passwordCategoryModel.findById(_id,(error, result) => {
      if (error) {
        throw error;
      }
      res.render("editcategerious", { errors: errors.mapped(),category:result,sucess: null, session: req.session });
    
    })
    
  }
  else {
    passCategoryController.updateCategory(req, res, _id, data);
  }




});



router.get('/deletepasswords/:_id', function (req, res, next) {

  const _id = req.params._id;
  passCategoryController.deletePassword(req, res, _id);

});

router.get("/editpasswords/:_id", function (req, res, next) {
  const _id = req.params._id;
  passCategoryController.editPassword(req, res, _id);
});


router.post("/editpasswords/:_id",
  [body('categoryUserName').isLength({ min: 2 }).withMessage("Please Provide user Name"),
  body('password').isLength({ min: 8 }).withMessage("Please provide password greater than 8 characters")], function (req, res, next) {

    const errors = validationResult(req);
    var data = req.body;
    const _id=req.params._id;
    if (errors.isEmpty() == false) {

      passwordModel.findById(_id,(error, result) => {
        if (error) {
          throw error;
        }
        res.render("editpasswords", { errors: errors.mapped(),password: result, sucess: null, session: req.session });
      })

    }
    else {
      passCategoryController.updatePassword(req, res,_id, data)
    }

  });


module.exports = router;
