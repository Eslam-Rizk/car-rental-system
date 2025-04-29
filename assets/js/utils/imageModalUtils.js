// imageModalUtils.js

let images = [];
let currentIndex = 0;
let modalInstance, modalImage, thumbnailsContainer, galleryContainer;

// Function to initialize the image modal with image class argument
export function initializeImageModal(imageClass) {
    modalInstance = new bootstrap.Modal(document.getElementById('imageModal'));
    modalImage = document.getElementById('modalImage');
    thumbnailsContainer = document.getElementById('imageThumbnails');
    galleryContainer = document.getElementById('galleryImages');

    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const galleryTab = document.getElementById('gallery-tab');

    const carImages = document.querySelectorAll(imageClass);

    // Collect all car images with imageClass class
    carImages.forEach((img, index) => {
        if (img.src) {
            images.push({
                src: img.src,
                alt: img.alt || `Car image ${index + 1}`
            });
        }

        // Add click event to each image
        img.addEventListener('click', function () {
            openImageModal(parseInt(this.dataset.index));
        });
    });

    // Add click event to previous and next buttons
    prevButton.addEventListener('click', showPreviousImage);
    nextButton.addEventListener('click', showNextImage);
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Add click event to gallery tab
    galleryTab.addEventListener('click', populateGallery);
}

// Function to open modal with specific image
function openImageModal(index) {
    if (images.length === 0) return;
    currentIndex = index;
    updateModalImage();
    createThumbnails();
    modalInstance.show();
}

// Function to update the current image in modal
function updateModalImage() {
    if (images.length === 0) return;

    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].alt;

    const thumbnails = document.querySelectorAll('.modal-thumbnail');
    thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentIndex);
    });
}

// Function to create thumbnails for the modal
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

        thumbnail.addEventListener('click', function () {
            currentIndex = idx;
            updateModalImage();
        });

        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Function to show the previous image
function showPreviousImage() {
    currentIndex--;
    updateModalImage();
}

// Function to show the next image
function showNextImage() {
    currentIndex++;
    updateModalImage();
}

// Function to handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (!document.getElementById('imageModal').classList.contains('show')) return;

    if (e.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    } else if (e.key === 'Escape') {
        modalInstance.hide();
    }
}

// Function to populate the gallery with images
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

        imgElement.addEventListener('click', function () {
            openImageModal(idx);
        });

        col.appendChild(imgElement);
        galleryContainer.appendChild(col);
    });
}


///////////////////////////////////////////////// image modal css

// /* Image modal styles */
// .modal-fullscreen .modal-content {
//     height: 100%;
//     border: none;
//     border-radius: 0;
// }

// .modal-image-container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100%;
//     padding: 20px;
// }

// .modal-car-image {
//     max-height: 80vh;
//     max-width: 100%;
//     object-fit: contain;
// }

// .modal-close {
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     background-color: rgba(255, 255, 255, 0.7);
//     border: none;
//     border-radius: 50%;
//     width: 40px;
//     height: 40px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//     z-index: 1060;
//     transition: background-color 0.3s;
// }

// .modal-close:hover {
//     background-color: rgba(255, 255, 255, 0.9);
// }

// .modal-nav {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: rgba(255, 255, 255, 0.7);
//     border: none;
//     border-radius: 50%;
//     width: 50px;
//     height: 50px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//     z-index: 1050;
//     transition: background-color 0.3s;
// }

// .modal-nav:hover {
//     background-color: rgba(255, 255, 255, 0.9);
// }

// .modal-prev {
//     left: 20px;
// }

// .modal-next {
//     right: 20px;
// }

// .modal-thumbnails {
//     position: absolute;
//     bottom: 20px;
//     left: 50%;
//     transform: translateX(-50%);
//     display: flex;
//     gap: 10px;
//     padding: 10px;
//     background-color: rgba(255, 255, 255, 0.7);
//     border-radius: 10px;
// }

// .modal-thumbnail {
//     width: 60px;
//     height: 40px;
//     object-fit: cover;
//     border-radius: 5px;
//     cursor: pointer;
//     opacity: 0.7;
//     transition: opacity 0.3s;
// }

// .modal-thumbnail:hover, .modal-thumbnail.active {
//     opacity: 1;
// }

//////////////////////////////////////////////////// image modal html
// <!-- Image Modal -->
//         <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
//             <div class="modal-dialog modal-fullscreen">
//                 <div class="modal-content bg-dark">
//                     <div class="modal-body position-relative p-0">
//                         <button type="button" class="modal-close" data-bs-dismiss="modal" aria-label="Close">
//                             <i class="fas fa-times"></i>
//                         </button>

//                         <button class="modal-nav modal-prev" id="prevImage">
//                             <i class="fas fa-chevron-left"></i>
//                         </button>

//                         <div class="modal-image-container">
//                             <img src="" class="modal-car-image" id="modalImage" alt="Car Image">
//                         </div>

//                         <button class="modal-nav modal-next" id="nextImage">
//                             <i class="fas fa-chevron-right"></i>
//                         </button>

//                         <div class="modal-thumbnails" id="imageThumbnails">
//                             <!-- Thumbnails will be added dynamically -->
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>