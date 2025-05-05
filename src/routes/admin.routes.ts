import express from 'express';
import { getClassStudents, getStudentStatistics, getStudents, createTestStudent } from '../controllers/admin.controller';

const router = express.Router();

// Create a test student
router.post('/test-student', createTestStudent);

// Get students by class
router.get('/class/:classId', getClassStudents);

// Get student statistics
router.get('/statistics/:level', getStudentStatistics);

// Get all students
    router.get('/students/:level', getStudents);

export default router;
