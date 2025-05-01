export const filtersHandler = ({
  savedCars,
  savedBookings,
  savedCustomers,
}) => {
  const carHandler = {
    checkCarExist: (make, model, year) => {
      const cars = savedCars.get();
      if (!Array.isArray(cars)) {
        console.error("Error: savedCars.get() did not return an array");
        return false;
      }

      console.log("Checking car existence...");
      console.log("Cars in storage: ", cars);
      console.log(
        `Looking for car with Make: ${make}, Model: ${model}, Year: ${year}`
      );

      const found = cars.some((car) => {
        const isMatch =
          car.model === model && car.year === year && car.make === make;
        if (isMatch) {
          console.log("Match found:", car);
        }
        return isMatch;
      });

      console.log("Car existence check result:", found);

      return found;
    },

    isCarAvailable: (car, startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error("Invalid date range");
        return;
      }
      for (let date of car.bookedDates) {
        const bookedStart = new Date(date.start);
        const bookedEnd = new Date(date.end);
        if (start <= bookedEnd && end >= bookedStart) {
          return false;
        }
      }
      return true;
    },
    getCarsAvailable: function (startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error("Invalid date range");
        return [];
      }
      return savedCars.get().filter((car) => {
        return this.isCarAvailable(car, startDate, endDate);
      });
    },
    getCarsByPriceRange: (min_price, max_price) => {
      return savedCars.get().filter((car) => {
        return car.pricePerDay >= min_price && car.pricePerDay <= max_price;
      });
    },
  };

  const bookingHandler = {
    checkBookingExist: (bookingId) => {
      const found = savedBookings
        .get()
        .some((booking) => booking.bookingId === bookingId);
      console.log(found);
      return found;
    },
    getBookingById: (id) => {
      const car = savedCars.get().find((booking) => {
        return booking.id === id;
      });
      return booking ? booking : null;
    },
  };

  const customerHandler = {
    checkCustomerExist: (email) => {
      const found = savedCustomers
        .get()
        .some((customer) => customer.email === email); 
      console.log(found);
      return found;
    },
    getCustomerById: (id) => {
      const customer = savedCustomers.get().find((customer) => {
        return customer.id === id;
      });
      return customer ? customer : null;
    },
    getCustomerByEmail: (email) => {
      console.log(email);
      const customer = savedCustomers.get().find((customer) => {
        return customer.email === email;
      });
      return customer ? customer : null;
    },
  };

  return {
    carsFilter: carHandler,
    bookingsFilter: bookingHandler,
    customersFilter: customerHandler,
  };
};
