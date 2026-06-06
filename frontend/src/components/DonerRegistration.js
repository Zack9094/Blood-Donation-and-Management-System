import react, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './DR.css'
const DonorRegister = () => {
  const [name, setName] = useState("");
  const [addrs, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gen, setGen] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [mname, setMName] = useState("");
  const [bloodGrp, setBloodGrp] = useState("");
  const [city, setCity] = useState("");
  const [mobno, setMobNo] = useState("");
  const [anyDisease, setAnyDisease] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate('/donorregistration');
    }
  }, [navigate])


  const collectData = async () => {
    try {
      console.log(name, addrs, age, gen, email, fname, mname, bloodGrp, city, mobno, anyDisease, lastDonationDate);


      const today = new Date();
      const lastDonation = new Date(lastDonationDate);

      const diffMonths = (today - lastDonation) / (1000 * 60 * 60 * 24 * 30);

      if (diffMonths < 3) {
        alert("Donor not eligible yet");
      }




      const response = await fetch("http://localhost:50333/donorRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, addrs, age, gen, email, fname, mname, bloodGrp, city, mobno, anyDisease, lastDonationDate }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();
      console.log(result);

      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Check backend & console.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div class="container">
          <h2>Donor's Registration Form</h2>


          <form action='#' method="post">
            <div className='d1'>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Enter Address</label>
              <textarea
                type="textarea"
                placeholder="Enter Full Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <label>Enter Age</label>
              <input
                type="text"
                placeholder="Enter Age"
                onChange={(e) => setAge(e.target.value)}
                min={18}
                max={65}
                required
              />
              <label>Select gender</label>
              <select name="gender" onChange={(e) => setGen(e.target.value)} required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>others</option>
              </select>

              <label>Enter City</label>
              <input
                type="text"
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <hr></hr><br></br>
              <button className='smtbtn' type="submit" value="submit" onClick={collectData}
              >Submit</button>
            </div>


            <div className='d2'>
              <label>Enter Father's Name</label>
              <input
                type="text"
                placeholder="Enter Father's Name"
                onChange={(e) => setFName(e.target.value)}
              />
              <label>Enter Mother's Name</label>
              <input
                type="text"
                placeholder="Enter Mother's Name"
                onChange={(e) => setMName(e.target.value)}
              />
              <label>Select Blood Group</label>
              <select name="blood_group" onChange={(e) => setBloodGrp(e.target.value)} required>
                <option value=""  >Select</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
              <label>Enter E-Mail</label>
              <input
                type="email"
                placeholder="Enter E-Mail"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Enter Mobile No</label>
              <input
                type="tel"
                pattern='[0-9]{10}'
                maxLength={10}
                placeholder="Enter Mobile No"
                onChange={(e) => setMobNo(e.target.value)}
                required
              />

              <label>Disease_If_Any</label>
              <input
                type="text"
                placeholder=""
                onChange={(e) => setAnyDisease(e.target.value)}
                required
              />

              <label>Last_Donation_Date</label>
              <input
                type="date"
                placeholder=""
                onChange={(e) => setLastDonationDate(e.target.value)}

              />


            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorRegister;


