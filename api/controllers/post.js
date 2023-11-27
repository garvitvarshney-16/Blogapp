import { db } from "../db.js"
import Jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth.js";

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })

}


export const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM user u JOIN posts p ON u.id=p.id WHERE p.id = ?"

    db.query(q, [req.params.id], (err, data) => {
        console.log(req.params.id)
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    })
}

// export const addPost = (req, res) => {
//     const authorizationHeader = req.headers.authorization;

//     if (!authorizationHeader) {
//         return res.status(401).json({ error: "Not Auth" });

//     }

//     const token = authorizationHeader.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ error: "Not Authenticated" });
//     }

//     Jwt.verify(token, "jwtkey", (err, userInfo) => {
//         if (err) {
//             return res.status(403).json({ error: "Token is not valid" });
//         }

//         const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

//         const values = [
//             req.body.title,
//             req.body.desc,
//             req.body.img,
//             req.body.cat,
//             req.body.date,
//             userInfo.id
//         ];

//         db.query(q, [values], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.json("Post has been created.");
//         });
//     });
// };

export const addPost = (req, res) => {
    // The authenticateToken middleware checks if the request has a valid token
    // and sets the user information in the request object.
    // If not valid, it will respond with a 401 Unauthorized error.
    authenticateToken(req, res, () => {
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            req.user.id, // Access user information from the request object.
        ];

        const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.");
        });
    });
};


export const deletePost = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
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
};

export const updatePost = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Not Authenticated" });
    }

    Jwt.verify(token, "jwtkey", (err, userInfo) => {

        if (err) {
            return res.status(403).json({ error: "Token is not valid" });
        }

        const postId = req.params.id

        const q = "UPDATE posts SET `title` = ?, `desc` =?, `img`=?, `cat`=? WHERE `id` =? AND `uid` = ?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("Post has been updated.")
        })
    });
}