import {
  savedBookings,
  savedCars,
  savedCustomers,
} from "../../../mock/storage/seedStorage.js";
import {
  customersTableBody,
  carsTableBody,
  bookingsTableBody,
} from "../selectors/tableSelectors.js";
import { render } from "./render.js";
import { showMessage } from "./alerts.js";

const contextMap = {
  car: savedCars,
  booking: savedBookings,
  customer: savedCustomers,
};
const tableContextMap = {
  car: carsTableBody,
  customer: customersTableBody,
  booking: bookingsTableBody,
};
const messageContextMap = {
  car: "Car",
  customer: "User",
  booking: "Booking",
};

export function deleteRow(entity, context) {
  const model = contextMap[context];
  const userConfirmed = confirm("Are you sure you want to delete this item?");
  console.log("approved deleted", userConfirmed)
if (userConfirmed) {
  console.log("User clicked OK");
  
  const removedSuccessfully = model.remove(entity);
  if (removedSuccessfully) {
    console.log("what is the result", removedSuccessfully);
    console.log("lets see what will happened", model.get());

    showMessage(`The ${messageContextMap[context]} was deleted !`, 'danger'); 
    const entities = model.get();
    console.log("tableBody", tableContextMap[context]);
    tableContextMap[context].innerHTML = "";
    render(entities, context);
  } else {
    console.log("wasn't removed try again ((- -)) ");
  }
} else {
  console.log("User clicked Cancel");
}
}
