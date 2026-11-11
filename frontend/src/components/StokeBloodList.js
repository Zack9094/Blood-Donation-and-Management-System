import React, { useEffect, useState } from "react";
import "./DR.css";

const StokeBloodList = () => {

  const initialStock = {
    "A+": 0,
    "A-": 0,
    "B+": 0,
    "B-": 0,
    "O+": 0,
    "O-": 0,
    "AB+": 0,
    "AB-": 0,
  };

  const [bloodCount, setBloodCount] = useState(initialStock);

  useEffect(() => {
    getBloodStock();
  }, []);

  const getBloodStock = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:50333/bloodRecord",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to fetch blood records");
      }

      const records = await response.json();

      const count = { ...initialStock };

      records.forEach((item) => {
        const qty = Number(item.Qty) || 0;

        if (item.inventoryType === "in") {
          count[item.bloodGrp] += qty;
        } 
        else if (item.inventoryType === "out") {
          count[item.bloodGrp] -= qty;
        }
      });

      // Prevent negative stock
      Object.keys(count).forEach((group) => {
        if (count[group] < 0) {
          count[group] = 0;
        }
      });

      setBloodCount(count);

      // Optional: Save current stock in database
      await updateBloodStock(count);

    } catch (error) {
      console.error("Error:", error);
    }
  };


  const updateBloodStock = async (stock) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:50334/bloodstock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(stock),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blood stock");
      }

    } catch (error) {
      console.error(error);
    }
  };


  const getStatus = (qty) => {
    if (qty > 15) return "In Stock";
    if (qty >= 5) return "Low Stock";
    return "Very Low";
  };


  return (
    <div>
      <table className="tbl2">
        <thead>
          <tr>
            <th className="t2">Blood Group</th>
            <th className="t2">Available Units</th>
            <th className="t2">Status</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(bloodCount).map(([group, qty]) => (
            <tr key={group}>
              <td className="t2">{group}</td>
              <td className="t2">{qty}</td>
              <td className="t3">{getStatus(qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StokeBloodList;