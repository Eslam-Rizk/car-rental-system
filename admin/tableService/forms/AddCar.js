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

import { attachValidationEvents } from "./editCustomerForm.js";
import { carsTableBody, carsEditModal } from "../selectors/tableSelectors.js";

import { savedCars, carsFilter } from "../../../mock/storage/seedStorage.js";
import { showMessage } from "../core/alerts.js";

export async function addCarForm(entity = null, index = null, carFormElements) {
  carFormElements.inputs.confirmCarBtn.textContent = "Add A Car";
  carFormElements.inputs.modalHead.textContent = "Car";
  console.log("type", typeof carFormElements.inputs.dailyRate.value);
  carFormElements.inputs.make.value = "";
  carFormElements.inputs.model.value = "";
  carFormElements.inputs.year.value = "";
  carFormElements.inputs.dailyRate.value = "";
  carFormElements.inputs.category.value = "";
  carFormElements.inputs.color.value = "";
  carFormElements.inputs.transmission.value = "";
  carFormElements.inputs.fuelType.value = "";
  carFormElements.inputs.fuelCapacity.value = "";
  carFormElements.inputs.luggageCapacity.value = "";
  carFormElements.inputs.passengerCapacity.value = "";
  carFormElements.inputs.rating.value = "";
  carFormElements.inputs.imageUrls.value = "";

  attachValidationEvents(carFormElements);


}

export function addCar(entity, index, formElements) {
  console.log(
    "check car exist",
    formElements.inputs.make.value,
    formElements.inputs.model.value,
    formElements.inputs.year.value
  );
  const exist = carsFilter.checkCarExist(
    formElements.inputs.make.value,
    formElements.inputs.model.value,
    formElements.inputs.year.value
  );
  console.log("exist ", exist);
  if (exist) {
    showMessage(`The Car is already in the local storage`, "warning", "car");
    return;
  }
  const imageUrls = formElements.inputs.imageUrls.value.split('\n').map(url => url.trim()).filter(url=> url); 

  const carCreated = createdCar(
    formElements.inputs.make.value,
    formElements.inputs.model.value,
    formElements.inputs.year.value,
    formElements.inputs.dailyRate.value,
    formElements.inputs.category.value,
    formElements.inputs.color.value,
    formElements.inputs.transmission.value,
    formElements.inputs.fuelType.value,
    formElements.inputs.fuelCapacity.value,
    formElements.inputs.luggageCapacity.value,
    formElements.inputs.passengerCapacity.value,
    formElements.inputs.rating.value,
    formElements.inputs.imageUrls.value,
    imageUrls 
  );
  console.log("valid or not", carCreated);

  if (carCreated) {
    const modalInstance = bootstrap.Modal.getInstance(carsEditModal);
    modalInstance.hide();
    savedCars.addCar(carCreated, carsFilter.checkCarExist);
    showMessage(`The Car was Added successfully!`, "success");
    console.log("lets see what will happened", savedCars.get());
    const cars = savedCars.get();

    carsTableBody.innerHTML = "";
    render(cars, "car");
  } else {
    console.log("not valid");
  }
}
