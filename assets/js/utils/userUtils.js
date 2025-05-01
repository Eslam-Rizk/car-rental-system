export function getCustomerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    // console.log("Customer ID from URL: ", customerId);
    return customerId;
}

export function getLoggedInCustomerId() {
    const loggedInCustomer = localStorage.getItem('loggedInCustomer');
    if (loggedInCustomer) {
        const customer = JSON.parse(loggedInCustomer);
        // console.log("Logged in customerId: ", customer.customerId);
        return customer.customerId || null;
    }
    return null;
}

