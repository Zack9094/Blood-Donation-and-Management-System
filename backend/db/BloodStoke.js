const mongoose=require('mongoose');

const bloodstoke=new mongoose.Schema({
      "A+":String,
      "A-":String,
      "B+":String,
      "B-":String,
      "O+":String,
      "O-":String,
      "AB+":String,
      "AB-":String, 
      

})
module.exports= mongoose.model('BloodStock',bloodstoke,)
