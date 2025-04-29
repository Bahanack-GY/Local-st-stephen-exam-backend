import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        default: ["option 1", "option 2", "option 3", "option 4"]
    },
    answer:{
        type: Number,
        default: 0
    },
    topic:{
        type:String,
        required:true,
        default: ""
    },
    level:{
        type:[String],
        default:""
    },
    Image:{
        type: String,
    },
    subject:{
        type: String,
        default:""
    }
    

})

const Question = mongoose.model("Question", questionSchema)
export default Question