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


function validateNames() {
    let valid = true;

    const first = document.getElementById("fname").value.trim();
    const middle = document.getElementById("mi").value.trim();
    const last = document.getElementById("lname").value.trim();

    const firstRegex = /^[A-Za-z'-]{1,30}$/;
    const middleRegex = /^[A-Za-z]?$/;
    const lastRegex = /^[A-Za-z'-]*[2-5]?[A-Za-z'-]*$/;

    clearError("fnameError");
    clearError("miError");
    clearError("lnameError");

    if (!firstRegex.test(first)) {
        showError("fnameError", "At least 1 first name required. Letters, apostrophes, and dashes only.");
        valid = false;
    }

    if (!middleRegex.test(middle)) {
        showError("miError", "Middle initial must be blank or 1 letter only.");
        valid = false;
    }

    if (last.length < 1 || last.length > 30 || !lastRegex.test(last)) {
        showError("lnameError", "At least 1 last name required. Letters, apostrophes, dashes, and numbers 2-5 only.");
        valid = false;
    }

    return valid;
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

function validateForm() {
    let valid = true;

    if (!validateNames()) valid = false;
    if (!validateDOB()) valid = false;
    if (!validateSSN()) valid = false;
    if (!validatePassword()) valid = false;

    if(valid) {
        alert("Form submitted successfully!");
    }
    return valid;

}





















