import react, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import './SignUp.css'
const AdminLogin = () => {

  // const [data,setData]=useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

  }, [navigate]);

  const collectData = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:50333/adminlogin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();
   console.warn(result);
    if (res.status === 200) {
      localStorage.setItem("token", result.auth);
      console.warn(result.auth)
    
      console.warn()
      if (result.auth!=undefined) {
         navigate('/home');
      }else {
      alert(result.result);
    }
    
    } else {
      alert(result.result);
    }

  }

  return (
    <div>
      <center>
        <div class="wrapper" >

          <div class="login">
            <h1><span>Admin Login</span></h1>
          </div>
          <div class="input-box">

            <label for="user_id" >Email</label>
            <input type="email" id="user_id" class="input_field" required placeholder="Enter your email" value={email}
              onChange={(e) => setEmail(e.target.value)} />

          </div>
          <div class="input-box">
            <label for="user_password">Password</label>
            <input type="password" id="user_password" class="input_field" required placeholder="Enter your password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <label><input type="checkbox" />Remember me</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a class="a1" href="" >  forgot password?</a><br></br>

          <button class="btn" type="submit" onClick={collectData}>login</button>


        </div>
      </center>
    </div>
  )

}
export default AdminLogin;
