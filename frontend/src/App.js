import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Nav from "./components/Nav";
import ProtectedRoute from "./components/ProtectedRoute";

// Authentication
import SignUP from "./components/Sign_UP";
import Login from "./components/login";
import AdminLogin from "./components/AdminLogin";

// User/Admin Pages
import UR from "./components/user";
import HM from "./components/HomePage";

// Donor
import DR from "./components/DonerRegistration";
import DL from "./components/DonorList";
import DP from "./components/donorProfile";
import DI from "./components/donorInfo";

// Blood
import SBL from "./components/StokeBloodList";
import OSBL from "./components/OutStrokeBList";
//import EBL from "./components/ExchangeBList";
import BR from "./components/BloodRecord";
import Inv from "./components/Inventory";

// NGOs
//import NI from "./components/NgoInfo";
//import NL from "./components/NgoList";
import AN from "./components/AddNgo";

// Hospital
import HS from "./components/hospitals";
import AH from "./components/AddHospitals";

// Receiver
import RR from "./components/receiverRegistration";
import RI from "./components/reqInfo";


function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <div className="page-container">

          {/* Header */}
          <div id="header">
            <h2>Blood Bank Management System</h2>
          </div>

          <Nav />

          {/* Main Content */}
          <div className="content">
            <div id="body">

              <Routes>

                {/* Public Routes */}
                <Route path="/" element={
                  <div className="mainDiv">

                    <Link to="/signup">
                      <button className="user">
                        <h3>User</h3>
                      </button>
                    </Link>

                    <Link to="/admin">
                      <button className="admin">
                        <h3>Admin</h3>
                      </button>
                    </Link>

                    <Link to="/signup">
                      <button className="admin">
                        <h3>Hospital</h3>
                      </button>
                    </Link>

                    <Link to="/signup">
                      <button className="admin">
                        <h3>Organizations</h3>
                      </button>
                    </Link>

                  </div>
                } />

                <Route path="/signup" element={<SignUP />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminLogin />} />


                {/* Protected Routes */}

                <Route path="/user" element={
                  <ProtectedRoute>
                    <UR />
                  </ProtectedRoute>
                } />

                <Route path="/home" element={
                  <ProtectedRoute>
                    <HM />
                  </ProtectedRoute>
                } />


                <Route path="/donorregistration" element={
                  <ProtectedRoute>
                    <DR />
                  </ProtectedRoute>
                } />


                <Route path="/donorlist" element={
                  <ProtectedRoute>
                    <DL />
                  </ProtectedRoute>
                } />


                <Route path="/donorProfile" element={
                  <ProtectedRoute>
                    <DP />
                  </ProtectedRoute>
                } />


                <Route path="/donor/home/donorInfo" element={
                  <ProtectedRoute>
                    <DI />
                  </ProtectedRoute>
                } />


                <Route path="/stokebloodlist" element={
                  <ProtectedRoute>
                    <SBL />
                  </ProtectedRoute>
                } />


                <Route path="/outstrokebloodlist" element={
                  <ProtectedRoute>
                    <OSBL />
                  </ProtectedRoute>
                } />


                {/* <Route path="/exchangebloodlist" element={
                  <ProtectedRoute>
                    <EBL />
                  </ProtectedRoute>
                } /> */}


                <Route path="/bloodRecord" element={
                  <ProtectedRoute>
                    <BR />
                  </ProtectedRoute>
                } />


                <Route path="/inv" element={
                  <ProtectedRoute>
                    <Inv />
                  </ProtectedRoute>
                } />


                <Route path="/reqInfo" element={
                  <ProtectedRoute>
                    <RI />
                  </ProtectedRoute>
                } />


                <Route path="/receiverRegistration" element={
                  <ProtectedRoute>
                    <RR />
                  </ProtectedRoute>
                } />


                <Route path="/hospitals" element={
                  <ProtectedRoute>
                    <HS />
                  </ProtectedRoute>
                } />


                <Route path="/addhospitals" element={
                  <ProtectedRoute>
                    <AH />
                  </ProtectedRoute>
                } />


                {/* NGO Routes */}
                {/* <Route path="/ngolist" element={<NL />} />
                <Route path="/ngoinfo" element={<NI />} /> */}
                <Route path="/addngo" element={<AN />} />


                {/* 404 Page */}
                <Route
                  path="*"
                  element={<h2>404 - Page Not Found</h2>}
                />

              </Routes>

            </div>
          </div>


          {/* Footer */}
          <div id="footer">
            <h4>Copyright © myproject.com</h4>
          </div>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;