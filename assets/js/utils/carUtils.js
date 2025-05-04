import { savedBookings } from "../../../mock/storage/seedStorage.js";
import { getLoggedInCustomerId } from "./userUtils.js";

export function getCarIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('carId');
    //console.log("Car ID from URL: ", carId);
    return carId;
}

export function findCarById(cars, carId) {
    return cars.find(car => car.carId === carId);
}

export function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

export function setImage(id, src, alt) {
    const element = document.getElementById(id);
    if (element) {
        element.src = src || 'default-image.jpg';
        element.alt = alt || 'Car image';
    }
}

export function setElementHref(id, href) {
    const element = document.getElementById(id);
    if (element) {
        element.href = href;
    }
}

export function populateCarDetails(car) {

    const isValidString = str => typeof str === 'string' && str.trim() !== '';
    const isValidNumber = num => typeof num === 'number' && !isNaN(num);

    // Construct car name
    const carname = `${car.make || 'Unknown'} ${car.model || ''} ${car.year || ''} - Modern ${car.category || ''} in ${car.color || ''} color`;

    // Set rating
    setElementText('car-rating', (car.rating) ? car.rating : 'N/A');

    // Set car name
    setElementText('car-name', carname);

    // Set images
    const imageUrls = Array.isArray(car.imageUrls) ? car.imageUrls : [];

    for (let i = 0; i < 5; i++) {
        const imageId = i === 0 ? 'car-main-img' : `car-sec-img-${i}`;
        setImage(imageId, imageUrls[i] || 'placeholder.jpg', carname);
    }

    // Set other fields
    setElementText('fuelType', isValidString(car.fuelType) ? car.fuelType : 'N/A');
    setElementText('transmission', isValidString(car.transmission) ? car.transmission : 'N/A');

    setElementText('passengerCapacity', (car.passengerCapacity) ? car.passengerCapacity : 'N/A');
    setElementText('luggageCapacity', (car.luggageCapacity) ? car.luggageCapacity : 'N/A');
    setElementText('fuelCapacity', (car.fuelCapacity) ? `${car.fuelCapacity} L` : '0 L');

    setElementText('make', isValidString(car.make) ? car.make : 'N/A');
    setElementText('year', (car.year) ? car.year : 'N/A');
    setElementText('dailyRate', (car.dailyRate) ? `$${car.dailyRate}` : 'N/A');

}

export function displayTopRatedCars(cars, currentCarId) {
    const otherCars = cars.filter(c => c.carId !== currentCarId);
    const topRatedCars = otherCars
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    topRatedCars.forEach((topCar, index) => {
        const carName = `${topCar.make} ${topCar.model} ${topCar.year}`;

        setImage(`top${index + 1}-img`, topCar.imageUrls[0], carName);
        setElementText(`top${index + 1}-rating`, topCar.rating);
        setElementText(`top${index + 1}-name`, carName);
        setElementText(`top${index + 1}-category`, topCar.category || 'N/A');
        setElementText(`top${index + 1}-seats`, `${topCar.passengerCapacity || 'N/A'}`);
        setElementText(`top${index + 1}-luggage`, `${topCar.luggageCapacity || 'N/A'}`);
        setElementText(`top${index + 1}-transmission`, topCar.transmission || 'N/A');
        setElementText(`top${index + 1}-fuel`, topCar.fuelType || 'N/A');
        setElementText(`top${index + 1}-price`, `$${topCar.dailyRate || 'N/A'}`);
        setElementHref(`top${index + 1}-id`, topCar.carId ? `car-details.html?carId=${topCar.carId}` : '#');
    });
}

