const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const foodItems = document.querySelectorAll(".food-item");

let activeIndex = 0;

arrowLeft.addEventListener("click", () => {
  foodItems[activeIndex].classList.remove("active");
  activeIndex = (activeIndex === 0) ? foodItems.length - 1 : activeIndex - 1;
  foodItems[activeIndex].classList.add("active");
});

arrowRight.addEventListener("click", () => {
  foodItems[activeIndex].classList.remove("active");
  activeIndex = (activeIndex === foodItems.length - 1) ? 0 : activeIndex + 1;
  foodItems[activeIndex].classList.add("active");
});
