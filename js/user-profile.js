// Import utilities and data
import { checkLogin, logout } from "../utils/navUtils.js";
import { savedCustomers, savedBookings, savedCars, customersFilter, bookingsFilter } from "../mock/storage/seedStorage.js";
import { getLoggedInCustomerId } from "../utils/userUtils.js";

// Main initialization function
function initializeApp() {
  // Check login status and set up logout functionality
  checkLogin();
  logout();

  // Get current user ID
  const currentUserId = getLoggedInCustomerId();

  updateUserProfileDisplay(currentUserId);

  // Initialize bookings functionality
  initializeBookings(currentUserId);

  // Initialize customer settings form
  initializeCustomerSettingsForm(currentUserId);
}

// =============== USER PROFILE FUNCTIONALITY ===============
function updateUserProfileDisplay(userId) {
  const nameElement = document.getElementById('user-name');
  const emailElement = document.getElementById('user-email');
  const phoneElement = document.getElementById('user-number');

  if (!nameElement || !emailElement || !phoneElement) return;

  // Get customer data
  const customer = savedCustomers.getCustomerById(userId);
  if (!customer) {
    console.error('Customer not found');
    return;
  }

  // Update the UI elements
  nameElement.textContent = customer.name || 'User';
  emailElement.innerHTML = `<i class="fa-solid fa-envelope me-2"></i>${customer.email || 'No email provided'}`;
  phoneElement.innerHTML = `<i class="fa-solid fa-phone me-2"></i>${customer.phone || 'No phone provided'}`;
}

// =============== BOOKINGS FUNCTIONALITY ===============

function initializeBookings(userId) {
  generateBookingCards(userId);
  // Event delegation for booking detail buttons
  document.addEventListener('click', handleBookingDetailsClick);
}

function handleBookingDetailsClick(event) {
  const button = event.target.closest('.view-details-btn');
  if (button) {
    const bookingId = button.getAttribute('data-booking-id');
    showBookingDetails(bookingId);
  }
}

function generateBookingCards(userId) {
  const container = document.getElementById('bookings-container');
  if (!container) return;

  container.innerHTML = ''; // Clear existing content

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
          <h4 class="fs-5 m-0">Payment: 
            ${booking.totalAmount} USD <span class="fs-6 darkgrey"></span>
          </h4>
          <button class="btn btn-nav view-details-btn text-white" data-booking-id="${booking.bookingId}">Details</button>
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
                    <p><strong>Daily Rate:</strong> $${car.dailyRate} USD</p>
                    <p><strong>Total Amount:</strong> $${booking.totalAmount} USD</p>
                    <p><strong>Payment Status:</strong> ${booking.paymentStatus}</p>
                    <p><strong>Status:</strong> ${booking.paymentStatus}</p>
                  </div>
                </div>
                <div class="d-grid">
                  <button class="btn btn-danger rounded-pill"
                  style="display: ${booking.paymentStatus === 'Pending' ? 'block' : 'none'}"
                  id="cancelBookingBtn"
                  >
                    ${booking.paymentStatus === 'Pending' ? 'Cancel' : ''}
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

function showModal(modalHTML) {
  // Remove any existing modal
  const existingModal = document.getElementById('bookingDetailsModal');
  if (existingModal) {
    existingModal.remove();
  }

  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById('bookingDetailsModal'));
  modal.show();
}

//set booking status to cancelled
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
// =============== CUSTOMER SETTINGS FUNCTIONALITY ===============

function initializeCustomerSettingsForm(userId) {
  const saveButton = document.querySelector('button[type="submit"]');
  if (!saveButton) return;

  const formHandler = new CustomerSettingsFormHandler(userId);
  saveButton.addEventListener('click', (event) => formHandler.handleFormSubmit(event));
}

class CustomerSettingsFormHandler {
  constructor(customerId) {
    this.currentCustomer = null;
    this.formElements = {
      fullName: document.getElementById('fullName'),
      email: document.getElementById('email'),
      phone: document.getElementById('phone'),
      address: document.getElementById('address'),
      password: document.getElementById('password')
    };

    this.loadCustomerData(customerId);
  }

  loadCustomerData(customerId) {
    if (!customerId) {
      const loggedInCustomerData = localStorage.getItem('loggedInCustomer');
      if (loggedInCustomerData) {
        const customer = JSON.parse(loggedInCustomerData);
        customerId = customer.customerId;
      }
    }

    if (!customerId) {
      console.error('No customer ID provided');
      return;
    }

    this.currentCustomer = savedCustomers.getCustomerById(customerId);

    if (!this.currentCustomer) {
      console.error('Customer not found');
      return;
    }

    // Fill form fields with customer data
    this.formElements.fullName.value = this.currentCustomer.name || '';
    this.formElements.email.value = this.currentCustomer.email || '';
    this.formElements.phone.value = this.currentCustomer.phone || '';
    this.formElements.address.value = this.currentCustomer.address || '';
    // Don't populate password field for security reasons
    this.formElements.password.value = '';
  }

  getChangedFormData() {
    const changes = {};

    // Only add fields that have changed
    if (this.formElements.fullName.value !== this.currentCustomer.name) {
      changes.name = this.formElements.fullName.value;
    }

    if (this.formElements.email.value !== this.currentCustomer.email) {
      changes.email = this.formElements.email.value;
    }

    if (this.formElements.phone.value !== this.currentCustomer.phone) {
      changes.phone = this.formElements.phone.value;
    }

    if (this.formElements.address.value !== this.currentCustomer.address) {
      changes.address = this.formElements.address.value;
    }

    // Only include password if it's not empty (user wants to change it)
    if (this.formElements.password.value) {
      changes.password = this.formElements.password.value;
    }

    return changes;
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (!this.currentCustomer) {
      console.error('No customer loaded');
      return;
    }

    // Get only changed fields
    const changedData = this.getChangedFormData();

    // If email changed, check if new email already exists
    if (changedData.email && changedData.email !== this.currentCustomer.email) {
      if (customersFilter.checkCustomerExist(changedData.email)) {
        alert('A customer with this email already exists.');
        return;
      }
    }

    // Only proceed if there are actual changes
    if (Object.keys(changedData).length === 0) {
      alert('No changes detected.');
      return;
    }

    try {
      // Update customer with changed fields only
      savedCustomers.editCustomer(
        changedData,
        this.currentCustomer,
        customersFilter.checkCustomerExist
      );

      // Refresh customer data
      this.loadCustomerData(this.currentCustomer.customerId);

      alert('Customer information updated successfully!');
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer information.');
    }
  }
}

// =============== UTILITY FUNCTIONS ===============

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);