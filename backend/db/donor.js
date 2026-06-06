const mongoose=require('mongoose');

const donorSchema=new mongoose.Schema({
      name:String,
      addrs:String,
      age:String,
      gen:String,
      city:String,
      fname:String,
      mname:String,
      bloodGrp:String, 
      email:String, 
      mobno:String,
      anyDisease:String,
      lastDonationDate:{
            type:Date
      }

})
module.exports= mongoose.model('donor',donorSchema,)
