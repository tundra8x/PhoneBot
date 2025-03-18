document.addEventListener('DOMContentLoaded', () => {
    const resetRequestForm = document.getElementById('reset-request-form');
    const resetSuccess = document.getElementById('reset-success');
    const resetConfirmForm = document.getElementById('reset-confirm-form');

    // Handle initial reset request
    if (resetRequestForm) {
        resetRequestForm.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;

            // Here you would typically make an API call to your backend
            console.log('Password reset requested for:', email);

            // Show success message
            resetRequestForm.classList.remove('active');
            resetSuccess.classList.add('active');
        });
    }

    // Handle resend link
    const resendLink = document.querySelector('.resend-link');
    if (resendLink) {
        resendLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you would typically make an API call to resend the email
            alert('Reset link has been resent! (Demo only)');
        });
    }

    // Handle password reset confirmation
    if (resetConfirmForm) {
        resetConfirmForm.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Basic validation
            if (newPassword.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Password reset confirmed');

            // Redirect to login page
            alert('Password has been reset successfully! Please log in with your new password. (Demo only)');
            window.location.href = 'auth.html';
        });
    }

    // Password strength validation
    const newPasswordInput = document.getElementById('new-password');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const requirements = document.querySelector('.password-requirements');
            
            if (password.length < 8) {
                requirements.style.color = '#dc2626';
            } else {
                requirements.style.color = '#059669';
            }
        });
    }
});
