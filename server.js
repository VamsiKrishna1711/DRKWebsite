const express = require('express');
const path = require('path');
const { connectDB, Student } = require('./index.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    console.log('Register route hit');
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/register', (req, res) => {
    console.log('Register route hit');
    res.sendFile(path.join(__dirname, 'createUser.html'));
});

// Route for student info submission
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phone,
            address: req.body.address,
            pincode: req.body.pincode,
            course: req.body.course,
            semester: req.body.semester
        });

        await newStudent.save();
        res.status(201).json({ 
            success: true, 
            message: 'Student information saved successfully' 
        });
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error saving student information' 
        });
    }
});

// Connect to MongoDB and start server
const PORT = 3000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });
