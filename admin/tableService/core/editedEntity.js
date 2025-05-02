export function editEntity() {
  function createEditedCustomer(
    name,
    email,
    phone,
    address,
    role,
    registrationDate
  ) {
    const edited = {};
    if (name != null) edited.name = name;
    if (email != null) edited.email = email;
    if (phone != null) edited.phone = phone;
    if (address != null) edited.address = address;
    if (role != null) edited.role = role;
    if (registrationDate != null) edited.registrationDate = registrationDate;
    return edited;
  }

  function createEditedCar(
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
    const edited = {};
    if (make != null) edited.make = make;
    if (model != null) edited.model = model;
    if (year != null) edited.year = year;
    if (dailyRate != null) edited.dailyRate = dailyRate;
    if (category != null) edited.category = category;
    if (color != null) edited.color = color;
    if (transmission != null) edited.transmission = transmission;
    if (fuelType != null) edited.fuelType = fuelType;
    if (fuelCapacity != null) edited.fuelCapacity = fuelCapacity;
    if (luggageCapacity != null) edited.luggageCapacity = luggageCapacity;
    if (passengerCapacity != null) edited.passengerCapacity = passengerCapacity;
    if (rating != null) edited.rating = rating;
    return edited;
  }

  function createEditedBooking(paymentStatus) {
    const edited = {};
    if (paymentStatus != null) edited.paymentStatus = paymentStatus;
    return edited;
  }

  return {
    createEditedCustomer,
    createEditedCar,
    createEditedBooking,
  };
}
