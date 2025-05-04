import { attachNavAndFooter, checkLogin, logout } from "./utils/navUtils.js";
import { getCarIdFromUrl, findCarById, populateCarDetails, displayTopRatedCars, setupBookingButton } from "./utils/carUtils.js";
import { initializeImageModal } from "./utils/imageModalUtils.js";
import { initializePrice, initializePromoCode, calculatePrice } from "./utils/calculatePrice.js";
import { seedStorage, savedCars } from "../../mock/storage/seedStorage.js";


seedStorage();
attachNavAndFooter();

(function populatePageDetails() {
    const carId = getCarIdFromUrl();
    const cars = savedCars.get();
    const car = findCarById(cars, carId);

    if (car) {
        populateCarDetails(car);

        const originalPrice = car.dailyRate;
        initializePrice(originalPrice);

        const extrasCheckboxes = document.querySelectorAll('.extra-checkbox');
        const pickupDateInput = document.getElementById('pickup-date');
        const dropoffDateInput = document.getElementById('dropoff-date');
        const promoManager = initializePromoCode();

        extrasCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => calculatePrice(promoManager.getDiscountPercentage()));
        });

        pickupDateInput.addEventListener('change', () => calculatePrice(promoManager.getDiscountPercentage()));
        dropoffDateInput.addEventListener('change', () => calculatePrice(promoManager.getDiscountPercentage()));

        calculatePrice(0);

        setupBookingButton(carId, promoManager.getDiscountPercentage);
    } else {
        console.error('Car not found');
    }
    displayTopRatedCars(cars, carId);

    initializeImageModal('.car-image');
})();

