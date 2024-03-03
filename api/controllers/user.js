import { db } from "../db.js"

export const getUser = (req, res) => {
    const userId = req.params.userId;

    const getUserQuery = 'SELECT * FROM user WHERE id = ?';
    const getPostsQuery = 'SELECT * FROM posts WHERE uid = ?';

    db.query(getUserQuery, [userId], (err, userResult) => {
        if (err) {
            return res.status(500).json({error: 'Error fetching user data'});
        }

        if (!userResult || userResult === 0) {
            return res.status(404).json({error: 'User not found'});
        }

        const user = userResult[0];

        db.query(getPostsQuery, [userId], (err, postsResult) => {
            if (err) {
                return res.status(500).json({error: 'Error fetching user posts'})
            }

            const userWithPosts = {
                id: user.id,
                username: user.username,
                profilePicture: user.profilePicture,
                bio: user.bio,
                posts: postsResult, 
            };
            res.json(userWithPosts)
        })
    })
}