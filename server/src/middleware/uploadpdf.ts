import multer from 'multer';
import path from 'path';

// Define storage configuration
const storage = multer.diskStorage({
  destination: './uploads', // Ensure this directory exists
  filename: (req, file, cb) => {
    // Create a unique filename with the original extension
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Define file size limit (e.g., 5MB)
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// Define file filter to accept only PDF and DOC/DOCX files
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF and DOC/DOCX files are allowed!'));
  }
};

// Initialize multer with the defined configurations
const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});

export default upload;