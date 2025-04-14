const { Student, connectDB } = require('./index.js');

// Initialize the database connection
const init = async () => {
    await connectDB();
    // Your database operations here
};

init().catch(err => {
    console.error('Failed to initialize database:', err);
});

const sampleStudents = [
    {
        name: 'G PENCHALA ANEEL',
        email: 'aneelgaddam8999@gmail.com',
        password: 'password123',
        rollNumber: '23N71A0521',
        phoneNumber: 9849445589,
        address: 'DRK INSTITUTE OF SCIENCE AND TECHNOLOGY',
        course: 'Computer Science Engineering',
        cgpa: 8.0,
        semester: '2 2',
        attendance: 95,
        currentCourses: [
            'SOFTWARE ENGINEERING',
            'OPERATING SYSTEMS',
            'DATABASE MANAGEMENT SYSTEMS',
            'DISCRETE MATHEMATICS',
            'BUSINESS ECONOMICS AND FINANCIAL ANALYSIS'
        ]
    }
];

const insertStudents = async () => {
    try {
        // Check for existing students by roll number
        for (const student of sampleStudents) {
            const existingStudent = await Student.findOne({ rollNumber: student.rollNumber });
            
            if (!existingStudent) {
                // Insert only if student doesn't exist
                await Student.create(student);
                console.log(`Student ${student.name} added successfully`);
                console.log('Data insertion process completed');
            } else {
                console.log(`Student with roll number ${student.rollNumber} already exists`);
                console.log('Data insertion process failed');
            }
        }
        
    
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

insertStudents();
