import Express from "express";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = Express()

app.use(cors({
    origin: "http://localhost:5173", // Replace with your React app's origin
    credentials: true,
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(Express.json())
app.use(cookieParser())
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)


app.listen(8000, () => {
    console.log("Connected")
})