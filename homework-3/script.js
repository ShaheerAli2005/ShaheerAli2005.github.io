window.onload = function () {
    updateSlider();

    const today = new Date();
    const maxDate = today.toISOString().split("T")[0];

    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    document.getElementById("dob").max = maxDate;
    document.getElementById("dob").min = minDate.toISOString().split("T")[0];
};

function showError(id, message) {
    const errorBox = document.getElementById(id);
    if (errorBox) {
        errorBox.textContent = message;
        errorBox.style.display = "inline-block";
    }
}

function clearError(id) {
    const errorBox = document.getElementById(id);
    if (errorBox) {
        errorBox.textContent = "";
        errorBox.style.display = "none";
    }
}

function updateSlider() {
    document.getElementById("sliderValue").textContent =
        document.getElementById("healthSlider").value;
}

function reviewForm() {

    // Name
    document.getElementById("r_name").textContent =
        document.getElementById("fname").value + " " +
        document.getElementById("mi").value + " " +
        document.getElementById("lname").value;

    // DOB
    document.getElementById("r_dob").textContent =
        document.getElementById("dob").value;

    // SSN (masked)
    let ssn = document.getElementById("ssn").value;

    if (ssn.length > 4) {
        document.getElementById("r_ssn").textContent =
            "*******" + ssn.slice(-4);
    } else {
        document.getElementById("r_ssn").textContent = ssn;
    }

    // Email
    document.getElementById("r_email").textContent =
        document.getElementById("email").value;

    // Phone
    document.getElementById("r_phone").textContent =
        document.getElementById("phone").value;

    // Address
    document.getElementById("r_address").textContent =
        document.getElementById("address1").value + " " +
        document.getElementById("address2").value + ", " +
        document.getElementById("city").value + ", " +
        document.getElementById("state").value + " " +
        document.getElementById("zip").value;

    // Symptoms
    document.getElementById("r_symptoms").textContent =
        document.getElementById("symptoms").value;

    // Allergies
    let allergies = [];

    if(document.getElementById("penicillin")?.checked) allergies.push("Penicillin");
    if(document.getElementById("latex")?.checked) allergies.push("Latex");
    if(document.getElementById("peanuts")?.checked) allergies.push("Peanuts");
    if(document.getElementById("shellfish")?.checked) allergies.push("Shellfish");
    if(document.getElementById("other")?.checked) allergies.push("Other");

    document.getElementById("r_allergies").textContent =
        allergies.length ? allergies.join(", ") : "None";

    // Medical History
    let history = [];

    if(document.getElementById("chickenpox")?.checked) history.push("Chicken Pox");
    if(document.getElementById("measles")?.checked) history.push("Measles");
    if(document.getElementById("covid")?.checked) history.push("COVID-19");
    if(document.getElementById("smallpox")?.checked) history.push("Smallpox");
    if(document.getElementById("tetanus")?.checked) history.push("Tetanus");

    document.getElementById("r_history").textContent =
        history.length ? history.join(", ") : "None";

    // Gender
    let gender = document.querySelector('input[name="gender"]:checked');

    document.getElementById("r_gender").textContent =
        gender ? gender.value.trim() : "";

    // Vaccinated
    let vaccinated = document.querySelector('input[name="vaccinated"]:checked');

    document.getElementById("r_vaccinated").textContent =
        vaccinated ? vaccinated.value.trim() : "";

    // Insurance
    let insurance = document.querySelector('input[name="insurance"]:checked');

    document.getElementById("r_insurance").textContent =
        insurance ? insurance.value.trim() : "";

    // Emergency Contact
    let emergencyName =
        document.getElementById("emergencyName") ?
        document.getElementById("emergencyName").value : "";

    let emergencyPhone =
        document.getElementById("emergencyPhone") ?
        document.getElementById("emergencyPhone").value : "";

    document.getElementById("r_emergency").textContent =
        emergencyName + " " + emergencyPhone;

    // Health Rating
    document.getElementById("r_health").textContent =
        document.getElementById("healthSlider").value + "/10";

    // User ID
    let userID = document.getElementById("userid").value.toLowerCase();

    document.getElementById("userid").value = userID;

    document.getElementById("r_user").textContent = userID;

    // Password (masked)
    let password = document.getElementById("password").value;

    document.getElementById("r_password").textContent =
        "*".repeat(password.length);
}

