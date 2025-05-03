import { savedBookings, savedCustomers, savedCars, bookingsFilter } from '../../../mock/storage/seedStorage.js';
import { getLoggedInCustomerId } from './userUtils.js';
import { formatDate, calculateDays } from './dateUtils.js';

export function handleBookingDetailsClick(event) {
  const button = event.target.closest('.view-details-btn');
  if (button) {
    const bookingId = button.getAttribute('data-booking-id');
    showBookingDetails(bookingId);
  }
}

export function generateBookingCards(userId) {
  const container = document.getElementById('bookings-container');
  if (!container) return;

  container.innerHTML = '';

  // Get all bookings
  const bookings = savedBookings.get();

  // Filter bookings for current user
  const userBookings = bookings.filter(booking => booking.customerId === userId);

  if (userBookings.length === 0) {
    container.innerHTML = '<div class="col-12"><p class="text-center">No bookings found.</p></div>';
    return;
  }

  // Generate HTML for each booking
  const bookingsHTML = userBookings.map(booking => {
    const car = savedCars.getCarById(booking.carId);
    if (!car) return ''; // Skip if car details not found

    return createBookingCardHTML(booking, car);
  }).join('');

  container.innerHTML = bookingsHTML;
}
export function updateUserProfileDisplay(userId) {
  const nameElement = document.getElementById('user-name');
  const emailElement = document.getElementById('user-email');
  const phoneElement = document.getElementById('user-number');
  const address = document.getElementById('user-address');

  if (!nameElement || !emailElement || !phoneElement || !address) return;

  // Get customer data
  const customer = savedCustomers.getCustomerById(userId);
  if (!customer) {
    console.error('Customer not found');
    return;
  }

  // Update the UI elements
  nameElement.textContent = customer.name || 'User';
  emailElement.innerHTML = `<i class="fa-solid fa-envelope me-2 text-main"></i>${customer.email || 'No email provided'}`;
  phoneElement.innerHTML = `<i class="fa-solid fa-phone me-2 text-main"></i>${customer.phone || 'No phone provided'}`;
  address.innerHTML = `<i class="fa-solid fa-location-dot me-2 text-main"></i>${customer.address || 'No address provided'}`;
}
function createBookingCardHTML(booking, car) {
  return `  
      <div class="col-lg-4 mb-4">
        <div class="car-card p-3">
          <div class="car-img-wrapper position-relative">
            <img src="${car.imageUrls[0]}" alt="${car.make} ${car.model}" />
            <div class="rating-overlay position-absolute top-0 end-0 m-2">
              <i class="bi bi-star-fill" style="color: #FFD700;"></i>
              <span class="ms-1">${car.rating || '4.5'}</span>
            </div>
          </div> 
          <div class="car-details mt-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="card-title mb-0 fw-bold">${car.make} ${car.model} ${car.year}</h5>
              <span class="badge bg-${getStatusBadgeClass(booking.paymentStatus)} ${booking.paymentStatus === 'Pending' ? 'text-dark' : ''} fw-normal px-2 py-1">${booking.paymentStatus}</span>
            </div>
          <div class="car-details-icons mb-2 d-flex justify-content-between">
            <i class="bi bi-person-fill"><span class="ms-1">${car.seats ? car.seats.toString().padStart(2, '0') : '05'}</span></i>
            <i class="bi bi-suitcase"><span class="ms-1">${car.luggage ? car.luggage.toString().padStart(2, '0') : '03'}</span></i>
            <i class="bi bi-car-front-fill"><span class="ms-1">${car.transmission || 'automatic'}</span></i>
            <i class="bi bi-fuel-pump-fill"><span class="ms-1">${car.fuel || 'Petrol'}</span></i>
          </div>
        </div>
        <div class="car-price mt-3 d-flex align-items-center justify-content-between">
          <h4 class="fs-5 m-0 text-main">${booking.totalAmount} $ <span class="fs-6 darkgrey"></span></h4>
          <button class="btn btn-nav view-details-btn text-white" data-booking-id="${booking.bookingId}">Details</button>
          </div>
        </div>
      </div>
  `;
}

