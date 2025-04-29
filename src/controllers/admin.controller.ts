import { Request, Response } from 'express';
import Exam from '../models/exam.model';
import User from '../models/user.model';
import Question from '../models/question.model';

export const createTestStudent = async (req: Request, res: Response) => {
    try {
        const { name = "Test Student", score = 85, level = "Beginner" } = req.body;
        const testStudent = await User.create({
            name,
            score,
            level
        });
        res.status(201).json(testStudent);
    } catch (error) {
        console.error("Error creating test student:", error);
        res.status(500).json({ message: "Error creating test student" });
    }
}

export const getClassStudents = async (req: Request, res: Response) => {
    try{
        const {classId} = req.params;
        const students = await User.find({level: classId});
        res.status(200).json(students);
    }catch(error){
        console.error("Error getting class students")
        res.status(500).json({message: "Error getting class students"})
    }
}

export const getStudentStatistics = async (req: Request, res: Response) => {
    try {
        const {level} = req.params;
        if (!level) {
            return res.status(400).json({ message: "Class is required" });
        }
        console.log("level", level)
        // Get all students
        const students = await User.find({level: level});
        
        // Calculate statistics with default values for empty array
        const totalStudents = students.length;
        const scores = students.map(student => student.score || 0);
        
        // Handle empty array case
        const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
        const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

        res.status(200).json({
            totalStudents,
            highestScore,
            lowestScore,
        });
    } catch (error) {
        console.error("Error getting students:", error);
        res.status(500).json({ message: "Error getting students" });
    }
}

export const getStudents = async (req: Request, res: Response) => {
    try{
        const students = await User.find();
        res.status(200).json(students);
    }catch(error){
        console.error("Error getting students")
        res.status(500).json({message: "Error getting students"})
    }
}


