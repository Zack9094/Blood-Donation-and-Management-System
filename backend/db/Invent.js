const mongoose=require('mongoose');

const donorSchema=new mongoose.Schema({
      
      bloodGrp:String,
      inventoryType:String ,
      Qty:String,
     email: {
   type: String,
   required: true
},

       donation_date: {
    type: Date,
    default: Date.now
  }

})
module.exports= mongoose.model('Inventory',donorSchema,)
