$(document).ready(function () {
    const element = document.querySelector("#fig1-svg");
    const width = element.offsetWidth;

    const heightPercentage = 65.5;
    const height = (width * heightPercentage) / 100;
    element.style.height = height + "px";

});
