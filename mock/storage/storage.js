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

// const storageHandler = createStorageHandler();

// Example Data

// ================================= Save initial mock data to localStorage ===
// storageHandler.cars.save(cars);
// storageHandler.bookings.save(bookings);
// storageHandler.customers.save(customers);

// // === Retrieve saved data ===
// const savedCars = storageHandler.cars;
// const savedBookings = storageHandler.bookings;
// const savedCustomers = storageHandler.customers;

// // ================================ Apply filters ===
// const { carsFilter, customersFilter, bookingsFilter } = filtersHandler({ savedCars, savedBookings, savedCustomers });

// console.log("================================================= 🔍 Check Car Existence ==========");
// console.log("Is BMW X5 2022 available?", carsFilter.checkCarExist('BMW', 'X5', 2022));

// console.log("\n========================================== 🚗 Available Cars ==========");
// console.log(carsFilter.getCarsAvailable());

// console.log("\n========================================= 💰 Cars by Price Range (50-200) ==========");
// console.log(carsFilter.getCarsByPriceRange(50, 200));

// console.log("\n============================================= 🔎 Get Car by ID (undefined test) ==========");
// console.log(savedCars.getCarById()); // This will likely return null, since no ID is passed

// // === Add a new car ===
// console.log("\n=========================================== ➕ Add New Car ==========");
// storageHandler.cars.addCar(
//   {
//     id: 4,
//     make: 'Toyota',
//     model: 'Corolla',
//     year: 2050,
//     pricePerDay: 30,
//     availability: true,
//     bookedDates: [],
//     category: 'Sedan',
//     color: 'Red',
//     imageUrl: 'path/to/car/image1.jpg',
//   },
//   carsFilter.checkCarExist
// );

// console.log("\n========================================== 🚗 saved Cars ==========");
// console.log(savedCars.get());

// // === Edit car data ===
// console.log("\n============================================= ✏️ Edit Car ==========");
// storageHandler.cars.editCar(
//   { pricePerDay: 2121, make: "egypt" }, // Only these fields will be updated
//   {
//     id: 4,
//     make: 'Toyota',
//     model: 'Corolla',
//     year: 2050,
//     pricePerDay: 30,
//     availability: true,
//     bookedDates: [],
//     category: 'Sedan',
//     color: 'Red',
//     imageUrl: 'path/to/car/image1.jpg',
//   },
//   carsFilter.checkCarExist
// );

// // === Remove car (commented out) ===
// // console.log("\n========== 🗑️ Remove Car ==========");
// // storageHandler.cars.removeCar(...);

// // === Customer filtering examples ===
// console.log("\n============================================== 👤 Get Customer by ID ==========");
// console.log("Customer with ID 1:", customersFilter.getCustomerById(1));

// console.log("\n=============================================== 📧 Get Customer by Email ==========");
// console.log("Customer with email alice@example.com:", customersFilter.getCustomerByEmail('alice@example.com'));

// // === Final saved data logs ===
// console.log("\n==================================================== 💾 All Saved Cars ==========");
// console.log(savedCars.get());

// console.log("\n========================================================= 💾 All Saved Bookings ==========");
// console.log(savedBookings.get());

// console.log("\n=========================================================== 💾 All Saved Customers ==========");
// console.log(savedCustomers.get());
