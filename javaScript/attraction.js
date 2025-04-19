//For navigation bar scrolling
window.addEventListener("scroll", function () {
    let navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "white"; // Solid color when scrolling down
    } else {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.756)"; // Original transparent style
    }
});

//weatherTool
function getWeatherByCity() {
    const city = $("#cityInput").val().trim();
    const $weatherBox = $("#weather");

    if (!city) {
        $weatherBox.html("<p>Please enter a city name.</p>");
        return;
    }

    $weatherBox.html(`<p class="loading">Fetching weather for ${city}...</p>`);
    const API_KEY = "f4612304e54aeb83cb7706cbade6a158";

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather`,
        method: "GET",
        data: {
            q: city,
            appid: API_KEY,
            units: "metric"
        },
        success: function (data) {
            $weatherBox.html(`
                <h3>Weather in ${data.name}, ${data.sys.country}</h3>
                <p>${data.weather[0].main} - ${data.weather[0].description}</p>
                <p>🌡 Temperature: ${data.main.temp} °C</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
            `);
        },
        error: function (xhr) {
            const msg = xhr.responseJSON?.message || "Unable to fetch weather data.";
            $weatherBox.html(`<p>❌ ${msg}</p>`);
        }
    });
}
