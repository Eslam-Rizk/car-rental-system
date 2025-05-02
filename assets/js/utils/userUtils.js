import { customers } from "../../../mock/data/customersSeed.js";

export function getCustomerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    return customerId;
}

export function getLoggedInCustomerId() {
    const loggedInCustomer = localStorage.getItem('loggedInCustomer');
    let customerId = null;

    if (loggedInCustomer) {
        try {
            const customer = JSON.parse(loggedInCustomer);
            customerId = customer.customerId || null;
            const customerExists = customers.find(c => c.customerId === customerId);
            if (!customerExists) {
                console.error(`Customer with ID ${customerId} not found in customers list`);
                customerId = null;
            }
        } catch (e) {
            console.error("Error parsing loggedInCustomer:", e);
            customerId = null;
        }
    }

    if (!customerId) {
        customerId = getCustomerIdFromUrl();
        if (customerId) {
            const customerExists = customers.find(c => c.customerId === customerId);
            if (!customerExists) {
                console.error(`Customer with ID ${customerId} from URL not found in customers list`);
                customerId = null;
            }
        }
    }

    return customerId;
}