//Sets up the booking button and date field event listeners
export function setupBookingButton(carId, getDiscountPercentage) {
    const bookNowButton = document.getElementById('book-btn');
    if (!bookNowButton) {
        console.error('Book Now button not found');
        return;
    }

    const pickupDateField = document.getElementById('pickup-date');
    const dropoffDateField = document.getElementById('dropoff-date');

    if (!pickupDateField || !dropoffDateField) {
        console.error('Date fields not found');
        return;
    }

    // Function to check availability whenever dates change
    const checkAvailability = () => {
        updateBookingButtonState(carId, bookNowButton);
    };

    // Add event listeners to date fields
    pickupDateField.addEventListener('change', checkAvailability);
    dropoffDateField.addEventListener('change', checkAvailability);

    // Set up the booking button click handler
    bookNowButton.addEventListener('click', function () {
        // Check if user is logged in
        const loggedInCustomer = getLoggedInCustomerId();
        if (!loggedInCustomer) {
            // User is not logged in, redirect to login page
            window.location.href = 'login.html';
            return;
        }

        const pickupDate = pickupDateField.value;
        const dropoffDate = dropoffDateField.value;

        if (!pickupDate || !dropoffDate) {
            alert('Please select both pick-up and drop-off dates.');
            return;
        }

        // Perform one final availability check
        if (!updateBookingButtonState(carId, bookNowButton)) {
            return; // Car is not available
        }

        // Collect selected add-ons
        const selectedAddOns = [];
        document.querySelectorAll('.extra-checkbox:checked').forEach(checkbox => {
            const label = checkbox.closest('label').innerText.trim();
            selectedAddOns.push(label);
        });

        // Build URL parameters
        const params = new URLSearchParams();
        params.append('carId', carId);
        params.append('pickupDate', pickupDate);
        params.append('dropoffDate', dropoffDate);
        params.append('addOns', selectedAddOns.join(','));

        // Add discount to params if applied
        const discountPercentage = getDiscountPercentage();
        if (discountPercentage > 0) {
            params.append('discount', discountPercentage);
        }

        // Redirect to booking page with parameters
        window.location.href = `booking.html?${params.toString()}`;
    });

    // Run the initial availability check in case dates are pre-filled
    checkAvailability();
}

//Validates booking date selections
function validateDates(pickupDate, dropoffDate) {
    // Check if both dates are provided
    if (!pickupDate || !dropoffDate) {
        return { isValid: false, errorMessage: 'Please select both pick-up and drop-off dates' };
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset time part to start of day

    const requestedPickup = new Date(pickupDate);
    const requestedDropoff = new Date(dropoffDate);

    // Check if pickup date is in the past
    if (requestedPickup < now) {
        return { isValid: false, errorMessage: 'Pick-up date cannot be in the past' };
    }

    // Check if dropoff date is before pickup date
    if (requestedDropoff < requestedPickup) {
        return { isValid: false, errorMessage: 'Drop-off date must be after pick-up date' };
    }

    return { isValid: true, errorMessage: null };
}

//Checks if a car is available for booking during the specified date range
function isCarAvailableForDates(carId, pickupDate, dropoffDate) {
    // First validate the dates
    const dateValidation = validateDates(pickupDate, dropoffDate);
    if (!dateValidation.isValid) {
        return { isAvailable: false, errorMessage: dateValidation.errorMessage };
    }

    // Get all bookings
    const bookings = savedBookings.get();
    console.log("Checking availability among bookings:", bookings);

    // Convert input dates to Date objects
    const requestedPickup = new Date(pickupDate);
    const requestedDropoff = new Date(dropoffDate);

    // Filter bookings for the specific car
    const carBookings = bookings.filter(booking => booking.carId === carId);

    // Check for overlapping bookings
    for (const booking of carBookings) {
        const bookedPickup = new Date(booking.startDate);
        const bookedDropoff = new Date(booking.endDate);
        console.log(`Checking overlap with booking: ${booking.bookingId} from ${bookedPickup} to ${bookedDropoff}`);

        // Check if there's any overlap between the requested period and this booking
        if (!(
            (requestedDropoff <= bookedPickup) || // Requested period ends before booking starts
            (requestedPickup >= bookedDropoff)    // Requested period starts after booking ends
        )) {
            // Overlap detected - car is not available
            return { isAvailable: false, errorMessage: 'Car is not available for the selected dates' };
        }
    }

    // No overlapping bookings found - car is available
    return { isAvailable: true, errorMessage: null };
}

//Updates the booking button state based on car availability and date validation
function updateBookingButtonState(carId, bookNowButton) {
    const pickupDate = document.getElementById('pickup-date').value;
    const dropoffDate = document.getElementById('dropoff-date').value;

    // Reset button to default state
    bookNowButton.innerHTML = 'Book Now';
    bookNowButton.classList.remove('disabled');


    // If either date is missing, we can't check availability yet
    if (!pickupDate || !dropoffDate) {
        return true;
    }

    // Check availability and validate dates
    const result = isCarAvailableForDates(carId, pickupDate, dropoffDate);

    if (!result.isAvailable) {
        console.log(result.errorMessage);
        // Replace the button with an error message
        bookNowButton.innerHTML = `<span class="text-danger">${result.errorMessage}</span>`;
        bookNowButton.classList.add('disabled');
        return false;
    }

    return true;
}
