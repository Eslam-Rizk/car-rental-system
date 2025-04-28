
export function handleValidation(input, pattern, iconElement) {
    input.addEventListener("input", function (e) {
      if (!pattern.test(e.target.value)) {
        iconElement.style.color = "red";
        iconElement.style.textShadow = "none";
      } else {
        iconElement.style.color = "green";
      }
    });
  }
  