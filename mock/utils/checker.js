import { carFields, customerFields, bookingFields } from "./fields.js";

export function checker() {
  function emailChecker(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function phoneChecker(phone) {
    const phonePattern = /^\+?[\d\s-]{7,20}$/;
    return phonePattern.test(phone);
  }

  const checkBookingFields = function (booking) {
    const invalidInfo = [];

    for (let [key, value] of Object.entries(bookingFields)) {
      if (!Object.hasOwn(booking, key)) {
        invalidInfo.push(`${key} is (missing) `);
      } else if (typeof booking[key] !== value) {
        invalidInfo.push(
          `type of ${key} is expected to be ${
            bookingFields[key]
          } but it is ${typeof booking[key]} `
        );
      }
    }

    if (invalidInfo.length) {
      console.error(
        "There are missing keys or invalid types: " +
          `${invalidInfo.join(" , ")}`
      );
      return false;
    }

    return true;
  };

  const checkCustomerFields = function (customer) {
    let invalidInfo = [];

    for (let [key, expected] of Object.entries(customerFields)) {
      if (!Object.hasOwn(customer, key)) {
        invalidInfo.push(`${key} is (missing)`);
      } else if (key === "email" && !emailChecker(customer[key])) {
        invalidInfo.push(`email is invalid format`);
      } else if (key === "phone" && !phoneChecker(customer[key])) {
        invalidInfo.push(`phone number is invalid format`);
      } else if (
        key !== "email" &&
        key !== "phone" &&
        typeof customer[key] !== expected
      ) {
        invalidInfo.push(
          `for ${key} expected ${expected} but found ${typeof customer[key]}`
        );
      }
    }

    if (invalidInfo.length) {
      console.error(
        `There are missing keys or wrong types: ${invalidInfo.join(" , ")}`
      );
      return false;
    }

    return true;
  };

  function checkCarFields(car) {
    const invalidInfo = [];

    for (let [key, expectedType] of Object.entries(carFields)) {
      if (!Object.hasOwn(car, key)) {
        invalidInfo.push(`${key} is missing`);
      } else {
        const actualType = typeof car[key];

        if (key === "bookedDates" && !Array.isArray(car[key])) {
          invalidInfo.push(`${key} should be an array`);
        } else if (key !== "bookedDates" && actualType !== expectedType) {
          invalidInfo.push(
            `for ${key}, expected ${expectedType} but found ${actualType}`
          );
        }
      }
    }

    if (invalidInfo.length) {
      console.error("Car validation failed: " + invalidInfo.join(", "));
      return false;
    }

    return true;
  }

  return {
    checkBookingFields,
    checkCarFields,
    checkCustomerFields,
  };
}
