import React, { useEffect, useState } from "react";
import "./DonorProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHospital,
  faPhone,
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const DonorProfile = () => {
  const [donor, setDonor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDonor();
  }, []);

  const getDonor = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const res = await fetch(
        "http://localhost:50334/donorlist/698ba6f50b19f4d31734646c",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unable to fetch donor profile");
      }

      const result = await res.json();
      setDonor(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="center">Loading Profile...</h2>;
  }

  if (error) {
    return <h2 className="center">{error}</h2>;
  }

  return (
    <div className="D1">
      {/* Profile Icon */}
      <div className="profile-icon">
        <FontAwesomeIcon
          icon={faUser}
          size="9x"
          style={{ color: "#c2858e" }}
        />
      </div>

      {/* Basic Details */}
      <center>
        <div className="donor">
          <h2 className="name">{donor.name}</h2>
          <p>Age: {donor.age}</p>
          <p>Blood Type: {donor.bloodGrp}</p>
        </div>

        <hr />
      </center>

      {/* Additional Details */}
      <div className="D2">
        <div className="d1">
          <p>
            <FontAwesomeIcon
              icon={faHospital}
              style={{ color: "#f1a7b3" }}
            />
            {" "}Hospital: St. John's Medical Center
          </p>

          <hr />

          <p>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ color: "#f1a7b3" }}
            />
            {" "}Location: {donor.addrs}
          </p>

          <hr />

          <p>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#f1a7b3" }}
            />
            {" "}Last Donation Date:{" "}
            {donor.lastDonationDate
              ? new Date(donor.lastDonationDate).toLocaleDateString("en-IN")
              : "Not Available"}
          </p>

          <hr />

          <p>
            <FontAwesomeIcon
              icon={faPhone}
              style={{ color: "#f1a7b3" }}
            />
            {" "}Contact: +91 {donor.mobno}
          </p>
        </div>

        <div className="d2">
          {/* Future section: blood history, requests, etc. */}
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;