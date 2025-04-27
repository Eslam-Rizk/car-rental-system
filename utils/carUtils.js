// utils.js

export function getCarIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('id');
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
    //console.log("Car Data: ", car);

    const carname = `${car.make} ${car.model} ${car.year} - Modern ${car.category} in ${car.color} color`;

    setElementText('car-rating', car.rating || 'N/A');
    setElementText('car-name', carname);

    setImage('car-main-img', car.imageUrl[0], carname);
    setImage('car-sec-img-1', car.imageUrl[1], carname);
    setImage('car-sec-img-2', car.imageUrl[2], carname);
    setImage('car-sec-img-3', car.imageUrl[3], carname);
    setImage('car-sec-img-4', car.imageUrl[4], carname);

    setElementText('fuelType', car.fuelType || 'N/A');
    setElementText('transmission', car.transmission || 'N/A');
    setElementText('passengerCapacity', `${car.passengerCapacity || 'N/A'} people`);
    setElementText('luggageCapacity', `${car.luggageCapacity || 'N/A'} bags`);
    setElementText('fuelCapacity', `${car.fuelCapacity || 'N/A'} L`);
    setElementText('make', car.make || 'N/A');
    setElementText('year', car.year || 'N/A');
    setElementText('dailyRate', `$${car.dailyRate || 'N/A'}`);
}

export function displayTopRatedCars(cars, currentCarId) {
    const otherCars = cars.filter(c => c.carId !== currentCarId);
    const topRatedCars = otherCars
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    topRatedCars.forEach((topCar, index) => {
        const carName = `${topCar.make} ${topCar.model} ${topCar.year}`;
        //console.log(`Top ${index + 1}: ${carName}, Rating: ${topCar.rating}`);

        setImage(`top${index + 1}-img`, topCar.imageUrl[0], carName);
        setElementText(`top${index + 1}-name`, carName);
        setElementText(`top${index + 1}-category`, topCar.category || 'N/A');
        setElementText(`top${index + 1}-seats`, `${topCar.passengerCapacity || 'N/A'} people`);
        setElementText(`top${index + 1}-luggage`, `${topCar.luggageCapacity || 'N/A'} bags`);
        setElementText(`top${index + 1}-transmission`, topCar.transmission || 'N/A');
        setElementText(`top${index + 1}-price`, `$${topCar.dailyRate || 'N/A'}/day`);
        setElementHref(`top${index + 1}-id`, topCar.carId ? `car-details.html?id=${topCar.carId}` : '#');
    });
}

// Handle "Book Now" button click
export function setupBookingButton(carId, getDiscountPercentage) {
    const bookNowButton = document.getElementById('book-btn');
    if (!bookNowButton) {
        console.error('Book Now button not found');
        return;
    }

    bookNowButton.addEventListener('click', function () {
        // Check if user is logged in by checking local storage
        const loggedInCustomer = localStorage.getItem('loggedInCustomer');

        if (!loggedInCustomer) {
            // User is not logged in, redirect to login page
            window.location.href = 'login.html';
            return;
        }

        const pickupDate = document.getElementById('pickup-date').value;
        const dropoffDate = document.getElementById('dropoff-date').value;
        const selectedAddOns = [];

        document.querySelectorAll('.extra-checkbox:checked').forEach(checkbox => {
            const label = checkbox.closest('label').innerText.trim();
            selectedAddOns.push(label);
        });

        if (!pickupDate || !dropoffDate) {
            alert('Please select both pick-up and drop-off dates.');
            return;
        }

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
}