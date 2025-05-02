import { formPatterns } from "../validation/formFields.js";
import {
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
import { editEntity } from "../core/editedEntity.js";
import { render } from "../core/render.js";
const { createEditedCustomer } = editEntity();

export async function fillCustomerForm(customer, index, customerFormElements) {
  customerFormElements.inputs.confirmBtn.textContent = "Edit User";
  customerFormElements.inputs.customerId.value = customer.customerId;
  customerFormElements.inputs.name.value = customer.name;
  customerFormElements.inputs.email.value = customer.email;
  customerFormElements.inputs.phone.value = customer.phone;
  customerFormElements.inputs.address.value = customer.address;
  customerFormElements.inputs.role.value = customer.role;
  customerFormElements.inputs.registrationDate.value =
    customer.registrationDate;

  attachValidationEvents(customerFormElements);

  const valid = await validateOnSubmit(customerFormElements, customersEditForm);
  const editedCustomer = createEditedCustomer(
    customerFormElements.inputs.name.value,
    customerFormElements.inputs.email.value,
    customerFormElements.inputs.phone.value,
    customerFormElements.inputs.address.value,
    customerFormElements.inputs.role.value,
    customerFormElements.inputs.registrationDate.value
  );
  console.log("valid or not", valid);
  if (valid) {
    const modalInstance = bootstrap.Modal.getInstance(customersEditModal);
    modalInstance.hide();
    savedCustomers.editCustomer(
      editedCustomer,
      customer,
      customersFilter.checkCustomerExist
    );
    console.log("lets see what will happened", savedCustomers.get());
    const customers = savedCustomers.get();

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
