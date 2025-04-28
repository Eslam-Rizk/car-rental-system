// Function to get the logged-in user's ID
export function getLoggedInCustomerId() {
    const loggedInCustomer = localStorage.getItem('loggedInCustomer');
    if (loggedInCustomer) {
        const customer = JSON.parse(loggedInCustomer);
        return customer.customerId || null;
    }
    return null;
}   