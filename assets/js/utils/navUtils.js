import { savedCustomers } from "../../../mock/storage/seedStorage.js";
import { getLoggedInCustomerId } from "./userUtils.js";

export function checkLogin() {

    const loggedInCustomer = getLoggedInCustomerId();
    console.log("Logged in customer ID: ", loggedInCustomer);
    const customer = savedCustomers.get().find(customer => customer.customerId === loggedInCustomer);
    console.log("Logged in customer: ", customer);
    if (customer) {
        const loginButton = document.getElementById('loginBtn');
        loginButton.style.display = 'none';
        const userDiv = document.getElementById('profileDropdown');
        userDiv.style.display = 'block';
        document.getElementById('nameDisplay').textContent = `${customer.name}`;
        const userProfileUrl = document.getElementById('customer-profile');
        userProfileUrl.href = `user-profile.html?customerId=${customer.customerId}`;
    } else {
        console.error("Customer not found in saved customers.");
    }
}

export function logout() {
    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInCustomer');
            window.location.href = 'login.html';
        });
    } else {
        console.error('Logout button not found');
    }
}