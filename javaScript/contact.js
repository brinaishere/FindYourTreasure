//For navigation bar scrolling
window.addEventListener("scroll", function () {
    let navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "white"; // Solid color when scrolling down
    } else {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.756)"; // Original transparent style
    }
});

//Accept only letter or space for name input
function letterOnly(event) {
    const key = event.key;
    const isLetterOrSpace = /^[A-Za-z\s]$/.test(key);
    const isControlKey = ['Backspace', 'Tab'].includes(event.key);
    if (!isLetterOrSpace && !isControlKey){
        event.preventDefault();/*stop the input event when not letters or not space inserted*/
        alert("Only letters allowed for your name.")
    }
}

//automatically change the first character to uppercase
document.getElementById("name").addEventListener("input", function (event) {
    const input = event.target;
    input.value = input.value.replace(/\b\w/g, (char) => char.toUpperCase());
});

//show the faq answer when the question button clicked
document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});

//form submited message
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); 
            alert("Thank you! Your message has been sent successfully.");/*when the form sent successfully*/
            this.reset();/*reset the form to empty*/
        });
    }
});


// Cookie helpers
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    console.log(`Cookie set: ${name} = ${value}`);
}

function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr) {
        const [cName, cValue] = cookie.trim().split('=');
        if (cName === name) return decodeURIComponent(cValue);
    }
    return '';
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}  

// Toast function
function showToast(message = "✔ Info saved!") {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Main logic
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const rememberBtn = document.getElementById("rememberBtn");

    // Prefill
    const savedName = getCookie('userName');
    const savedEmail = getCookie('userEmail');

    if (savedName || savedEmail) {
        nameField.value = savedName;
        emailField.value = savedEmail;
        rememberBtn.textContent = "Forget Me";
    }

    rememberBtn.addEventListener("click", () => {
        if (rememberBtn.textContent === "Remember Me") {
            setCookie('userName', nameField.value, 30);
            setCookie('userEmail', emailField.value, 30);
            rememberBtn.textContent = "Forget Me";
            showToast("✔ Info remembered!");
        } else {
            deleteCookie('userName');
            deleteCookie('userEmail');
            rememberBtn.textContent = "Remember Me";
            showToast("🗑 Info forgotten!");
        }
    });

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you! Your message has been sent successfully.");
            this.reset();
        });
    }
});