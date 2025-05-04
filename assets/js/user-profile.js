import { attachNavAndFooter } from "./utils/navUtils.js";
import { getLoggedInCustomerId, getCustomerIdFromUrl, authLogin } from "./utils/userUtils.js";
import { SettingsFormHandler } from "./utils/userSettings/userFormHadnler.js";
import { generateBookingCards, handleBookingDetailsClick, } from "./utils/profileBookingHistoryUtils.js";
import { updateUserProfileDisplay } from "./utils/profileBookingHistoryUtils.js";
import { savedCustomers } from "../../mock/storage/seedStorage.js";

initializeUser();

function initializeUser() {
  const loggedInCustomerId = getLoggedInCustomerId();
  if (!loggedInCustomerId || loggedInCustomerId != getCustomerIdFromUrl()) {
    authLogin("Unauthorized access", "login.html");
    // window.location.href = 'login.html';
    return;
  }

  const user = savedCustomers.getCustomerById(loggedInCustomerId);
  if (user && user.role === "customer") {
    //set nav login btn or user profile 
    attachNavAndFooter();
  }

  updateUserProfileDisplay(loggedInCustomerId);
  initializeBookings(loggedInCustomerId);
  initializeCustomerSettingsForm(loggedInCustomerId);
}

//user profile


//booking history
function initializeBookings(userId) {
  const user = savedCustomers.getCustomerById(userId);
  if (user && user.role === "admin") {
    const bookingHistoryTab = document.getElementById('bookings-tab-li');
    const bookingHistorySection = document.getElementById('bookings-tab-pane');
    const settingsTab = document.getElementById('settings-tab');
    const settingsTabPane = document.getElementById('settings-tab-pane');
    if (bookingHistoryTab) {
      bookingHistoryTab.style.display = 'none';
    }
    if (bookingHistorySection) {
      bookingHistorySection.style.display = `none`;
    }
    if (settingsTab) {
      settingsTab.classList.add('active');
    }
    if (settingsTabPane) {
      settingsTabPane.classList.add('show', 'active');
    }
    return;
  }
  generateBookingCards(userId);
  document.addEventListener('click', handleBookingDetailsClick);
}

//settings
function initializeCustomerSettingsForm(userId) {
  const saveButton = document.querySelector('button[type="submit"]');
  if (!saveButton) return;

  const formHandler = new SettingsFormHandler(userId);
  saveButton.addEventListener('click', (event) => formHandler.handleFormSubmit(event));
}

