import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8000/api/auth/login", inputs)
        setCurrentUser(res.data)
        // try {
        //     const res = await axios.post("http://localhost:8000/api/auth/login", inputs);

        //     // Check if the Authorization header is present
        //     if (res.headers && res.headers.authorization) {
        //         const token = res.headers.authorization.split(' ')[1];

        //         // Store the token in the local storage
        //         localStorage.setItem("access_token", token);

        //         setCurrentUser(res.data);
        //     } else {
        //         console.error("Authorization header not present in the response");
        //     }
        // } catch (error) {
        //     console.error("Login failed:", error);
        // }
    }

    const logout = async (inputs) => {
        await axios.post("http://localhost:8000/api/auth/logout")
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}