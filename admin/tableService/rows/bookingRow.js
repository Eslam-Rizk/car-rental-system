
import { bookingRowC, bookingsTableBody } from "../selectors/tableSelectors.js";
import { bookingFormElements } from "../selectors/bookingSelectors.js";
import { fillBookingForm } from "../forms/fillBookingForm.js";
import { deleteRow } from "../core/deleteRow.js";
export function bookingRow(booking, index, offset = 0) {
  const rowClone = bookingRowC.cloneNode(true);
  const cells = rowClone.children;
  cells[0].textContent = offset + index + 1;
  cells[1].textContent = booking.bookingId;
  cells[2].textContent = booking.customerName;
  cells[3].textContent = booking.paymentStatus;
  const actionCell = cells[4];

  const editIcon = actionCell.querySelector(".edit-icon");
  const deleteIcon = actionCell.querySelector(".delete-icon");

  if (editIcon) {
    editIcon.addEventListener("click", () => {

      fillBookingForm(booking, index, bookingFormElements);

    });
  }

  if (deleteIcon) {
    deleteIcon.addEventListener("click", () => {
      deleteRow(booking, "booking");
    });
  }

  rowClone.style.removeProperty("display");

  bookingsTableBody.appendChild(rowClone);
}
