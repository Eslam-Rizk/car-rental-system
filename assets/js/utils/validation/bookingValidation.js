export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export function validatePhone(phone) {
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    return phonePattern.test(phone);
}

export function validateStartDate(startDate) {
    const today = new Date().toISOString().split('T')[0];
    return startDate.value && startDate.value >= today;
}

export function validateEndDate(endDate, startDate) {
    return !endDate.value || (startDate.value && endDate.value > startDate.value);
}