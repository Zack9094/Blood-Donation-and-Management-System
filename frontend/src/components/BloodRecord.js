import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DR.css'
const BloodRecord = () => {

    const [bloodRecord, setBloodRecord] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBloodRecord();
    }, []);

    const getBloodRecord = async () => {
        try {const token=localStorage.getItem("token");
            const res = await fetch("http://localhost:50333/bloodRecord", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Server Error");
            }

            const result = await res.json();
            setBloodRecord(result);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='list'>
            <table className='tbl3'>
                <thead>
                    <tr>
                        <th className='t2'>S_No</th>
                        <th className='t2'>Blood_Type</th>
                        <th className='t2'>Inventory</th>
                        <th className='t2'>Qty</th>
                        <th className='t2'>Donor's email_id</th>
                        <th className='t2'>Date & Time</th>
                    </tr>
                </thead>

                <tbody>
                    {bloodRecord.length > 0 ? (
                        bloodRecord.map((item, idx) => (
                            <tr key={item._id || idx}>
                                <td className='t2'>{idx + 1}</td>
                                <td className='t2'>{item.bloodGrp}</td>
                                <td className='t2'>{item.inventoryType}</td>
                                <td className='t2'>{item.Qty}</td>
                                <td className='t2'>{item.email}</td>
                                <td className='t2'>
                                    {new Date(item.donation_date).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })}
                                </td>
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

export default BloodRecord;