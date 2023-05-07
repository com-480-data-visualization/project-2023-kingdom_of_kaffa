function add_legend(svg) {
    // Create the legend
    var legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", "translate(40, 40)");

    // Add a rectangle for each color and price range
    legend
        .selectAll("rect")
        .data(["#5ac0f7", "#fdc62f", "#ea4242", "#ff8e8e"])
        .enter()
        .append("rect")
        .attr("y", function (d, i) {
            return i * 35;
        })
        .attr("x", 70)
        .attr("width", 100)
        .attr("height", 20)
        .style("fill", function (d) {
            return d;
        });

    // Add labels for each price range
    legend
        .selectAll("text")
        .data([3, 3.5, 4, 4.5])
        .enter()
        .append("text")
        .attr("y", function (d, i) {
            return i * 40;
        })
        .attr("x", 40)
        // .attr("dy", ".1em")
        .text(function (d) {
            return d;
        });
}
$(document).ready(function () {
    d3.csv("../dataset/kofio_dataset/price_rating_rec_clean.csv").then(
        function (data) {
            // make a copy of the original data points
            const record = JSON.parse(JSON.stringify(data));
            console.log(record);
            // initialize the svg
            let width = window.innerWidth * 0.58,
                height = window.innerHeight * 0.85,
                radius = 30;
            var svg = d3
                .select("#filtering-bubbles")
                .append("svg")
                .attr("height", height)
                .attr("width", width);

            // implement the filtering function
            function impl_filter(indicator) {
                // remove all the viz first.
                svg.selectAll(".circleContainer").remove();
                svg.selectAll("circle").remove();
                svg.selectAll("text").remove();

                let elem_updated = svg
                    .selectAll("g")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("class", "circleContainer");

                elem_updated
                    .data(data)
                    .append("circle")
                    .style("cursor", "pointer")
                    .attr("r", radius)
                    .style("fill", (d) => {
                        if (d.Rating >= 4.5) return "#ff8e8e";
                        else if (d.Rating >= 4) return "#ea4242";
                        else if (d.Rating >= 3.5) return "#fdc62f";
                        else return "#5ac0f7";
                    })
                    .on("click", function (d) {
                        return 1;
                    });
                add_legend(svg);
                elem_updated
                    .append("text")
                    .attr("text-anchor", "middle")
                    .text((d) => d.Rating);

                var simulation = d3
                    .forceSimulation()
                    .force("x", d3.forceX(width / 2))
                    .force("y", d3.forceY(height / 2))
                    .force("collision", d3.forceCollide().radius(radius + 0.5))
                    .on("tick", function (d) {
                        elem_updated.attr("transform", function (d) {
                            return "translate(" + d.x + "," + d.y + ")";
                        });
                    });

                simulation.nodes(data);
            }

            // initialize the bubbles and add event listeners for the buttons
            impl_filter("fig3-show-all");
            d3.select("#fig3-show-all").on("click", function () {
                impl_filter("fig3-show-all");
            });
            d3.select("#fig3-price").on("click", function () {
                impl_filter("fig3-price");
            });
            d3.select("#fig3-flavor").on("click", function () {
                impl_filter("fig3-flavor");
            });
            d3.select("#fig3-roast-type").on("click", function () {
                impl_filter("fig3-roast-type");
            });
            d3.select("#fig3-brewing-method").on("click", function () {
                impl_filter("fig3-brewing-method");
            });
        }
    );
});
