import { checkLogin, logout } from "./utils/navUtils.js";
import { getLoggedInCustomerId, getCustomerIdFromUrl } from "./utils/userUtils.js";
import { SettingsFormHandler } from "./utils/userSettings/userFormHadnler.js";
import { generateBookingCards, handleBookingDetailsClick,  } from "./utils/profileBookingHistoryUtils.js";
import { updateUserProfileDisplay } from "./utils/profileBookingHistoryUtils.js";

initializeUser();

function initializeUser() {
  const loggedInCustomerId = getLoggedInCustomerId();
  if (!loggedInCustomerId || loggedInCustomerId != getCustomerIdFromUrl()) {
    window.location.href = 'login.html';
    return;
  }

  //set nav login btn or user profile 
  checkLogin();
  logout();

  updateUserProfileDisplay(loggedInCustomerId);
  initializeBookings(loggedInCustomerId);
  initializeCustomerSettingsForm(loggedInCustomerId);
}

//user profile


//booking history
function initializeBookings(userId) {
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

