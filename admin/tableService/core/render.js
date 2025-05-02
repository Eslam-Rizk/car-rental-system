import { makeRow } from "./makeRow.js";
import {
  customersTableBody,
  carsTableBody,
  bookingsTableBody,
} from "../selectors/tableSelectors.js";
import {
  savedBookings,
  savedCars,
  savedCustomers,
} from "../../../mock/storage/seedStorage.js";
import { displayEmptyMessage } from "./displayEmptyMessage.js";
let arrayItemsCustomers = [];
let arrayItemsCars = [];
let arrayItemsBookings = [];
let currentPage = 1;
const pageSize = 5;

const contextMap = {
  car: savedCars,
  booking: savedBookings,
  customer: savedCustomers,
};
const tableContextMap = {
  car: carsTableBody,
  customer: customersTableBody,
  booking: bookingsTableBody,
};

export function render(items, context) {
  if (!items.length) {
    console.error("empty array");
    displayEmptyMessage(tableContextMap[context]);

    return;
  }
  if (context === "customer") {
    arrayItemsCustomers = items;
  } else if (context === "car") {
    arrayItemsCars = items;
  } else {
    arrayItemsBookings = items;
  }
  currentPage = 1;
  renderPaginatedRows(context);
  renderPaginationControls(context);
  // console.log("inside render", items);
}

export function renderPaginatedRows(context) {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const offset = (currentPage - 1) * pageSize;
  if (context === "customer") {
    customersTableBody.innerHTML = "";
    const pagedArr = arrayItemsCustomers.slice(start, end);

    pagedArr.forEach((customer, index) => {
      makeRow(customer, index, context, offset);
    });
  } else if (context === "car") {
    carsTableBody.innerHTML = "";
    const pagedArr = arrayItemsCars.slice(start, end);
    pagedArr.forEach((customer, index) => {
      makeRow(customer, index, context, offset);
    });
  } else {
    bookingsTableBody.innerHTML = "";
    const pagedArr = arrayItemsBookings.slice(start, end);
    pagedArr.forEach((customer, index) => {
      makeRow(customer, index, context, offset);
    });
  }
}

export function renderPaginationControls(context) {
  let paginationContainer;

  if (context === "customer") {
    const pages = Math.ceil(arrayItemsCustomers.length / pageSize);
    const paginationContainer = document.getElementById(
      "pagination-controls-customers"
    );
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = `btn btn-sm ${
        i === currentPage ? "btn-primary" : "btn-outline"
      }`;

      btn.addEventListener("click", () => {
        currentPage = i;
        renderPaginatedRows(context);
        renderPaginationControls(context);
      });

      paginationContainer.appendChild(btn);
    }
  } else if (context === "car") {
    const pages = Math.ceil(arrayItemsCars.length / pageSize);
    const paginationContainer = document.getElementById(
      "pagination-controls-cars"
    );
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = `btn btn-sm ${
        i === currentPage ? "btn-primary" : "btn-outline"
      }`;

      btn.addEventListener("click", () => {
        currentPage = i;
        renderPaginatedRows(context);
        renderPaginationControls(context);
      });

      paginationContainer.appendChild(btn);
    }
  } else {
    const pages = Math.ceil(arrayItemsBookings.length / pageSize);
    const paginationContainer = document.getElementById(
      "pagination-controls-bookings"
    );
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = `btn btn-sm ${
        i === currentPage ? "btn-primary" : "btn-outline"
      }`;

      btn.addEventListener("click", () => {
        currentPage = i;
        renderPaginatedRows(context);
        renderPaginationControls(context);
      });

      paginationContainer.appendChild(btn);
    }
  }
}
