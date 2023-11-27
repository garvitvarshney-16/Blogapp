import Express from "express";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";


const app = Express()

app.use(cors({
    origin: "http://localhost:5173", // Replace with your React app's origin
    credentials: true,
    exposedHeaders: ['Authorization']
}));


app.use(Express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function(req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
})


app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)


app.listen(8000, () => {
    console.log("Connected")
})