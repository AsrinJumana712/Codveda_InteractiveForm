const form = document.getElementById("regForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Show error
function showError(input, message) {
  const formGroup = input.closest(".form-group");
  if (formGroup) {
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
    const small = formGroup.querySelector("small");
    if (small) {
      small.innerText = message;
    }
  }
}

// Show success
function showSuccess(input) {
  const formGroup = input.closest(".form-group");
  if (formGroup) {
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
    const small = formGroup.querySelector("small");
    if (small) {
      small.innerText = "";
    }
  }
}

// Validate functions
function validateName() {
  const name = nameInput.value.trim();
  if (name.length < 3) {
    showError(nameInput, "Full Name must be at least 3 characters");
    return false;
  }
  showSuccess(nameInput);
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const re = /^\S+@\S+\.\S+$/;
  if (!re.test(email)) {
    showError(emailInput, "Please enter a valid email address");
    return false;
  }
  showSuccess(emailInput);
  return true;
}

function validatePhone() {
  const phone = phoneInput.value.trim();
  const re = /^[0-9]{10}$/;
  if (!re.test(phone)) {
    showError(phoneInput, "Phone number must be exactly 10 digits");
    return false;
  }
  showSuccess(phoneInput);
  return true;
}

function validatePassword() {
  const password = passwordInput.value.trim();
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  if (!re.test(password)) {
    showError(
      passwordInput,
      "Password must have 8+ characters, 1 uppercase, 1 number & 1 special character"
    );
    return false;
  }
  showSuccess(passwordInput);
  return true;
}

function validateConfirmPassword() {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  if (confirmPassword === "") {
    showError(confirmPasswordInput, "Please confirm your password");
    return false;
  } else if (password !== confirmPassword) {
    showError(confirmPasswordInput, "Passwords do not match");
    return false;
  }
  showSuccess(confirmPasswordInput);
  return true;
}

// Debounce function to limit validation frequency
function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), delay);
  };
}

// Real-time validation
nameInput.addEventListener("input", debounce(validateName));
emailInput.addEventListener("input", debounce(validateEmail));
phoneInput.addEventListener("input", debounce(validatePhone));
passwordInput.addEventListener(
  "input",
  debounce(() => {
    validatePassword();
    validateConfirmPassword(); // validate both password and confirm-password
  })
);
confirmPasswordInput.addEventListener(
  "input",
  debounce(validateConfirmPassword)
);

// Toggle show/hide password
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Form submit event
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    alert("🪄 Form Submitted Successfully!");
    form.reset();

    // Reset form field styles
    const formGroups = form.querySelectorAll(".form-group");
    formGroups.forEach((group) => group.classList.remove("success", "error"));
  } else {
    alert("⚠ Please fix the errors before submitting.");
  }
});
