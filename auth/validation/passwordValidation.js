export function handlePasswordConfirmation(passwordInput, confirmPasswordInput, confirmIcon) {
    confirmPasswordInput.addEventListener("input", function () {
      if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value.length < 6) {
        confirmIcon.style.color = "red";
        return false; 
      } else {
        confirmIcon.style.color = "green";
        return true; 
      }
    });
  
    passwordInput.addEventListener("input", function () {
      if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value.length < 6) {
        confirmIcon.style.color = "red";
        return false;
      } else {
        confirmIcon.style.color = "";
        return true;
      }
    });
  }
 

export function confirmPasswordNow(passwordInput, confirmPasswordInput, confirmIcon) {
    if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value.length < 6) {
      confirmIcon.style.color = "red";
      return false;
    } else {
      confirmIcon.style.color = "green";
      return true;
    }
  }
  
  export function handlePasswordMatching(passwordInput, savedPassword, passwordIcon) {
    if (savedPassword !== passwordInput.value) {
      passwordIcon.style.color = "red";
      const feedback = document.getElementById("password-feedback");
      feedback.textContent = "Password does not match.";
      feedback.classList.remove("text-success");
      feedback.classList.add("text-danger");
      feedback.classList.add("small");
      console.log("wrong password");
      return;
  }
  
  }
  