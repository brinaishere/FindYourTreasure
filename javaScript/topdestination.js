let currentImages = [];
let currentIndex = 0;
let indicators = [];
let autoSlide;

function openModal(images, title, text) {
    currentImages = images;
    currentIndex = 0;

    document.getElementById("modal-img").src = images[currentIndex];
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-text").innerText = text;
    document.getElementById("country-name").innerText = title;
    
    //Set modal introduction content
    let introduction = '';
    if (title === 'Korea') {
        introduction = `
            <div class="modal-feature">
                <i class="bi bi-building"></i>
                <div>
                    <h6>Blend of Modern & Traditional</h6>
                    <p>Explore high-tech Seoul and ancient temples in Gyeongju</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-egg-fried"></i>
                <div>
                    <h6>Food Paradise</h6>
                    <p>Korean BBQ, street food, and the world's best fried chicken</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-tree"></i>
                <div>
                    <h6>Four Seasons Beauty</h6>
                    <p>Cherry blossoms in spring, beaches in summer, foliage in autumn, skiing in winter</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-music-note-beamed"></i>
                <div>
                    <h6>K-Wave Culture</h6>
                    <p>K-pop, K-dramas, and cutting-edge fashion</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-coin"></i>
                <div>
                    <h6>Affordable Luxury</h6>
                    <p>World-class experiences at reasonable prices</p>
                </div>
            </div>
            <div class="best-time mt-4">
                <i class="bi bi-calendar-check"></i>
                <strong>Best Time to Visit:</strong> April-May (spring) or September-October (autumn)
            </div>
        `;
    } else if (title === 'China') {
        introduction = `
           <div class="modal-feature">
                <i class="bi bi-hourglass-split"></i>
                <div>
                    <h6>Ancient Civilization</h6>
                    <p>Walk the Great Wall, explore the Forbidden City, see the Terracotta Army</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-tree"></i>
                <div>
                    <h6>Diverse Landscapes</h6>
                    <p>From Yangshuo's karst mountains to Zhangjiajie's floating peaks</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-egg-fried"></i>
                <div>
                    <h6>Culinary Journey</h6>
                    <p>Eight major cuisines from spicy Sichuan to delicate Cantonese</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-building"></i>
                <div>
                    <h6>Modern Marvels</h6>
                    <p>Shanghai's skyline, Hong Kong's vibrancy, Shenzhen's innovation</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-train-lightrail-front"></i>
                <div>
                    <h6>Efficient Transport</h6>
                    <p>World's largest high-speed rail network connects major cities</p>
                </div>
            </div>
            <div class="best-time mt-4">
                <i class="bi bi-calendar-check"></i>
                <strong>Best Time to Visit:</strong> April-May or September-October for most regions</p>
        `;
    } else if (title === 'France') {
        introduction = `
           <div class="modal-feature">
                <i class="bi bi-palette"></i>
                <div>
                    <h6>Cultural Capital</h6>
                    <p>Louvre, Musée d'Orsay, and countless galleries</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-cup-straw"></i>
                <div>
                    <h6>Gastronomic Heaven</h6>
                    <p>From croissants to coq au vin, plus world-class wines</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-heart"></i>
                <div>
                    <h6>Romantic Getaways</h6>
                    <p>Parisian boulevards, Provence lavender fields, Riviera beaches</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-building"></i>
                <div>
                    <h6>Architectural Wonders</h6>
                    <p>Eiffel Tower, Notre-Dame, Mont Saint-Michel</p>
                </div>
            </div>
            <div class="modal-feature">
                <i class="bi bi-bag"></i>
                <div>
                    <h6>Fashion & Shopping</h6>
                    <p>Haute couture, charming boutiques, and flea markets</p>
                </div>
            </div>
            <div class="best-time mt-4">
                <i class="bi bi-calendar-check"></i>
                <strong>Best Time to Visit:</strong> April-June or September-October for pleasant weather
            </div>
        `;
    }
    document.getElementById("modal-introduction").innerHTML = introduction;
    document.getElementById("modal").style.display = "block";
    document.body.style.overflow = "hidden"; 
}
// Close the modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = "auto";
}

