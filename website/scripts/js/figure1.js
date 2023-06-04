$(document).ready(function () {
    const element = document.querySelector("#fig1-svg");
    const width = element.offsetWidth;

    const heightPercentage = 65.5;
    const height = (width * heightPercentage) / 100;
    element.style.height = height + "px";

    var svgElement = document.querySelector('#viz');
    svgElement.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    });
});
