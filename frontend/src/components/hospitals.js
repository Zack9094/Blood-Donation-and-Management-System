import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DR.css';

const Hospitals = () => {

  const [hosp, setHosp] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getHosp();
  }, []);

  const getHosp = async () => {
    try {
      const token=localStorage.getItem("token");
      const res = await fetch("http://localhost:50333/hospitals", {
        
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Server Error");
      }

      const result = await res.json();
      setHosp(result);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='list' >
      
      <table className='t1'>
        <thead>
          <tr>
            <td colSpan={5}>
              <div className='srch'>
                <input 
                  className='search'
                  type="text"
                  placeholder='Search by hospital name'
                />
                <button className='searchbtn'>OK</button>
              </div>
            </td>

            <td colSpan={5}>
              <div className='srch2'>
                <select className='fltr'>
                  <option selected>+ Add Filter</option>  
                  <option>License ID</option>
                  <option>City</option>
                  <option>Status</option>
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
          {hosp.length > 0 ? (
            hosp.map((item, idx) => (
              <tr key={item._id || idx}>
                <td>{item.hname}</td>
                <td>{item.licenseId}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.emergencyContact}</td>
                <td>{item.availableUnits}</td>
                <td>{item.totalRequests}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No Result Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default Hospitals;