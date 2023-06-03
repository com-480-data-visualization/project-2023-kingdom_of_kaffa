$(document).ready(function () {
    // Define the legend data
    d3.csv("../dataset/kofio_dataset/coffee_items_filtering.csv").then(
        function (data) {
            const record = JSON.parse(JSON.stringify(data));
            var curData = data;
            let width = window.innerWidth * 0.58,
                height = window.innerHeight * 0.85;
            var svg = d3
                .select("#filtering-bubbles")
                .append("svg")
                .attr("height", height)
                .attr("width", width);

            // Function to create the legend
            function createLegend(indicator) {
                var legendData = [];
                if (indicator === "fig3-show-all") {
                    legendData = [{ color: "#C4937A", label: "All Items" }];
                } else if (indicator === "fig3-price") {
                    legendData = [
                        { color: "#EAD8C6", label: "<=15$" },
                        { color: "#ff8e8e", label: "<=25$" },
                        { color: "#ea4242", label: ">25$" },
                    ];
                } else if (indicator === "fig3-rating") {
                    legendData = [
                        { color: "#F1C3C1", label: ">=4.5❤" },
                        { color: "#9C3F4A", label: ">=4❤" },
                        { color: "#F2D076", label: ">=3.5❤" },
                        { color: "#C0AA9B", label: "<3.5❤" },
                    ];
                } else if (indicator === "fig3-roast-type") {
                    legendData = [
                        { color: "#A6AD95", label: "Omni" },
                        { color: "#F2D076", label: "Filter" },
                        { color: "#7A8279", label: "Espresso" },
                    ];
                } else {
                    legendData = [
                        { color: "#B0836D", label: "Omni" },
                        { color: "#fdc62f", label: "Light to Medium Light" },
                        { color: "#865E54", label: "Medium to medium dark" },
                    ];
                }

                const legendContainer = svg
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(20, 20)");

                const legendItems = legendContainer
                    .selectAll(".legend-item")
                    .data(legendData)
                    .enter()
                    .append("g")
                    .attr("class", "legend-item")
                    .attr("transform", function (_, i) {
                        return "translate(0, " + i * 25 + ")";
                    });

                legendItems
                    .append("rect")
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("x", 5)
                    .attr("y", -1.5)
                    .style("fill", function (d) {
                        return d.color;
                    })
                    .style("cursor", "pointer")
                    .on("click", function (e, d) {
                        impl_filter(indicator);
                    });

                legendItems
                    .append("text")
                    .attr("x", 26)
                    .attr("y", 16)
                    .text(function (d) {
                        return d.label;
                    });
            }

            function impl_filter(indicator) {
                // Remove existing elements except for the legend
                svg.selectAll(".circleContainer, circle, text").remove();

                // Remove existing groups
                svg.selectAll("g").remove();

                let radius = 30;
                if (curData.length <= 10) {
                    radius = 40;
                }

                createLegend(indicator);

                let elem_updated = svg
                    .selectAll("g")
                    .data(curData)
                    .enter()
                    .append("g")
                    .attr("class", "circleContainer");

                elem_updated
                    .data(curData)
                    .append("circle")
                    .style("cursor", "pointer")
                    .attr("r", radius)
                    .style("fill", (d) => {
                        if (indicator === "fig3-show-all") {
                            return "#F2D076";
                        } else if (indicator === "fig3-price") {
                            if (d.Price <= 15) return "#EAD8C6";
                            else if (d.Price <= 25) return "#ff8e8e";
                            else return "#ea4242";
                        } else if (indicator === "fig3-rating") {
                            if (d.Rating >= 4.5) return "#F1C3C1";
                            else if (d.Rating >= 4) return "#9C3F4A";
                            else if (d.Rating >= 3.5) return "#F2D076";
                            else return "#C0AA9B";
                        } else if (indicator === "fig3-roast-type") {
                            if (d["Roast Type"] === "Omni") return "#A6AD95";
                            else if (d["Roast Type"] === "Filter")
                                return "#F2D076";
                            return "#7A8279";
                        } else if (indicator === "fig3-roast-level") {
                            if (d["Roast Level"] === "Omni") return "#B0836D";
                            else if (
                                d["Roast Level"] === "Light to Medium Light"
                            )
                                return "#fdc62f";
                            return "#865E54";
                        }
                    })
                    .on("click", function (e, d) {
                        d3.selectAll("circle")
                            .transition()
                            .duration(300)
                            .attr("r", radius)
                            .attr("stroke-width", 0);

                        // Increase the radius and stroke width of the clicked bubble for highlighting
                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.2)
                            .attr("stroke-width", 2)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.1)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.2)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.15)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.1);

                        let brand = d["Roastery"];
                        brand = brand.replace(/ /g, "_") + "_thumb";
                        d3.selectAll("#fig3_brand_image").attr(
                            "src",
                            "image/brand-logo/" + brand.toLowerCase() + ".png"
                        );
                        console.log(brand.toLowerCase());
                        d3.selectAll("#fig3_item_image").attr(
                            "src",
                            "image/item-figs/" + d["Item Name"] + ".jpg"
                        );

                        d3.selectAll("#fig3-title h3").text(d["Item Name"]);
                        d3.selectAll("#fig3-subtitle").text(d["Item Subname"]);

                        d3.selectAll("#fig3-roastery").text(d["Roastery"]);
                        d3.selectAll("#fig3-flavor").text(d["Flavour Profile"]);
                        d3.selectAll("#fig3-type").text(d["Roast Type"]);
                        d3.selectAll("#fig3-level").text(d["Roast Level"]);

                        d3.selectAll("#fig3_price")
                            .select("text")
                            .text(d["Price"]);
                        d3.selectAll("#fig3_rating")
                            .select("text")
                            .text(d["Rating"] + "/5.0");
                        d3.selectAll("#fig3_recommended")
                            .select("text")
                            .text(
                                Math.round(parseFloat(d["Recommended"])) + "%"
                            );

                        document.getElementById("viz3-descrip").innerHTML =
                            document.getElementById(
                                "fig3_after_click"
                            ).innerHTML;
                    });

                elem_updated
                    .append("text")
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .style("cursor", "pointer")
                    .text((d) => {
                        if (indicator === "fig3-show-all")
                            return d["Item Name"].substring(0, 3);
                        else if (indicator === "fig3-rating") return d.Rating;
                        else if (indicator === "fig3-price") return d.Price;
                        else if (indicator === "fig3-roast-type")
                            return d["Roast Type"].substring(0, 3);
                        else return d["Roast Level"].substring(0, 3);
                    })
                    .on("click", function (e, d) {
                        d3.selectAll("circle")
                            .transition()
                            .duration(300)
                            .attr("r", radius)
                            .attr("stroke-width", 0);

                        // Increase the radius and stroke width of the clicked bubble for highlighting
                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.2)
                            .attr("stroke-width", 2)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.1)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.2)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.15)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.1);
                        d3.selectAll("#fig3_brand_image").attr(
                            "src",
                            "image/brand-logo/" + d["Roastery"].toLowerCase().replace(/ /g, "_").replace('.', "_") + "_thumb.png"
                        );
                        d3.selectAll("#fig3_item_image").attr(
                            "src",
                            "image/item-figs/" + d["Item Name"] + ".jpg"
                        );

                        d3.selectAll("#fig3-title h3").text(d["Item Name"]);
                        d3.selectAll("#fig3-subtitle").text(d["Item Subname"]);

                        d3.selectAll("#fig3-roastery").text(d["Roastery"]);
                        d3.selectAll("#fig3-flavor").text(d["Flavour Profile"]);
                        d3.selectAll("#fig3-type").text(d["Roast Type"]);
                        d3.selectAll("#fig3-level").text(d["Roast Level"]);

                        d3.selectAll("#fig3_price")
                            .select("text")
                            .text(d["Price"]);
                        d3.selectAll("#fig3_rating")
                            .select("text")
                            .text(d["Rating"] + "/5.0");
                        d3.selectAll("#fig3_recommended")
                            .select("text")
                            .text(
                                Math.round(parseFloat(d["Recommended"])) + "%"
                            );

                        document.getElementById("viz3-descrip").innerHTML =
                            document.getElementById(
                                "fig3_after_click"
                            ).innerHTML;
                    });

                var simulation = d3
                    .forceSimulation()
                    .force("x", d3.forceX(width / 2).strength(0.1)) // Decrease the strength of the x-axis force
                    .force("y", d3.forceY(height / 2).strength(0.1)) // Decrease the strength of the y-axis force
                    .force(
                        "collide",
                        d3
                            .forceCollide()
                            .radius(radius + 0.5)
                            .strength(0.7) // Adjust the strength of the collision force as needed
                    )
                    .on("tick", function () {
                        elem_updated.attr("transform", function (d) {
                            return "translate(" + d.x + "," + d.y + ")";
                        });
                    });

                simulation.nodes(curData);
            }

            function impl_filter_intial() {
                // Remove existing elements except for the legend
                svg.selectAll(".circleContainer, circle, text").remove();

                // Remove existing groups
                svg.selectAll("g").remove();

                let radius = 30;
                if (curData.length <= 10) {
                    radius = 40;
                }

                curData = record;
                createLegend("fig3-show-all");

                let elem_updated = svg
                    .selectAll("g")
                    .data(curData)
                    .enter()
                    .append("g")
                    .attr("class", "circleContainer");

                elem_updated
                    .data(curData)
                    .append("circle")
                    .style("cursor", "pointer")
                    .attr("r", radius)
                    .style("fill", "#C4937A")
                    .on("click", function (e, d) {
                        d3.selectAll("circle")
                            .transition()
                            .duration(300)
                            .attr("r", radius)
                            .attr("stroke-width", 0);

                        // Increase the radius and stroke width of the clicked bubble for highlighting
                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.2)
                            .attr("stroke-width", 2)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.1)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.2)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.15)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.1);
                        let brand = d["Roastery"];
                        brand = brand.replace(/ /g, "_") + "_thumb";
                        d3.selectAll("#fig3_brand_image").attr(
                            "src",
                            "image/brand-logo/" + brand + ".png"
                        );
                        d3.selectAll("#fig3_item_image").attr(
                            "src",
                            "image/item-figs/" + d["Item Name"] + ".jpg"
                        );

                        d3.selectAll("#fig3-title h3").text(d["Item Name"]);
                        d3.selectAll("#fig3-subtitle").text(d["Item Subname"]);

                        d3.selectAll("#fig3-roastery").text(d["Roastery"]);
                        d3.selectAll("#fig3-flavor").text(d["Flavour Profile"]);
                        d3.selectAll("#fig3-type").text(d["Roast Type"]);
                        d3.selectAll("#fig3-level").text(d["Roast Level"]);

                        d3.selectAll("#fig3_price")
                            .select("text")
                            .text(d["Price"]);
                        d3.selectAll("#fig3_rating")
                            .select("text")
                            .text(d["Rating"] + "/5.0");
                        d3.selectAll("#fig3_recommended")
                            .select("text")
                            .text(
                                Math.round(parseFloat(d["Recommended"])) + "%"
                            );

                        document.getElementById("viz3-descrip").innerHTML =
                            document.getElementById(
                                "fig3_after_click"
                            ).innerHTML;
                    });

                elem_updated
                    .append("text")
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .style("cursor", "pointer")
                    .text((d) => {
                        return d["Item Name"].substring(0, 3);
                    })
                    .on("click", function (e, d) {
                        d3.selectAll("circle")
                            .transition()
                            .duration(300)
                            .attr("r", radius)
                            .attr("stroke-width", 0);

                        // Increase the radius and stroke width of the clicked bubble for highlighting
                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.2)
                            .attr("stroke-width", 2)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.1)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.2)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.15)
                            .transition()
                            .duration(300)
                            .attr("r", radius * 1.1);
                        let brand = d["Roastery"];
                        brand = brand.replace(/ /g, "_") + "_thumb";
                        d3.selectAll("#fig3_brand_image").attr(
                            "src",
                            "image/brand-logo/" + brand + ".png"
                        );
                        d3.selectAll("#fig3_item_image").attr(
                            "src",
                            "image/item-figs/" + d["Item Name"] + ".jpg"
                        );

                        d3.selectAll("#fig3-title h3").text(d["Item Name"]);
                        d3.selectAll("#fig3-subtitle").text(d["Item Subname"]);

                        d3.selectAll("#fig3-roastery").text(d["Roastery"]);
                        d3.selectAll("#fig3-flavor").text(d["Flavour Profile"]);
                        d3.selectAll("#fig3-type").text(d["Roast Type"]);
                        d3.selectAll("#fig3-level").text(d["Roast Level"]);

                        d3.selectAll("#fig3_price")
                            .select("text")
                            .text(d["Price"]);
                        d3.selectAll("#fig3_rating")
                            .select("text")
                            .text(d["Rating"] + "/5.0");
                        d3.selectAll("#fig3_recommended")
                            .select("text")
                            .text(
                                Math.round(parseFloat(d["Recommended"])) + "%"
                            );

                        document.getElementById("viz3-descrip").innerHTML =
                            document.getElementById(
                                "fig3_after_click"
                            ).innerHTML;
                    });

                var simulation = d3
                    .forceSimulation()
                    .force("x", d3.forceX(width / 2).strength(0.1)) // Decrease the strength of the x-axis force
                    .force("y", d3.forceY(height / 2).strength(0.1)) // Decrease the strength of the y-axis force
                    .force(
                        "collide",
                        d3
                            .forceCollide()
                            .radius(radius + 0.5)
                            .strength(0.7) // Adjust the strength of the collision force as needed
                    )
                    .on("tick", function () {
                        elem_updated.attr("transform", function (d) {
                            return "translate(" + d.x + "," + d.y + ")";
                        });
                    });

                simulation.nodes(curData);
            }

            // Function to toggle button animation
            function toggleButtonAnimation(button) {
                // Remove animation class from all buttons
                d3.selectAll(".fig3-button").classed(
                    "flicker-animation",
                    false
                );

                // Add animation class to the clicked button
                d3.select(button).classed("flicker-animation", true);
            }

            // initialize the bubbles and add event listeners for the buttons
            impl_filter_intial();
            d3.select("#fig3-show-all").on("click", function () {
                document.getElementById("viz3-descrip").innerHTML =
                    document.getElementById("fig3_refresh").innerHTML;
                toggleButtonAnimation("#fig3-show-all");
                impl_filter_intial();
            });
            d3.select("#fig3-price").on("click", function () {
                toggleButtonAnimation("#fig3-price");
                impl_filter("fig3-price");
            });
            d3.select("#fig3-rating").on("click", function () {
                toggleButtonAnimation("#fig3-rating");
                impl_filter("fig3-rating");
            });
            d3.select("#fig3-roast-type").on("click", function () {
                toggleButtonAnimation("#fig3-roast-type");
                impl_filter("fig3-roast-type");
            });
            d3.select("#fig3-roast-level").on("click", function () {
                toggleButtonAnimation("#fig3-roast-level");
                impl_filter("fig3-roast-level");
            });
        }
    );
});
