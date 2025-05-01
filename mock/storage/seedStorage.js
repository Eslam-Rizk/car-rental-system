import { createStorageHandler } from "./storage.js";
import { filtersHandler } from "../utils/filters.js";
import { cars } from "../data/carsSeed.js";
import { customers } from "../data/customersSeed.js";
import { bookings } from "../data/bookingsSeed.js";

export const storageHandler = createStorageHandler();

export function seedStorage() {
  if (!localStorage.getItem("cars")) {
    storageHandler.cars.save(cars);
  }

  if (!localStorage.getItem("bookings")) {
    storageHandler.bookings.save(bookings);
  }
  if (!localStorage.getItem("customers")) {
    storageHandler.customers.save(customers);
  }
}

// === Retrieve saved data ===
export const savedCars = storageHandler.cars;
export const savedBookings = storageHandler.bookings;
export const savedCustomers = storageHandler.customers;

// ================================ Apply filters ===
export const { carsFilter, customersFilter, bookingsFilter } = filtersHandler({
  savedCars,
  savedBookings,
  savedCustomers,
});
