import React, { useEffect, useState } from "react";
import "./DR.css";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDonors();
  }, []);

  useEffect(() => {
    const filtered = donors.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredDonors(filtered);
  }, [search, donors]);

  const getDonors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const res = await fetch("http://localhost:50334/donorlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unable to fetch donor records");
      }

      const result = await res.json();

      setDonors(result);
      setFilteredDonors(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading donors...</h3>;
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
            <td colSpan="6">
              <div className="srch">
                <input
                  className="search"
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="searchbtn">
                  Search
                </button>
              </div>
            </td>

            <td colSpan="4">
              <div className="srch2">
                <button className="fltr">
                  + Add Filter
                </button>
              </div>
            </td>
          </tr>

          <tr>
            <th>Donor Name</th>
            <th>Address</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
            <th>Father Name</th>
            <th>Mother Name</th>
            <th>Blood Group</th>
            <th>Email</th>
            <th>Mobile No</th>
          </tr>
        </thead>

        <tbody>
          {filteredDonors.length > 0 ? (
            filteredDonors.map((item, index) => (
              <tr key={item._id || index}>
                <td>{item.name}</td>
                <td>{item.addrs}</td>
                <td>{item.age}</td>
                <td>{item.gen}</td>
                <td>{item.city}</td>
                <td>{item.fname}</td>
                <td>{item.mname}</td>
                <td>{item.bloodGrp}</td>
                <td>{item.email}</td>
                <td>{item.mobno}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No Donors Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorList;