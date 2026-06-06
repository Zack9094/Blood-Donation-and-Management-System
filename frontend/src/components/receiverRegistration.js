import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./receiver.css";

const ReceiverRegistration = () => {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gen, setGen] = useState("");
  const [bloodGrp, setBloodGrp] = useState("");
  const [HospitalName, setHospital] = useState("");
  const [DoctorName, setDoctor] = useState("");
  const [unitReq, setUnits] = useState("");
  const [Reason, setReason] = useState("");
  const [reqDate, setReqDate] = useState("");
  const [reqTime, setReqTime] = useState("");
  const [requester, setRequester] = useState("");
  const [mobno, setMobNo] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault(); // prevent reload

    if (mobno.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    try {
      const response = await fetch("http://localhost:50333/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          gen,
          bloodGrp,
          HospitalName,
          DoctorName,
          unitReq,
          Reason,
          reqDate,
          reqTime,
          requester,
          mobno,
          email
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Request Submitted Successfully");
        navigate("/");
      } else {
        alert("Server error");
      }

    } catch (error) {
      console.error(error);
      alert("Backend not connected");
    }
  };

  return (

    <div className="container">
        <div className="div">
      <h1>🩸 Blood Request Form</h1>

      <form onSubmit={collectData}>

        <div className="section-title">Patient Information</div>

        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <select value={gen} onChange={(e) => setGen(e.target.value)} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select
          value={bloodGrp}
          onChange={(e) => setBloodGrp(e.target.value)}
          required
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <input
          type="text"
          placeholder="Hospital Name"
          value={HospitalName}
          onChange={(e) => setHospital(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Doctor Name"
          value={DoctorName}
          onChange={(e) => setDoctor(e.target.value)}
          required
        />

        <div className="section-title">Blood Requirement Details</div>

        <input
          type="number"
          placeholder="Units Required"
          value={unitReq}
          onChange={(e) => setUnits(e.target.value)}
          required
        />

        <textarea
          placeholder="Reason for Transfusion"
          value={Reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>

        <input
          type="date"
          value={reqDate}
          onChange={(e) => setReqDate(e.target.value)}
          required
        />

        <input
          type="time"
          value={reqTime}
          onChange={(e) => setReqTime(e.target.value)}
          required
        />

        <div className="section-title">Requester Details</div>

        <input
          type="text"
          placeholder="Requester Name"
          value={requester}
          onChange={(e) => setRequester(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="10 Digit Mobile"
          value={mobno}
          onChange={(e) => setMobNo(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          Submit Request
        </button>

      </form>
      </div>
    </div>
  );
};

export default ReceiverRegistration;