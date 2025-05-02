import { carFormElements } from "../selectors/carSelectors.js";
import { customerFormElements } from "../selectors/customerSelectors.js";
import { bookingFormElements } from "../selectors/bookingSelectors.js";
import { fillCarForm } from "./editCarform.js";
import { fillBookingForm } from "./editBookingForm.js";
import { fillCustomerForm } from "./editCustomerForm.js";
import {
  carsEditForm,
  customersEditForm,
  bookingsEditForm,
} from "../selectors/tableSelectors.js";
import { validateOnSubmit } from "../validation/validationOnSubmit.js";
import { showMessage } from "../core/alerts.js";
import { editBooking } from "./editBookingForm.js";
import { editCar } from "./editCarform.js";
import { editCustomer } from "./editCustomerForm.js";
import { addCustomer } from "./addCustomer.js";
import { addCar } from "./AddCar.js";

const formContextMap = {
  car: carsEditForm,
  customer: customersEditForm,
  booking: bookingsEditForm,
  addCar: carsEditForm,
  addCustomer:customersEditForm
};
const handlerContextMap = {
  car: (entity, index, formElements) => {
    return editCar(entity, index, formElements);
  },
  booking: (entity, index, formElements) => {
    return editBooking(entity, index, formElements);
  },
  customer: (entity, index, formElements) => {
    return editCustomer(entity, index, formElements);
  },
  addCustomer:(entity, index, formElements) =>{
    return addCustomer(entity, index, formElements); 
  },
  addCar:(entity, index, formElements)=>{
    return addCar(entity, index, formElements); 
  }
};

export  function formHandler(entity, index, formElements, context) {
  const strategy = handlerContextMap[context];
  if (strategy) {
    strategy(entity, index, formElements);
  }
}
