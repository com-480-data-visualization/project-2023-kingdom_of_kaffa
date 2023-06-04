$(document).ready(function (){
    console.log(1);
    const element = document.querySelector('#fig1-svg');
    const width = element.offsetWidth;

    const heightPercentage = 66;
    const height = (width * heightPercentage) / 100;
    element.style.height = height + 'px';
})

