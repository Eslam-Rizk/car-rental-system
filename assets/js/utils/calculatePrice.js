// calculatePrice.js
import { getCarIdFromUrl, findCarById } from "./carUtils.js";
import { savedCars } from "../../../mock/storage/seedStorage.js";

export function initializePrice(carPricePerDay) {
    //console.log('Initializing price calculation with car price per day:', carPricePerDay);
    const extraCheckboxes = document.querySelectorAll('.extra-checkbox');
    const subTotalElement = document.getElementById('subTotal');
    const taxElement = document.getElementById('taxAmount');
    const totalElement = document.getElementById('totalPayable');
    const pickupDateInput = document.getElementById('pickup-date');
    const dropoffDateInput = document.getElementById('dropoff-date');

    function calculateRentalDays() {
        const pickupDate = new Date(pickupDateInput.value);
        const dropoffDate = new Date(dropoffDateInput.value);

        if (isNaN(pickupDate) || isNaN(dropoffDate)) {
            //console.error('Invalid date selected');
            return 1; // Default to 1 day if dates are not properly selected
        }

        const diffTime = Math.abs(dropoffDate - pickupDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        //console.log('Calculated rental days:', diffDays);
        return diffDays || 1; // At least 1 day
    }

    function calculateTotal() {
        const rentalDays = calculateRentalDays();
        //console.log('Rental days:', rentalDays);

        // Base price for the car
        let subTotal = carPricePerDay * rentalDays;
        //console.log('Base subtotal:', subTotal);

        // Add selected extras
        extraCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const extraPricePerDay = parseFloat(checkbox.dataset.price);
                subTotal += extraPricePerDay * rentalDays;
            }
        });

        const tax = subTotal * 0.10; // Assuming 10% tax
        const total = subTotal + tax;
        //console.log('Subtotal:', subTotal);

        subTotalElement.textContent = `$${subTotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    extraCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    pickupDateInput.addEventListener('change', calculateTotal);
    dropoffDateInput.addEventListener('change', calculateTotal);

    // Initial calculation
    calculateTotal();
}
export function initializePromoCode() {
    const promoCodeInput = document.getElementById('promo-code');
    const applyPromoButton = document.getElementById('apply-promo');
    const promoMessage = document.getElementById('promo-message');
    let discountPercentage = 0;

    applyPromoButton.addEventListener('click', function () {
        const promoCode = promoCodeInput.value.trim().toUpperCase();

        // Reset message
        promoMessage.style.display = 'none';
        promoMessage.className = 'mt-2';

        // Check promo code validity
        if (promoCode === 'SAVE10') {
            discountPercentage = 10; // 10% discount
            showPromoMessage('10% discount applied successfully!', 'text-success');
        } else if (promoCode === 'SAVE20') {
            discountPercentage = 20; // 20% discount
            showPromoMessage('20% discount applied successfully!', 'text-success');
        } else {
            discountPercentage = 0;
            showPromoMessage('Invalid promo code. Please try again.', 'text-danger');
            return;
        }

        // Update prices with discount
        calculatePrice(discountPercentage);
    });

    function showPromoMessage(message, className) {
        promoMessage.textContent = message;
        promoMessage.classList.add(className);
        promoMessage.style.display = 'block';
    }

    // Return the discount percentage so it can be used elsewhere if needed
    return {
        getDiscountPercentage: function () {
            return discountPercentage;
        }
    };
}

export function calculatePrice(discountPercentage = 0) {
    const subTotalElement = document.getElementById('subTotal');
    const taxAmountElement = document.getElementById('taxAmount');
    const totalPayableElement = document.getElementById('totalPayable');

    const pickupDate = new Date(document.getElementById('pickup-date').value);
    const dropoffDate = new Date(document.getElementById('dropoff-date').value);

    // Get the car daily rate
    const carId = getCarIdFromUrl();
    const car = findCarById(savedCars.get(), carId);
    const dailyRate = car ? car.dailyRate : 0;

    // Calculate number of days
    let days = 0;
    if (!isNaN(pickupDate.getTime()) && !isNaN(dropoffDate.getTime())) {
        days = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));
        days = Math.max(1, days); // Minimum 1 day
    }

    // Calculate base rental cost
    let basePrice = dailyRate * days;

    // Add extras
    let extrasTotal = 0;
    document.querySelectorAll('.extra-checkbox:checked').forEach(checkbox => {
        extrasTotal += parseFloat(checkbox.getAttribute('data-price'));
    });

    // Calculate subtotal
    let subtotal = basePrice + extrasTotal;

    // Apply discount if any
    if (discountPercentage > 0) {
        const discountAmount = subtotal * (discountPercentage / 100);
        subtotal -= discountAmount;
    }

    // Calculate tax (10%)
    const tax = subtotal * 0.1;

    // Calculate total
    const total = subtotal + tax;

    // Update UI
    subTotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxAmountElement.textContent = `$${tax.toFixed(2)}`;
    totalPayableElement.textContent = `$${total.toFixed(2)}`;

    return { subtotal, tax, total };
}