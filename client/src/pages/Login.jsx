import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/authContext'


const Login = () => {
  const [inputs, setInput] = useState({
    username: "",
    password: "",
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const handleChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(inputs);
      navigate("/")
    } catch (error) {
      if (error.response && error.response.data) {
        setErr(error.response.data)
      } else {
        setErr("An error occurred. Please try again.");
      }
    }
  }
//   const handleSubmit = async e => {
//     e.preventDefault()
//     try {
//         // Send a POST request to the login endpoint with the user credentials
//         const response = await axios.post("http://localhost:8000/api/auth/login", inputs, { withCredentials: true });
        
//         // Handle a successful login (e.g., redirect to a dashboard)
//         console.log("Login successful", response.data);
//         navigate("/")
//     } catch (error) {
//         // Handle login failure (e.g., show an error message to the user)
//         console.error("Login error", error.response.data);
//     }
// };
  return (
    <div className='auth'>
        <h1>Login</h1>
        <form action="">
            <input type="text" placeholder='username' name='username' onChange={handleChange} />
            <input type="password" placeholder='password' name='password' onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Don't you have an account? <Link to="/register">Register</Link></span>
        </form>
    </div>
  )
}

export default Login