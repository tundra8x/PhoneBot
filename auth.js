document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            tab.classList.add('active');
            const formId = `${tab.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
            
            // Refresh CAPTCHA when switching tabs
            generateCaptcha(tab.dataset.tab);
        });
    });

    // CAPTCHA functionality
    let captchaText = {
        login: '',
        signup: ''
    };

    const generateCaptcha = (formType) => {
        const canvas = document.getElementById(`${formType}-captcha`);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Generate random text
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let text = '';
        for (let i = 0; i < 6; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaText[formType] = text;

        // Draw background
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw text with random transformations
        ctx.font = 'bold 30px Arial';
        for (let i = 0; i < text.length; i++) {
            ctx.save();
            ctx.translate(35 * i + 10, 35);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 40%)`;
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }

        // Add noise
        for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.strokeStyle = '#ccc';
            ctx.stroke();
        }
    };

    // Initialize CAPTCHAs
    generateCaptcha('login');
    generateCaptcha('signup');

    // Refresh CAPTCHA buttons
    document.getElementById('refresh-login-captcha').addEventListener('click', () => generateCaptcha('login'));
    document.getElementById('refresh-signup-captcha').addEventListener('click', () => generateCaptcha('signup'));

    // Form submission handling
    const loginForm = document.querySelector('#login-form form');
    const signupForm = document.querySelector('#signup-form form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        const captchaInput = document.getElementById('login-captcha-input').value;

        if (captchaInput.toLowerCase() !== captchaText.login.toLowerCase()) {
            alert('Incorrect CAPTCHA. Please try again.');
            generateCaptcha('login');
            document.getElementById('login-captcha-input').value = '';
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password, rememberMe });
        
        // Demo: Redirect to 2FA verification
        window.location.href = '2fa.html';
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const company = document.getElementById('signup-company').value;
        const terms = document.getElementById('terms').checked;
        const captchaInput = document.getElementById('signup-captcha-input').value;

        if (captchaInput.toLowerCase() !== captchaText.signup.toLowerCase()) {
            alert('Incorrect CAPTCHA. Please try again.');
            generateCaptcha('signup');
            document.getElementById('signup-captcha-input').value = '';
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', { name, email, password, company, terms });
        
        // Demo: Redirect to 2FA setup
        window.location.href = '2fa.html#setup';
    });
});
