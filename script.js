document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Sample student credentials (in a real application, this would be handled server-side)
    const validCredentials = {
        'student123': 'password123'
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!username || !password) {
            showError('Please fill in all fields');
            return;
        }

        // Check credentials (this is just for demonstration)
        if (validCredentials[username] === password) {
            // Store login state (in a real application, you'd use proper session management)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('studentId', username);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError('Invalid credentials');
        }
    });

    function showError(message) {
        // Create error element if it doesn't exist
        let errorElement = document.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            loginForm.insertBefore(errorElement, loginForm.firstChild);
        }

        // Update error message
        errorElement.textContent = message;
        errorElement.style.color = '#ff4444';
        errorElement.style.marginBottom = '15px';
        errorElement.style.textAlign = 'center';
        errorElement.style.fontSize = '14px';

        // Remove error message after 3 seconds
        setTimeout(() => {
            errorElement.textContent = '';
        }, 3000);
    }

    // Add input animations
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});