import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    matricule:{
        type: String,
        unique: true,
        default : ""
    },
    score:{
        type:Number,
        default:0
    },
    level:{
        type: String,
        default: "",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},

)

const User = mongoose.model('User', userSchema);
export default User;

