const express = require("express");
const router = express.Router();

const User = require("../db/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/verifyToken");

const jwtkey = process.env.JWT_SECRET;



router.post("/register", async (req, resp) => {

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   const existingUser = await User.findOne({
      email: req.body.email
   });

   if (existingUser) {
      return resp.status(409).json({
         message: "Email already exists"
      });
   }


   let user = new User({
      ...req.body,
      password: hashedPassword
   });

   let result = await user.save();

   result = result.toObject();

   delete result.password;


   const token = jwt.sign(
      {
         id: result._id,
         role: "user"
      },
      jwtkey,
      {
         expiresIn: "2h"
      }
   );


   resp.send({
      result,
      auth: token
   });

});



router.post("/login", async (req, resp) => {

   if (!req.body) {
      return resp.status(400).json({
         message: "No data received"
      });
   }

   const { email, password } = req.body;


   if (!email || !password) {
      return resp.status(400).json({
         message: "Email and password required"
      });
   }


   try {

      const user = await User.findOne({
         email
      });


      if (!user) {
         return resp.status(404).json({
            message: "User not found"
         });
      }


      const isMatch = await bcrypt.compare(
         password,
         user.password
      );


      if (!isMatch) {
         return resp.status(401).json({
            result: "Wrong Password"
         });
      }


      const token = jwt.sign(
         {
            id: user._id,
            role: "user"
         },
         jwtkey,
         {
            expiresIn: "2h"
         }
      );


      resp.send({
         auth: token
      });

   }
   catch (error) {

      console.error(error);

      resp.status(500).json({
         message: "Something went wrong"
      });

   }

});




router.get("/profile", async (req, resp) => {


   const authHeader = req.headers.authorization;


   if (!authHeader) {
      return resp.status(401).json({
         message: "No token"
      });
   }


   if (!authHeader.startsWith("Bearer ")) {
      return resp.status(401).json({
         message: "Invalid token format"
      });
   }


   const token = authHeader.split(" ")[1];


   try {

      const decoded = jwt.verify(token, jwtkey);


      const userData = await User.findById(decoded.id)
         .select("-password");


      if (!userData) {
         return resp.status(404).json({
            message: "User not found"
         });
      }


      resp.status(200).json(userData);


   }
   catch (err) {

      resp.status(401).json({
         message: err.message
      });

   }

});




router.post(
  "/updateProfile",
  verifyToken,
  async (req, resp) => {
    try {
      const updateData = {
        name: req.body.name,
        phone: req.body.phone,
        bloodGrp: req.body.bloodGrp,
        lastDonationDate: req.body.lastDonationDate,
        healthStatus: req.body.healthStatus,
      };

      // remove undefined values
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      // update password only if supplied
      if (
        req.body.password &&
        req.body.password.trim() !== ""
      ) {
        updateData.password =
          await bcrypt.hash(
            req.body.password,
            10
          );
      }

      const updatedUser =
        await User.findByIdAndUpdate(
          req.user.id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        ).select("-password");

      if (!updatedUser) {
        return resp.status(404).json({
          message: "User not found",
        });
      }

      resp.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);

      resp.status(500).json({
        message:
          "Unable to update profile",
      });
    }
  }
);


module.exports = router;