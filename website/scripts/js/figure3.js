$(document).ready(function () {
    d3.csv("../dataset/kofio_dataset/coffee_items_filtering.csv").then(
        function (data) {
            const record = JSON.parse(JSON.stringify(data));
            let width = window.innerWidth * 0.58,
                height = window.innerHeight * 0.85,
                radius = 30;
            var svg = d3
                .select("#filtering-bubbles")
                .append("svg")
                .attr("height", height)
                .attr("width", width);

            function impl_filter(indicator) {
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
                        if (indicator === "fig3-show-all") {
                            // Display bubbles using the existing color scheme
                            return "#5ac0f7";
                        } else if (indicator === "fig3-price") {
                            if (d.Price <= 15) return "#ff8e8e";
                            else if (d.Price <= 25) return "#ea4242";
                            else return "#5ac0f7";
                        } else if (indicator === "fig3-rating") {
                            // Display bubbles based on flavor
                            // Replace the following code with your custom logic
                            if (d.Rating >= 4.5) return "#ff8e8e";
                            else if (d.Rating >= 4) return "#ea4242";
                            else if (d.Rating >= 3.5) return "#fdc62f";
                            else return "#5ac0f7";
                        } else if (indicator === "fig3-roast-type") {
                            if (d["Roast Type"] === "Omni") return "#ea4242";
                            else if (d["Roast Type"] === "Filter")
                                return "#fdc62f";
                            return "#0000ff"; // Blue color for roast type indicator
                        } else if (indicator === "fig3-roast-level") {
                            if (d["Roast Level"] === "Omni")
                                return "#ffff00"; // Yellow color for brewing method indicator
                            else if (
                                d["Roast Level"] === "Light to Medium Light"
                            )
                                return "#fdc62f";
                            return "#5ac0f7";
                        }
                    });
                elem_updated
                    .append("text")
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .text((d) => {
                        if (indicator === "fig3-show-all")
                            return d["Item Name"].substring(0, 3);
                        else if (indicator === "fig3-rating") return d.Rating;
                        else if (indicator === "fig3-price") return d.Price;
                        else if (indicator === "fig3-roast-type")
                            return d["Roast Type"].substring(0, 3);
                        else return d["Roast Level"].substring(0, 3);
                    });

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
            d3.select("#fig3-rating").on("click", function () {
                impl_filter("fig3-rating");
            });
            d3.select("#fig3-roast-type").on("click", function () {
                impl_filter("fig3-roast-type");
            });
            d3.select("#fig3-roast-level").on("click", function () {
                impl_filter("fig3-roast-level");
            });
        }
    );
});
