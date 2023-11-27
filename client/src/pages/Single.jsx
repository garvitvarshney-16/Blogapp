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
    }

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return (
        <div className='single'>
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>)}
                </div>
                <h1>{post.title}</h1>
                {getText(post.desc)}
            </div>
            <Menu cat={post.cat} />
        </div>
    )
}

export default Single