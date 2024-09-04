import multer from 'multer';

const storage = multer.memoryStorage(); // or another storage method
const upload = multer({ storage });

export const singleUpload = upload.single('file'); // Ensure 'file' matches the form field
