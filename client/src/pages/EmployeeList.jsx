/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../styles/register.css"
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/app.css";
import "../styles/employee.css";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

function EmployeeList() {
  
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    firstname:'',
    lastname: '',
    email: '', 
    password: '', 
    confpassword: ''
  })
  const [dbData, setDbData] = useState([])
  const createEmployee = async (e) => {
    e.preventDefault();
    const {firstname, lastname, email, password, confpassword} = data
    try {
      const {data} = await axios.post('/api/create', {
        firstname, lastname, email, password, confpassword
      })
      if(data.error){
        toast.error(data.error)
      }else {
        setData({})
        toast.success('Employee Added Successfully!!')
        setAdd(false)
        fetchData()
      }
    } catch(error){
        console.log(error)
    }
  }

  const fetchData = async () => {
      try {
        const response = await axios.get('/read');
        console.log(response.data);
        if(response.data.success){
          setDbData(response.data.data || []);
        } 
      } catch (error) {
        console.error('Error Fetching Data:', error);
        setError('Failed to Fetch Data from MongoDB!!');
      } finally {
        setLoading(false);
      }
  }
  useEffect(()=> {
    fetchData()
  }, []);

  if(loading) return <h2>Loading....</h2>;
  if(error) return <h2>{error}</h2>


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;
      const data = axios.delete("/api/delete/"+id);
      toast.success('Employee Deleted Successfully!!');
      const response = await axios.get('/read');
        console.log(response.data);
        if(response.data.success){
          setDbData(response.data.data || []);
        } 
        fetchData();
  }


  
  return (
    <>
     <div className='employee-container'>
      <button className='btn' onClick={()=> setAdd(true)}> Add Employee</button>
      
      {
        add && (
          <div className='addContainer'>
           <form
          onSubmit={createEmployee}
          className="register-form"
           >
            <div className="close-btn" onClick={()=> setAdd(false)}><CancelOutlinedIcon/></div>
            <h2 className="form-heading">Add Employee Details!!</h2>
            <input
            type="text"
            name="firstname"
            className="form-input"
            placeholder="Enter firstname"
            value={data.firstname}
            onChange={(e) => setData({...data, firstname: e.target.value})}
            />
            <input
            type="text"
            name="lastname"
            className="form-input"
            placeholder="Enter lastname"
            value={data.lastname}
            onChange={(e) => setData({...data, lastname: e.target.value})}
            />
            <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
            />
            <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter password"
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
            Create
             </button>
            </form>
          </div>
        )
      }
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { 
              Array.isArray(dbData) && dbData.length > 0 ? (
                dbData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td><button className="btn2 btn-edit">Edit</button>
                    <button className="btn3 btn-edit" onClick={()=> handleDelete(item._id)}>Delete</button></td>  
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No Data Available</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
     </div>
    </>
  )
}

export default EmployeeList