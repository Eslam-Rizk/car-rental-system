import { attachNavAndFooter } from "./utils/navUtils.js";
import { initializeBookingForm } from "./utils/booking/bookingFormHandler.js";
import { authLogin, getLoggedInCustomerId } from "./utils/userUtils.js";
import { savedCustomers } from "../../mock/storage/seedStorage.js";

const loggedInCustomerId = getLoggedInCustomerId();
if (!loggedInCustomerId) {
    authLogin("Please Login First to Book a Car", "login.html");
    // window.location.href = 'login.html';
}
else {
    const customer = savedCustomers.getCustomerById(loggedInCustomerId);
    if (!customer) {
        authLogin("Please Login First to Book a Car", "login.html");
        // window.location.href = 'login.html';
    }
}
attachNavAndFooter();
initializeBookingForm();