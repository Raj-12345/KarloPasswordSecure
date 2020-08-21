var passwordCategoryModel = require('../model/passwordcategorymodel');
var passwordModel=require("../model/passwordmodel");

module.exports = {

  addCategory: function (req, res, userName, categoryName) {

    var passwordCategory =new passwordCategoryModel({
      userName: userName,
      categoryName: categoryName
    })
    passwordCategory.save((error, result) => {
      if (error) {
        throw error;
      }
      else {
        res.render("addnewcategerious", { errors: null, sucess: "Category Name Added Sucessfully", session: req.session });
      }


    })
  },
  showCategories: (req, res, userName) => {

    passwordCategoryModel.find({ userName: userName }, (error, result) => {
      if (error) {
        throw error;
      }

      res.render('viewallcategerious', { errors: null, categories: result, session: req.session });
    })


  },


  deleteCategory: (req, res, _id) => {

    passwordCategoryModel.findByIdAndDelete(_id, (error, result) => {
      if (error) {
        throw error;
      }
      

      res.redirect("/viewallcategerious");
    })


  },
  editCategory: (req, res, _id) => {
    passwordCategoryModel.findById(_id, (error, result) => {
      if (error) {
        throw error;
      }
      
      res.render("editcategerious", { category: result, session: req.session })
    })



  },
  updateCategory: (req, res, _id, data) => {
    passwordCategoryModel.findByIdAndUpdate(_id, data, (error, result) => {
      if (error) {
        throw error;
      }
      res.redirect("/viewallcategerious");
    })
  },
  showCategoriesToAdd: (req, res, userName) => {

    passwordCategoryModel.find({ userName: userName }, (error, result) => {
      if (error) {
        throw error;
      }
      
      res.render('addnewpassword', { errors: null, sucess: null, categories: result, session: req.session });

    })


  },
  addPassword: function (req, res, userName, data) {
 
               
   var password =new  passwordModel({
      userName: userName,
      categoryName: data.categoryName,
       categoryUserName:data.userName,
      password:data.password,
      url:data.url

    })
    password.save((error, result) => {
      if (error) {
        throw error;
      }
      else {
        passwordCategoryModel.find({ userName: userName }, (error, result) => {
          if (error) {
            throw error;
          }
          res.render("addnewpassword", { errors: null,categories: result,sucess: "Password Added Sucessfully", session: req.session });
        })
                  
      }
    })
             



        },
        showPasswords: (req, res, userName) => {

          passwordModel.find({ userName: userName }, (error, result) => {
            if (error) {
              throw error;
            }
      
            res.render('viewallpasswords', { passwords: result, session: req.session });
          })
      
      
        }

}