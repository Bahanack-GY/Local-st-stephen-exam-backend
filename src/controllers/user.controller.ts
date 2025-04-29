import  { Request, Response } from 'express';
import User from '../models/user.model';
import Exam from '../models/exam.model';

export const createUser = async (req: Request, res: Response) => {
    const { name, level } = req.body;
    const user = await User.create({ name, level });
    res.status(201).json(user);
}

export const login = async (req: Request, res: Response) => {
    try{
        const { name, level } = req.body;
    const user = await User.findOne({ name, level });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
    }catch(error){
        console.log("Error while trying to login", error)
        res.status(500).json({message:"Error while trying to login"})
    }
}
export const getUsers = async (req:Request, res: Response) => {
    try{
        const users = await User.find();
    res.status(200).json(users);
    }catch(error){
        console.error("Error getting users")
            res.status(500).json({message: "Error getting users"})  
    }
}

export const submitScore = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
    const { score } = req.body;
    const user = await User.findByIdAndUpdate(id, { score }, { new: true });
    res.status(200).json(user);
    }catch(error){
        console.error("Error submitting score")
        res.status(500).json({message: "Error submitting score"})
    }
}

export const getExams = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const exams = await Exam.findById(id);
        if(!exams){
            return res.status(404).json({message: "No exams found"})
        }
        res.status(200).json(exams);
    }catch(error){
        console.error("Error getting exams")
        res.status(500).json({message: "Error getting exams"})
    }
}



