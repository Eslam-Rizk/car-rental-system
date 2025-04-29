
export function handlePasswordConfirmation(passwordInput, confirmPasswordInput, confirmIcon) {
    confirmPasswordInput.addEventListener("input", function () {
      if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value.length < 6) {
        confirmIcon.style.color = "red";
      } else {
        confirmIcon.style.color = "green";
      }
    });
  
    passwordInput.addEventListener("input", function () {
      if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value.length < 6) {
        confirmIcon.style.color = "red";
      } else {
        confirmIcon.style.color = "";
      }
    });
  }
  