document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm")?.addEventListener("submit", function (e) {
        e.preventDefault(); // prevent reload

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const customers = JSON.parse(localStorage.getItem("customers")) || [];

        const foundCustomer = customers.find((cust) => cust.email === email && cust.password === password);

        if (foundCustomer) {
            localStorage.setItem("loggedInCustomer", JSON.stringify(foundCustomer));
            document.getElementById("errorMessage").textContent = "";

            if (foundCustomer.role === "admin") {
                window.location.href = "dashboard.html";
            } else if (foundCustomer.role === "user") {
                window.location.href = "index.html";
            } else {
                document.getElementById("errorMessage").textContent = "Unknown role.";
            }
        } else {
            document.getElementById("errorMessage").textContent = "Invalid email or password.";
        }
    });
});
