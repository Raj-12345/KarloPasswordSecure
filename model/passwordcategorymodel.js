var express=require('express');
var mongoose=require('mongoose');

 var passwordScheme=mongoose.Schema({
   userName:{type:String,required:true},
    categoryName:{type:String,required:true},
    date:{ type:Date,default:Date.now }

 })
 var passwordModel=mongoose.model('passwordCategorys',passwordScheme);
 module.exports =passwordModel;