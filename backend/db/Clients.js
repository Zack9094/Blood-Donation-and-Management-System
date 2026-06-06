const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bloodGrp: String,
    heathStatus: {
        nonSmoker: Boolean,
        nonSmoker: Boolean,
        noRecentIllness: Boolean,
        noInfectiousDisease: Boolean,
        hemoglobin: Number,
        weight: Number
    },
    lastDonationDate: String,
    role: {
        type: String,
        default: "user"
    }

});
module.exports = mongoose.model("client", ClientSchema)
