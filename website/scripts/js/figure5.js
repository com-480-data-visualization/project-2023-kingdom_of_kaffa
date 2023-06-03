$(document).ready(function () {

  const coffee_name = document.querySelector(".fig5_coffee_name");
  const coffee_filling = document.querySelector(".fig5_filling");
  const buttons = document.querySelectorAll(".fig5_button");
  const americano = document.getElementById("americano");

  let current_element = null;
  console.log(buttons, americano);
  console.log("buttons", buttons);
  const changeCoffeeType = (selected) => {
    if (current_element) {
      current_element.classList.remove("selected");
      coffee_filling.classList.remove(current_element.id);
    }
    current_element = selected;
    coffee_filling.classList.add(current_element.id);
    current_element.classList.add("selected");
    coffee_name.innerText = selected.innerText;
  };

  const setActiveType = (element) => {
    element.toggleClass("selected");
  };

  [...buttons].forEach((button) => {
    button.addEventListener("click", () => {
      changeCoffeeType(button);
    });
  });

})