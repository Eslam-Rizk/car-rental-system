export const customerFields = [
    {
      inputSelector: "#name",
      pattern: /^[A-Za-z\s]{2,}$/, 
      feedbackSelector: "#name-feedback"
    },
    {
      inputSelector: "#email",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      feedbackSelector: "#email-feedback"
    },
    {
      inputSelector: "#phone",
      pattern: /^\+?\d{7,15}$/,
      feedbackSelector: "#phone-feedback"
    },
    {
      inputSelector: "#address",
      pattern: /^.{5,}$/, 
      feedbackSelector: "#address-feedback"
    },
    {
      inputSelector: "#role",
      pattern: /^(admin|user)$/,
      feedbackSelector: "#role-feedback"
    }
  ];

 