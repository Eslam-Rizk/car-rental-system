import { fillCarForm } from "./editCarform.js";
import { fillBookingForm } from "./editBookingForm.js";
import { fillCustomerForm } from "./editCustomerForm.js";
import {
  carsEditForm,
  customersEditForm,
  bookingsEditForm,
} from "../selectors/tableSelectors.js";
import { formHandler } from "./formHandler.js";
import { addCustomer, addCustomerForm } from "./addCustomer.js";
import { addCarForm } from "./AddCar.js";
import { validateOnSubmit } from "../validation/validationOnSubmit.js";
import { showMessage } from "../core/alerts.js";

const formContextMap = {
  car: carsEditForm,
  customer: customersEditForm,
  booking: bookingsEditForm,
  addCar:carsEditForm,
  addCustomer:customersEditForm
};
const handlerContextMap = {
  car: (entity, index, formElements) => {
    return fillCarForm(entity, index, formElements);
  },
  booking: (entity, index, formElements) => {
    return fillBookingForm(entity, index, formElements);
  },
  customer: (entity, index, formElements) => {
    return fillCustomerForm(entity, index, formElements);
  },
  addCustomer: (entity, index, formElements) => {
    return addCustomerForm(entity, index, formElements); 
  },
  addCar: (entity, index, formElements)=> {
    return addCarForm(entity, index, formElements); 
  }
};

export function dispatcher(entity, index, formElements, context) {
        const strategy = handlerContextMap[context];
        if (strategy) {
          strategy(entity, index, formElements);
        }

  formContextMap[context].addEventListener('submit',  (e) => {
    e.preventDefault();
    const isValid = validateOnSubmit(formElements); 
  
    if (isValid) {
       formHandler(entity, index, formElements, context); 
    } else {
      showMessage(`The form inputs are not correct.`, "danger", context);
    }
  });
  
}
