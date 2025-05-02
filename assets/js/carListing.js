import { savedCars } from "../../mock/storage/seedStorage.js";
import { attachNavAndFooter } from "./utils/navUtils.js";
attachNavAndFooter();

const carsData = savedCars.get();

const newLocations = ["Cairo", "London", "Mansoura", "Menofia", "Alexandria", "Paris", "Dubai", "Tokyo"];
carsData.forEach(car => {
    car.availableLocations = [
        newLocations[Math.floor(Math.random() * newLocations.length)],
        newLocations[Math.floor(Math.random() * newLocations.length)],
        newLocations[Math.floor(Math.random() * newLocations.length)],
    ].filter((loc, index, self) => self.indexOf(loc) === index); 
});

if (localStorage.getItem('carsData')) {
    const storedCarsData = JSON.parse(localStorage.getItem('carsData'));
    storedCarsData.forEach((storedCar, index) => {
        if (carsData[index]) {
            carsData[index].bookedPeriods = storedCar.bookedPeriods || [];
        }
    });
} else {
    carsData.forEach((car, index) => {
        if (!car.bookedPeriods) {
            car.bookedPeriods = index % 3 === 0
                ? [
                    { startDate: "2025-05-01", endDate: "2025-05-05" },
                    { startDate: "2025-05-10", endDate: "2025-05-15" },
                ]
                : index % 3 === 1
                ? [{ startDate: "2025-05-03", endDate: "2025-05-07" }]
                : [];
        }
    });
    localStorage.setItem('carsData', JSON.stringify(carsData));
}

function saveBookingsToLocalStorage() {
    localStorage.setItem('carsData', JSON.stringify(carsData));
}

const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let filteredCars = [...carsData];

// Function to check if a car's availability overlaps with the selected date range
function isCarAvailable(car, pickupDate, dropoffDate) {
    if (!pickupDate || !dropoffDate) return true; // If no dates selected, consider all cars available for counting

    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    if (pickup >= dropoff) return false;

    if (!car.bookedPeriods || car.bookedPeriods.length === 0) return true;

    for (let period of car.bookedPeriods) {
        const bookedStart = new Date(period.startDate);
        const bookedEnd = new Date(period.endDate);

        if (pickup <= bookedEnd && dropoff >= bookedStart) {
            return false;
        }
    }
    return true;
}

// Function to update the car counts in the Pick-up Location filter and Car Type filter
function updateLocationCounts(pickupDate, dropoffDate) {
    const locationCounts = {
        cairo: 0,
        london: 0,
        mansoura: 0,
        menofia: 0,
        alexandria: 0,
        paris: 0,
        dubai: 0,
        tokyo: 0
    };

    const carTypeCounts = {
        'all-cars': 0,
        sedans: 0,
        suvs: 0,
        coupes: 0,
        'electric-cars': 0,
        luxury: 0,
        'sport-cars': 0,
        convertibles: 0
    };

    carsData.forEach(car => {
        if (isCarAvailable(car, pickupDate, dropoffDate)) {
            car.availableLocations.forEach(loc => {
                const locationKey = loc.toLowerCase();
                if (locationCounts.hasOwnProperty(locationKey)) {
                    locationCounts[locationKey]++;
                }
            });

            const carTypeKey = car.category.toLowerCase() === 'sports' ? 'sport-cars' :
                              car.category.toLowerCase() === 'electric' ? 'electric-cars' :
                              car.category.toLowerCase() + 's';
            if (carTypeCounts.hasOwnProperty(carTypeKey)) {
                carTypeCounts[carTypeKey]++;
            }
            carTypeCounts['all-cars']++;
        }
    });

    for (const [location, count] of Object.entries(locationCounts)) {
        const countElement = document.getElementById(`count-${location}`);
        if (countElement) {
            countElement.textContent = count;
        }
    }

    for (const [carType, count] of Object.entries(carTypeCounts)) {
        const countElement = document.getElementById(`count-${carType}`);
        if (countElement) {
            countElement.textContent = count;
        }
    }
}

