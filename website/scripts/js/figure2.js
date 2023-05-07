
function sampleGraph(innerWidth, innerheight, data){
// set the dimensions and margins of the graph
const margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = innerWidth - margin.left - margin.right,
    height = innerheight - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#sample_viz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data


  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 12000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([35, 80])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  const z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 15, 30]);

    var myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    .range(['#fdc62f', '#ff8e8e', '#ea4242', "#5ac0f7", "#5ac0f7"]);
  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", d => x(d.gdpPercap))
      .attr("cy", d => y(d.lifeExp))
      .attr("r", d => z(d.pop))
      .style("fill", function (d) { return myColor(d.continent); } )

      .style("opacity", "0.7")
      .attr("stroke", function (d) { return myColor(d.continent); })


}

$(document).ready(function (){
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv").then( function(data) {
    sampleGraph(window.innerWidth * 0.6,window.innerHeight * 0.8, data);
    $(".dropdown .button").click(function (){
        var dropdown = $(this).parents('.dropdown');
        dropdown.toggleClass('is-active');
        dropdown.focusout(function() {
            $(this).removeClass('is-active');
        });
    });
    var Svg = d3.select("#fig2-brand-dropdown-content")
    
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
        .attr("class", "dropdown-item")
        .text(function(d){return d})
})


})

