const contextMap = {
  success: document.getElementById("alertPlaceHolder"),
  customer: document.getElementById("alertCustomer"),
  car: document.getElementById("alertCar"),
  addCustomer: document.getElementById("alertCustomer"),
  addCar: document.getElementById("alertCar"),
  booking: document.getElementById("alertBooking"),
};

export function showMessage(message, type = "success", context = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.innerHTML = `
<div class="alert alert-${type} fade show shadow alert-dismissible" role="alert" >${message}
<button class="btn-close" type="button"  data-bs-dismiss="alert" aria-label="Close>close</button>
</div>`;
  const container = contextMap[context];
  container.appendChild(alertDiv);

  setTimeout(() => {
    const alert = bootstrap.Alert.getOrCreateInstance(
      container.firstElementChild
    );
    alert.close();
  }, 1000);
}
