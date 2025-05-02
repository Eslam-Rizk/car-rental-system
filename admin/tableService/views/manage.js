// all of these objects and functions are in the seedStorage.js file.
import {
  seedStorage,
  storageHandler,
  savedBookings,
  savedCars,
  savedCustomers,
  carsFilter,
  customersFilter,
  bookingsFilter,
} from "../../../mock/storage/seedStorage.js";

import { makeRow } from "../core/makeRow.js";
import { render } from "../core/render.js";
import {
  addCustomerButton,
  addCarButton,
} from "../selectors/tableSelectors.js";
import { addCustomerForm } from "../forms/addCustomer.js";
import { addCarForm } from "../forms/AddCar.js";
import { customerFormElements } from "../selectors/customerSelectors.js";
import { carFormElements } from "../selectors/carSelectors.js";

// initialize the local storage 
seedStorage();


//  uncomment ⬇⬇⬇⬇⬆⬆⬆⬆ in case a need to reset the local storage
// localStorage.removeItem('customers')
// localStorage.removeItem('bookings')
// localStorage.removeItem('cars')
const customers = savedCustomers.get();
const cars = savedCars.get();
const bookings = savedBookings.get();

// render the tables 
render(customers, "customer");
render(cars, "car");
render(bookings, "booking");

// attach event listeners for the add buttons
addCustomerButton.addEventListener("click", (e) => {
  addCustomerForm(customerFormElements);
});

addCarButton.addEventListener("click", (e) => {
  addCarForm(carFormElements);
});