// Function to filter cars based on all selected filters
function filterCars(pickupDate, dropoffDate) {
    const carTypeFilters = Array.from(document.querySelectorAll('.filter-box:nth-child(1) .form-check-input:checked'))
        .map(input => {
            if (input.id === 'all-cars') return '';
            if (input.id === 'sedans') return 'sedan';
            if (input.id === 'suvs') return 'suv';
            if (input.id === 'sport') return 'sports';
            if (input.id === 'electric') return 'electric';
            if (input.id === 'coupes') return 'coupes';
            if (input.id === 'luxury') return 'luxury';
            if (input.id === 'convertible') return 'convertibles';
            return input.id;
        });
    const priceFilter = document.querySelector('.form-range').value;
    const fuelTypeFilters = Array.from(document.querySelectorAll('.filter-box:nth-child(3) .form-check-input:checked'))
        .map(input => input.id.replace('all-fuel', '').replace('fuel-', '').replace('-fuel', ''));
    const locationFilters = Array.from(document.querySelectorAll('.filter-box:nth-child(4) .form-check-input:checked'))
        .map(input => input.id.replace('pickup-', ''));
    const transmissionFilters = Array.from(document.querySelectorAll('.filter-box:nth-child(5) .form-check-input:checked'))
        .map(input => input.id.replace('all-transmission', ''));
    const yearFilter = document.getElementById('year-range').value;
    const destination = document.querySelector('.form-select').value;

    filteredCars = carsData.filter(car => {
        const matchesCarType = carTypeFilters.length === 0 || carTypeFilters.includes('') || carTypeFilters.includes(car.category.toLowerCase());
        const matchesPrice = car.dailyRate <= priceFilter;
        const matchesFuelType = fuelTypeFilters.length === 0 || fuelTypeFilters.includes('') || fuelTypeFilters.includes(car.fuelType.toLowerCase());
        const matchesLocation = (locationFilters.length === 0 && destination === 'Add your location') ||
            car.availableLocations.some(loc => {
                const locKey = loc.toLowerCase();
                return (destination !== 'Add your location' && locKey === destination.toLowerCase()) ||
                       locationFilters.includes(locKey);
            });
        const matchesTransmission = transmissionFilters.length === 0 || transmissionFilters.includes('') || transmissionFilters.includes(car.transmission.toLowerCase());
        const matchesYear = car.year >= yearFilter;
        const matchesAvailability = isCarAvailable(car, pickupDate, dropoffDate);

        return matchesCarType && matchesPrice && matchesFuelType && matchesLocation && matchesTransmission && matchesYear && matchesAvailability;
    });

    currentPage = 1;
    renderCarListings();
    renderPagination();
}

// Function to sort cars based on the selected sorting option
function sortCars() {
    const sortOption = document.getElementById('sortOptions').value;
    if (sortOption === 'price-asc') {
        filteredCars.sort((a, b) => a.dailyRate - b.dailyRate);
    } else if (sortOption === 'price-desc') {
        filteredCars.sort((a, b) => b.dailyRate - a.dailyRate);
    }
    renderCarListings();
}

// Function to render car listings for the current page
function renderCarListings() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const carsToDisplay = filteredCars.slice(startIndex, endIndex);

    const carListings = document.getElementById('carListings');
    carListings.innerHTML = '';

    if (carsToDisplay.length === 0) {
        carListings.innerHTML = '<p>No cars available for the selected filters.</p>';
        return;
    }
    
    carsToDisplay.forEach(car => {
        const carCard = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4 car-card-item">
                <div class="car-card m-0">
                    <div class="image-wrapper position-relative">
                        <img src="${car.imageUrls[0]}" alt="${car.make} ${car.model}" />
                        <div class="rating-overlay position-absolute top-0 end-0 m-2">
                            <i class="bi bi-star-fill" style="color: #FFD700;"></i>
                            <span class="ms-1">${car.rating}</span>
                        </div>
                    </div>
                    <div class="car-details mt-2">
                        <div class="car-headline d-flex justify-content-between align-items-center mb-2">
                            <h3 class="m-0">${car.make} ${car.model} ${car.year}</h3>
                            <div class="car-type"><span>${car.category}</span></div>
                        </div>
                        <div class="car-details-icons d-flex gap-3">
                            <div class="icon-item"><i class="bi bi-person-fill"></i><span class="ms-1">${car.passengerCapacity}</span></div>
                            <div class="icon-item"><i class="bi bi-suitcase"></i><span class="ms-1">${car.luggageCapacity}</span></div>
                            <div class="icon-item"><i class="bi bi-car-front-fill"></i><span class="ms-1">${car.transmission.toLowerCase()}</span></div>
                            <div class="icon-item"><i class="bi bi-fuel-pump"></i><span class="ms-1">${car.fuelType.toLowerCase()}</span></div>
                        </div>
                    </div>
                    <div class="car-price d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-baseline">
                            <h4 class="fs-5 m-0">$${car.dailyRate}</h4>
                            <span class="fs-6 darkgrey ms-1">/Per Day</span>
                        </div>
                        <a href="car-details.html?carId=${car.carId}" class="btn text-white details-btn">Details</a>
                    </div>
                </div>
            </div>
        `;
        // const carCard = `
        //     <div class="col-lg-4" id="car-${car.carId}">
        //         <div class="car-card p-3">
        //             <div class="car-img-wrapper mb-3">
        //                 <img src="${car.imageUrls[0]}" class="img-fluid w-100" alt="${car.make} ${car.model}" />
        //             </div>
        //             <div class="car-details">
        //                 <div class="car-headline d-flex justify-content-between mb-3">
        //                     <h3 class="m-0">${car.make} ${car.model} ${car.year}</h3>
        //                     <div class="car-type text-white">
        //                         <span>${car.category}</span>
        //                     </div>
        //                 </div>
        //                 <div class="car-details-icons mb-2">
        //                     <i class="bi bi-person-fill me-2">
        //                         <span class="ms-1">${car.passengerCapacity}</span>
        //                     </i>
        //                     <i class="bi bi-suitcase me-2">
        //                         <span class="ms-1">${car.luggageCapacity}</span>
        //                     </i>
        //                     <i class="bi bi-car-front-fill me-2">
        //                         <span class="ms-1">${car.transmission.toLowerCase()}</span>
        //                     </i>
        //                     <i class="bi bi-fuel-pump-fill me-2">
        //                         <span class="ms-1">${car.fuelType.toLowerCase()}</span>
        //                     </i>
        //                 </div>
        //             </div>
        //             <div class="car-price mt-3 d-flex align-items-center justify-content-between">
        //                 <h4 class="fs-5 m-0">
        //                     <span class="text-main">$${car.dailyRate}</span> <span class="fs-6 darkgrey">/Per Day</span>
        //                 </h4>
        //                 <a href="car-details.html?carId=${car.carId}" class="text-black">
        //                     <button class="btn btn-nav">Details</button>
        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        // `;
        carListings.innerHTML += carCard;
    });

    attachBookNowListeners();
}

