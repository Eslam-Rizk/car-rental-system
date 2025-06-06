import { formPatterns } from "./formFields.js";

export function validateNow(formElements) {
  const { inputs, feedbacks } = formElements;

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

  let allValid = true;

  Object.entries(inputs).forEach(([key, inputEl]) => {
    const pattern = validationMap[key];
    const feedbackEl = feedbacks[key];
    if (!pattern || !inputEl) return;

    const value = inputEl.value;
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
      console.log(`Invalid ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`);
      allValid = false;
    }
  });

  return allValid;
}

export function validateOnSubmit(formElements) {
  return validateNow(formElements); 
}

