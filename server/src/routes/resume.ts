import { Router } from 'express';
import upload from '../middleware/uploadpdf'; // Import the uploadpdf middleware
import { uploadResume, getAllResumes } from '../controllers/resume';

const router = Router();

// Route to handle resume uploads (PDF and DOC/DOCX)
router.post('/upload', upload.single('file'), uploadResume);

// Route to get all parsed resumes
router.get('/resumes', getAllResumes);

export default router;