export const formFields = [
  {
    inputSelector: "#make",
    pattern: /^[a-zA-Z0-9\s]{2,}$/,
    feedbackSelector: "#makeFeedback",
  },
  {
    inputSelector: "#model",
    pattern: /^[a-zA-Z0-9\s]{1,}$/,
    feedbackSelector: "#modelFeedback",
  },
  {
    inputSelector: "#year",
    pattern: /^(19|20)\d{2}$/,
    feedbackSelector: "#yearFeedback",
  },
  {
    inputSelector: "#dailyRate",
    pattern: /^\d+(\.\d{1,2})?$/,
    feedbackSelector: "#dailyRateFeedback",
  },
  {
    inputSelector: "#category",
    pattern: /^(Sedan|SUV|Truck|Hatchback)$/,
    feedbackSelector: "#categoryFeedback",
  },
  {
    inputSelector: "#color",
    pattern: /^[a-zA-Z\s]{2,}$/,
    feedbackSelector: "#colorFeedback",
  },
  {
    inputSelector: "#fuelType",
    pattern: /^(Gasoline|Diesel|Electric)$/,
    feedbackSelector: "#fuelTypeFeedback",
  },
  {
    inputSelector: "#transmission",
    pattern: /^(Manual|Automatic)$/,
    feedbackSelector: "#transmissionFeedback",
  },
  {
    inputSelector: "#rating",
    pattern: /^(?:[0-4](?:\.\d)?|5(?:\.0)?)$/,
    feedbackSelector: "#ratingFeedback",
  },
  {
    inputSelector: "#fuelCapacity",
    pattern: /^\d+(\.\d{1,2})?$/,
    feedbackSelector: "#fuelCapacityFeedback",
  },
  {
    inputSelector: "#passengerCapacity",
    pattern: /^\d+$/,
    feedbackSelector: "#passengerCapacityFeedback",
  },
  {
    inputSelector: "#luggageCapacity",
    pattern: /^\d+(\.\d{1,2})?$/,
    feedbackSelector: "#luggageCapacityFeedback",
  },
  {
    inputSelector: "#imageUrls",
    pattern: /^https?:\/\/[^\s]+(\nhttps?:\/\/[^\s]+)*$/,
    feedbackSelector: "#imageUrlsFeedback",
  },
];

export const formPatterns = {
  textPattern: /^[a-zA-Z0-9\s]{2,}$/,
  makePattern: /^[a-zA-Z0-9\s]{1,}$/,

  modelPattern: /^[a-zA-Z0-9\s]{1,}$/,

  yearPattern: /^(19|20)\d{2}$/,

  dailyRatePattern: /^\d+(\.\d{1,2})?$/,

  categoryPattern: /^(Sedan|SUV|Truck|Hatchback)$/,

  colorPattern: /^[a-zA-Z\s]{2,}$/,

  fuelTypePattern: /^(Gasoline|Diesel|Electric)$/,

  transmissionPattern: /^(Manual|Automatic)$/,

  ratingPattern: /^(?:[0-4](?:\.\d)?|5(?:\.0)?)$/,

  fuelCapacityPattern: /^\d+(\.\d{1,2})?$/,

  passengerPattern: /^\d+$/,

  luggagePattern: /^\d+(\.\d{1,2})?$/,

  imagePattern:
    /^(assets\/images\/[^\s]+(\.webp|\.jpg|\.png))(\r?\nassets\/images\/[^\s]+(\.webp|\.jpg|\.png))*$/,

  // Existing patterns...

  namePattern: /^[a-zA-Z\s]{2,}$/,
  // Only letters and spaces, at least 2 characters

  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Basic and widely used email pattern

  phonePattern: /^\+?[0-9\s\-]{7,15}$/,
  // Accepts optional +, digits, spaces, and dashes

  addressPattern: /^.{5,100}$/,
  // Any characters, between 5 and 100 characters (adjust if needed)

  rolePattern: /^(admin|customer)$/,
  // Example values — adjust depending on your allowed roles
  paymentStatusPattern: /^(Completed|Pending|Cancelled)$/,
};
