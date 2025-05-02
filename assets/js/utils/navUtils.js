import { savedCustomers } from "../../../mock/storage/seedStorage.js";
import { getLoggedInCustomerId } from "./userUtils.js";

export function checkLogin() {

    const loggedInCustomer = getLoggedInCustomerId();
    console.log("Logged in customer ID: ", loggedInCustomer);
    const customer = savedCustomers.get().find(customer => customer.customerId === loggedInCustomer);
    console.log("Logged in customer: ", customer);
    const loginButton = document.getElementById('loginBtn');
    if (customer) {
        loginButton.style.display = 'none';
        const userDiv = document.getElementById('profileDropdown');
        userDiv.style.display = 'block';
        document.getElementById('nameDisplay').textContent = `${customer.name}`;
        const userProfileUrl = document.getElementById('customer-profile');
        userProfileUrl.href = `user-profile.html?customerId=${customer.customerId}`;
    } else {
        console.log("Customer not found in saved customers.");
        loginButton.addEventListener('click', function () {
            window.location.href = 'login.html';
        });
    }
}

export function logout() {
    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInCustomer');
            sessionStorage.removeItem('loggedInCustomer');
            window.location.href = 'login.html';
        });
    } else {
        console.error('Logout button not found');
    }
}

// Navigation and Footer Module
export function attachNavAndFooter() {
    // Navigation HTML content
    const navHTML = `
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <ul class="navbar-nav me-auto px-4">
                <li class="nav-item d-flex align-items-center">
                    <img src="assets/images/steering wheel logo.png" class="d-inline logo" alt="Wheelzy Logo" />
                    <a class="nav-link fs-4 fw-bold nav-main" href="index.html">Wheelzy</a>
                </li>
            </ul>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse w-100 px-4" id="navbarContent">
                <!-- left-->
                <!-- center -->
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item px-2">
                        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li class="nav-item px-2">
                        <a class="nav-link" href="listings.html">Car Listings</a>
                    </li>
                    <li class="nav-item px-2">
                        <a class="nav-link" href="contact.html">Contact Us</a>
                    </li>
                    <li class="nav-item px-2">
                        <a class="nav-link" href="about.html">About Us</a>
                    </li>
                </ul>
                <!-- right-->
                <div class="d-flex ms-auto" id="login-or-profile">
                    <!-- login btn - shown by default -->
                    <div id="loginBtn">
                        <button class="btn btn-nav">
                            <a class="text-white text-decoration-none" href="#">Login</a>
                        </button>
                    </div>
                    <!-- profile circle - hidden by default -->
                    <div id="profileDropdown" class="dropdown position-relative align-items-center" style="display: none;">
                        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle ps-0"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="assets/images/avatar.png" alt="Profile" class="user-avatar avatar-img rounded-circle">
                            <span class="ms-2 fw-bold" id="nameDisplay"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end mt-2">
                            <li><a class="dropdown-item" href="profile.html" id="customer-profile">My Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="index.html" id="logoutBtn">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;

    // Footer HTML content
    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="row">
                <!-- RentDrive Column -->
                <div class="col-md-3 mb-4 mb-md-0">
                    <h4 class="text-uppercase mb-3"><img src="assets/images/steering wheel logo.png" alt="logo" class="logo">
                    Wheelzy
                    </h4>
                    <div class="social-media">
                        <h6 class="text-uppercase mb-2">Social media</h6>
                        <ul class="list-unstyled">
                            <li><a href="#" class="text-decoration-none"><i class="bi bi-twitter me-2"></i>Twitter</a></li>
                            <li><a href="#" class="text-decoration-none"><i class="bi bi-instagram me-2"></i>Instagram</a></li>
                            <li><a href="#" class="text-decoration-none"><i class="bi bi-facebook me-2"></i>Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <!-- Contact Information Column -->
                <div class="col-md-3 mb-4 mb-md-0">
                    <h4 class="text-uppercase mb-3">Contact Information</h4>
                    <address>
                        <p>5th Settlement,<br>1250-148 Cairo, Egypt</p>
                        <p>+20 1234567</p>
                        <p>info@wheelzy.com</p>
                    </address>
                </div>
                <!-- Home Column -->
                <div class="col-md-3 mb-4 mb-md-0">
                    <h4 class="text-uppercase mb-3">Home</h4>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-decoration-none">About Us</a></li>
                        <li><a href="#" class="text-decoration-none">FAQ</a></li>
                        <li><a href="#" class="text-decoration-none">Contact Us</a></li>
                        <li><a href="#" class="text-decoration-none">Services</a></li>
                        <li><a href="#" class="text-decoration-none">Privacy Policy</a></li>
                        <li><a href="#" class="text-decoration-none">Car Listings</a></li>
                    </ul>
                </div>
                <!-- Contact Us Column -->
                <div class="col-md-3">
                    <div class="working-hours mt-4">
                        <h4 class="mb-3 text-uppercase">Working Hours</h4>
                        <p class="small mb-1">Sunday To Thursday: 8:00 AM - 8:00 PM</p>
                        <p class="small mb-3">Friday To Saturday: 8:00 AM - 5:00 PM</p>
                    </div>
                </div>
            </div>
            <!-- Copyright Row -->
            <div class="row mt-5 pt-3 border-top">
                <div class="col-12 text-center">
                    <p class="mb-0">© 2025 Wheelzy. All rights reserved</p>
                </div>
            </div>
        </div>
    </footer>
    `;

    // Find the nav and footer containers in the current page
    const navContainer = document.getElementById('nav-container');
    const footerContainer = document.getElementById('footer-container');

    // If the containers exist, inject the HTML
    if (navContainer) {
        navContainer.innerHTML = navHTML;
    }

    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }

    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Check if user is logged in and update UI accordingly
    checkLogin();

    // Set up logout button event listener
    logout();
}

/**
 * Sets the active navigation link based on the current page URL
 */
function setActiveNavLink() {
    // Get the current page filename from the URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    // Add active class to the link that matches the current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && (href === '#' || href === '/' || href === ''))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Checks if the user is logged in and updates UI elements accordingly
 */
function checkLoginStatus() {
    // Check if user data exists in local storage
    const userData = localStorage.getItem('userData');
    
    if (userData) {
        // User is logged in
        const user = JSON.parse(userData);
        
        // Show profile dropdown and hide login button
        const loginBtn = document.getElementById('loginBtn');
        const profileDropdown = document.getElementById('profileDropdown');
        
        if (loginBtn && profileDropdown) {
            loginBtn.style.display = 'none';
            profileDropdown.style.display = 'flex';
            
            // Set user name in the dropdown
            const nameDisplay = document.getElementById('nameDisplay');
            if (nameDisplay && user.name) {
                nameDisplay.textContent = user.name;
            }
        }
        
        // Set up logout button event listener
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Clear user data from storage
                localStorage.removeItem('userData');
                // Redirect to home page
                window.location.href = 'index.html';
            });
        }
    }
}