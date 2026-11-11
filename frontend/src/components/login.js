import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const collectData = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:50334/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.result || "Login failed");
      }

      // Save JWT Token
      localStorage.setItem("token", result.auth);

      alert("Login Successful");
        
 navigate("/user");
        
     

    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <center>
        <div className="wrapper">

          <div className="login">
            <h1>
              <span>Login</span>
            </h1>
          </div>

          <form onSubmit={collectData}>

            <div className="input-box">
              <label htmlFor="user_id">Email</label>

              <input
                type="email"
                id="user_id"
                className="input_field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            <div className="input-box">
              <label htmlFor="user_password">
                Password
              </label>

              <input
                type="password"
                id="user_password"
                className="input_field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            <div className="options">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="a1"
              >
                Forgot Password?
              </button>

            </div>


            <button
              className="btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>
      </center>
    </div>
  );
};

export default Login;