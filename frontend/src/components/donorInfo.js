import React, { useEffect, useState } from "react";
import "./DR.css";
import DP from "./reqInfo";

const DonorInfo = () => {
  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);

  const [activeTab, setActiveTab] = useState("requests");
  const [selectedId, setSelectedId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const fetchData = async (url, setter) => {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();
      setter(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const getData = async () => {
    setLoading(true);

    await Promise.all([
      fetchData("http://localhost:50334/request", setRequests),
      fetchData("http://localhost:50334/donorlist", setDonations),
    ]);

    setLoading(false);
  };

  const openProfile = (id) => {
    setSelectedId(id);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setSelectedId(null);
    setShowProfile(false);
  };

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  if (error) {
    return (
      <h3 style={{ textAlign: "center", color: "red" }}>
        {error}
      </h3>
    );
  }

  const data = activeTab === "requests" ? requests : donations;

  return (
    <>
      {showProfile && (
        <div className="overlay">
          <div className="closeBtn" onClick={closeProfile}>
            ✖
          </div>

          <DP id={selectedId} />
        </div>
      )}

      <div className="mdiv">
        {/* Header */}
        <div className="hed">
          <div
            id="reqdon"
            onClick={() => setActiveTab("requests")}
          >
            Requests ({requests.length})
          </div>

          <div
            id="reqdon"
            onClick={() => setActiveTab("donations")}
          >
            Donations ({donations.length})
          </div>
        </div>

        {/* Cards */}
        <div className="inndiv">
          {data.length > 0 ? (
            data.map((item) => (
              <div className="requests" key={item._id}>
                <div className="img">
                  <div className="blood-icon-20">
                    <span>{item.bloodGrp}</span>
                  </div>

                  <p className="unit">
                    {activeTab === "requests"
                      ? `${item.unitReq} Units`
                      : "1 Unit"}
                  </p>
                </div>

                <div className="info">
                  <p id="h">{item.name}</p>

                  <p>
                    {activeTab === "requests"
                      ? formatDate(item.reqDate)
                      : "Successfully Donated"}
                  </p>

                  <p>📍 {item.addrs}</p>

                  {activeTab === "donations" && (
                    <p style={{ color: "green" }}>
                      ✔ Donation Completed
                    </p>
                  )}
                </div>

                <div className="view">
                  <div onClick={() => openProfile(item._id)}>
                    View
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>No Records Found</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default DonorInfo;