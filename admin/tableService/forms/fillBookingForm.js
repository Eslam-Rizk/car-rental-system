import { formPatterns } from "../validation/formFields.js";
import {
  bookingsEditForm,
  bookingsTableBody,
  bookingsEditModal,
} from "../selectors/tableSelectors.js";

import { attachValidationEvents } from "./fillCustomerForm.js";
import { validateOnSubmit } from "../validation/validationOnSubmit.js";
import {
  savedBookings,
  bookingsFilter,
} from "../../../mock/storage/seedStorage.js";
import { editEntity } from "../core/editedEntity.js";
import { render } from "../core/render.js";
import { showMessage } from "../core/alerts.js";

const { createEditedBooking } = editEntity();

export async function fillBookingForm(booking, index, bookingFormElements) {
  bookingFormElements.inputs.paymentStatus.value = booking.paymentStatus;
  // uncomment in case we wanted to add other elements to the form
  // bookingFormElements.inputs. bookingId.value = booking.bookingId;
  // bookingFormElements.inputs.name.value = booking.name;
  // bookingFormElements.inputs.email.value = booking.email;
  // bookingFormElements.inputs.phone.value = booking.phone;
  // bookingFormElements.inputs.address.value = booking.address;
  // bookingFormElements.inputs.role.value = booking.role;
  // bookingFormElements.inputs.registrationDate.value = booking.registrationDate;

  attachValidationEvents(bookingFormElements);
  const valid = await validateOnSubmit(bookingFormElements, bookingsEditForm);
  const editedBooking = createEditedBooking(
    bookingFormElements.inputs.paymentStatus.value
  );
  console.log("valid or not", valid);
  if (valid) {
    const modalInstance = bootstrap.Modal.getInstance(bookingsEditModal);
    modalInstance.hide();
    savedBookings.editBooking(
      editedBooking,
      booking,
      bookingsFilter.checkBookingExist
    );
    console.log("let's see what will happen!", savedBookings.get());
    const bookings = savedBookings.get();
    showMessage(`The Booking is edited successfully!`, 'success'); 
    bookingsTableBody.innerHTML = "";
    render(bookings, "booking");
  } else {
    console.log("not valid");
  }
}
