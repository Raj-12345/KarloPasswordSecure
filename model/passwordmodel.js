var express=require('express');
var mongoose=require('mongoose');

 var passwordScheme= new mongoose.Schema({
    userName:{type:String,required:true},
    categoryName:{type:String,required:true},
    categoryUserName:{type:String,required:true},
    password:{type:String,required:true},
    url:{type:String},
    date:{ type:Date,default:Date.now }

 })
 var passwordModel=mongoose.model('passwords',passwordScheme);
 module.exports =passwordModel;