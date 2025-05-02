import { filtersHandler } from "../utils/filters.js";
import { checker } from "../utils/checker.js";
import carHandler from "../models/carHandler.js";
import bookingHandler from "../models/bookingHandler.js";
import customerHandler from "../models/customerHandler.js";

export const createStorageHandler = () => {
  const bookingId = () =>
    `bk_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const carId = () => `ck_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const customerId = () =>
    `cuk_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const validator = checker();

  //---------------------------------------- save data to local storage
  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  //---------------------------------------- get data form local storage
  function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  const context = {
    saveData,
    getData,
    carId,
    bookingId,
    customerId,
    validator,
  };

  return {
    cars: carHandler(context),
    bookings: bookingHandler(context),
    customers: customerHandler(context),
  };
};
