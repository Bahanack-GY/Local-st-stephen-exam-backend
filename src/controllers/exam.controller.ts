import { Request, Response } from "express";
import Exam from "../models/exam.model";
import Question from "../models/question.model";

export const createExam = async (req: Request, res: Response) => {
    try {
        const { title, subject, level, questions, duration } = req.body;

        // Validate required fields
        if (!title || !subject || !level || !questions || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate questions exist
        const existingQuestions = await Question.find({ _id: { $in: questions } });
        if (existingQuestions.length !== questions.length) {
            return res.status(400).json({ message: "One or more questions do not exist" });
        }

        // Delete any existing exam
        await Exam.deleteMany({});

        // Create the new exam
        const exam = await Exam.create({
            title,
            subject,
            level,
            questions,
            duration
        });

        res.status(201).json({
            message: "Exam created successfully",
            exam
        });
    } catch (error) {
        console.error("Error creating exam:", error);
        res.status(500).json({ message: "Error creating exam" });
    }
};

export const getExams = async (req: Request, res: Response) => {
    try {
        const exams = await Exam.find().populate('questions');
        res.status(200).json(exams);
    } catch (error) {
        console.error("Error fetching exams:", error);
        res.status(500).json({ message: "Error fetching exams" });
    }
};

export const getExamById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const exam = await Exam.findById(id).populate('questions');
        
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        res.status(200).json(exam);
    } catch (error) {
        console.error("Error fetching exam:", error);
        res.status(500).json({ message: "Error fetching exam" });
    }
}; 