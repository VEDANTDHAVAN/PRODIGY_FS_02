/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css"
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = null;

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname:'',
    lastname: '',
    email: '', 
    password: '', 
    confpassword: ''
  })
  const registerUser = async (e) => {
    e.preventDefault();
    const {firstname, lastname, email, password, confpassword} = data
    try {
      const {data} = await axios.post('/api/register', {
        firstname, lastname, email, password, confpassword
      })
      if(data.error){
        toast.error(data.error)
      }else {
        setData({})
        toast.success('Registration Successful, Welcome to our Website!!')
        navigate('/login')
      }
    } catch(error){
        console.log(error)
    }
  }

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Register Now!!</h2>
        <form
          onSubmit={registerUser}
          className="register-form"
        >
          <input
            type="text"
            name="firstname"
            className="form-input"
            placeholder="Enter your first name"
            value={data.firstname}
            onChange={(e) => setData({...data, firstname: e.target.value})}
          />
          <input
            type="text"
            name="lastname"
            className="form-input"
            placeholder="Enter your last name"
            value={data.lastname}
            onChange={(e) => setData({...data, lastname: e.target.value})}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder="Confirm your password"
            value={data.confpassword}
            onChange={(e) => setData({...data, confpassword: e.target.value})}
          />
          <button
            type="submit"
            className="btn form-btn"
          >
            REGISTER
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink
            className="login-link"
            to={"/login"}
          >
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;