const multer = require('multer');
const path = require('path');

// Set storage destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('quizPic'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    // Return the file path to store in the database
    res.json({ filePath: `/uploads/${req.file.filename}` });
});
