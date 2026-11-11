const express = require("express");
const router = express.Router();

const admin = require("../db/admin");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtkey = process.env.JWT_SECRET;


router.post("/adminlogin", async (req, resp) => {


   if (!req.body) {

      return resp.status(400).json({
         result: "Login credentials required!"
      });

   }


   const { email, password } = req.body;


   if (!email || !password) {

      return resp.status(400).json({
         result: "Email and password are required!"
      });

   }


   try {


      const user = await admin.findOne({
         email
      });


      if (!user) {

         return resp.status(404).json({
            result: "User not found"
         });

      }
 

      const isMatch = await bcrypt.compare(
         password,
         user.password
      );

     
      if (!isMatch) {
console.log(user.password);
         return resp.status(401).json({
            result: "Wrong Password"
         });

      }


      const token = jwt.sign(
         {
            id: user._id,
            role: user.role
         },
         jwtkey,
         {
            expiresIn: "2h"
         }
      );


      return resp.status(200).json({
         auth: token
      });


   } catch (error) {


      return resp.status(500).json({
         result: "Something went wrong!"
      });


   }

});


module.exports = router;