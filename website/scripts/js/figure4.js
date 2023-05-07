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
  d3.csv("../dataset/kofio_dataset/coffee_food_pairing_filtered.csv").then(
    function(data){
      const record = JSON.parse(JSON.stringify(data));
      let origin = data.map(function(d) { return d["Coffee origin"]; });
      let flavor = data.map(function(d) { return d["Flavor type"]; });
      let uniqueOrigin = Array.from(new Set(origin));
      let uniqueflavor = Array.from(new Set(flavor));
      console.log(origin);
      let width = window.innerWidth * 0.58,
          height = window.innerHeight * 0.85,
          margin = {top: 20, right: 20, bottom: 20, left: 20};
      let svg = d3
                .select("#pairing-viz")
                .append(svg)
                .attr('height',height)
                .attr('width',width)

      // Create the circles for the origins
      let originCircles = svg.selectAll(".origin")
          .data(uniqueOrigin)
          .enter().append("circle")
          .attr("class", "circle origin")
          .attr("cx", 150)
          .attr("cy", function(d, i) { return 25 + (i * 25); })
          .attr("r", 10);
      
      let lines = svg.selectAll(".line")
          .data(data)
          .enter().append("line")
          .attr("class", "line")
          .attr("x1", function(d) {
            return 150;
          })
          .attr("y1", function(d) {
            return 25 + (origin.indexOf(d["Coffee origin"]) * 25);
          })
          .attr("x2", function(d) {
            return 475;
          })
          .attr("y2", function(d) {
            //return width - 25 - ((flavor.length - flavor.indexOf(d["Flavor type"]) - 1) * 50);
                    return 90 + (flavor.indexOf(d["Flavor type"]) * 60);
          })
          .style("stroke", function(d) {
            return d3.schemeCategory10[flavor.indexOf(d["Flavor type"]) % 10];
          });

        // Add text labels to the origin circles
      let originLabels = svg.selectAll(".origin-label")
        .data(origin)
        .enter().append("text")
        .attr("class", "origin-label")
        .attr("x", 130) // move the label to the right
        .attr("y", function(d, i) { return 30 + (i * 25); })
        .attr("text-anchor", "end") // set the text anchor to end
        .text(function(d) { return d; });

      let flavorLabels = svg.selectAll(".flavor-label")
        .data(flavor)
        .enter().append("text")
        .attr("class", "flavor-label")
        .attr("x", 510) // move the label to the right
        .attr("y", function(d, i) { return 95 + (i * 60); })
        .text(function(d) { return d; });
    }
  );
});