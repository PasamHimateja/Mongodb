import mongoose from "mongoose";
const testSchema = new mongoose.Schema({  
    name: {
        type: String,
        unique: true,
        required: true,
    },
    class:{
        type: String,
        required: true,
    },
    rollno:{
        type: Number,
        required: true
    }
}); {timestarmp : true};

const student = mongoose.model("Student", testSchema);
export default student;