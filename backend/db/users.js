const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bloodGrp: String,
    phone: String,
    healthStatus: {
        nonSmoker: Boolean,
        noRecentIllness: Boolean,
        noInfectiousDisease: Boolean,
        hemoglobin: Number,
        weight: Number
    },
    lastDonationDate: Date,
    role: {
        type: String,
        default: "user"
    }

});
module.exports = mongoose.model("users", userSchema)
