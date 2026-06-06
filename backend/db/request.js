const mongoose=require('mongoose');

const receiverSchema=new mongoose.Schema({
      name:String,
      addrs:String,
      age:String,
      gen:String,
      city:String,
      HospitalName:String,
      DoctorName:String,
      bloodGrp:String, 
      email:String, 
      mobno:String,
      unitReq:String,
      requester:String,
      anyDisease:String,
      Reason:String,
      lastDonationDate:{
            type:Date
      },
      reqDate:{
              type:Date
      },
      reqTime:{
            type:String
      }

})
module.exports= mongoose.model('receiver',receiverSchema,)
