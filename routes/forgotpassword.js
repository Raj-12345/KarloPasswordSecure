var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var nodeMailer=require('nodemailer');
var  userController=require('../controller/user')
var userModel=require('../model/usermodel.js')




// code for email 
var transporter =nodeMailer.createTransport({
   service:"gmail",
   auth:{ 
     user:"raj.malviya00011.rm@gmail.com",
     pass:"Modiji12345@"
   }
})
//send email function 
 function sendEmail(mail)
 {
   var mailOptions={
     form:"raj.malviya00011.rm@gmail.com",
     to:mail.to,
     subject:mail.subject,
     html:mail.body
   }
   transporter.sendMail(mailOptions,(error,info)=>{
if(error)
{
  throw error;
}
else
{
  console.log(info);
}

   })

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
router.get('/',userLoginOrNot, function (req, res, next) {
  res.render('forgotpassword', { title: 'Forgot Password',sendmail:false,notsendmail:true,notexists:false,message:'!!!! Please insert email that you provided at the time of registration.'});
});
router.get('/:forgotToken',userLoginOrNot, function (req, res, next) {
  var forgotToken = req.params.forgotToken;
  try {
   var data=jwt.verify(forgotToken, "1256");
   console.log("the token is verifyed"+data.email);
   var email=data.email;
  userController.forgotUserPassword(req,res,email);

  } catch (error) {
    console.log(error);
  }

});

router.post('/', userLoginOrNot, function (req, res, next) {
    console.log(req.body);
    var email=req.body.email;
    userModel.findOne({ email:email }, (error, result) => {
      if (error) {
          throw error;

      }

      if (result == null) {
        res.render('forgotpassword', { title: 'Forgot Password',sendmail:false,notsendmail:false,notexists:true,message:'email does not exists !!!!!.'});
      }
      else
      {
        
        var forgotToken=jwt.sign({email:req.body.email},"1256");
        var url="<a href='https://karlopasswordsecure.herokuapp.com/"+forgotToken+"'>'https://karlopasswordsecure.herokuapp.com/'"+forgotToken+"</a>"
          var mail={
            to:req.body.email,
            subject:"Forgot Password",
            body:url
          }
              sendEmail(mail); 
              res.render('forgotpassword',{ title: 'Forgot Password',sendmail:true,notsendmail:false,notexists:false,message:'!!! Check  your email a Url is Sended.'});
             
          }
      
      })
    })
module.exports = router;
