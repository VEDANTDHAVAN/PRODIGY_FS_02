/* eslint-disable no-unused-vars */
import "../styles/navbar.css";
import {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate();
    const [iconActive, setIconActive] = useState(false);
    const logoutFunc = () => {
        //dispatch(setUserInfo({}));
        localStorage.removeItem("token");
        navigate("/login");
      }; 
    return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
       <h2 className="nav-logo flex gap-4">
          <NavLink to={"/"}>EMPLOYEE MANAGEMENT SYSTEM</NavLink>
       </h2>
       <ul className="nav-links flex gap-6">
       <li >
          <NavLink className="btn" to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink className="btn" to={"/login"}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink  className="btn" to={"/register"}>
            Register
          </NavLink>
        </li>
        <li>
              <span
                className="btn"
                onClick={logoutFunc}
              >
                Logout
              </span>
            </li>
       </ul>
      </nav>
    </header>
  )
}

export default Navbar
