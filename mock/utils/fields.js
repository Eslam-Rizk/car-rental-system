export const carFields = {
      make: "string",
      model: "string",
      year: "string",
      dailyRate: "string",
      // bookedDates: "object", 
      // imageUrls: "string",
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