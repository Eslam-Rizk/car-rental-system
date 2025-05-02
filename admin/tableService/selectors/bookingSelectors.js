// bookingSelectors.js

export const bookingFormElements = {
  inputs: {
    bookingId: document.querySelector("#bookingId"),
    customerName: document.querySelector("#customerName"),
    customerEmail: document.querySelector("#customerEmail"),
    startDate: document.querySelector("#startDate"),
    endDate: document.querySelector("#endDate"),
    totalAmount: document.querySelector("#totalAmount"),
    paymentStatus: document.querySelector("#paymentStatus"),
  },
  feedbacks: {
    customerName: document.querySelector("#customerName-feedback"),
    customerEmail: document.querySelector("#customerEmail-feedback"),
    startDate: document.querySelector("#startDate-feedback"),
    endDate: document.querySelector("#endDate-feedback"),
    totalAmount: document.querySelector("#totalAmount-feedback"),
    paymentStatus: document.querySelector("#paymentStatus-feedback"),
  },
};
