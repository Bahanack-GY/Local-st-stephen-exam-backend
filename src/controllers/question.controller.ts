import { Request, Response } from "express";
import Question from "../models/question.model";

export const getQuestions = async (req: Request, res: Response) => {
    const questions = await Question.find();
    res.status(200).json(questions);
}

export const addQuestion = async (req:Request, res: Response) => {
    try{
        const { question, options, answer, topic, subject, image, level } = req.body;
        const exam = await Question.create({ question, options, answer, topic, subject, image, level });
        res.status(201).json(exam);
    }catch(error){
        console.log("error adding question", error);
        res.status(500).json({message: "error adding question"});
    }
}

export const addBulkQuestions = async (req: Request, res: Response) => {
    try {
        const { questions } = req.body;

        // Validate that questions array is provided
        if (!Array.isArray(questions)) {
            return res.status(400).json({ message: "Questions must be provided as an array" });
        }

        // Validate each question has required fields
        const invalidQuestions = questions.filter(q => 
            !q.question || 
            !q.options || 
            !Array.isArray(q.options) || 
            q.options.length !== 4 || 
            typeof q.answer !== 'number' ||
            !q.topic ||
            !q.subject ||
            !q.level
        );

        if (invalidQuestions.length > 0) {
            return res.status(400).json({ 
                message: "Some questions are missing required fields or have invalid format",
                invalidQuestions
            });
        }

        // Create all questions
        const createdQuestions = await Question.insertMany(questions);

        res.status(201).json({
            message: `${createdQuestions.length} questions added successfully`,
            questions: createdQuestions
        });
    } catch (error) {
        console.error("Error adding bulk questions:", error);
        res.status(500).json({ message: "Error adding bulk questions" });
    }
}