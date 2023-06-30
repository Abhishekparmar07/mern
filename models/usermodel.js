import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type: String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minlength:[8,'Password must be at least 8 characters'],
        required:true,
    },
    role:{
        type:Number,
        default:0,
    },
},{timestamps:true})

export default mongoose.model('user',userSchema)