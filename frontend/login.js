document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");

    error.innerText = "";

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(user => {
            // We only store the ID in sessionStorage to point to the DB record
            sessionStorage.setItem("userId", user.id);
            console.log("Login successful, database session active");
            window.location.href = "home.html";
        })
        .catch(() => {
            error.innerText = "Invalid email or password";
        });
});
