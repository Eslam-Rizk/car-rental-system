// Initialize promo code functionality

import { checkLogin, logout } from "../utils/navUtils.js";
import { getCarIdFromUrl, findCarById, populateCarDetails, displayTopRatedCars, setupBookingButton } from "../utils/carUtils.js";
import { initializeImageModal } from "../utils/imageModalUtils.js";
import { initializePrice, initializePromoCode, calculatePrice } from "../utils/calculatePrice.js";
import { seedStorage, savedCars } from "../mock/storage/seedStorage.js";

// Initialize storage
seedStorage();
checkLogin();
logout();

// Populate car details
(function populatePageDetails() {
    const carId = getCarIdFromUrl();
    const cars = savedCars.get();
    const car = findCarById(cars, carId);

    if (car) {
        populateCarDetails(car);
        displayTopRatedCars(cars, carId);

        // Store a reference to the original price calculation
        const originalPrice = car.dailyRate;

        // Initialize price calculation with the car's daily rate
        initializePrice(originalPrice);

        // Keep track of extras and dates for recalculation
        const extrasCheckboxes = document.querySelectorAll('.extra-checkbox');
        const pickupDateInput = document.getElementById('pickup-date');
        const dropoffDateInput = document.getElementById('dropoff-date');

        // Initialize promo code functionality
        const promoManager = initializePromoCode();

        // Add event listeners for recalculating price when extras or dates change
        extrasCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => calculatePrice(promoManager.getDiscountPercentage()));
        });

        pickupDateInput.addEventListener('change', () => calculatePrice(promoManager.getDiscountPercentage()));
        dropoffDateInput.addEventListener('change', () => calculatePrice(promoManager.getDiscountPercentage()));

        // Initial price calculation
        calculatePrice(0);

        // Setup the Book Now button behavior
        setupBookingButton(carId, promoManager.getDiscountPercentage);
    } else {
        console.error('Car not found');
    }

    // Initialize modal behavior
    initializeImageModal('.car-image');
})();

