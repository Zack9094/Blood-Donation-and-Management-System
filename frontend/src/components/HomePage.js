import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faHospitalUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

import "./SignUp.css";

import IN from "./Inventory";
import BR from "./BloodRecord";
import RI from "./donorInfo";
import HS from "./hospitals";
import AHS from "./AddHospitals";

const Homepage = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [showHospitalForm, setShowHospitalForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="homepage">

      {/* Left Sidebar */}
      <div className="left">

        <div
          className="left-div"
          onClick={() => {
            setActiveSection(1);
            setShowInventoryForm(false);
          }}
        >
          <h2>
            <FontAwesomeIcon icon={faWarehouse} />
            {" "}Inventory
          </h2>
        </div>

        <div
          className="left-div"
          onClick={() => setActiveSection(2)}
        >
          <h2>
            <FontAwesomeIcon icon={faHospitalUser} />
            {" "}Donors
          </h2>
        </div>

        <div
          className="left-div"
          onClick={() => {
            setActiveSection(3);
            setShowHospitalForm(false);
          }}
        >
          <h2>
            <FontAwesomeIcon icon={faHospital} />
            {" "}Hospitals
          </h2>
        </div>

      </div>

      {/* Right Content */}
      <div className="right">

        {/* Inventory */}
        {activeSection === 1 && (
          <div>

            <div
              className="inv"
              onClick={() => setShowInventoryForm(true)}
            >
              <FontAwesomeIcon icon={faWarehouse} />
              {" "}+ Inventory
            </div>

            {showInventoryForm ? (
              <IN
                setShowForm={setShowInventoryForm}
              />
            ) : (
              <div className="indiv">
                <BR />
              </div>
            )}

          </div>
        )}

        {/* Donors */}
        {activeSection === 2 && (
          <div>
            <div className="inv">
              <FontAwesomeIcon icon={faHospitalUser} />
              {" "}Donor Information
            </div>

            <div className="indiv">
              <RI />
            </div>
          </div>
        )}

        {/* Hospitals */}
        {activeSection === 3 && (
          <div>

            <div
              className="inv"
              onClick={() => setShowHospitalForm(true)}
            >
              <FontAwesomeIcon icon={faHospital} />
              {" "}+ Add Hospital
            </div>

            {showHospitalForm ? (
              <div className="indiv">
                <div
                  className="close"
                  onClick={() => setShowHospitalForm(false)}
                >
                  ✖
                </div>

                <AHS />
              </div>
            ) : (
              <div className="indiv">
                <HS />
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default Homepage;