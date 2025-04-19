//For navigation bar scrolling
window.addEventListener("scroll", function () {
    let navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "white"; // Solid color when scrolling down
    } else {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.756)"; // Original transparent style
    }
});