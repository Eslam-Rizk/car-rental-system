import { getLoggedInCustomerId, getCustomerIdFromUrl, authLogin } from '../utils/userUtils.js';
import { savedCustomers } from '../../../mock/storage/seedStorage.js';

// ================= AUTHENTICATION =================
export function authDashboard() {
    //check if the user is logged in first
    const customerId = getLoggedInCustomerId();
    // console.log(customerId)
    if (!customerId) {
        console.error("Unauthorized access");
        authLogin("Unauthorized access", "index.html");
        // window.location.href = "login.html";

    }

    else {
        // then check if user is admin --> only allow access to admins
        const customer = savedCustomers.getCustomerById(customerId);
        if (!customer || customer.role !== "admin") {
            console.error("Admin access required");
            authLogin("Admin access required", "index.html");
            // window.location.href = "index.html";

        }
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
        authLogin("", "login.html");
        // window.location.href = "dashboard.html";
        throw new Error("Unauthorized settings access");
    }

}
