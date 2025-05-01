
// <<<<<<<< HEAD:assets/js/register.js
// import { handleValidation } from './utils/validateInput.js';
// import { getRegistrationDate } from './utils/registrationDate.js';
// import { handlePasswordConfirmation } from './utils/passwordValidation.js';
// import { savedCustomers, customersFilter } from '../../mock/storage/seedStorage.js';

// ========
import { handleValidation , validateInputNow } from './utils/validateInput.js';
import { getRegistrationDate } from './utils/registrationDate.js';
import { handlePasswordConfirmation ,confirmPasswordNow} from './utils/passwordValidation.js';
import { savedCustomers, customersFilter , seedStorage} from '../../mock/storage/seedStorage.js';

seedStorage()
console.log(savedCustomers.get()); 
const nameInput = document.querySelector('input[name="name"]');
const nameIcon = document.querySelector(".fa-user");
const namePattern = /^[A-Za-zÀ-ÿ\s]+$/;

const emailInput = document.querySelector('input[name="email"]');
const emailIcon = document.querySelector(".fa-envelope");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const mobileInput = document.querySelector('input[name="mobile"]');
const mobileIcon = document.querySelector(".fa-mobile");
const mobilePattern = /^[0-9]{8,15}$/;

const addressInput = document.querySelector('input[name="address"]');
const addressIcon = document.querySelector(".fa-location-dot");
const addressPattern = /^[A-Za-z0-9\s,.'-]{3,}$/;

const passwordInput = document.querySelector('input[name="password"]');
const passwordIcon = document.querySelector(".fa-lock");
const passwordPattern = /^.{6,}$/;

const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
const confirmIcon = document.querySelector("#lock2");

const signUpForm = document.getElementById("signupForm");

handleValidation(nameInput, namePattern, nameIcon);
handleValidation(emailInput, emailPattern, emailIcon);
handleValidation(mobileInput, mobilePattern, mobileIcon);
handleValidation(addressInput, addressPattern, addressIcon);
handleValidation(passwordInput, passwordPattern, passwordIcon);

handlePasswordConfirmation(passwordInput, confirmPasswordInput, confirmIcon);


signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateInputNow(nameInput, namePattern, nameIcon);
  const isEmailValid = validateInputNow(emailInput, emailPattern, emailIcon);
  const isMobileValid = validateInputNow(mobileInput, mobilePattern, mobileIcon);
  const isAddressValid = validateInputNow(addressInput, addressPattern, addressIcon);
  const isPasswordValid = validateInputNow(passwordInput, passwordPattern, passwordIcon);
  const isConfirmValid = confirmPasswordNow(passwordInput, confirmPasswordInput, confirmIcon);
// check if any field value is not in the required format 
  if (!(isNameValid && isEmailValid && isMobileValid && isAddressValid && isPasswordValid && isConfirmValid)) {
    console.log("some or all the fields are not valid")
    return;
  }
  // check if user already exists
  if((customersFilter.checkCustomerExist(emailInput.value))){
    console.log("customer already exists")
    return; 
  }

  const user = {
    name: nameInput.value,
    email: emailInput.value,
    phone: mobileInput.value,
    address: addressInput.value,
    registrationDate: getRegistrationDate(),
    role: "user",
    password: passwordInput.value
  };

  savedCustomers.addCustomer(user, customersFilter.checkCustomerExist);
// log the users and the added user 
  console.log(savedCustomers.get());
  console.log(user);

// <<<<<<<< HEAD:assets/js/register.js

//   window.location.href = "../login.html"; 
// ========
  window.location.href = "./login.html"; 
// >>>>>>>> origin/bassem:auth/register/register.js
});
