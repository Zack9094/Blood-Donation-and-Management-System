
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './addhosp.css'
const AddHospita = ({ setShowForm, setShowdiv2 }) => {
    const [hname, setHname] = useState("");
    const [licenceId, setLicenceId] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [totalRequests, setTotalRequests] = useState("");
    const [availableUnits, setAvailableUnits] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    // ---------------- CANCEL ----------------
    const cancelData = () => {
        setHname(""); setEmail("");
        setAddress(""); setEmergencyContact("");
        setCity(""); setTotalRequests("");
        setLicenceId(""); setStatus("");
        setAvailableUnits(""); setPhone("");


    };
    //-----------------CLOSE---------------------------------------------
    const close = () => {
        setHname(""); setEmail("");
        setAddress(""); setEmergencyContact("");
        setCity(""); setTotalRequests("");
        setLicenceId(""); setStatus("");
        setAvailableUnits(""); setPhone("");
        setShowForm(false);
        setShowdiv2(true);
    }
    // ---------------- FETCH STOCK ----------------
    //   const stock = async () => {
    //     try {
    //       const res = await fetch("http://localhost:50333/bloodstock", {
    //         method: "GET",
    //         headers: {
    //           authorization: JSON.parse(localStorage.getItem("token")),
    //         },
    //       });

    //       const data = await res.json();
    //       setItem(data);
    //     } catch (err) {
    //       console.error("Stock fetch error:", err);
    //     }
    //   };

    // ---------------- CHECK INPUT ----------------
    //   const checkInput = (value) => {
    //     if (item.length > 0 && bloodGrp) {
    //       const available = item[0][bloodGrp];

    //       if (value > available) {
    //         alert(`Only ${available} ml available`);
    //         setQty("");
    //       }
    //     }
    //   };

    // ---------------- SUBMIT ----------------
    const collectData = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:50333/addHospitals",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        hname,
                        licenceId,
                        address,
                        city,
                        totalRequests,
                        availableUnits,
                        emergencyContact,
                        email,
                        phone,
                        status,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Server error");
            }

            const result = await response.json();

            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));

            cancelData();
        } catch (error) {
            console.error("Error:", error);
            alert("Operation failed. Check backend.");
        }
    };

    return (
        <div className="form-container1">
            <div className="form-card1">
                <div className="container2" style={{animation: "floatUpDown 2s ease-in-out infinite"}}>
                    <form onSubmit={collectData}>

                        <div>Manage Hospital Records</div>

                        <hr />

                        {/* ---------------- IN FORM ---------------- */}


                        <div className="d1">
                            <label>Hospital Name</label>
                            <input
                                value={hname}
                                onChange={(e) =>
                                    setHname(e.target.value)
                                }
                                required
                            />
                            <label>Licence ID</label>
                            <input
                                type="text"
                                value={licenceId}
                                onChange={(e) =>
                                    setLicenceId(e.target.value)
                                }
                                required
                            />

                            <div className="d4">
                                <label>Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(e.target.value)
                                    }
                                    required
                                />

                                <label>City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) =>
                                        setCity(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="d2">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                                <label>phone</label>
                                <input
                                    type="number"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="d3">
                                //  <label>Available Units</label>
                                <input
                                    type="number"
                                    value={availableUnits}
                                    onChange={(e) =>
                                        setAvailableUnits(e.target.value)
                                    }
                                    required
                                />


                                <select className='select' value={status} onChange={(e) => setStatus(e.target.value)} required>
                                    <option value="">Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>


                            </div>
                            <div className="d5">
                                <label>Emergency Contact</label>
                                <input
                                    type="number"
                                    value={emergencyContact}
                                    onChange={(e) =>
                                        setEmergencyContact(e.target.value)
                                    }
                                    required
                                />
                                {/*---------------------------------------buttons-------------- */}

                                <div className="btns">

                                    <button
                                        type="button"
                                        onClick={cancelData}
                                    >
                                        Cancel
                                    </button>

                                    <button type="submit">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddHospita;
