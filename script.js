// Select form and input elements
const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Helper function to show error
function showError(input, message) {
    const errorDiv = input.nextElementSibling; // The .invalid-feedback div
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
}

// Helper function to show success
function showSuccess(input) {
    const errorDiv = input.nextElementSibling;
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    errorDiv.innerText = '';
    errorDiv.style.display = 'none';
}

// Validation Functions
function validateName() {
    const nameValue = fullName.value.trim();
    if (nameValue.length < 5) {
        showError(fullName, 'Name must be at least 5 characters');
        return false;
    } else {
        showSuccess(fullName);
        return true;
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    // Simple check for @ as per requirements
    if (!emailValue.includes('@')) {
        showError(email, 'Email ID should have @ character in it');
        return false;
    } else {
        showSuccess(email);
        return true;
    }
}

function validatePhone() {
    const phoneValue = phone.value.trim();
    if (phoneValue === '123456789') {
        showError(phone, 'Phone Number should not be 123456789');
        return false;
    } else if (phoneValue.length !== 10 || isNaN(phoneValue)) {
        showError(phone, 'Phone Number must be a 10-digit number');
        return false;
    } else {
        showSuccess(phone);
        return true;
    }
}

function validatePassword() {
    const passwordValue = password.value;
    const nameValue = fullName.value.trim();
    
    if (passwordValue.toLowerCase() === 'password') {
        showError(password, "Password cannot be 'password'");
        return false;
    } else if (passwordValue.length < 8) {
        showError(password, 'Password must be at least 8 characters');
        return false;
    } else if (nameValue && passwordValue.toLowerCase() === nameValue.toLowerCase()) {
        showError(password, 'Password cannot be the name of the user');
        return false;
    } else {
        showSuccess(password);
        return true;
    }
}

function validateConfirmPassword() {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    
    if (confirmPasswordValue !== passwordValue) {
        showError(confirmPassword, 'Password and confirm password should match');
        return false;
    } else if (confirmPasswordValue === '') {
         // Optional: handle empty confirm password if password is set
         showError(confirmPassword, 'Please confirm your password');
         return false;
    } else {
        showSuccess(confirmPassword);
        return true;
    }
}

// Event Listeners for 'onChange' (using 'change' event)
// The requirement says "onChange on input tag", so we listen to change events.
// We can also listen to 'input' for real-time validation if desired, but 'change' matches the prompt strictly.
fullName.addEventListener('change', validateName);
email.addEventListener('change', validateEmail);
phone.addEventListener('change', validatePhone);
password.addEventListener('change', validatePassword);
confirmPassword.addEventListener('change', validateConfirmPassword);

// Also re-validate confirm password when password changes
password.addEventListener('change', () => {
    if (confirmPassword.value) {
        validateConfirmPassword();
    }
});


// Event Listener for 'onSubmit'
form.addEventListener('submit', function(event) {
    // Prevent form submission
    event.preventDefault();

    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // Check if all are valid
    if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
        alert('Form Submitted Successfully!');
        // Here you would typically send the data to a server
        form.reset();
        // Remove valid classes
        [fullName, email, phone, password, confirmPassword].forEach(input => {
            input.classList.remove('is-valid');
        });
    } else {
        // Errors are already shown by the individual validation functions
    }
});
