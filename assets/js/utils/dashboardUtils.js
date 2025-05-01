import { getLoggedInCustomerId, getCustomerIdFromUrl } from '../utils/userUtils.js';
import { savedCustomers } from '../../../mock/storage/seedStorage.js';

// ================= AUTHENTICATION =================
export function authDashboard() {
    //check if the user is logged in first
    const customerId = getLoggedInCustomerId();
    // console.log(customerId)
    if (!customerId) {
        window.location.href = "login.html";
        // alert("You need to login first!");

        throw new Error("Unauthorized access");
    }

    // then check if user is admin --> only allow access to admins
    const customer = savedCustomers.getCustomerById(customerId);
    if (!customer || customer.role !== "admin") {
        window.location.href = "index.html";
        // alert("You don't have admin access!");

        throw new Error("Admin access required");
    }

}


// =====================SETTINGS=======================
export function getAdminSettings() {
    const settingsLink = document.getElementById("settings-link");
    const loggedInCustomerId = getLoggedInCustomerId();
    if (settingsLink && loggedInCustomerId) {
        settingsLink.href = `dashboardSettings.html?customerId=${loggedInCustomerId}`;
    }
}

export function dashboardSettingsAuth() {
    const customerIdFromUrl = getCustomerIdFromUrl();
    const loggedInCustomerId = getLoggedInCustomerId();

    if (customerIdFromUrl !== loggedInCustomerId) {
        // alert("You are not authorized to view this settings page.");
        window.location.href = "dashboard.html";
        throw new Error("Unauthorized settings access");
    }

}