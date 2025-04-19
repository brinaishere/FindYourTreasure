//For navigation bar scrolling
window.addEventListener("scroll", function () {
    let navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "white"; // Solid color when scrolling down
    } else {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.756)"; // Original transparent style
    }
});


// Cookie helper functions
const signInLink = document.getElementById("signInLink");
const usernameDisplay = document.getElementById("usernameDisplay");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    document.addEventListener("DOMContentLoaded", function () {
        const loginForm = document.getElementById("loginForm");
        const usernameDisplay = document.getElementById("usernameDisplay");
        const signInLink = document.getElementById("signInLink");

        function updateUI(username) {
            if (username) {
                usernameDisplay.textContent = "Welcome, " + username;
                usernameDisplay.style.display = "inline";
                signInLink.textContent = "Sign Out";
                signInLink.removeAttribute("data-bs-toggle");
                signInLink.removeAttribute("data-bs-target");
            } else {
                usernameDisplay.style.display = "none";
                usernameDisplay.textContent = "";
                signInLink.textContent = "Sign In";
                signInLink.setAttribute("data-bs-toggle", "modal");
                signInLink.setAttribute("data-bs-target", "#loginModal");
            }
        }

        // Handle form submission (Login)
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value.trim();

            if (username) {
                setCookie("username", username, 7); // Store in cookie
                updateUI(username);

                // Hide modal
                const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
                loginModal.hide();

                // Clear input fields
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
            }
        });

        // Handle Sign Out
        signInLink.addEventListener("click", function (event) {
            if (this.textContent === "Sign Out") {
                event.preventDefault();
                deleteCookie("username");
                updateUI(null);
            }
        });

        // Restore login state from cookie on page load
        const savedUsername = getCookie("username");
        updateUI(savedUsername);
    });


