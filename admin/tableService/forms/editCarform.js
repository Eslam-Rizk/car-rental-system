import { formPatterns } from "../validation/formFields.js";
import { attachValidationEvents } from "./editCustomerForm.js";
import { carsTableBody, carsEditModal } from "../selectors/tableSelectors.js";
import { validateOnSubmit } from "../validation/validationOnSubmit.js";
import { savedCars, carsFilter } from "../../../mock/storage/seedStorage.js";
import { editEntity } from "../core/editedEntity.js";
import { render } from "../core/render.js";
import { showMessage } from "../core/alerts.js";

const { createEditedCar } = editEntity();

export async function fillCarForm(car, index, carFormElements) {
  // Populate all relevant car inputs
  //   carFormElements.inputs.carId.value = car.carId || "";
  carFormElements.inputs.confirmCarBtn.textContent = "Add A Car";
  carFormElements.inputs.make.value = car.make || "";
  carFormElements.inputs.model.value = car.model || "";
  carFormElements.inputs.year.value = car.year || "";
  carFormElements.inputs.dailyRate.value = car.dailyRate || "";
  carFormElements.inputs.category.value = car.category || "";
  carFormElements.inputs.color.value = car.color || "";
  carFormElements.inputs.transmission.value = car.transmission || "";
  carFormElements.inputs.fuelType.value = car.fuelType || "";
  carFormElements.inputs.fuelCapacity.value = car.fuelCapacity || "";
  carFormElements.inputs.luggageCapacity.value = car.luggageCapacity || "";
  carFormElements.inputs.passengerCapacity.value = car.passengerCapacity || "";
  carFormElements.inputs.rating.value = car.rating || "";
  carFormElements.inputs.imageUrls.value = Array.isArray(car.imageUrls)
    ? car.imageUrls.join("\n")
    : "";

  attachValidationEvents(carFormElements);
 
}

export function editCar(entity, index, formElements) {
  const editedCar = createEditedCar(
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
    formElements.inputs.rating.value
  );
  console.log("valid or not", editedCar);
  if (editedCar) {
    const modalInstance = bootstrap.Modal.getInstance(carsEditModal);
    modalInstance.hide();
    savedCars.editCar(editedCar, entity, carsFilter.checkCarExist);
    console.log("lets see what will happened", savedCars.get());
    const cars = savedCars.get();
    showMessage(`The Car is edited successfully!`, "success");
    carsTableBody.innerHTML = "";
    render(cars, "car");
  } else {
    console.log("not valid");
  }
}
