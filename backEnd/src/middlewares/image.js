const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const ts = req.user._id;
        const ext = file.originalname.split('.').pop();
        const name = `${ts}.${ext}`;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const isValid = file.mimetype.startsWith('image/');
    cb(null, isValid);
};

const uploadMiddleware = multer({ storage, fileFilter });

module.exports = uploadMiddleware;
