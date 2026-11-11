import React, { useEffect, useState } from "react";
import "./DR.css";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("hname");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getHospitals();
  }, []);

  useEffect(() => {
    filterHospitals();
  }, [search, filterBy, hospitals]);

  const getHospitals = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const res = await fetch("http://localhost:50334/hospitals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unable to fetch hospitals");
      }

      const result = await res.json();

      setHospitals(result);
      setFilteredHospitals(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterHospitals = () => {
    const filtered = hospitals.filter((item) => {
      const value = item[filterBy];

      return value
        ?.toString()
        .toLowerCase()
        .includes(search.toLowerCase());
    });

    setFilteredHospitals(filtered);
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading Hospitals...</h3>;
  }

  if (error) {
    return (
      <h3 style={{ textAlign: "center", color: "red" }}>
        {error}
      </h3>
    );
  }

  return (
    <div className="list">
      <table className="t1">
        <thead>
          <tr>
            <td colSpan={5}>
              <div className="srch">
                <input
                  className="search"
                  type="text"
                  placeholder={`Search by ${filterBy}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </td>

            <td colSpan={5}>
              <div className="srch2">
                <select
                  className="fltr"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="hname">Hospital Name</option>
                  <option value="licenseId">License ID</option>
                  <option value="city">City</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </td>
          </tr>

          <tr>
            <th>Hospital Name</th>
            <th>License ID</th>
            <th>Address</th>
            <th>City</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Emergency Contact</th>
            <th>Available Units</th>
            <th>Total Requests</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((item, index) => (
              <tr key={item._id || index}>
                <td>{item.hname}</td>
                <td>{item.licenseId}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.emergencyContact}</td>
                <td>{item.availableUnits}</td>
                <td>{item.totalRequests}</td>

                <td>
                  <span
                    className={
                      item.status?.toLowerCase() === "active"
                        ? "active-status"
                        : "inactive-status"
                    }
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No Hospitals Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Hospitals;