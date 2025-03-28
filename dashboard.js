document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
        return;
    }

    // Get student ID from localStorage
    const studentId = localStorage.getItem('studentId');

    // Sample student data (in a real application, this would come from a backend)
    const studentData = {
        'student123': {
            name: 'G PENCHALA ANEEL',
            email: 'aneelgaddam8999@gmail.com',
            phone: '+91 9849445589',
            address: 'DRK INISTUTE OF SCIENCE AND TECHNOLOGY',
            course: 'Computer Science Engineering',
            cgpa: '8.0',
            semester: '2 2',
            attendance: '95%',
            currentCourses: [
                'SOFTWARE ENGINEERING',
                'OPERATING SYSTEMS',
                'DATABASE MANAGEMENT SYSTEMS',
                'DESCRETE MATHEMATICS',
                'BUSINESS ECONOMICS AND FINANCIAL ANALYSIS',
                
            ]
          
        }
    };

    // Update dashboard with student data
    function updateDashboard() {
        const student = studentData[studentId];
        if (!student) return;

        // Update profile information
        document.getElementById('studentName').textContent = "Welcome" + student.name;
        document.getElementById('studentFullName').textContent = student.name;
        document.getElementById('studentId').textContent = "Student ID:" + studentId;
        document.getElementById('studentCourse').textContent = student.course;

        // Update personal information
        document.getElementById('studentEmail').textContent = student.email;
        document.getElementById('studentPhone').textContent = student.phone;
        document.getElementById('studentAddress').textContent = student.address;

        // Update academic information
        document.getElementById('studentCGPA').textContent = student.cgpa;
        document.getElementById('studentSemester').textContent = student.semester;
        document.getElementById('studentAttendance').textContent = student.attendance;

        // Update current courses
        const coursesList = document.getElementById('currentCourses');
        coursesList.innerHTML = '';
        student.currentCourses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course;
            coursesList.appendChild(li);
        });


    }

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('studentId');
        window.location.href = 'index.html';
    });

    // Handle profile image upload
    const editImageBtn = document.querySelector('.edit-image-btn');
    const studentImage = document.getElementById('studentImage');

    editImageBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    studentImage.src = e.target.result;
                    // In a real application, you would upload this image to a server
                    localStorage.setItem('studentImage', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Load saved profile image if exists
    const savedImage = localStorage.getItem('studentImage');
    if (savedImage) {
        studentImage.src = savedImage;
    }

    // Initialize dashboard
    updateDashboard();
});