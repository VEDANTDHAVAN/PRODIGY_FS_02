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
       <h2 className="nav-logo">
          <NavLink to={"/"}>EMPLOYEE MANAGEMENT SYSTEM</NavLink>
       </h2>
       <ul className="nav-links">
       <li className="nav-logo">
          <NavLink to={"/"}>Home</NavLink>
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
/*import { NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
//import { setUserInfo } from "../redux/reducers/rootSlice";
function Navbar() {
    const navigate = useNavigate();
    const [iconActive, setIconActive] = useState(false);
    const dispatch = useDispatch();
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : ""
  );
    const logoutFunc = () => {
    //dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>Secure Auth</NavLink>
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          {!token ? (
            <>
              <li>
                <NavLink
                  className="btn"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="btn"
                  to={"/register"}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span
                className="btn"
                onClick={logoutFunc}
              >
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
    </header> 
  )
}

export default Navbar*/