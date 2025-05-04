import { validateEmail, validatePhone, validateStartDate, validateEndDate } from '../validation/bookingValidation.js';
import { getCarIdFromUrl, setElementText } from '../carUtils.js';
import { getLoggedInCustomerId } from "../userUtils.js";
import { savedCars, savedCustomers } from '../../../../mock/storage/seedStorage.js';

const bookingForm = document.getElementById('bookingForm');
const carField = document.getElementById('car');
const loginWarning = document.getElementById('loginWarning');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
const promoCode = document.getElementById('promoCode');
const applyPromoBtn = document.getElementById('applyPromo');
const promoMessage = document.getElementById('promoMessage');
const paymentMethod = document.getElementById('paymentMethod');
const totalCost = document.getElementById('totalCost');
const discountField = document.getElementById('discount');
const totalAmountField = document.getElementById('totalAmount');

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

if (!bookingForm || !carField || !startDate || !endDate || !fullName || !email || !phone || !address || !paymentMethod || !applyPromoBtn || !progressFill) {
    console.error('One or more required elements are missing:', {
        bookingForm, carField, startDate, endDate, fullName, email, phone, address, paymentMethod, applyPromoBtn, progressFill
    });
    throw new Error('Required DOM elements not found');
}

let discount = 0;
let totalAmount = 0;
let durationText = 'N/A';

const carId = getCarIdFromUrl();
const urlParams = new URLSearchParams(window.location.search);
const pickupDate = urlParams.get('pickupDate');
const dropoffDate = urlParams.get('dropoffDate');
const addOnsFromUrl = urlParams.get('addOns') ? urlParams.get('addOns').split(',') : [];
discount = parseFloat(urlParams.get('discount')) || 0;
console.log(`Add-ons: ${addOnsFromUrl}`);

const customerId = getLoggedInCustomerId();

function initializeElements() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) successMessage.style.display = 'none';

    if (carId) {
        const car = savedCars.getCarById(carId);
        if (car) {
            const carName = `${car.make} ${car.model} ${car.year} - Modern ${car.category} in ${car.color} color`;
            carField.value = carName;
            carField.disabled = true;
            const carNameElement = document.getElementById("car-name");
            if (carNameElement) carNameElement.textContent = carName;
        } else {
            carField.value = 'Car not found';
            console.error(`Car with ID ${carId} not found`);
        }
    } else {
        carField.value = 'No car selected';
    }

    if (customerId) {
        if (!savedCustomers) {
            console.error('savedCustomers is not defined. Make sure it is exported correctly from storageHandler.js');
            return;
        }
        const customer = savedCustomers.getCustomerById(customerId);
        if (customer) {
            fullName.value = customer.name || 'N/A';
            email.value = customer.email || 'N/A';
            phone.value = customer.phone || 'N/A';
            address.value = customer.address || 'N/A';

            fullName.disabled = true;
            email.disabled = true;
            phone.disabled = true;
            address.disabled = true;
        } else {
            console.error(`Customer with ID ${customerId} not found`);
            fullName.value = 'Customer not found';
            email.value = 'Customer not found';
            phone.value = 'Customer not found';
            address.value = 'Customer not found';
        }
    } else {
        if (loginWarning) loginWarning.style.display = 'block';
    }

    if (pickupDate) startDate.value = pickupDate;
    if (dropoffDate) endDate.value = dropoffDate;
    if (addOnsFromUrl.length > 0) {
        addonCheckboxes.forEach(checkbox => {
            const label = checkbox.closest('label') || document.querySelector(`label[for="${checkbox.id}"]`);
            const labelText = label ? label.innerText.trim() : '';
            if (labelText && addOnsFromUrl.includes(labelText)) {
                checkbox.checked = true;
            }
        });
    }
    updatePricing();
}

function updateProgress(step) {
    steps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
    progressFill.style.width = `${(step - 1) * (100 / 5)}%`;
}

