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
        console.log("Logged in customerId: ", customer.customerId);
        return customer.customerId || null;
    }
    return null;
}


export function authLogin(message, redirect) {
    console.log("Unauthorized access");
    const successMessage = document.getElementById('message');
    const rest = document.getElementById('rest');
    rest.style.display = 'none';
    successMessage.style.display = 'none';
    successMessage.classList.add('alert', 'alert-message', 'text-center');
    successMessage.innerHTML += `<span>${message}</span>`;
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
        // rest.style.display = 'block';
        if (redirect == 'login.html') {
            localStorage.removeItem('loggedInCustomer');
        }
        window.location.href = `${redirect}`;

    }, 1000);

}