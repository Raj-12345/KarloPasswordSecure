const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://Raj:Khandwa12345@cluster0-se5eg.mongodb.net/pms?retryWrites=true&w=majority");
var checkcon=mongoose.connection;
checkcon.on('error', console.error.bind(console, 'connection error:'));
checkcon.on('connected',()=>{console.log('connection  done succesfully')});
checkcon.on('disconnected',()=>{console.log('connection closed   succesfully')})