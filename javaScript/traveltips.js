$(document).ready(function () {
    const checklistItems = [
        'passportVisa',
        'travelInsurance',
        'medications',
        'chargerPowerBank',
        'nationalID',
        'flightTickets',
        'clothesToiletries'
    ];
    

    // Load saved checkbox states from localStorage
    function loadChecklistState() {
        checklistItems.forEach(id => {
            const savedState = localStorage.getItem(id);
            if (savedState !== null) {
                $(`#${id}`).prop('checked', savedState === 'true');
            }
        });
    }

    loadChecklistState();  // Initialize state on page load

    // Save checkbox state to localStorage when changed
    $('input[type="checkbox"]').change(function () {
        localStorage.setItem(this.id, this.checked);
    });

    // Currency Converter Logic
    $('#currencyForm').on('submit', function (event) {
        event.preventDefault();

        const fromCurrency = $('#fromCurrency').val().toUpperCase().trim();
        const toCurrency = $('#toCurrency').val().toUpperCase().trim();
        const amount = parseFloat($('#amount').val());

        // Input Validation
        if (!fromCurrency || !toCurrency || isNaN(amount) || amount <= 0) {
            $('#result').text('Please enter valid currency codes and amount.');
            return;
        }

        const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

        // Fetch exchange rate
        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (response) {
                if (response.rates && response.rates[toCurrency]) {
                    const rate = response.rates[toCurrency];
                    const convertedAmount = (amount * rate).toFixed(2);
                    $('#result').html(`<strong>${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}</strong>`);
                } else {
                    $('#result').text('Invalid currency code. Please try again.');
                }
            },
            error: function (xhr, status, error) {
                console.error('API Error:', error);
                $('#result').text('Error fetching exchange rates. Please try again.');
            }
        });
    });
});
