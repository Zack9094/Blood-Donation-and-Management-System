const express = require("express");
const router = express.Router();

const Donor = require("../db/donor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/verifyToken");
const authorizeRole = require("../middleware/authorizeRole");

const jwtkey = process.env.JWT_SECRET;


router.post("/donorRegister", async (req, resp) => {

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   const existingDonor = await Donor.findOne({
      email: req.body.email
   });

   if (existingDonor) {
      return resp.status(409).json({
         message: "Email already exists"
      });
   }


   let donor = new Donor({
      ...req.body,
      password: hashedPassword
   });


   let result = await donor.save();

   result = result.toObject();

   delete result.password;


   const token = jwt.sign(
      {
         id: result._id,
         role: "donor"
      },
      jwtkey,
      {
         expiresIn: "2h"
      }
   );


   resp.json({
      result,
      auth: token
   });

});




router.get(
   "/donorlist",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {


      let result = await Donor.find()
         .select("-password");


      if (result.length > 0) {

         resp.send(result);

      } else {

         resp.status(404).json({
            message: "No result found"
         });

      }

   }
);





router.get(
   "/donorlist/:id",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {


      const don = await Donor.findOne({
         _id: req.params.id
      }).select("-password");


      if (don) {

         resp.send(don);

      } else {

         resp.status(404).json({
            message: "No result found"
         });

      }

   }
);


module.exports = router;