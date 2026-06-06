const mongoose=require('mongoose');

const adminSchema=new mongoose.Schema({
      email:String,
      password:String,
      role:String
})
module.exports= mongoose.model('admin',adminSchema,)
