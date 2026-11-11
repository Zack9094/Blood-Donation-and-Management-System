import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:50334/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      console.log(result);

      if (res.status === 200 && result.auth) {
        localStorage.setItem("token", result.auth);
        navigate("/home");
      } else {
        alert(result.result || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <center>
        <div className="wrapper">

          <div className="login">
            <h1>
              <span>Admin Login</span>
            </h1>
          </div>

          <form onSubmit={collectData}>

            <div className="input-box">
              <label htmlFor="user_id">Email</label>
              <input
                type="email"
                id="user_id"
                className="input_field"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="user_password">Password</label>
              <input
                type="password"
                id="user_password"
                className="input_field"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              &nbsp;&nbsp;&nbsp;
              <button
                type="button"
                className="a1"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </button>
            </div>

            <button className="btn" type="submit">
              Login
            </button>

          </form>
        </div>
      </center>
    </div>
  );
};

export default AdminLogin;