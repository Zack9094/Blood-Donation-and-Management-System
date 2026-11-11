import React, { useState } from "react";
import "./addhosp.css";

const AddHospital = ({ setShowForm, setShowdiv2 }) => {
    const [hname, setHname] = useState("");
    const [licenseId, setLicenseId] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [totalRequests, setTotalRequests] = useState("");
    const [availableUnits, setAvailableUnits] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");

    const clearForm = () => {
        setHname("");
        setLicenseId("");
        setAddress("");
        setCity("");
        setTotalRequests("");
        setAvailableUnits("");
        setEmergencyContact("");
        setEmail("");
        setPhone("");
        setStatus("");
    };

    const closeForm = () => {
        clearForm();
        setShowForm(false);
        setShowdiv2(true);
    };

    const collectData = async (e) => {
        e.preventDefault();

        try {
            const token = JSON.parse(localStorage.getItem("token"));

            const response = await fetch(
                "http://localhost:50334/addhospital",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        hname,
                        licenseId,
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

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to add hospital");
            }

            alert("Hospital added successfully!");

            clearForm();

        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="form-container1">
            <div className="form-card1">

                <div
                    className="container2"
                    style={{
                        animation: "floatUpDown 2s ease-in-out infinite"
                    }}
                >

                    <form onSubmit={collectData}>

                        <h2>Manage Hospital Records</h2>

                        <hr />

                        <div className="d1">

                            <label>Hospital Name</label>
                            <input
                                value={hname}
                                onChange={(e) =>
                                    setHname(e.target.value)
                                }
                                required
                            />

                            <label>License ID</label>
                            <input
                                type="text"
                                value={licenseId}
                                onChange={(e) =>
                                    setLicenseId(e.target.value)
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

                                <label>Phone</label>
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

                                <label>Total Requests</label>
                                <input
                                    type="number"
                                    value={totalRequests}
                                    onChange={(e) =>
                                        setTotalRequests(e.target.value)
                                    }
                                    required
                                />

                                <label>Available Units</label>
                                <input
                                    type="number"
                                    value={availableUnits}
                                    onChange={(e) =>
                                        setAvailableUnits(e.target.value)
                                    }
                                    required
                                />

                                <label>Status</label>
                                <select
                                    className="select"
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Select Status
                                    </option>
                                    <option value="Active">
                                        Active
                                    </option>
                                    <option value="Inactive">
                                        Inactive
                                    </option>
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

                                <div className="btns">

                                    <button
                                        type="button"
                                        onClick={clearForm}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                    >
                                        Submit
                                    </button>


                                    <button
                                        type="button"
                                        onClick={closeForm}
                                    >
                                        Close
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

export default AddHospital;