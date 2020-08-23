const express=require('express');
const mongoose =require('mongoose');

var userSchema=new mongoose.Schema({
     userName:{type:String,required:true},
     email:{type:String,require:true},
     password:{type:String,required:true},
     date:{ type:Date,required:true,default:Date.now }
     
})
var userModel=mongoose.model('users',userSchema);
module.exports=userModel;