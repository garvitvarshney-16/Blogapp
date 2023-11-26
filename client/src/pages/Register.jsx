import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const [inputs, setInput] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate();

  const handleChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", inputs)
      navigate("/login")
    } catch (error) {
      if (error.response && error.response.data) {
        setErr(error.response.data)
      } else {
        setErr("An error occurred. Please try again.");
      }
    }
  }
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form action="">
        <input type="text" name='username' placeholder='username' onChange={handleChange} />
        <input type="email" name='email' placeholder='email' onChange={handleChange} />
        <input type="password" name='password' placeholder='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Do you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register