
function sampleGraph(data){
// set the dimensions and margins of the graph
const margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 620 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#sample_viz")
  .append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data


  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 10000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  const z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 1, 40]);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", d => x(d.gdpPercap))
      .attr("cy", d => y(d.lifeExp))
      .attr("r", d => z(d.pop))
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")


}

$(document).ready(function (){
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv").then( function(data) {
    sampleGraph(data);
    $(".dropdown .button").click(function (){
        var dropdown = $(this).parents('.dropdown');
        dropdown.toggleClass('is-active');
        dropdown.focusout(function() {
            $(this).removeClass('is-active');
        });
    });
    var Svg = d3.select("#fig2-brands")
    
    // create a list of keys
    var keys = ['The naughty dog', 'Candycane Coffee', 'DAK Coffee Roasters',
    'HAYB Speciality Coffee', "Father's Coffee Roastery",
    'Industra Coffee', 'The Barn', 'Square Mile', 'Gardelli Coffee',
    'Beansmith.s', 'Dark Woods Coffee', 'Main Lane Coffee Roasters',
    'Nordbeans', 'Good Beans', 'Concept Coffee Roasters',
    'Morgon Coffee Roasters', 'BeBerry Coffee', 'Coffea Circulor',
    'Dos Mundos', 'Doubleshot', 'Fiftybeans']
    
    // Usually you have a color scale in your chart already
    var color = d3.scaleOrdinal()
      .domain(keys)
      .range(d3.schemeSet2);
    
      Svg.selectAll("mydots")
      .data(keys)
      .enter()
      .append("a")
        .attr("class", "panel-block")
        .html(function(d) {return '<span class="panel-icon"><i class="fas fa-book" aria-hidden="true"></i></span>' + d})
})

})

