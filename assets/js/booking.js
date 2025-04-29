// Car data for pricing
const cars = {
    compact: {
        name: 'Toyota Yaris',
        dailyRate: 50
    },
    sedan: {
        name: 'Honda Accord',
        dailyRate: 70
    },
    suv: {
        name: 'Ford Explorer',
        dailyRate: 90
    },
    luxury: {
        name: 'Mercedes S-Class',
        dailyRate: 150
    },
    hatchback: {
        name: 'Volkswagen Golf',
        dailyRate: 60
    },
    coupe: {
        name: 'Audi A4',
        dailyRate: 80
    },
    convertible: {
        name: 'BMW 3 Series',
        dailyRate: 100
    },
    sports: {
        name: 'Ferrari 488',
        dailyRate: 200
    },
    van: {
        name: 'Nissan Pathfinder',
        dailyRate: 120
    },
    minivan: {
        name: 'Chevrolet Tahoe',
        dailyRate: 90
    },
    pickup: {
        name: 'Ford F-150',
        dailyRate: 100
    },
    truck: {
        name: 'Chevrolet Silverado',
        dailyRate: 120
    }
};

// Form elements
const bookingForm = document.getElementById('bookingForm');
const carType = document.getElementById('carType');
const rentalType = document.getElementById('rentalType');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
const promoCode = document.getElementById('promoCode');
const applyPromoBtn = document.getElementById('applyPromo');
const promoMessage = document.getElementById('promoMessage');
const paymentMethod = document.getElementById('paymentMethod');

// Progress Bar elements
const progressFill = document.getElementById('progressFill');
const steps = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4'),
    document.getElementById('step5'),
    document.getElementById('step6'),
    document.getElementById('step7')
];

// Loading overlay
const loadingOverlay = document.getElementById('loadingOverlay');
const successMessage = document.getElementById('successMessage');

let discount = 0;
let totalPrice = 0;
let durationText = 'N/A';

// Ensure the success message is hidden on page load
successMessage.style.display = 'none';

// Update Progress Bar
function updateProgress(step) {
    steps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
    progressFill.style.width = `${(step - 1) * (100 / 6)}%`; // Adjusted for 7 steps (100 / (7-1))
}

// Show/hide End Date based on Rental Type
rentalType.addEventListener('change', function () {
    const endDateField = document.getElementById('endDateField');
    const endDateInput = document.getElementById('endDate');
    if (this.value === 'sharing') {
        endDateField.style.display = 'block';
        endDateInput.required = true;
    } else {
        endDateField.style.display = 'none';
        endDateInput.required = false;
    }
    if (this.value) {
        this.classList.remove('is-invalid');
        updateProgress(2);
    }
    updatePricing();
});

// Real-time validation for Car Type
carType.addEventListener('change', function () {
    if (this.value) {
        this.classList.remove('is-invalid');
        updateProgress(1);
    }
    updatePricing();
});

// Real-time validation for Start Date
startDate.addEventListener('change', function () {
    const today = new Date().toISOString().split('T')[0];
    if (!this.value || this.value < today) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
        updateProgress(2);
        updatePricing();
    }
});

// Real-time validation for End Date
endDate.addEventListener('change', function () {
    if (this.value && startDate.value && this.value <= startDate.value) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
        updateProgress(2);
        updatePricing();
    }
});

// Real-time validation for Full Name
fullName.addEventListener('input', function () {
    if (!this.value.trim()) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
        updateProgress(3);
    }
});

// Real-time validation for Email
email.addEventListener('input', function () {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.value || !emailPattern.test(this.value)) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
        updateProgress(3);
    }
});

// Real-time validation for Phone
phone.addEventListener('input', function () {
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (!this.value || !phonePattern.test(this.value)) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
        updateProgress(3);
    }
});

// Real-time validation for Address
address.addEventListener('input', function () {
    if (!this.value.trim()) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
        updateProgress(3);
    }
});

// Real-time validation for Payment Method
paymentMethod.addEventListener('change', function () {
    if (this.value) {
        this.classList.remove('is-invalid');
        updateProgress(6);
    }
});

// Update pricing when dates or add-ons change
startDate.addEventListener('change', updatePricing);
endDate.addEventListener('change', updatePricing);

addonCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        updateProgress(4);
        updatePricing();
    });
});