function showBookingDetails(bookingId) {
  const bookings = savedBookings.get();
  const booking = bookings.find(b => b.bookingId === bookingId);
  if (!booking) return;

  const car = savedCars.getCarById(booking.carId);
  if (!car) return;

  const days = calculateDays(booking.startDate, booking.endDate);

  // Create and show modal
  const modalHTML = createBookingModalHTML(booking, car, days);
  showModal(modalHTML);
  const cancelButton = document.getElementById('cancelBookingBtn');
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      cancelBooking(bookingId);
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('bookingDetailsModal'));
      if (modal) {
        modal.hide();
      }
      // Refresh the bookings display
      generateBookingCards(getLoggedInCustomerId());
    });
  }
  const bookAgainButton = document.getElementById('book-again-btn');
  if (bookAgainButton) {
    bookAgainButton.addEventListener('click', () => {
      window.location.href = `car-details.html?carId=${car.carId}`;
    });
  }
}

function createBookingModalHTML(booking, car, days) {
  return `
    <div class="modal fade" id="bookingDetailsModal" tabindex="-1" aria-labelledby="bookingDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="bookingDetailsModalLabel">Booking Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="row g-4">
              <!-- Car Info Section -->
              <div class="col-md-6">
                <img src="${car.imageUrls[0]}" alt="${car.make} ${car.model}" class="img-fluid rounded mb-3">
                <h5 class="mb-3">${car.make} ${car.model} ${car.year}</h5>
                <div class="row">
                  <div class="col-6">
                    <dl class="mb-0">
                      <dt>Color</dt>
                      <dd>${car.color}</dd>
                      <dt>Category</dt>
                      <dd>${car.category}</dd>
                      <dt>Transmission</dt>
                      <dd>${car.transmission}</dd>
                    </dl>
                  </div>
                  <div class="col-6">
                    <dl class="mb-0">
                      <dt>Fuel Type</dt>
                      <dd>${car.fuelType}</dd>
                      <dt>Passenger Capacity</dt>
                      <dd>${car.passengerCapacity}</dd>
                      <dt>Luggage Capacity</dt>
                      <dd>${car.luggageCapacity}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- Booking Info Section -->
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header">
                    <h5 class="mb-0">Reservation Details</h5>
                  </div>
                  <div class="card-body">
                    <dl class="row mb-0">
                      <dt class="col-sm-5">Booking ID</dt>
                      <dd class="col-sm-7">${booking.bookingId}</dd>

                      <dt class="col-sm-5">Start Date</dt>
                      <dd class="col-sm-7">${formatDate(booking.startDate)}</dd>

                      <dt class="col-sm-5">End Date</dt>
                      <dd class="col-sm-7">${formatDate(booking.endDate)}</dd>

                      <dt class="col-sm-5">Duration</dt>
                      <dd class="col-sm-7">${days} day${days > 1 ? 's' : ''}</dd>

                      <dt class="col-sm-5">Daily Rate</dt>
                      <dd class="col-sm-7">${car.dailyRate} $</dd>

                      <dt class="col-sm-5">Total Amount</dt>
                      <dd class="col-sm-7">${booking.totalAmount} $</dd>

                      <dt class="col-sm-5">Status</dt>
                      <dd class="col-sm-7">${booking.paymentStatus}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer d-flex justify-content-center">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-nav" id="book-again-btn">Book Again</button>
            <button class="btn btn-danger rounded-pill ms-5"
              style="display: ${booking.paymentStatus === 'Pending' ? 'block' : 'none'}" id="cancelBookingBtn">
                    Cancel Reservation </button>
          </div>
        </div>
      </div>
    </div>
  `;
}



function getStatusBadgeClass(status) {
  switch (status) {
    case 'Pending': return 'warning';
    case 'Completed': return 'success';
    default: return 'danger';
  }
}
function showModal(modalHTML) {
  const existingModal = document.getElementById('bookingDetailsModal');
  if (existingModal) {
    existingModal.remove();
  }

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = new bootstrap.Modal(document.getElementById('bookingDetailsModal'));
  modal.show();
}

function cancelBooking(bookingId) {
  const bookings = savedBookings.get();
  const booking = bookings.find(b => b.bookingId === bookingId);
  if (!booking) return;

  const editedBooking = booking;
  editedBooking.paymentStatus = 'Cancelled';
  savedBookings.editBooking(editedBooking, booking, bookingsFilter.checkBookingExist);

  // Refresh the bookings display
  generateBookingCards(getLoggedInCustomerId());
}