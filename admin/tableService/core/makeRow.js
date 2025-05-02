import { formFields } from "../validation/formFields.js";

import {
  customersTableBody,
  carsTableBody,
  bookingsTableBody,
} from "../selectors/tableSelectors.js";

import { customerRow } from "../rows/customerRow.js";
import { carRow } from "../rows/carRow.js";
import { bookingRow } from "../rows/bookingRow.js";

export function makeRow(element, index, context, offset) {
  if (context === "customer") {
    customerRow(element, index, offset);
  } else if (context === "car") {
    carRow(element, index, offset);
  } else {
    bookingRow(element, index, offset);
  }
}
//
