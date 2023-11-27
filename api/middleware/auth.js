import Jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    // const authorizationHeader = req.headers.authorization;

    // if (!authorizationHeader) {
    //     return res.status(401).json({ error: "Not Authenticated" });
    // }

    const token = req.headers.authorization.split(" ")[1];
    console.log(token)

    Jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            return res.status(401).json({ error: "Not Authenticated" });
        }

        req.user = userInfo;
        next(); // Continue to the next middleware or route handler.
    });
};
