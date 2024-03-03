import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        exposedHeaders: ['Authorization'],
        methods: ["GET", "POST"],
    })
);

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `upload/${file.originalname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), function (req, res) {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        const file = req.file;
        res.status(200).json(file.filename);
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// // Update CORS headers to handle preflight requests
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(8000, () => {
    console.log('Connected');
});
