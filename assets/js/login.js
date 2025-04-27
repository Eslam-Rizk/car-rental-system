document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm")?.addEventListener("submit", function (e) {
        e.preventDefault(); // prevent reload

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const customers = JSON.parse(localStorage.getItem("customers")) || [];

        const foundCustomer = customers.find((cust) => cust.email === email && cust.password === password);

        if (foundCustomer) {
            localStorage.setItem("loggedInCustomer", JSON.stringify(foundCustomer));

            window.location.href = "index.html";
            document.getElementById("errorMessage").textContent = "";
        } else {
            document.getElementById("errorMessage").textContent = "Invalid email or password.";
        }
    });
});
