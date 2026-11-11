import React, { useEffect, useState } from "react";
import "./DR.css";

const BloodRecord = () => {
  const [bloodRecord, setBloodRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBloodRecord();
  }, []);

  const getBloodRecord = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized. Please login first.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:50334/bloodRecord", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Unable to fetch blood records");
      }

      setBloodRecord(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  if (error) {
    return <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>;
  }

  return (
    <div className="list">
      <table className="tbl3">
        <thead>
          <tr>
            <th className="t2">S_No</th>
            <th className="t2">Blood Type</th>
            <th className="t2">Inventory</th>
            <th className="t2">Quantity</th>
            <th className="t2">Donor Email ID</th>
            <th className="t2">Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {bloodRecord.length > 0 ? (
            bloodRecord.map((item, idx) => (
              <tr key={item._id || idx}>
                <td className="t2">{idx + 1}</td>
                <td className="t2">{item.bloodGrp}</td>
                <td className="t2">{item.inventoryType}</td>
                <td className="t2">{item.Qty}</td>
                <td className="t2">{item.email}</td>
                <td className="t2">{formatDate(item.donation_date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="t2" colSpan="6" style={{ textAlign: "center" }}>
                No Blood Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BloodRecord;