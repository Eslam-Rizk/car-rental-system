
export function handleValidation(input, pattern, iconElement) {
  input.addEventListener("input", function (e) {
    if (!pattern.test(e.target.value)) {
      iconElement.style.color = "red";
      iconElement.style.textShadow = "none";
      return false; 
    } else {
      iconElement.style.color = "green";
      return true; 
    }
  });
}


export function validateInputNow(input, pattern, iconElement) {
  if (!pattern.test(input.value)) {
    iconElement.style.color = "red";
    iconElement.style.textShadow = "none";
    return false;
  } else {
    iconElement.style.color = "green";
    return true;
  }
}
