import { formPatterns } from "../validation/formFields.js";
import {
  addCustomerButton,
  carsEditForm,
  customersEditForm,
  bookingsEditForm,
  customersEditModal,
} from "../selectors/tableSelectors.js";
import { validateOnSubmit } from "../validation/validationOnSubmit.js";
import {
  savedCustomers,
  customersFilter,
} from "../../../mock/storage/seedStorage.js";
import { makeEntity } from "../core/makeEntity.js";
import { render } from "../core/render.js";
import { showMessage } from "../core/alerts.js";
const { createdCustomer } = makeEntity();


export async function addCustomerForm(customerFormElements) {
  customerFormElements.inputs.customerId.style = "display:none";
  customerFormElements.inputs.customerIdDiv.style = "display:none";
  customerFormElements.inputs.registrationDiv.style = "display:none";
  customerFormElements.inputs.confirmBtn.textContent = "Add A User";
  customerFormElements.inputs.modalHead.textContent = "User";

  customerFormElements.inputs.registrationDate.style = "display:none";

  const registrationDate = new Date().toISOString().split("T")[0];
  console.log(registrationDate); // -> "2025-08-13"

  attachValidationEvents(customerFormElements);
  const valid = await validateOnSubmit(customerFormElements, customersEditForm);
  const editedCustomer = createdCustomer(
    customerFormElements.inputs.name.value,
    customerFormElements.inputs.email.value,
    customerFormElements.inputs.phone.value,
    customerFormElements.inputs.address.value,
    customerFormElements.inputs.role.value,
    registrationDate
  );
  console.log("valid or not", valid);
  if (valid) {
    const modalInstance = bootstrap.Modal.getInstance(customersEditModal);
    modalInstance.hide();
    savedCustomers.addCustomer(
      editedCustomer,
      customersFilter.checkCustomerExist
    );
    console.log("lets see what will happened", savedCustomers.get());
    const customers = savedCustomers.get();
    showMessage(`The Customer is Added successfully!`, 'success'); 
    customersTableBody.innerHTML = "";
    render(customers, "customer");
  } else {
    console.log("not valid");
  }
}

export function attachValidationEvents(customerFormElements) {
  const { inputs, feedbacks } = customerFormElements;

  const validationMap = {
    name: formPatterns.namePattern,
    email: formPatterns.emailPattern,
    phone: formPatterns.phonePattern,
    address: formPatterns.addressPattern,
    role: formPatterns.rolePattern,
    make: formPatterns.makePattern,
    model: formPatterns.modelPattern,
    year: formPatterns.yearPattern,
    dailyRate: formPatterns.dailyRatePattern,
    category: formPatterns.categoryPattern,
    color: formPatterns.colorPattern,
    transmission: formPatterns.transmissionPattern,
    fuelType: formPatterns.fuelTypePattern,
    fuelCapacity: formPatterns.fuelCapacityPattern,
    luggageCapacity: formPatterns.luggagePattern,
    passengerCapacity: formPatterns.passengerPattern,
    rating: formPatterns.ratingPattern,
    imageUrls: formPatterns.imagePattern,
    paymentStatus: formPatterns.paymentStatusPattern,
  };

  Object.entries(inputs).forEach(([key, inputEl]) => {
    const pattern = validationMap[key];
    const feedbackEl = feedbacks[key];

    if (!pattern || !inputEl) return;

    inputEl.addEventListener("input", function (e) {
      const value = e.target.value;
      const isValid = pattern.test(value);

      if (isValid) {
        inputEl.classList.remove("is-invalid");
        inputEl.classList.add("is-valid");
        if (feedbackEl) feedbackEl.textContent = "";
      } else {
        inputEl.classList.remove("is-valid");
        inputEl.classList.add("is-invalid");
        if (feedbackEl)
          feedbackEl.textContent = `Invalid ${key
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}`;
      }
    });
  });
}
