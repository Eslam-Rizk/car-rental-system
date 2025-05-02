export function makeEntity() {
  function createdCustomer(
    name,
    email,
    phone,
    address,
    role,
    registrationDate
  ) {
    return {
      name,
      email,
      phone,
      address,
      role,
      registrationDate,
    };
  }

  function createdCar(
    make,
    model,
    year,
    dailyRate,
    category,
    color,
    transmission,
    fuelType,
    fuelCapacity,
    luggageCapacity,
    passengerCapacity,
    rating
  ) {
    return {
      make,
      model,
      year,
      dailyRate,
      category,
      color,
      transmission,
      fuelType,
      fuelCapacity,
      luggageCapacity,
      passengerCapacity,
      rating,
    };
  }

  function createdBooking(paymentStatus) {
    return {
      paymentStatus,
    };
  }

  return {
    createdCustomer,
    createdCar,
    createdBooking,
  };
}
