import { handleValidation, validateInputNow } from "./utils/validateInput.js";
import { handlePasswordMatching } from "./utils/passwordValidation.js";
import { savedCustomers, customersFilter } from "../../mock/storage/seedStorage.js";

// localStorage.removeItem("cars");
// localStorage.removeItem("bookings");
// localStorage.removeItem("customers");

const emailInput = document.querySelector('input[name="email"]');
const emailIcon = document.querySelector(".fa-envelope");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordInput = document.querySelector('input[name="password"]');
const passwordIcon = document.querySelector(".fa-lock");
const passwordPattern = /^.{6,}$/;

const signInForm = document.getElementById("signinForm");

handleValidation(emailInput, emailPattern, emailIcon);

handleValidation(passwordInput, passwordPattern, passwordIcon);

signInForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const isEmailValid = validateInputNow(emailInput, emailPattern, emailIcon);
    const isPasswordValid = validateInputNow(
        passwordInput,
        passwordPattern,
        passwordIcon
    );

    if (!(isEmailValid && isPasswordValid)) {
        console.log("some or all the fields are not valid");
        return;
    }
    const customer = customersFilter.getCustomerByEmail(emailInput.value);
    if (!customer) {
        alert("user does not exist");
        return;
    }
    handlePasswordMatching(passwordInput, customer.password, passwordIcon);
    if (customer.password !== passwordInput.value) {
        console.log("wrong password");
        return;
    }

    const loggedInCustomer = {
        customerId: customer.customerId,
    };
    localStorage.setItem("loggedInCustomer", JSON.stringify(loggedInCustomer)); //save id only for security
    console.log("loggedddd: ", loggedInCustomer);

    // simulate login for different users 
    if (customer.role === "admin") {
        window.location.href = "./dashboard.html";
    } else {
        window.location.href = "./index.html";
    }
});
