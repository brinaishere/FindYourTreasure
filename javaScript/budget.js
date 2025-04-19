//country scroll
document.querySelectorAll('.country-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.country-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const countryId = btn.getAttribute('data-country');
        document.getElementById(countryId).classList.add('active');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

//scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.info-card, .treasure-tips, .budget-stays');

    elements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elTop < windowHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

document.querySelectorAll('.info-card, .treasure-tips, .budget-stays').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


//like function
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".like-btn").forEach(button => {
        const id = button.id;
        const liked = localStorage.getItem(id);
        if (liked === "true") {
            button.classList.remove("btn-outline-danger");
            button.classList.add("btn-danger");
            button.textContent = "❤ Liked";
        }

        button.addEventListener("click", function () {
            const isLiked = localStorage.getItem(id) === "true";
            if (isLiked) {
                localStorage.setItem(id, "false");
                button.classList.remove("btn-danger");
                button.classList.add("btn-outline-danger");
                button.textContent = "❤ Like";
            } else {
                localStorage.setItem(id, "true");
                button.classList.remove("btn-outline-danger");
                button.classList.add("btn-danger");
                button.textContent = "❤ Liked";
            }
        });
    });
});
