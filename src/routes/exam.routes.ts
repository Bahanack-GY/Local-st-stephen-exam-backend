import express from 'express';
import { createExam, getExams, getExamById } from '../controllers/exam.controller';

const router = express.Router();

// Create a new exam
router.post('/', createExam);

// Get all exams
router.get('/', getExams);

// Get exam by ID
router.get('/:id', getExamById);

export default router; 