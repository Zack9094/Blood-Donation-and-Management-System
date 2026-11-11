const express = require("express");
const router = express.Router();

const bs = require("../db/BloodStoke");

const verifyToken = require("../middleware/verifyToken");
const authorizeRole = require("../middleware/authorizeRole");

router.post(
   "/bloodstock",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {

      let result = await bs.updateOne(
         {},
         req.body
      );

      resp.send(result);

   }
);



router.get(
   "/bloodstock",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {

      let result = await bs.find();


      if (result.length > 0) {

         resp.send(result);

      } else {

         resp.status(404).json({
            message: "No result found"
         });

      }

   }
);


module.exports = router;
