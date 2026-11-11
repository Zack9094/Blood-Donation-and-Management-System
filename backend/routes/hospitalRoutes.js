const express = require("express");
const router = express.Router();

const hosp = require("../db/hospitals");

const verifyToken = require("../middleware/verifyToken");
const authorizeRole = require("../middleware/authorizeRole");


router.post(
   "/addhospital",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {


      let hospt = new hosp(req.body);

      let newhospt = await hospt.save();

      newhospt = newhospt.toObject();


      if (newhospt) {

         resp.send(newhospt);

      } else {

         resp.status(404).json({
            message: "No result found"
         });

      }

   }
);



router.get(
   "/hospitals",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {


      let gethosp = await hosp.find();


      if (gethosp.length > 0) {

         resp.send(gethosp);

      } else {

         resp.status(404).json({
            message: "No result found"
         });

      }

   }
);


module.exports = router;