<script>

$(document).ready(function () {
  $("#fullpage").fullpage({
    // Navigation
    navigation: false,
    navigationPosition: 'top',
    navigationTooltips: ["Introduction", "CoffeeMap", "Food", "Compare", "Choose", "About"],
    showActiveTooltip: false,
    anchors: ["home", "figure1", "figure2", "figure3", "figure4", "about"],
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
    // Scrolling
    autoScrolling: true,
    // Design
    controlArrows: true,
    controlArrowsHTML: [
      '<div class="fp-arrow"></div>',
      '<div class="fp-arrow"></div>'
    ],
    verticalCentered: true,
    menu: '#menu',
    sectionsColor: ['#ccc', '#fff'],
    paddingTop: '3em',
    paddingBottom: '10px',
    fixedElements: '#header, .footer',
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,
    parallax: false,
    parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },
    dropEffect: false,
    dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999 },
    waterEffect: false,
    waterEffectOptions: { animateContent: true, animateOnMouseMove: true },
    cards: false,
    cardsOptions: { perspective: 100, fadeContent: true, fadeBackground: true }
  });

  d3.json("../dataset/coffee_dataset/countries_production.geo.json").then(function(data) {
    setMap(window.innerWidth*0.9, window.innerHeight*0.7, data);
    setSlider(window.innerWidth*0.9, 100, data)
  })
});
</script>