import { Request, Response } from "express";
import Question from "../models/question.model";
import multer from "multer";
import path from "path";
import fs from "fs-extra";

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'public/img';
        fs.ensureDirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
});

export const getQuestions = async (req: Request, res: Response) => {
    const questions = await Question.find();
    res.status(200).json(questions);
}

export const addQuestion = async (req: Request, res: Response) => {
    try {
        const { question, options, answer, topic, subject, imagePath, level } = req.body;
        console.log("from front: ", req.body)
        
        // Validate required fields
        if (!question || !options || !topic || !subject || !level) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const exam = await Question.create({ 
            question, 
            options, 
            answer, 
            topic, 
            subject, 
            Image: imagePath, 
            level 
        });
        console.log("exam", exam);
        
        res.status(201).json(exam);
    } catch (error) {
        console.log("error adding question", error);
        res.status(500).json({ message: "error adding question" });
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
        console.log("Created questions: ",createdQuestions)

        res.status(201).json({
            message: `${createdQuestions.length} questions added successfully`,
            questions: createdQuestions
        });
    } catch (error) {
        console.error("Error adding bulk questions:", error);
        res.status(500).json({ message: "Error adding bulk questions" });
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    try {
        upload.single('image')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Return the path where the image is stored
            const imagePath = `/img/${req.file.filename}`;
            res.status(200).json({ 
                message: 'Image uploaded successfully',
                imagePath: imagePath,
                fullUrl: `${req.protocol}://${req.get('host')}/public${imagePath}`
            });
        });
    } catch (error) {
        console.log("error uploading image", error);
        res.status(500).json({ message: "error uploading image" });
    }
}