import { db } from "../db.js"
import Jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })

}


export const getPost = (req, res) => {
    const q = "SELECT `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM user u JOIN posts p ON u.id=p.id WHERE p.id = ?"

    db.query(q, [req.params.id], (err, data) => {
        console.log(req.params.id)
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    })
}

export const addPost = (req, res) => {
    res.json("from controllers")
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: "Not Authenticated" });
    }

    Jwt.verify(token, "jwtkey", (err, userInfo) => {

        if (err) {
            return res.status(403).json({ error: "Token is not valid" });
        }

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (data.affectedRows === 0) {
                // No rows were affected, meaning the post was not deleted (either not found or not authorized)
                return res.status(403).json({ error: "You can delete only your post!" });
            }

            return res.json({ message: "Post has been deleted!" });
        });
    });

    // const userId = req.session.userId;

    // if (!userId) {
    //     return res.status(401).json("Not Authenticated");
    // }

    // const postId = req.params.id;
    // const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

    // db.query(q, [postId, userId], (err, data) => {
    //     if (err) {
    //         return res.status(500).json(err);
    //     }

    //     if (data.affectedRows === 0) {
    //         return res.status(403).json("You can delete only your post!");
    //     }

    //     return res.json("Post has been deleted!");
    // });
};

export const updatePost = (req, res) => {
    res.json("from controllers")
}