function validateFirstName() {
    const first = document.getElementById("fname").value.trim();

    const firstRegex = /^[A-Za-z'-]{1,30}$/;


    clearError("fnameError");


    if (!firstRegex.test(first)) {
        showError("fnameError", "At least 1 first name required. Letters, apostrophes, and dashes only.");
        return false;
    }

    return true;
}

function validateMiddleInitial() {
    const middle = document.getElementById("mi").value.trim();
    const middleRegex = /^[A-Za-z]?$/;

    clearError("miError");

    if (!middleRegex.test(middle)) {
        showError("miError", "Middle initial must be blank or 1 letter only.");
        return false;
    }

    return true;
}

function validateLastName() {
    const last = document.getElementById("lname").value.trim();
    const lastRegex = /^[A-Za-z'-]*[2-5]?[A-Za-z'-]*$/;

    clearError("lnameError");

    if (last.length < 1 || last.length > 30 || !lastRegex.test(last)) {
        showError("lnameError", "At least 1 last name required. Letters, apostrophes, dashes, and numbers 2-5 only.");
        return false;
    }

    return true;
}

function validateNames() {
    let valid = true;

    if (!validateFirstName()) valid = false;
    if (!validateMiddleInitial()) valid = false;
    if (!validateLastName()) valid = false;

    return valid;
}


function formatPhone(fieldId) {

    let phone = document.getElementById(fieldId).value;

    // Remove everything except numbers
    phone = phone.replace(/\D/g, "");

    // Limit to 10 digits
    phone = phone.substring(0, 10);

    // Add dashes automatically
    if (phone.length > 6) {
        phone = phone.substring(0, 3) + "-" +
                phone.substring(3, 6) + "-" +
                phone.substring(6);
    }
    else if (phone.length > 3) {
        phone = phone.substring(0, 3) + "-" +
                phone.substring(3);
    }

    document.getElementById(fieldId).value = phone;
}

function validateDOB() {
    const dobField = document.getElementById("dob");
    clearError("dobError");

    if (dobField.value === "") {
        showError("dobError", "Date of birth is required.");
        return false;
    }

    const dob = new Date(dobField.value);
    const today = new Date();

    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    if (dob > today) {
        showError("dobError", "Date of birth cannot be in the future.");
        return false;
    }

    if (dob < minDate) {
        showError("dobError", "Date of birth cannot be more than 120 years ago.");
        return false;
    }

    return true;
}

function formatSSN() {

    let ssn = document.getElementById("ssn").value;

    // Remove everything except numbers
    ssn = ssn.replace(/\D/g, "");

    // Only allow 9 digits
    ssn = ssn.substring(0, 9);

    // Add dashes automatically
    if (ssn.length > 5) {

        ssn = ssn.substring(0,3) + "-" +
              ssn.substring(3,5) + "-" +
              ssn.substring(5);

    }

    else if (ssn.length > 3) {

        ssn = ssn.substring(0,3) + "-" +
              ssn.substring(3);

    }

    document.getElementById("ssn").value = ssn;
}




function validateSSN() {
    const ssn = document.getElementById("ssn").value.trim();
    clearError("ssnError");

    if (ssn === "") {
        return true;
    }

    if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) {
        showError("ssnError", "SSN must be in this format: 123-45-6789.");
        return false;
    }

    return true;
}




