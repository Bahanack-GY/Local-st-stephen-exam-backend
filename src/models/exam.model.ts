import mongoose, { Schema, Document } from "mongoose";

export interface IExam extends Document {
    title: string;
    subject: string;
    level: string;
    questions: mongoose.Types.ObjectId[];
    duration: number; // in minutes
    createdAt: Date;
    updatedAt: Date;
}

const examSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,

    },
    level: {
        type: String,
        required: true,

    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }],
    duration: {
        type: Number,
        required: true,
        min: 1 // minimum 1 minute
    },
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

const Exam = mongoose.model<IExam>("Exam", examSchema);

export default Exam;
