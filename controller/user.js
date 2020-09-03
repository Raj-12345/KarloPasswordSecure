var userModel = require('../model/usermodel');
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
module.exports = {

    userSignup: (req, res, user) => {
        console.log(user);
        console.log("this is from user controller");
        var dcrypt_password = bcryptjs.hashSync(user.password,10)


        var user = userModel({
            userName: user.userName,
            email: user.email,
            password: dcrypt_password
        })
        user.save((error, result) => {
            if (error) {
                throw error;

            }
            console.log(result);
            res.render('login', { title: 'Welcome in Password Management', signup: true, error: false, message: "Signup Sucessfully !!! Login Here" })

        })
    },
    loginUser: (req, res, user) => {

        console.log(user);

        userModel.findOne({ userName: user.userName}, (error, result) => {
            if (error) {
                throw error;

            }
            
            if (result == null) {
              
                res.render('login', { title: 'Welcome in Password Management', signup: false, error: true, message: "userName or password Invalid!!!" });
            }
            else {
                var password = bcryptjs.compareSync(user.password,result.password);
                         if(password)
                    {
                req.session.userName = result.userName;

              var loginToken=jwt.sign({userId:result.password},"1256");
              
                   res.cookie("loginToken",loginToken,{httpOnly:true});
                res.redirect('/home');
         
                    }
                    else
                    {
                        res.render('login', { title: 'Welcome in Password Management', signup: false, error: true, message: "userName or password Invalid!!!" });

                    }
            }


        })

    },
    logoutUser: (req, res) => {
        console.log(req.session);
           
        req.session.destroy();
        res.clearCookie("loginToken");
        
        res.redirect('/');

    }

}

