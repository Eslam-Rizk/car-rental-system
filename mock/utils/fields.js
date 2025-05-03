export const carFields = {
  make: "string",
  model: "string",
  year: "number",
  dailyRate: "number",
  category: "string",
  color: "string",
  transmission: "string",
  fuelType: "string",
  fuelCapacity: "number",
  luggageCapacity: "number",
  passengerCapacity: "number",
  rating: "number",
  // imageUrls: "object",
};

export const bookingFields = {
  customerName: "string",
  startDate: "string", //  ISO date
  endDate: "string",
  totalAmount: "number",
  paymentStatus: "string",
};

export const customerFields = {
  name: "string",
  email: "string",
  phone: "string",
  address: "string",
  registrationDate: "string", // ISO date
  role: "string",
};
