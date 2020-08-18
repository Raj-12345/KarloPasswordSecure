var passwordCategoryModel = require('../model/passwordcategorymodel');

module.exports = {

  addCategory: function (req, res,userName,categoryName) {
  
    var passwordCategory = passwordCategoryModel({
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
  showCategories: (req, res,userName) => {
    
                              passwordCategoryModel.find({userName: userName},(error,result)=>{
                                   if(error)
                                   {
                                     throw error;
                                   }
                          
                                   res.render('viewallcategerious', {errors:null,categories:result,session: req.session});
                              })


  },
  
deleteCategory:(req, res,_id) => {
    
    passwordCategoryModel.findByIdAndDelete(_id,(error,result)=>{
         if(error)
         {
           throw error;
         }
         console.log(result);
          res.redirect("/viewallcategerious");
    })


},
editCategory:(req,res,_id)=>{
      passwordCategoryModel.findById(_id,(error,result)=>
      {
        if(error)
         {
           throw error;
         }
         console.log("the data  of categi"+result);
           res.render("editcategerious",{category:result,session: req.session})
      })



},
 updateCategory:(req, res,_id,data)=>{
                    passwordCategoryModel.findByIdAndUpdate(_id,data,(error,result)=>{
                      if(error)
                      {
                        throw error;
                      }
                      res.redirect("/viewallcategerious");
                    })
 }

}