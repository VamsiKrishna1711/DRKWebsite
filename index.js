const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Schema = mongoose.Schema; 

// Define the connectDB function
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/DRKstudents', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// schema code
const studentSchema = new Schema({
    name: String,
    email: String,
    password: String,
    rollNumber: { 
        type: String, 
        unique: true, 
        required: true 
    },
    pincode: {
        type: String,
        required: true
    },
    phoneNumber: Number,
    address: String,
    course: String,
    semester: String,
    cgpa: Number,
    attendance: Number,
    currentCourses: [String],
    currentDate: { type: Date, default: Date.now }
});

// Create model
const Student = mongoose.model('students', studentSchema);

// Export the model and connectDB function
module.exports = { connectDB, Student };

// Remove or comment out the app.listen part if you're using server.js
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
