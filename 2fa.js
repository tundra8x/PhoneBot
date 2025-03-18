document.addEventListener('DOMContentLoaded', () => {
    // Handle 2FA code inputs
    const codeInputs = document.querySelectorAll('.code-inputs input');
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    // Handle 2FA verification
    const verifyForm = document.getElementById('2fa-verify-form');
    if (verifyForm) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = Array.from(codeInputs).map(input => input.value).join('');
            
            // Here you would validate the 2FA code with your backend
            console.log('Verifying 2FA code:', code);
            
            // Demo success
            alert('2FA verification successful! (Demo only)');
            window.location.href = 'dashboard.html';
        });
    }

    // Handle 2FA setup
    const setupForm = document.getElementById('2fa-setup-form');
    if (setupForm) {
        setupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('verification-code').value;
            
            // Here you would verify the initial 2FA setup with your backend
            console.log('Setting up 2FA with code:', code);
            
            // Demo success
            alert('2FA has been enabled for your account! (Demo only)');
            window.location.href = 'auth.html';
        });
    }

    // Handle backup code verification
    const backupForm = document.getElementById('2fa-backup-form');
    if (backupForm) {
        backupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('backup-code').value;
            
            // Here you would verify the backup code with your backend
            console.log('Verifying backup code:', code);
            
            // Demo success
            alert('Backup code verified! (Demo only)');
            window.location.href = 'dashboard.html';
        });
    }

    // Switch between 2FA and backup code forms
    const switchTo2FA = document.querySelector('.switch-to-2fa');
    if (switchTo2FA) {
        switchTo2FA.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('2fa-backup').classList.remove('active');
            document.getElementById('2fa-verify').classList.add('active');
        });
    }

    // Handle resend code
    const resendCode = document.querySelector('.resend-code');
    if (resendCode) {
        resendCode.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you would trigger a new code to be sent
            alert('New code has been sent! (Demo only)');
        });
    }
});
