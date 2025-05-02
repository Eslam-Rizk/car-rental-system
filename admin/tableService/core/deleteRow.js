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

export function deleteRow(entity, context) {
  const model = contextMap[context];
  const removedSuccessfully = model.remove(entity);
  if (removedSuccessfully) {
    console.log("what is the result", removedSuccessfully);
    console.log("lets see what will happened", model.get());
    const entities = model.get();
    console.log("tableBody", tableContextMap[context]);
    tableContextMap[context].innerHTML = "";
    render(entities, context);
  } else {
    console.log("wasn't removed try again ((- -)) ");
  }
}
