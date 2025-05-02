import { formPatterns } from "../validation/formFields.js";
import { attachValidationEvents } from "./fillCustomerForm.js";
import { carsTableBody, carsEditModal } from "../selectors/tableSelectors.js";
import { validateOnSubmit } from "../validation/validationOnSubmit.js";
import { savedCars, carsFilter } from "../../../mock/storage/seedStorage.js";
import { editEntity } from "../core/editedEntity.js";
import { render } from "../core/render.js";
const { createEditedCar } = editEntity();

export async function fillCarForm(car, index, carFormElements) {
  // Populate all relevant car inputs
  //   carFormElements.inputs.carId.value = car.carId || "";
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
  const valid = await validateOnSubmit(carFormElements, carsEditForm);
  const editedCar = createEditedCar(
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
    savedCars.editCar(editedCar, car, carsFilter.checkCarExist);
    console.log("lets see what will happened", savedCars.get());
    const cars = savedCars.get();

    carsTableBody.innerHTML = "";
    render(cars, "car");
  } else {
    console.log("not valid");
  }
}