// Apply promo code
applyPromoBtn.addEventListener('click', function () {
    const code = promoCode.value.trim().toUpperCase();
    
    // Extract numbers from the promo code to determine the discount percentage
    const numberMatch = code.match(/\d+/); // Find any numbers in the code
    let discountPercentage;

    if (numberMatch) {
        // If the code contains a number, use it as the discount percentage
        discountPercentage = parseInt(numberMatch[0]);
        // Cap the discount at a reasonable value (e.g., 50%)
        if (discountPercentage > 50) {
            discountPercentage = 50;
        }
        discount = discountPercentage / 100; // Convert percentage to decimal
        promoMessage.classList.remove('d-none');
        promoMessage.textContent = `Promo applied successfully! ${discountPercentage}% off`;
        promoMessage.classList.remove('text-danger');
        promoMessage.classList.add('text-success');
    } else if (code) {
        // If the code doesn't contain a number but is not empty, apply a default 5% discount
        discount = 0.05; // 5% default discount
        promoMessage.classList.remove('d-none');
        promoMessage.textContent = `Promo applied successfully! 5% off (default discount)`;
        promoMessage.classList.remove('text-danger');
        promoMessage.classList.add('text-success');
    } else {
        // If the code is empty
        discount = 0;
        promoMessage.classList.remove('d-none');
        promoMessage.textContent = 'Please enter a promo code';
        promoMessage.classList.remove('text-success');
        promoMessage.classList.add('text-danger');
    }
    updateProgress(5);
    updatePricing();
});

function updatePricing() {
    const car = cars[carType.value] || { dailyRate: 0 };
    const rental = rentalType.value;
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);

    let duration = 0;
    let basePrice = 0;
    let addonsCost = 0;
    let tax = 0;

    // Calculate base price
    if (rental === 'sharing' && start && end && start < end) {
        const timeDiff = end - start;
        duration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        durationText = `${duration} day(s)`;
        basePrice = duration * car.dailyRate;
    } else if (rental === 'sale') {
        durationText = 'N/A (Sale)';
        basePrice = car.dailyRate * 30; // Assume sale price is 30x daily rate
    } else {
        durationText = 'N/A';
        basePrice = 0;
    }

    // Calculate add-ons cost
    addonCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            addonsCost += parseFloat(checkbox.value);
        }
    });

    // Calculate tax (5%)
    tax = (basePrice + addonsCost) * 0.05;

    // Calculate total with discount
    totalPrice = basePrice + addonsCost + tax;
    const discountAmount = totalPrice * discount;
    totalPrice -= discountAmount;
}

// Form submission
bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset previous invalid states
    carType.classList.remove('is-invalid');
    rentalType.classList.remove('is-invalid');
    startDate.classList.remove('is-invalid');
    endDate.classList.remove('is-invalid');
    fullName.classList.remove('is-invalid');
    email.classList.remove('is-invalid');
    phone.classList.remove('is-invalid');
    address.classList.remove('is-invalid');
    paymentMethod.classList.remove('is-invalid');

    // Validate form
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    const today = new Date().toISOString().split('T')[0];

    if (!carType.value) {
        carType.classList.add('is-invalid');
        isValid = false;
    }
    if (!rentalType.value) {
        rentalType.classList.add('is-invalid');
        isValid = false;
    }
    if (!startDate.value || startDate.value < today) {
        startDate.classList.add('is-invalid');
        isValid = false;
    }
    if (rentalType.value === 'sharing' && (!endDate.value || endDate.value <= startDate.value)) {
        endDate.classList.add('is-invalid');
        isValid = false;
    }
    if (!fullName.value.trim()) {
        fullName.classList.add('is-invalid');
        isValid = false;
    }
    if (!email.value || !emailPattern.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }
    if (!phone.value || !phonePattern.test(phone.value)) {
        phone.classList.add('is-invalid');
        isValid = false;
    }
    if (!address.value.trim()) {
        address.classList.add('is-invalid');
        isValid = false;
    }
    if (!paymentMethod.value) {
        paymentMethod.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) return;

    // Get selected add-ons
    const selectedAddons = [];
    addonCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedAddons.push({
                name: checkbox.id,
                price: parseFloat(checkbox.value)
            });
        }
    });

    // Prepare booking data with status
    const bookingData = {
        carType: carType.value,
        carName: cars[carType.value]?.name || 'N/A',
        rentalType: rentalType.value,
        startDate: startDate.value,
        endDate: endDate.value || 'N/A',
        duration: durationText,
        totalPrice: totalPrice,
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        address: address.value.trim(),
        addons: selectedAddons,
        promoCode: promoCode.value.trim() || 'N/A',
        discount: discount,
        paymentMethod: paymentMethod.value,
        timestamp: new Date().toISOString(),
        status: 'Pending' // Add status field, default to "Pending"
    };

    // Load existing bookings from Local Storage or initialize an empty array
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Add the new booking to the array
    bookings.push(bookingData);

    // Save the updated bookings array back to Local Storage
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Show success message with status
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Your booking has been submitted successfully! Status: <strong>Pending</strong>. We’ll confirm your booking soon.</span>
    `;
    successMessage.style.display = 'flex';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000); // Hide after 5 seconds

    // Reset the form
    bookingForm.reset();
    rentalType.dispatchEvent(new Event('change')); // Reset rental type field visibility
    promoMessage.classList.add('d-none'); // Hide promo message
    discount = 0; // Reset discount
    totalPrice = 0; // Reset total price
    durationText = 'N/A'; // Reset duration text
    updateProgress(1); // Reset progress bar
    progressFill.style.width = '0%'; // Reset progress bar fill
});