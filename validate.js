export function validateField(className, id) {
  const element = document.querySelector(`.${className}`);
  const error = document.querySelector(`#${id}`);

  element.addEventListener("input", (event) => {
    if (element.validity.valid) {
      error.textContent = "";
      error.className = "error";
    } else {
      if (element.validity.valueMissing) {
        error.textContent = `Value missing for ${event.target.placeholder}`;
      } else if (element.validity.tooShort) {
        error.textContent = `${event.target.placeholder} should atleast be ${element.minLength} characters; you entered ${element.value.length}.`;
      }
    }
  });
}
