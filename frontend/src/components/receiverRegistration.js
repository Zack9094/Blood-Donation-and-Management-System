import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./receiver.css";

const ReceiverRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGrp: "",
    hospitalName: "",
    doctorName: "",
    unitReq: "",
    reason: "",
    reqDate: "",
    reqTime: "",
    requester: "",
    mobno: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const collectData = async (e) => {
    e.preventDefault();

    if (form.age <= 0) {
      alert("Enter a valid age");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobno)) {
      alert("Mobile number must contain exactly 10 digits");
      return;
    }

    if (form.unitReq <= 0) {
      alert("Blood units must be greater than zero");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:50334/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Request submission failed");
      }

      alert("🩸 Blood request submitted successfully");
      navigate("/user");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <div className="div">

        <h1>🩸 Blood Request Form</h1>

        <form onSubmit={collectData}>

          <div className="section-title">
            Patient Information
          </div>


          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            min="1"
            value={form.age}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>


          <select
            name="bloodGrp"
            value={form.bloodGrp}
            onChange={handleChange}
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
            name="hospitalName"
            placeholder="Hospital Name"
            value={form.hospitalName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="doctorName"
            placeholder="Doctor Name"
            value={form.doctorName}
            onChange={handleChange}
            required
          />


          <div className="section-title">
            Blood Requirement Details
          </div>


          <input
            type="number"
            name="unitReq"
            placeholder="Units Required"
            min="1"
            value={form.unitReq}
            onChange={handleChange}
            required
          />

          <textarea
            name="reason"
            placeholder="Reason for Transfusion"
            value={form.reason}
            onChange={handleChange}
            required
          />


          <input
            type="date"
            name="reqDate"
            value={form.reqDate}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="reqTime"
            value={form.reqTime}
            onChange={handleChange}
            required
          />


          <div className="section-title">
            Requester Details
          </div>


          <input
            type="text"
            name="requester"
            placeholder="Requester Name"
            value={form.requester}
            onChange={handleChange}
            required
          />


          <input
            type="tel"
            name="mobno"
            placeholder="10 Digit Mobile Number"
            maxLength="10"
            value={form.mobno}
            onChange={handleChange}
            required
          />


          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />


          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ReceiverRegistration;