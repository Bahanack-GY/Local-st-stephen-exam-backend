import express from 'express';
import { getQuestions, addQuestion, addBulkQuestions, uploadImage } from '../controllers/question.controller';

const router = express.Router();

// Get all questions
router.get('/', getQuestions);

// Add a single question
router.post('/', addQuestion);

// Add multiple questions
router.post('/bulk', addBulkQuestions);

// Upload image
router.post('/upload-image', uploadImage);

export default router;

