// studentInfo.js
document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const studentData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            pincode: document.getElementById('pincode').value,
            course: document.getElementById('course').value,
            semester: document.getElementById('semester').value
        };

        try {
            const response = await saveStudentData(studentData);
            if (response.success) {
                showMessage('Student information saved successfully!', 'success');
                studentForm.reset();
            } else {
                showMessage('Error saving student information', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error saving student information', 'error');
        }
    });

    // Function to save student data
    async function saveStudentData(data) {
        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            return {
                success: response.ok,
                data: result
            };
        } catch (error) {
            console.error('Error saving data:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Function to show messages to user
    function showMessage(message, type) {
        const messageDiv = document.getElementById('message') || createMessageDiv();
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 3000);
    }

    // Create message div if it doesn't exist
    function createMessageDiv() {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        document.body.insertBefore(messageDiv, studentForm);
        return messageDiv;
    }
});
