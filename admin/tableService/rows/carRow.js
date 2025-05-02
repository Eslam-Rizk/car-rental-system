
import { carRowC, carsTableBody } from "../selectors/tableSelectors.js";
import { carFormElements } from "../selectors/carSelectors.js";
import { fillCarForm } from "../forms/fillCarForm.js";
import { deleteRow } from "../core/deleteRow.js";

export function carRow(car, index, offset = 0) {
  const rowClone = carRowC.cloneNode(true);
  const cells = rowClone.children;
  cells[0].textContent = offset + index + 1;
  cells[1].textContent = car.carId;
  cells[2].textContent = car.make;
  cells[3].textContent = car.model;
  const actionCell = cells[4];

  const editIcon = actionCell.querySelector(".edit-icon");
  const deleteIcon = actionCell.querySelector(".delete-icon");

  if (editIcon) {
    editIcon.addEventListener("click", () => {

      fillCarForm(car, index, carFormElements);
    });
  }

  if (deleteIcon) {
    deleteIcon.addEventListener("click", () => {
      deleteRow(car, "car");
    });
  }

  rowClone.style.removeProperty("display");

  carsTableBody.appendChild(rowClone);
}