function validatePhone(fieldId) {

    let phone = document.getElementById(fieldId).value.trim();


    clearError(fieldId + "Error");

    // Check if phone number is blank
    if (phone == "") {
        showError(fieldId + "Error", "Phone number is required.");
        return false;
    }

    // Check format 123-456-7890
    let phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!phoneRegex.test(phone)) {
        showError(fieldId + "Error", "Phone number must be in the format 123-456-7890.");
        return false;
    }

    return true;
}
function validatePassword() {

    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Must be between 8 and 30 characters
    if (password.length < 8 || password.length > 30) {
        alert("Password must be between 8 and 30 characters.");
        return false;
    }

    // Must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        alert("Password must contain at least one uppercase letter.");
        return false;
    }

    // Must contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        alert("Password must contain at least one lowercase letter.");
        return false;
    }

    // Must contain at least one number
    if (!/[0-9]/.test(password)) {
        alert("Password must contain at least one number.");
        return false;
    }

    // Must contain at least one special character
    if (!/[!@#%^&*()\-_=+\\\/><.,`~]/.test(password)) {
        alert("Password must contain at least one special character.");
        return false;
    }

    // Do NOT allow quotation marks
    if (password.includes('"')) {
        alert('Password cannot contain quotation marks (").');
        return false;
    }

    // Passwords must match
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}
function validateAddress(fieldId, errorId, required) {

    let address = document.getElementById(fieldId).value.trim();

    clearError(errorId);

    // Required field check
    if (required && address === "") {
        showError(errorId, "Address Line 1 is required.");
        return false;
    }

    // Address Line 2 can be blank
    if (!required && address === "") {
        return true;
    }

    // Length check
    if (address.length < 2 || address.length > 30) {
        showError(errorId, "Address must be between 2 and 30 characters.");
        return false;
    }

    return true;
}

function validateCity() {

    let city = document.getElementById("city").value.trim();

    clearError("cityError");

    if (city === "") {
        showError("cityError", "City is required.");
        return false;
    }

    let cityRegex = /^[A-Za-z' -]{2,30}$/;

    if (!cityRegex.test(city)) {
        showError("cityError", "City must be 2-30 letters only.");
        return false;
    }

    return true;
}

function validateState() {

    let state = document.getElementById("state").value;
    clearError("stateError");

    if (state == "") {
        showError("stateError", "State is required.");
        return false;
    }

    return true;
}

function numbersOnly(field) {

    field.value = field.value.replace(/\D/g, "");

}
function validateZip() {

    let zip = document.getElementById("zip").value.trim();

    clearError("zipError");

    // Required
    if (zip === "") {
        showError("zipError", "ZIP Code is required.");
        return false;
    }

    // Must be exactly 5 digits
    let zipRegex = /^\d{5}$/;

    if (!zipRegex.test(zip)) {
        showError("zipError", "ZIP Code must contain exactly 5 digits.");
        return false;
    }

    return true;
}
function validateEmail() {
    let email = document.getElementById("email").value.trim();
    clearError("emailError");

    if (email === "") {
        showError("emailError", "Email is required.");
        return false;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showError("emailError", "Please enter a valid email address.");
        return false;
    }

    return true;
}


function validateUserID() {

    let userid = document.getElementById("userid").value.trim();

    clearError("useridError");

    // Required
    if (userid === "") {
        showError("useridError", "User ID is required.");
        return false;
    }

    // Length check
    if (userid.length < 5 || userid.length > 20) {
        showError("useridError", "User ID must be between 5 and 20 characters.");
        return false;
    }

    // Cannot start with a number
    if (/^[0-9]/.test(userid)) {
        showError("useridError", "User ID cannot start with a number.");
        return false;
    }

    // Only letters, numbers, dash and underscore
    let userRegex = /^[A-Za-z][A-Za-z0-9_-]*$/;

    if (!userRegex.test(userid)) {
        showError("useridError", "Only letters, numbers, dash (-), and underscore (_) are allowed. No spaces.");
        return false;
    }

    return true;
}

function validateEmergencyName() {
    let emergencyName = document.getElementById("emergencyName").value.trim();
    clearError("emergencyNameError");

    if (emergencyName === "") {
        showError("emergencyNameError", "Emergency contact name is required.");
        return false;
    }

    return true;
}


function validateForm() {
    let valid = true;

    if (!validateNames()) valid = false;
    if (!validateDOB()) valid = false;
    if (!validateSSN()) valid = false;
    if (!validatePassword()) valid = false;
    if (!validatePhone("phone")) valid = false;
    if (!validateAddress("address1", "address1Error", true)) valid = false;
    if (!validateAddress("address2", "address2Error", false)) valid = false;
    if (!validateCity()) valid = false;
    if (!validateState()) valid = false;
    if (!validateZip()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validateUserID()) valid = false;
    if (!validatePhone("emergencyPhone")) valid = false;
    if (!validateEmergencyName()) valid = false;

        

    if(valid) {
        alert("Form submitted successfully!");
    }
    return valid;

}





















