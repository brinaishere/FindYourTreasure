document.addEventListener("DOMContentLoaded", function () {
    const itineraryForm = document.getElementById("itineraryForm");
    const itineraryList = document.getElementById("itineraryList");
    const clearBtn = document.getElementById("clearBtn");
    const downloadBtn = document.getElementById("downloadPdf");

    // Function to load saved itineraries from localStorage
    function loadItinerary() {
        itineraryList.innerHTML = "";  // Clear the list before reloading
        const itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];
        itineraries.forEach((item, index) => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = `<strong>${item.date} - ${item.destination}</strong>: ${item.activity} 
                <button class="btn btn-danger btn-sm float-end delete-btn" data-index="${index}">🗑 Delete</button>`;
            itineraryList.appendChild(li);
        });
    }

    // Event listener for form submission
    itineraryForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const date = document.getElementById("date").value;
        const destination = document.getElementById("destination").value;
        const activity = document.getElementById("activity").value;

        // Save current itinerary to sessionStorage (for temporary use)
        sessionStorage.setItem("currentDate", date);
        sessionStorage.setItem("currentDestination", destination);
        sessionStorage.setItem("currentActivity", activity);

        // Retrieve existing itineraries from localStorage
        const itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];
        itineraries.push({ date, destination, activity });

        // Save updated itineraries to localStorage
        localStorage.setItem("itineraries", JSON.stringify(itineraries));

        // Reset form and reload the itinerary list
        itineraryForm.reset();
        loadItinerary();
    });

    // Event listener for the "Clear" button to delete all itineraries
    clearBtn.addEventListener("click", function () {
        localStorage.removeItem("itineraries");
        itineraryList.innerHTML = ""; // Clear the list immediately
    });

    // Event listener for the "Download PDF" button
    downloadBtn.addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Itinerary Planner", 10, 10);
        const itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];
        let y = 20;
        itineraries.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.date} - ${item.destination}`, 10, y);
            doc.text(`   Activities: ${item.activity}`, 10, y + 5);
            y += 15;
        });
        doc.save("Itinerary.pdf");
    });

    // Event delegation to handle delete button clicks
    itineraryList.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            const itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];

            // Remove the selected itinerary from the array
            itineraries.splice(index, 1);

            // Save the updated itineraries back to localStorage
            localStorage.setItem("itineraries", JSON.stringify(itineraries));

            // Reload the itinerary list after deletion
            loadItinerary();
        }
    });

    // Load the saved itineraries when the page is loaded
    loadItinerary();
});

