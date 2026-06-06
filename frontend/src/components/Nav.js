 import React from 'react';
 import { Link , useNavigate} from 'react-router-dom'
 import "./SignUp.css";
const Nav = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    localStorage.removeItem("user");
  }

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <div>
      
      {
        user ? (

          <ul className="nav-ul">
            <li><Link to="/">Home</Link></li>
           <li><Link to="/">About Us</Link></li>
             <li><Link to="/">Help & FQT</Link></li>
           <li><Link to="/">Contact Us</Link></li>
            <li><Link onClick={logout} to="/signup">Logout ({user.name})</Link></li>
          </ul>
        ) : (
          <ul className="nav-ul nav-right">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link onClick={logout} to="/">Logout</Link></li>
          </ul>
        )
      }
    </div>
  );
};

export default Nav;