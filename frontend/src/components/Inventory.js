import React, { useState } from "react";
import "./inv.css";

const Invent = ({ setShowForm, setShowdiv2 }) => {
  const [bloodGrp, setBloodGrp] = useState("");
  const [inventoryType, setInventoryType] = useState("in");
  const [qty, setQty] = useState("");
  const [email, setEmail] = useState("");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset form
  const resetForm = () => {
    setBloodGrp("");
    setQty("");
    setEmail("");
    setInventoryType("in");
    setStockData([]);
  };

  // Close form
  const closeForm = () => {
    resetForm();
    setShowForm(false);
    setShowdiv2(true);
  };

  // Get blood stock
  const getStock = async () => {
    if (stockData.length > 0) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:50334/bloodstock", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unable to fetch stock");
      }

      const result = await res.json();
      setStockData(result);
    } catch (err) {
      console.error(err);
      alert("Could not load blood stock");
    }
  };

  // Validate quantity for OUT inventory
  const checkQuantity = (value) => {
    if (stockData.length > 0 && bloodGrp) {
      const available = Number(stockData[0][bloodGrp]);

      if (Number(value) > available) {
        alert(`Only ${available} ml available`);
        setQty("");
        return;
      }
    }

    setQty(value);
  };

  // Submit inventory
  const collectData = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:50333/addInventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bloodGrp,
            inventoryType,
            Qty: qty,
            email,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Operation failed");
      }

      alert("Inventory updated successfully");
      resetForm();
      setShowForm(false);
      setShowdiv2(true);

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  return (
    <div className="form-container1">
      <div className="form-card1">
        <div className="container3">

          <form onSubmit={collectData}>
            <div className="div2">
              <h3>Manage Blood Record</h3>

              <div className="rdobtn">
                <label>
                  <input
                    type="radio"
                    value="in"
                    checked={inventoryType === "in"}
                    onChange={(e) =>
                      setInventoryType(e.target.value)
                    }
                  />
                  IN
                </label>

                <label>
                  <input
                    type="radio"
                    value="out"
                    checked={inventoryType === "out"}
                    onChange={(e) =>
                      setInventoryType(e.target.value)
                    }
                  />
                  OUT
                </label>

                <div className="close" onClick={closeForm}>
                  ✖
                </div>
              </div>
            </div>

            <hr />

            <div className="d11">

              <label>Blood Type</label>
              <select
                value={bloodGrp}
                onChange={(e) => setBloodGrp(e.target.value)}
                required
              >
                <option value="">Select</option>

                {bloodGroups.map((group) => (
                  <option key={group}>{group}</option>
                ))}
              </select>


              <label>Qty (ML)</label>
              <input
                type="number"
                min="1"
                value={qty}
                onFocus={
                  inventoryType === "out"
                    ? getStock
                    : undefined
                }
                onChange={(e) =>
                  inventoryType === "out"
                    ? checkQuantity(e.target.value)
                    : setQty(e.target.value)
                }
                required
              />


              <label>
                {inventoryType === "in"
                  ? "Donor Email"
                  : "Hospital Email"}
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />


              <div className="cs">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Invent;