import {
  customerRowC,
  customersTableBody,
} from "../selectors/tableSelectors.js";
import { fillCustomerForm } from "../forms/editCustomerForm.js";
import { customerFormElements } from "../selectors/customerSelectors.js";
import { deleteRow } from "../core/deleteRow.js";
import { dispatcher } from "../forms/dispatcher.js";

export function customerRow(customer, index, offset = 0) {
  const rowClone = customerRowC.cloneNode(true);
  const cells = rowClone.children;
  cells[0].textContent = offset + index + 1;
  cells[1].textContent = customer.name;
  cells[2].textContent = customer.email;
  cells[3].textContent = customer.phone;
  const actionCell = cells[4];

  const editIcon = actionCell.querySelector(".edit-icon");
  const deleteIcon = actionCell.querySelector(".delete-icon");

  if (editIcon) {
    editIcon.addEventListener("click", () => {
      dispatcher(customer, index, customerFormElements, "customer");
    });
  }

  if (deleteIcon) {
    deleteIcon.addEventListener("click", () => {
      deleteRow(customer, "customer");
    });
  }

  rowClone.style.removeProperty("display");

  customersTableBody.appendChild(rowClone);
}
