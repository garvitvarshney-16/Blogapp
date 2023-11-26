import React, { useContext, useEffect, useState } from 'react'
import Edit from "../img/pen.png"
import Delete from "../img/delete.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import moment from "moment"
import { AuthContext } from '../context/authContext'
import axios from 'axios'

const Single = () => {
    const [post, setPosts] = useState([])

    const location = useLocation()
    const navigate = useNavigate()

    const postId = location.pathname.split("/")[2]

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/posts/${postId}`)
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [postId])

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("access_token");

            if (!token) {
                // Handle the case where the token is not available (user is not authenticated)
                console.error("No token available");
                return;
            }
            console.log("Token:", token);


            await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/");
        } catch (error) {
            console.log(error);
        }
        // try {
        //     // Send a DELETE request to the delete post endpoint
        //     const response = await axios.delete(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true });

        //     // Handle a successful post deletion (e.g., update the UI)
        //     console.log("Post deleted", response.data);
        // } catch (error) {
        //     // Handle post deletion failure (e.g., show an error message)
        //     console.error("Post deletion error", error.response.data);
        // }
    }
    return (
        <div className='single'>
            <div className="content">
                <img src={post?.img} alt="" />
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>)}
                </div>
                <h1>{post.title}</h1>
                {post.desc}
            </div>
            <Menu />
        </div>
    )
}

export default Single