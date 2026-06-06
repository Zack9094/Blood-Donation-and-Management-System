const express = require('express');
const mongoose = require("mongoose");
const Clients = require("./db/Clients.js")
mongoose.connect("mongodb://127.0.0.1:27017/Clients", {

   //useNewUrlParser: true,
   //  useUnifiedTopology: true,

})
   .then(() => {
      console.log("✅ MongoDB connected successfully");
   })
   .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
   });

const User = require("./db/Clients");
const app = express();
app.use(express.json());
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtkey = "mysecretkey"; // use env variable later

app.use(cors());

app.get("/", (req, res) => {
   res.send("app is working")
});

app.post("/register", async (req, resp) => { // async function cause it returns promise
   let user = new User(req.body);
   let result = await user.save();// to save data in db // save k time par select("-password")
   result = result.toObject();
   delete result.password                           //  nhi use kar sakte password hide karne k liye

   jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
         resp.send({ result: "something went wrong, Please try after sometimes" })
      }
      resp.send({ result, auth: token });
   })
});





//---------------------------------------------------
const verifyToken = require("./middleware/verifyToken");
const authorizeRole = require("./middleware/authorizeRole");
const admin = require('./db/admin')
const donor = require("./db/donor")
const Donor = require("./db/donor");
app.post("/donorRegister", async (req, resp) => {
   let donor = new Donor(req.body);
   let result = await donor.save();
   result = result.toObject();
   delete result.password
   jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
         resp.send({ result: "something went wrong, Please try after sometimes" })
      }
      resp.send({ result, auth: token });
   })
});

app.get("/donorlist",
   verifyToken,
   authorizeRole("admin"),
   async (req, resp) => { // async function cause it returns promise

      let result = await Donor.find();// to save data in db // save k time par select("-password")
      if (result.length > 0) {
         resp.send(result)
      } else {
         resp.send({ result: "No Products found" })
      }
   })
   

const users1 = require('./db/users')
app.post("/login", async (req, resp) => {
   if (!req.body) {
      resp.send("No data received");
   }
   const { email, password } = req.body;
   if (!email || !password) {
      return resp.send({ result: "Email and password required" })
   }
   try {
      const user = await users1.findOne({ email });
      if (!user) {
         return resp.send({ result: "User not found" });
      }
      if (user.password !== password) {
         return resp.send({ result: "Wrong Password" });
      }
      const token = jwt.sign(
         { id: user._id },
         jwtkey,
         { expiresIn: "2h" }
      );
      console.log(token);
      resp.send({ auth: token });
   }
   catch (error) {
      resp.send({ result: "Something went wrong" });
      resp.send(error)
   }
})

app.get("/profile", async (req, resp) => {

   const authHeader = req.headers.authorization;
   if (!authHeader) {
      return resp.status(401).json({ message: "No token" });
   }
   if (!authHeader.startsWith("Bearer ")) {
      return resp.status(401).json({ message: "Invalid token format" });
   }
   const token = authHeader.split(" ")[1];

   try {
      const decoded = jwt.verify(token, jwtkey);

      console.log("Decoded:", decoded);

      // 🔥 FETCH USER FROM DB
      const userData = await users1.findById(decoded.id).select("-password");

      if (!userData) {
         return resp.status(404).json({ message: "User not found" });
      }

      // 🔥 SEND USER DATA
      resp.status(200).json(userData);

   } catch (err) {
      console.log("JWT ERROR:", err.message);
      resp.status(401).json({ message: err.message });
   }

});


app.post("/updateProfile", async (req, resp) => {
   let Data = new users1(req.body);
   let updatedData = await Data.save();
   let updatedData1 = updatedData.toObject();
   console.log(updatedData1)
   if (updatedData1) {
      resp.send(updatedData1);
   } else {
      resp.send("Update Failed!");
   }
})

//-------------------------------------admin----------------------------

app.post("/adminlogin", async (req, resp) => {
   if (!req.body) {
      return resp.send({ result: "login credentials required!" });
   }

   const { email, password } = req.body;

   if (!email || !password) {
      return resp.send({ result: "Email and password are required!" })
   }
   try {

      const user = await admin.findOne({ email });
      if (!user) {
         return resp.send({ result: "User not found" });
      }
      if (user.password !== password) {
         return resp.send({ result: "Wrong Password" });
      }
      const token = jwt.sign(
         { id: user._id, role: user.role },
         jwtkey,
         { expiresIn: "2h" }
      );
      resp.send({ auth: token });
      console.log(token);

   } catch (error) {
      return resp.send({ result: "something went wrong!" });
      resp.send(error);
   }
})
//---------------------------------------------------------------------------------

const Inven = require('./db/Invent')
app.post("/addInventory", async (req, resp) => {
   let inven = new Inven(req.body);
   let result = await inven.save();
   result = result.toObject();
   delete result.password           

   // jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
   //    if (err) {
   //       resp.send({ result: "something went wrong, Please try after sometimes" })
   //    }
   //    resp.send({ result, auth: token });
   // })
});


app.get("/bloodRecord", 
    verifyToken,
   authorizeRole("admin"),
   async (req, resp) => { 

   let result = await Inven.find();
   if (result.length > 0) {
      resp.send(result)
   } else {
      resp.send({ result: "No Products found" })
   }
})

const bs = require('./db/BloodStoke')

app.post("/bloodstock",
    verifyToken,
   authorizeRole("admin"),
   async (req, resp) => { 
   let result = await bs.updateOne(
      {},
      req.body
   )
   resp.send(result)
});

app.get("/bloodstock", 
    verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {
   let result = await bs.find();
   if (result.length > 0) {
      resp.send(result);
   } else {
      resp.send("No result found")
   }
})

app.get("/donorlist/:id",
    verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {
   let don = await Donor.findOne({ _id: req.params.id });
   if (don) {
      resp.send(don);
   } else {
      resp.send("no result found");
   }
})

const Reqs = require('./db/request')
app.post("/request",
    verifyToken,
   authorizeRole("user"),
   async (req, resp) => {
   let reqs = new Reqs(req.body);
   let reqst = await reqs.save();
   reqst = reqst.toObject();
   if (reqst) {
      resp.send(reqs);
   } else {
      resp.send("no result found");
   }
})
app.get("/request/:id",
    verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {

   let reqst = await Reqs.findOne({ _id: req.params.id });

   if (reqst) {
      resp.send(reqst);
   } else {
      resp.send("no result found");
   }
})


app.get("/request", 
    verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {
   let reqst = await Reqs.find();
   if (reqst) {
      resp.send(reqst);
   }
   else {
      resp.send("no result found");
   }
})
const hosp = require("./db/hospitals")
app.post("/addhospital", 
    verifyToken,
   authorizeRole("admin"),
   async (req, resp) => {
   let hospt = new hosp(req.body);
   let newhospt = await hospt.save();
   newhospt = newhospt.toObject();
   if (hospt) {
      resp.send(newhospt);
   } else {
      resp.send("no result found")
   }
})

app.get("/hospitals",
    verifyToken,
   authorizeRole("admin"), async (req, resp) => {
   let gethosp = await hosp.find();
   if (gethosp) {
      resp.send(gethosp);
   } else {
      resp.send("no result found")
   }
})


app.listen(50333)