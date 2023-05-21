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


$(document).ready(function () {
  let origin, flavor, uniqueOrigin, uniqueFlavor, svg;
  d3.csv("../dataset/kofio_dataset/coffee_food_pairing_filtered.csv").then(
    function(data){
      const record = JSON.parse(JSON.stringify(data));
      origin = data.map(function(d) { return d["Coffee origin"]; });
      flavor = data.map(function(d) { return d["Flavor type"]; });
      uniqueOrigin = Array.from(new Set(origin));
      uniqueFlavor = Array.from(new Set(flavor));
      
      let width = window.innerWidth * 0.6,
          height = window.innerHeight * 0.85,
          margin = {top: 20, right: 20, bottom: 20, left: 20};

      svg = d3
            .select("#pairing-viz")
            .append("svg")
            .attr('height',height)
            .attr('width',width);

      // Create the circles for the origins
      let originCircles = svg.selectAll(".origin_right")
          .data(uniqueOrigin)
          .enter().append("circle")
          .attr("class", "circle origin")
          .attr("cx", 475)
          .attr("cy", function(d, i) { return 25 + (i * 35); })
          .attr("r", 10);
      
      let flavorCircles = svg.selectAll(".flavor")
			    .data(uniqueFlavor)
			    .enter().append("circle")
			    .attr("class", "circle flavor")
                .attr("cx", 750)
                .attr("cy", function(d, i) { return 130 + (i * 60); })
			    // .attr("cx", function(d, i) { return width - 25 - ((flavor.length - i - 1) * 50); })
			    // .attr("cy", 25)
			    .attr("r", 10);

      let lines = svg.selectAll(".line")
          .data(data)
          .enter().append("line")
          .attr("class", "line")
          .attr("x1", function(d) {
            return 475;
          })
          .attr("y1", function(d) {
            return 25 + (uniqueOrigin.indexOf(d["Coffee origin"]) * 35);
          })
          .attr("x2", function(d) {
            return 750;
          })
          .attr("y2", function(d) {
            //return width - 25 - ((flavor.length - flavor.indexOf(d["Flavor type"]) - 1) * 50);
            return 130 + (uniqueFlavor.indexOf(d["Flavor type"]) * 60);
          })
          .style("stroke", function(d) {
            return d3.schemeCategory10[flavor.indexOf(d["Flavor type"]) % 10];
          });

        // Add text labels to the origin circles
      let originLabels = svg.selectAll(".origin-label")
        .data(uniqueOrigin)
        .enter().append("text")
        .attr("class", "origin-label")
        .attr("x", 420) // move the label to the right
        .attr("y", function(d, i) { return 30 + (i * 35); })
        .attr("text-anchor", "middle") // set the text anchor to end
        .text(function(d) { return d; });

      let flavorLabels = svg.selectAll(".flavor-label")
        .data(uniqueFlavor)
        .enter().append("text")
        .attr("class", "flavor-label")
        .attr("x", 765) // move the label to the right
        .attr("y", function(d, i) { return 135 + (i * 60); })
        .text(function(d) { return d; });
    
    d3.csv("../dataset/kofio_dataset/coffee_flavor_pairing.csv").then(
      function(data){
        flavor = data.map(function(d) { return d["Flavor"]; });
        uniqueFlavor = Array.from(new Set(flavor));
        
        let originCircles = svg.selectAll(".origin_left")
          .data(uniqueOrigin)
          .enter().append("circle")
          .attr("class", "circle origin")
          .attr("cx", 365)
          .attr("cy", function(d, i) { return 25 + (i * 35); })
          .attr("r", 10);
      
        let flavorCircles = svg.selectAll(".coffee-flavor")
            .data(uniqueFlavor)
            .enter().append("circle")
            .attr("class", "circle flavor")
                  .attr("cx", 100)
                  .attr("cy", function(d, i) { return 150 + (i * 70); })
            .attr("r", 10);
        
        let lines = svg.selectAll(".left-line")
            .data(data)
            .enter().append("line")
            .attr("class", "left-line")
            .attr("x1", function(d) {
              return 100;
            })
            .attr("y1", function(d) {
              return 150 + (uniqueFlavor.indexOf(d["Flavor"]) * 70);
            })
            .attr("x2", function(d) {
              return 365;
            })
            .attr("y2", function(d) {
              //return width - 25 - ((flavor.length - flavor.indexOf(d["Flavor type"]) - 1) * 50);
              return 25 + (uniqueOrigin.indexOf(d["Coffee origin"]) * 35);
            })
            .style("stroke", function(d) {
              return d3.schemeCategory10[flavor.indexOf(d["Flavor"]) % 10];
            });

        let flavorLabels = svg.selectAll(".coffee-flavor-label")
            .data(uniqueFlavor)
            .enter().append("text")
            .attr("class", "coffee-flavor-label")
            .attr("x", 85) // move the label to the right
            .attr("y", function(d, i) { return 150 + (i * 72); })
            .attr("text-anchor", "end")
            .text(function(d) { return d; });
      }
    )
    }
  );
});