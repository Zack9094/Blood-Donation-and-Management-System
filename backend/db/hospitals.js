const mongoose=require('mongoose');

const hospitalSchema=new mongoose.Schema({
      hname:String,
      licenseId:String,
      address:String,
      city:String,
      totalRequests:String,
      availableUnits:String,
      emergencyContact:String, 
      email:String, 
      phone:String,
      status:String,
     

})
module.exports= mongoose.model('hospitals',hospitalSchema,)
