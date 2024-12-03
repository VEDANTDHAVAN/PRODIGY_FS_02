/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = null;
function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = data;
    try {
      const {data} = await axios.post('/api/login', {email, password})
      if(data.error){
        toast.error(data.error)
      }else {
        setData({})
        toast.success('Login Successful, Welcome to our Website!!')
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Log In</h2>
        <form
          onSubmit={loginUser}
          className="register-form"
        >
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e)=> setData({...data, email: e.target.value})}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e)=> setData({...data, password: e.target.value})}
          />
          <button
            type="submit"
            className="btn form-btn"
          >
            Login
          </button>
        </form>
        <p>
          Not a user?{" "}
          <NavLink
            className="login-link"
            to={"/register"}
          >
            Register
          </NavLink>
        </p>
      </div>
    </section>
  )
}

export default Login