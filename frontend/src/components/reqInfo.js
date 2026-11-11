import React, { useEffect, useState } from "react";
import "./ReqInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const ReqInfo = ({ id }) => {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (id) {
      getRequest();
    }
  }, [id]);

  const getRequest = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:50334/request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch request");
      }

      const result = await res.json();
      setRequest(result);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!request) {
    return <div className="loading">Loading request information...</div>;
  }

  return (
    <div className="D1">

      {/* LEFT PROFILE */}
      <div className="d1">

        <div className="profile-icon">
          <FontAwesomeIcon 
            icon={faUser} 
            size="8x" 
            style={{ color: "#c2858e" }}
          />
        </div>

        <div className="d11">
          <ul>
            <li>Name: {request.name}</li>
            <hr />

            <li>Gender: {request.gen}</li>
            <hr />

            <li>Age: {request.age}</li>
            <hr />

            <li>Blood Group: {request.bloodGrp}</li>
            <hr />

            <li>Units Required: {request.unitReq}</li>
          </ul>
        </div>


        <div className="d12">

          <div>
            <FontAwesomeIcon 
              icon={faPhone}
              style={{ color: "#f1a7b3" }}
            />
            {" +91 "}
            {request.mobno}
          </div>


          <div>
            <FontAwesomeIcon 
              icon={faEnvelope}
              style={{ color: "#f1a7b3" }}
            />
            {" "}
            {request.email}
          </div>

        </div>

      </div>


      {/* RIGHT DETAILS */}
      <div className="D2">

        <div className="header">
          <b>Blood Request Profile</b>
          <br />
          Review & Approval
        </div>


        <ul className="reqDetails">

          <div className="main">
            Request Details
          </div>

          <li>Patient Name: {request.name}</li>
          <hr />

          <li>Hospital: {request.HospitalName}</li>
          <hr />

          <li>Doctor: {request.DoctorName}</li>
          <hr />

          <li>Reason: {request.Reason}</li>
          <hr />

          <li>
            Required Date:
            {" "}
            {request.reqDate}
          </li>
          <hr />

          <li>
            Required Time:
            {" "}
            {request.reqTime}
          </li>

        </ul>


        <div className="D3">

          <button className="approve">
            ✔ Approve Request
          </button>


          <button className="reject">
            ✖ Reject Request
          </button>

        </div>

      </div>

    </div>
  );
};

export default ReqInfo;