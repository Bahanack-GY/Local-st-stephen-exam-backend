import express from 'express';
import { getQuestions, addQuestion, addBulkQuestions } from '../controllers/question.controller';

const router = express.Router();

// Get all questions
router.get('/', getQuestions);

// Add a single question
router.post('/', addQuestion);

// Add multiple questions
router.post('/bulk', addBulkQuestions);

export default router;

