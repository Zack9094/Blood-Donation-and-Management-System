import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DR.css";

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

  const collectData = async (e) => {
    e.preventDefault();

    try {
      // Age validation
      if (age < 18 || age > 65) {
        alert("Age must be between 18 and 65 years.");
        return;
      }

      // Last donation validation
      if (lastDonationDate) {
        const today = new Date();
        const lastDonation = new Date(lastDonationDate);

        const diffMonths =
          (today - lastDonation) / (1000 * 60 * 60 * 24 * 30);

        if (diffMonths < 3) {
          alert(
            "Donor is not eligible. Minimum 3 months gap is required after the last donation."
          );
          return;
        }
      }

      const response = await fetch(
        "http://localhost:50334/donorRegister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            addrs,
            age,
            gen,
            email,
            fname,
            mname,
            bloodGrp,
            city,
            mobno,
            anyDisease,
            lastDonationDate,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // Store user and token
      localStorage.setItem("user", JSON.stringify(result.result));

      if (result.auth) {
        localStorage.setItem("token", result.auth);
      }

      alert("Donor registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="container">
          <h2>Donor Registration Form</h2>

          <form onSubmit={collectData}>
            <div className="d1">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Enter Address</label>
              <textarea
                placeholder="Enter Full Address"
                value={addrs}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <label>Enter Age</label>
              <input
                type="number"
                min="18"
                max="65"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />

              <label>Select Gender</label>
              <select
                value={gen}
                onChange={(e) => setGen(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>

              <label>Enter City</label>
              <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <hr />

              <button className="smtbtn" type="submit">
                Submit
              </button>
            </div>

            <div className="d2">
              <label>Father's Name</label>
              <input
                type="text"
                placeholder="Enter Father's Name"
                value={fname}
                onChange={(e) => setFName(e.target.value)}
              />

              <label>Mother's Name</label>
              <input
                type="text"
                placeholder="Enter Mother's Name"
                value={mname}
                onChange={(e) => setMName(e.target.value)}
              />

              <label>Select Blood Group</label>
              <select
                value={bloodGrp}
                onChange={(e) => setBloodGrp(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>

              <label>Enter E-Mail</label>
              <input
                type="email"
                placeholder="Enter E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Enter Mobile Number</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="Enter Mobile Number"
                value={mobno}
                onChange={(e) => setMobNo(e.target.value)}
                required
              />

              <label>Disease If Any</label>
              <input
                type="text"
                placeholder="Enter disease details or None"
                value={anyDisease}
                onChange={(e) => setAnyDisease(e.target.value)}
                required
              />

              <label>Last Donation Date</label>
              <input
                type="date"
                value={lastDonationDate}
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