// Initialize favorite icons
function initFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteDestinations')) || [];
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const destination = btn.dataset.destination;
        if (favorites.includes(destination)) {
            btn.innerHTML = '<i class="bi bi-heart-fill"></i> Saved';
            btn.classList.add('favorited');
        }
    });
}
// Toggle favorite status (add/remove)
function toggleFavorite(event, destination) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    let favorites = JSON.parse(localStorage.getItem('favoriteDestinations')) || [];
    
    if (favorites.includes(destination)) {
        favorites = favorites.filter(item => item !== destination);
        button.innerHTML = '<i class="bi bi-heart"></i> Saved';
        button.classList.remove('favorited');
    } else {
        favorites.push(destination);
        button.innerHTML = '<i class="bi bi-heart-fill"></i> Saved to your favorites';
        button.classList.add('favorited');
    }
    
    localStorage.setItem('favoriteDestinations', JSON.stringify(favorites));
    updateFavoritesList();
}

// Build the favorites panel list
function updateFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem('favoriteDestinations')) || [];
    const favoritesList = document.getElementById('favoritesList');
    
    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<div class="text-center py-4"><i class="bi bi-heart text-muted" style="font-size: 2rem;"></i><p class="text-muted mt-2">No Favorites Destination</p></div>';
        return;
    }
    
    favorites.forEach(dest => {
        let imgSrc, description, images, text;
        if (dest === 'Korea') {
            imgSrc = 'Photo/korea.jpg';
            description = 'A perfect harmony of tradition and modernity.';
            images = ['Photo/korea.jpg'];
            text = 'A country where modernity and tradition blend seamlessly, offering an unforgettable experience of Korean culture and cuisine.';
        } else if (dest === 'China') {
            imgSrc = 'Photo/china.jpg';
            description = 'A land of ancient heritage and vibrant culture.';
            images = ['Photo/china.jpg'];
            text = 'A land of ancient history and rich cultural heritage, explore the Great Wall and indulge in a culinary adventure.';
        } else if (dest === 'France') {
            imgSrc = 'Photo/france.jpg';
            description = 'The heart of art, fine dining, and timeless romance.';
            images = ['Photo/france.jpg'];
            text = 'The romantic city of Paris, a haven for art, culture, and gourmet delights.';
        }
        
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.innerHTML = `
            <img src="${imgSrc}" alt="${dest}">
            <div class="favorite-item-info">
                <h6>${dest}</h6>
                <p class="text-muted small mb-0">${description}</p>
            </div>
            <button class="btn btn-sm btn-outline-danger remove-favorite" data-destination="${dest}">
                <i class="bi bi-trash"></i>
            </button>
        `;
        // Clicking on the item
        item.addEventListener('click', (e) => {
            if (e.target.closest('.remove-favorite')) return;
            document.getElementById('favoritesPanel').classList.remove('show');
            openModal(images, dest, text);
        });
        
        favoritesList.appendChild(item);
    });
    // Add trash buttons to remove
    document.querySelectorAll('.remove-favorite').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); 
            const destination = this.dataset.destination;
            let favorites = JSON.parse(localStorage.getItem('favoriteDestinations')) || [];
            favorites = favorites.filter(item => item !== destination);
            localStorage.setItem('favoriteDestinations', JSON.stringify(favorites));
            
            updateFavoritesList();
            document.querySelectorAll(`.favorite-btn[data-destination="${destination}"]`).forEach(button => {
                button.innerHTML = '<i class="bi bi-heart"></i> Add To Favourite';
                button.classList.remove('favorited');
            });
        });
    });
}

function handleFavoriteClick(event, destination) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(event, destination);
}

window.addEventListener('DOMContentLoaded', initFavorites);
document.getElementById('showFavoritesBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('favoritesPanel').classList.add('show');
    updateFavoritesList();
});

document.getElementById('closeFavorites').addEventListener('click', function() {
    document.getElementById('favoritesPanel').classList.remove('show');
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.closest('.favorite-btn')) return;
        const firstImage = this.querySelector('video').poster;
        const title = this.querySelector('.card-title').textContent;
        const text = this.querySelector('.card-text').textContent;
        openModal([firstImage], title, text);
    });
});