function updatePricing() {
    const car = savedCars.getCarById(carId) || { dailyRate: 0 };
    const start = new Date(startDate.value || pickupDate);
    const end = new Date(endDate.value || dropoffDate);

    let duration = 0;
    let basePrice = 0;
    let addonsCost = 0;
    let tax = 0;

    if (start && end && start < end) {
        const timeDiff = end - start;
        duration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        durationText = `${duration} day(s)`;
        basePrice = duration * car.dailyRate;
    } else {
        durationText = 'N/A';
        basePrice = 0;
    }

    addonCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            addonsCost += parseFloat(checkbox.value);
        }
    });

    tax = (basePrice + addonsCost) * 0.1;

    totalAmount = basePrice + addonsCost + tax;
    const discountAmount = totalAmount * discount / 100;
    totalAmount -= discountAmount;

    console.log(`Total Amount: $${totalAmount.toFixed(2)}`);
    promoCode.value = `SAVE${discount}`;

    document.getElementById('basePrice').textContent = `$${basePrice.toFixed(2)}`;
    document.getElementById('addonsCost').textContent = `$${addonsCost.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `$${tax.toFixed(2)}`;
    discountField.textContent = `-$${discountAmount.toFixed(2)}`;
    totalAmountField.textContent = `$${totalAmount.toFixed(2)}`;

}

function setupEventListeners() {
    startDate.addEventListener('change', function () {
        if (!validateStartDate(this)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
            updateProgress(2);
            updatePricing();
        }
    });

    endDate.addEventListener('change', function () {
        if (!validateEndDate(this, startDate)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
            updateProgress(2);
            updatePricing();
        }
    });

    paymentMethod.addEventListener('change', function () {
        if (this.value) {
            this.classList.remove('is-invalid');
            updateProgress(5);
        }
    });

    startDate.addEventListener('change', updatePricing);
    endDate.addEventListener('change', updatePricing);

    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateProgress(4);
            updatePricing();
        });
    });

    applyPromoBtn.addEventListener('click', function () {
        const code = promoCode.value.trim().toUpperCase();
        const numberMatch = code.match(/\d+/);
        let discountPercentage;

        if (numberMatch) {
            discountPercentage = parseInt(numberMatch[0]);
            if (discountPercentage > 50) {
                discountPercentage = 50;
            }
            discount = discountPercentage;
            promoMessage.classList.remove('d-none');
            promoMessage.textContent = `Promo applied successfully! ${discountPercentage}% off`;
            promoMessage.classList.remove('text-danger');
            promoMessage.classList.add('text-success');
        } else if (code) {
            discount = 0.05;
            promoMessage.classList.remove('d-none');
            promoMessage.textContent = `Promo applied successfully! 5% off (default discount)`;
            promoMessage.classList.remove('text-danger');
            promoMessage.classList.add('text-success');
        } else {
            discount = 0;
            promoMessage.classList.remove('d-none');
            promoMessage.textContent = 'Please enter a promo code';
            promoMessage.classList.remove('text-success');
            promoMessage.classList.add('text-danger');
        }
        updateProgress(5);
        updatePricing();
    });

    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        startDate.classList.remove('is-invalid');
        endDate.classList.remove('is-invalid');
        paymentMethod.classList.remove('is-invalid');

        let isValid = true;

        if (!carId) {
            carField.value = 'No car selected';
            isValid = false;
        }
        if (!customerId) {
            if (loginWarning) loginWarning.style.display = 'block';
            isValid = false;
        }
        if (!validateStartDate(startDate)) {
            startDate.classList.add('is-invalid');
            isValid = false;
        }
        if (!validateEndDate(endDate, startDate)) {
            endDate.classList.add('is-invalid');
            isValid = false;
        }
        if (!paymentMethod.value) {
            paymentMethod.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) return;

        const customer = savedCustomers.getCustomerById(customerId) || {};

        const selectedAddons = [];
        addonCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedAddons.push({
                    price: parseFloat(checkbox.value)
                });
            }
        });

        const bookingData = {
            bookingId: `bk_${Date.now()}`,
            carId: carId,
            customerId: customerId,
            startDate: startDate.value || pickupDate,
            endDate: endDate.value || dropoffDate,
            customerName: customer.name || 'N/A',
            // email: customer.email || 'N/A',
            // phone: customer.phone || 'N/A',
            // address: customer.address || 'N/A',
            GPS: addonCheckboxes[0] ? addonCheckboxes[0].checked : false,
            childSeat: addonCheckboxes[1] ? addonCheckboxes[1].checked : false,
            insurance: addonCheckboxes[2] ? addonCheckboxes[2].checked : false,
            addons: selectedAddons,
            promoCode: promoCode.value.trim() || 'N/A',
            discount: discount,
            totalAmount: totalAmount,
            paymentStatus: 'Pending',
            timestamp: new Date().toISOString(),
            status: 'Pending'
        };

        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(bookingData);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Your booking has been submitted successfully! Status: <strong>Pending</strong>. We’ll confirm your booking soon.</span>
            `;
            successMessage.style.display = 'flex';
            setTimeout(() => {
                successMessage.style.display = 'none';
                window.location.href = 'index.html';
            }, 2000);
        }

        bookingForm.reset();
        if (loginWarning) loginWarning.style.display = 'none';
        promoMessage.classList.add('d-none');
        discount = 0;
        totalAmount = 0;
        durationText = 'N/A';
        updateProgress(1);
        progressFill.style.width = '0%';
    });
}

export function initializeBookingForm() {
    initializeElements();
    setupEventListeners();
}