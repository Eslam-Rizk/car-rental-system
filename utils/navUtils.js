import { savedCustomers } from "../mock/storage/seedStorage.js";

export function checkLogin() {
    if (localStorage.getItem('loggedInCustomer')) {
        const loggedInCustomer = JSON.parse(localStorage.getItem('loggedInCustomer'));

        const customer = savedCustomers.get().find(customer => customer.customerId === loggedInCustomer.customerId);

        if (customer) {
            // Display the profile dropdown and make login button invisible
            const loginButton = document.getElementById('loginBtn');
            loginButton.style.display = 'none';
            const userDiv = document.getElementById('profileDropdown');
            userDiv.style.display = 'block';
            document.getElementById('nameDisplay').textContent = `${customer.name}`;
            //set user profile url
            const userProfileUrl = document.getElementById('customer-profile');
            userProfileUrl.href = `user-profile.html?customerId=${customer.customerId}`;
        } else {
            console.error("Customer not found in saved customers.");
        }
    }
}

export function logout() {
    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInCustomer');
            window.location.href = 'index.html';
        });
    } else {
        console.error('Logout button not found');
    }
}