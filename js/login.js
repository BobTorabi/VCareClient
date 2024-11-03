const API_URL = 'https://api.vcareapp.net/api/v1/account/login';

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const loginButton = document.querySelector("button[type='submit']");
    loginButton.disabled = true;
    loginButton.textContent = "Loading...";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.status === 200) {
            localStorage.setItem("firstName", data.data.userDetails.firstName);
            document.cookie = `authToken=${data.data.token}; path=/`;
            document.cookie = `refreshToken=${data.data.refreshToken}; path=/`;
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("loginError").textContent = "Invalid email or password.";
        }
    } catch (error) {
        document.getElementById("loginError").textContent = "An error occurred. Please try again.";
    } finally {
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }
});