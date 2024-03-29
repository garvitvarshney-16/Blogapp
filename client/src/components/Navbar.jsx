import React, { useContext } from 'react'
import Logo from "../img/blogger-logo.png"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div className='navbar'>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" style={{ width: '50px', height: '50px' }} />
                    </Link>
                </div>
                <div className="links">
                    <Link className='link' to="/?cat=art"><h6>ART</h6></Link>
                    <Link className='link' to="/?cat=science"><h6>SCIENCE</h6></Link>
                    <Link className='link' to="/?cat=technology"><h6>TECHNOLOGY</h6></Link>
                    <Link className='link' to="/?cat=cinema"><h6>CINEMA</h6></Link>
                    <Link className='link' to="/?cat=design"><h6>DESIGN</h6></Link>
                    <Link className='link' to="/?cat=food"><h6>FOOD</h6></Link>
                    <Link to="/user/:userId">
                        <span>{currentUser?.username}</span>
                    </Link>
                    {currentUser ? (<span onClick={logout}>Logout</span>) : (<Link className='link' to="/login">Login</Link>)}
                    <span className='write'>
                        <Link to="/write" className='link'>Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar