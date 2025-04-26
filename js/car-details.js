import {
    seedStorage,
    storageHandler,
    savedBookings,
    savedCars,
    savedCustomers,
    carsFilter,
    customersFilter,
    bookingsFilter,
} from "../mock/storage/seedStorage.js";

seedStorage();

// Get the car ID from URL
const params = new URLSearchParams(window.location.search);
const carId = params.get('id');
console.log("Car ID from URL: ", carId);

// Fetch car data
const cars = savedCars.get();
// console.log("Cars from storage: ", cars);

// Find the car with the given ID
const car = cars.find(car => car.carId === carId);

// Check if car exists
if (car) {
    console.log("Car ID: ", carId);
    console.log("Car Data: ", car);
    const carname = `${car.make} ${car.model} ${car.year} - Modern ${car.category} in ${car.color} color`
    // Fill the HTML elements with car data
    document.getElementById('car-rating').textContent = car.rating || 'N/A';

    document.getElementById('car-name').textContent = carname;
    document.getElementById('car-main-img').src = car.imageUrl[0] || 'default-image.jpg';
    document.getElementById('car-main-img').alt = carname;
    document.getElementById('car-sec-img-1').src = car.imageUrl[1] || 'default-image.jpg';
    document.getElementById('car-sec-img-1').alt = carname;
    document.getElementById('car-sec-img-2').src = car.imageUrl[2] || 'default-image.jpg';
    document.getElementById('car-sec-img-2').alt = carname;
    document.getElementById('car-sec-img-3').src = car.imageUrl[3] || 'default-image.jpg';
    document.getElementById('car-sec-img-3').alt = carname;
    document.getElementById('car-sec-img-4').src = car.imageUrl[4] || 'default-image.jpg';
    document.getElementById('car-sec-img-4').alt = carname;

    document.getElementById('fuelType').textContent = car.fuelType || 'N/A';
    document.getElementById('transmission').textContent = car.transmission || 'N/A';
    document.getElementById('passengerCapacity').textContent = `${car.passengerCapacity || 'N/A'} people`;
    document.getElementById('luggageCapacity').textContent = `${car.luggageCapacity || 'N/A'} bags`;
    document.getElementById('fuelCapacity').textContent = `${car.fuelCapacity || 'N/A'} L`;
    document.getElementById('make').textContent = car.make || 'N/A';
    document.getElementById('year').textContent = car.year || 'N/A';
    document.getElementById('dailyRate').textContent = `$${car.dailyRate || 'N/A'}`;

    // Get all cars except the current car
    const otherCars = cars.filter(c => c.carId !== carId);

    // Sort the remaining cars by rating in descending order and take the top 3
    const topRatedCars = otherCars
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    // Display top 3 highest rated cars
    topRatedCars.forEach((topCar, index) => {
        const carName = `${topCar.make} ${topCar.model} ${topCar.year}`;
        console.log(`Top ${index + 1}: ${carName}, Rating: ${topCar.rating}`);
        //update the DOM for top rated cars
        //top1-img, top1-name, top1-category, top1-seats, top1-price, top1-luggage, top1-transmission, top1-id
        document.getElementById(`top${index + 1}-img`).src = topCar.imageUrl[0] || 'default-image.jpg';
        document.getElementById(`top${index + 1}-img`).alt = carName;
        document.getElementById(`top${index + 1}-name`).textContent = carName;
        document.getElementById(`top${index + 1}-category`).textContent = topCar.category || 'N/A';
        document.getElementById(`top${index + 1}-seats`).textContent = `${topCar.passengerCapacity || 'N/A'} people`;
        document.getElementById(`top${index + 1}-luggage`).textContent = `${topCar.luggageCapacity || 'N/A'} bags`;
        document.getElementById(`top${index + 1}-transmission`).textContent = topCar.transmission || 'N/A';
        document.getElementById(`top${index + 1}-price`).textContent = `$${topCar.dailyRate || 'N/A'}/day`;
        document.getElementById(`top${index + 1}-id`).href = topCar.carId ? `car-details.html?id=${topCar.carId}` : '#';
    });
} else {
    console.error('Car not found');
}

 // Image Modal Functionality
 document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImage = document.getElementById('modalImage');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const thumbnailsContainer = document.getElementById('imageThumbnails');
    const galleryTab = document.getElementById('gallery-tab');
    const galleryContainer = document.getElementById('galleryImages');
    
    // Image sources array (will be populated from existing images)
    let images = [];
    let currentIndex = 0;
    
    // Collect all car images
    const carImages = document.querySelectorAll('.car-image');
    
    // Extract image sources and populate the images array
    carImages.forEach((img, index) => {
        if (img.src) {
            images.push({
                src: img.src,
                alt: img.alt || `Car image ${index + 1}`
            });
        }
        
        // Add click event to each image
        img.addEventListener('click', function() {
            openImageModal(parseInt(this.dataset.index));
        });
    });
    
    // Function to open modal with specific image
    function openImageModal(index) {
        if (images.length === 0) return;
        
        currentIndex = index;
        updateModalImage();
        createThumbnails();
        imageModal.show();
    }
    
    // Function to update the current image in modal
    function updateModalImage() {
        if (images.length === 0) return;
        
        // Ensure index is within bounds
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;
        
        modalImage.src = images[currentIndex].src;
        modalImage.alt = images[currentIndex].alt;
        
        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.modal-thumbnail');
        thumbnails.forEach((thumb, idx) => {
            if (idx === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    // Function to create thumbnails in the modal
    function createThumbnails() {
        thumbnailsContainer.innerHTML = '';
        
        images.forEach((img, idx) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = img.src;
            thumbnail.alt = `Thumbnail ${idx + 1}`;
            thumbnail.classList.add('modal-thumbnail');
            if (idx === currentIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.addEventListener('click', function() {
                currentIndex = idx;
                updateModalImage();
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
    
    // Previous button event listener
    prevButton.addEventListener('click', function() {
        currentIndex--;
        updateModalImage();
    });
    
    // Next button event listener
    nextButton.addEventListener('click', function() {
        currentIndex++;
        updateModalImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!document.getElementById('imageModal').classList.contains('show')) return;
        
        if (e.key === 'ArrowLeft') {
            currentIndex--;
            updateModalImage();
        } else if (e.key === 'ArrowRight') {
            currentIndex++;
            updateModalImage();
        } else if (e.key === 'Escape') {
            imageModal.hide();
        }
    });
    
    // Populate gallery tab with all images
    galleryTab.addEventListener('click', function() {
        populateGallery();
    });
    
    function populateGallery() {
        galleryContainer.innerHTML = '';
        
        images.forEach((img, idx) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-6 mb-3';
            
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt;
            imgElement.className = 'car-image img-fluid rounded w-100';
            imgElement.style.height = '200px';
            imgElement.style.objectFit = 'cover';
            imgElement.dataset.index = idx;
            
            imgElement.addEventListener('click', function() {
                openImageModal(idx);
            });
            
            col.appendChild(imgElement);
            galleryContainer.appendChild(col);
        });
    }});