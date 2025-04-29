import { savedBookings, savedCustomers, savedCars, bookingsFilter} from '../../../mock/storage/seedStorage.js';
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
          <img src="${car.imageUrl[0]}" alt="${car.make} ${car.model}" />
          <div class="car-details mt-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="card-title mb-0 fw-bold">${car.make} ${car.model} ${car.year}</h5>
              <span class="badge bg-${getStatusBadgeClass(booking.paymentStatus)} ${booking.paymentStatus === 'Pending' ? 'text-dark' : ''} fw-normal px-2 py-1">${booking.paymentStatus}</span>
            </div>
            <div class="car-details-icons mb-2">
              <i class="bi bi-person-fill me-4"><span class="ms-1">${car.seats ? car.seats.toString().padStart(2, '0') : '05'}</span></i>
              <i class="bi bi-suitcase me-4"><span class="ms-1">${car.luggage ? car.luggage.toString().padStart(2, '0') : '03'}</span></i>
              <i class="bi bi-car-front-fill me-4"><span class="ms-1">${car.transmission || 'automatic'}</span></i>
            </div>
          </div>
          <div class="car-price mt-3 d-flex align-items-center justify-content-between">
            <h4 class="fs-5 m-0 text-main">${booking.totalAmount} $ <span class="fs-6 darkgrey"></span>
            </h4>
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
              <div class="row">
                <div class="col-md-6">
                  <img src="${car.imageUrl[0]}" alt="${car.make} ${car.model}" class="img-fluid rounded mb-3">
                  <h4>${car.make} ${car.model} ${car.year}</h4>
                  <div class="row mb-3">
                    <div class="col-6">
                      <p><strong>Color:</strong> ${car.color}</p>
                      <p><strong>Category:</strong> ${car.category}</p>
                      <p><strong>Transmission:</strong> ${car.transmission}</p>
                    </div>
                    <div class="col-6">
                      <p><strong>Fuel Type:</strong> ${car.fuelType}</p>
                      <p><strong>Passenger Capacity:</strong> ${car.passengerCapacity}</p>
                      <p><strong>Luggage Capacity:</strong> ${car.luggageCapacity}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card mb-3">
                    <div class="card-header bg-light">
                      <h5 class="mb-0">Reservation Details</h5>
                    </div>
                    <div class="card-body">
                      <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                      <p><strong>Start Date:</strong> ${formatDate(booking.startDate)}</p>
                      <p><strong>End Date:</strong> ${formatDate(booking.endDate)}</p>
                      <p><strong>Duration:</strong> ${days} day${days > 1 ? 's' : ''}</p>
                      <p><strong>Daily Rate:</strong> ${car.dailyRate} $</p>
                      <p><strong>Total Amount:</strong> ${booking.totalAmount} $</p>
                      <p><strong>Status:</strong> ${booking.paymentStatus}</p>
                    </div>
                  </div>
                  <div class="d-grid">
                    <button class="btn btn-danger rounded-pill"
                    style="display: ${booking.paymentStatus === 'Pending' ? 'block' : 'none'}"
                    id="cancelBookingBtn"
                    >
                      ${booking.paymentStatus === 'Pending' ? 'Cancel Reservation' : ''}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn rounded-pill btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Pending': return 'info';
        case 'Completed': return 'success';
        default: return 'secondary';
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