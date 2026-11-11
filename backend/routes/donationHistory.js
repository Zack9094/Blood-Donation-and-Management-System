const express = require("express");
const router = express.Router();

const DonationHistory = require("../db/donationHistory");

const verifyToken = require("../middleware/verifyToken");


// Create donation history record
router.post(
  "/addDonation",
  verifyToken,
  async (req, res) => {
    try {
      const donation =
        await DonationHistory.create({
          donorId: req.body.donorId,
          donationDate:
            req.body.donationDate,
          hospital:
            req.body.hospital,
          city: req.body.city,
          bloodGroup:
            req.body.bloodGroup,
          donationType:
            req.body.donationType,
          status: req.body.status,
        });

      res.status(201).json(
        donation
      );
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// Get donation history of one donor
router.get(
  "/history/:donorId",
  verifyToken,
  async (req, res) => {
    try {
      const history =
        await DonationHistory.find({
          donorId:
            req.params.donorId,
        })
          .sort({
            donationDate: -1,
          });
          console.log(req.params.donorId)
      console.log(history);
      res.status(200).json(
        history
      );
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);


// Delete a history record
router.delete(
  "/delete/:id",
  verifyToken,
  async (req, res) => {
    try {
      await DonationHistory.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Donation history deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

module.exports = router;