// Attach event listeners to "Book Now" buttons
function attachBookNowListeners() {
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    bookNowButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const carIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
            const car = filteredCars[carIndex];
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            const destination = document.querySelector('.form-select').value;

            if (!pickupDate || !dropoffDate || destination === 'Add your location') {
                alert('Please fill out the search form before booking a car.');
                return;
            }

            const carInData = carsData.find(c => c.carId === car.carId);
            if (carInData) {
                carInData.bookedPeriods.push({
                    startDate: pickupDate,
                    endDate: dropoffDate,
                });
               
                saveBookingsToLocalStorage();
              
                filterCars(pickupDate, dropoffDate);
                updateLocationCounts(pickupDate, dropoffDate);

                alert(`Successfully booked ${car.make} ${car.model} from ${pickupDate} to ${dropoffDate}!`);
            }
        });
    });
}

// Function to render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" id="prevPage">Previous</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" id="nextPage">Next</a>
        </li>
    `;

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (link.id === 'prevPage' && currentPage > 1) {
                currentPage--;
            } else if (link.id === 'nextPage' && currentPage < totalPages) {
                currentPage++;
            } else if (link.dataset.page) {
                currentPage = parseInt(link.dataset.page);
            }
            renderCarListings();
            renderPagination();
        });
    });
}

// Function to validate search form
function validateSearchForm() {
    const destination = document.querySelector('.form-select').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const dropoffDate = document.getElementById('dropoff-date').value;
    const searchError = document.getElementById('searchError');
    const today = new Date().toISOString().split('T')[0];

    if (destination === 'Add your location') {
        searchError.textContent = 'Please select a destination.';
        searchError.style.display = 'block';
        return false;
    }
    if (!pickupDate || pickupDate < today) {
        searchError.textContent = 'Please select a valid Pick-up Date.';
        searchError.style.display = 'block';
        return false;
    }
    if (!dropoffDate || dropoffDate <= pickupDate) {
        searchError.textContent = 'Drop-off date must be after pick-up date.';
        searchError.style.display = 'block';
        return false;
    }

    searchError.style.display = 'none';
    return true;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    filteredCars = [...carsData];
    renderCarListings();
    renderPagination();
    updateLocationCounts(null, null);

    document.querySelectorAll('.filter-box:nth-child(1) .form-check-input').forEach(input => {
        input.addEventListener('change', () => {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        });
    });

    document.querySelector('.form-range').addEventListener('input', (e) => {
        document.querySelector('.d-flex span:nth-child(2)').textContent = `$${e.target.value}`;
        const pickupDate = document.getElementById('pickup-date').value;
        const dropoffDate = document.getElementById('dropoff-date').value;
        filterCars(pickupDate, dropoffDate);
        updateLocationCounts(pickupDate, dropoffDate);
    });

    document.querySelectorAll('.filter-box:nth-child(3) .form-check-input').forEach(input => {
        input.addEventListener('change', () => {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        });
    });

    document.querySelectorAll('.filter-box:nth-child(4) .form-check-input').forEach(input => {
        input.addEventListener('change', () => {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        });
    });

    document.querySelectorAll('.filter-box:nth-child(5) .form-check-input').forEach(input => {
        input.addEventListener('change', () => {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        });
    });

    const yearRange = document.getElementById('year-range');
    const yearDisplay = document.getElementById('year-range-display');
    yearRange.addEventListener('input', () => {
        yearDisplay.textContent = yearRange.value;
    });
    document.getElementById('year-apply-btn').addEventListener('click', () => {
        const pickupDate = document.getElementById('pickup-date').value;
        const dropoffDate = document.getElementById('dropoff-date').value;
        filterCars(pickupDate, dropoffDate);
        updateLocationCounts(pickupDate, dropoffDate);
    });

    document.getElementById('sortOptions').addEventListener('change', sortCars);

    document.getElementById('bookCarBtn').addEventListener('click', (e) => {
        e.preventDefault();
        if (validateSearchForm()) {
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            filterCars(pickupDate, dropoffDate);
            updateLocationCounts(pickupDate, dropoffDate);
        }
    });
});