import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const [inputs, setInput] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate();

  const handleChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e) => {
    setInput({ ...inputs, profilePicture: e.target.files[0] });
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // const res = await axios.post("http://localhost:8000/api/auth/register", inputs)
      const formData = new FormData();
      formData.append('username', inputs.username);
      formData.append('email', inputs.email);
      formData.append('password', inputs.password);
      formData.append('profilePicture', inputs.profilePicture);

      await axios.post('http://localhost:8000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
      <form onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder='username' onChange={handleChange} />
        <input type="email" name='email' placeholder='email' onChange={handleChange} />
        <input type="password" name='password' placeholder='password' onChange={handleChange} />
        <input type="file" name='profilePicture' accept='image/*' multiple={false} onChange={handleFileChange} />
        <button type='submit'>Register</button>
      </form>
      {err && <p>{err}</p>}
      <span>Do you have an account? <Link to="/login">Login</Link></span>
    </div>
  )
}

export default Register