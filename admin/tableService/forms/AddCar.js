import { formPatterns } from "../validation/formFields.js";
import {
  addCustomerButton,
  carsEditForm,
  customersEditForm,
  bookingsEditForm,
  customersEditModal,
} from "../selectors/tableSelectors.js";
import { validateOnSubmit } from "../validation/validationOnSubmit.js";

import { makeEntity } from "../core/makeEntity.js";
import { render } from "../core/render.js";
const { createdCar } = makeEntity();

import { attachValidationEvents } from "./fillCustomerForm.js";
import { carsTableBody, carsEditModal } from "../selectors/tableSelectors.js";

import { savedCars, carsFilter } from "../../../mock/storage/seedStorage.js";
import { showMessage } from "../core/alerts.js";

export async function addCarForm(carFormElements) {
  carFormElements.inputs.confirmCarBtn.textContent = "Add A Car";
  carFormElements.inputs.modalHead.textContent = "Car";
  console.log("type", typeof carFormElements.inputs.dailyRate.value);

  attachValidationEvents(carFormElements);

  const valid = await validateOnSubmit(carFormElements, carsEditForm);
  const carCreated = createdCar(
    carFormElements.inputs.make.value,
    carFormElements.inputs.model.value,
    carFormElements.inputs.year.value,
    carFormElements.inputs.dailyRate.value,
    carFormElements.inputs.category.value,
    carFormElements.inputs.color.value,
    carFormElements.inputs.transmission.value,
    carFormElements.inputs.fuelType.value,
    carFormElements.inputs.fuelCapacity.value,
    carFormElements.inputs.luggageCapacity.value,
    carFormElements.inputs.passengerCapacity.value,
    carFormElements.inputs.rating.value
  );
  console.log("valid or not", valid);
  if (valid) {
    const modalInstance = bootstrap.Modal.getInstance(carsEditModal);
    modalInstance.hide();
    savedCars.addCar(carCreated, carsFilter.checkCarExist);
    showMessage(`The Car was Added successfully!`, 'success'); 
    console.log("lets see what will happened", savedCars.get());
    const cars = savedCars.get();

    carsTableBody.innerHTML = "";
    render(cars, "car");
  } else {
    console.log("not valid");
  }
}
