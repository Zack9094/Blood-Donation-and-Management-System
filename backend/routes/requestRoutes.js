const express = require("express");
const router = express.Router();

const Reqs = require("../db/request");

const verifyToken = require("../middleware/verifyToken");
const authorizeRole = require("../middleware/authorizeRole");

router.post(
   "/request",
   verifyToken,
   authorizeRole("user"),
   async (req, resp) => {

      let reqs = new Reqs(req.body);

      let reqst = await reqs.save();

      reqst = reqst.toObject();

      return resp.send(reqst);

   }
);



router.get(
   "/request/:id",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {


      let reqst = await Reqs.findOne({
         _id: req.params.id
      });


      if (reqst) {

         resp.send(reqst);

      } else {

         resp.status(404).json({
            message: "No result found"
         });

      }

   }
);



router.get(
   "/request",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {


      let reqst = await Reqs.find();


      if (reqst) {

         resp.send(reqst);

      } else {

         resp.status(404).json({
            message: "No result found"
         });

      }

   }
);


module.exports = router;