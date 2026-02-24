document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    emailError.style.display = "none";
    passwordError.style.display = "none";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
        emailError.innerText = "Enter a valid email address";
        emailError.style.display = "block";
        return;
    }

    if (!passwordRegex.test(password)) {
        passwordError.innerText =
            "Password must have 8 chars, 1 uppercase, 1 number & 1 special symbol";
        passwordError.style.display = "block";
        return;
    }

    if (password !== confirmPassword) {
        passwordError.innerText = "Passwords mismatch";
        passwordError.style.display = "block";
        return;
    }

    // ✅ BACKEND REGISTER
    fetch("https://folio2resume-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.text();
    })
    .then(() => {
        const successMsg = document.getElementById("successMsg");
        successMsg.innerText = "User registered successfully. Please login.";
        successMsg.style.display = "block";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);
    })
    .catch(() => {
        emailError.innerText = "User with this email already registered";
        emailError.style.display = "block";
    });
});
