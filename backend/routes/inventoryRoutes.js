const express = require("express");
const router = express.Router();

const Inven = require("../db/Invent");

const verifyToken = require("../middleware/verifyToken");
const authorizeRole = require("../middleware/authorizeRole");

router.post(
   "/addInventory",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {

      let inven = new Inven(req.body);

      let result = await inven.save();

      result = result.toObject();

      resp.send(result);

   }
);



router.get(
   "/bloodRecord",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {

      let result = await Inven.find();


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