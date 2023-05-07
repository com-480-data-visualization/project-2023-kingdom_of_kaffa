$(document).ready(function () {
    d3.csv(
        "https://github.com/com-480-data-visualization/project-2023-kingdom_of_kaffa/blob/master/dataset/kofio_dataset/price_rating_rec_clean.csv"
    ).then(function (data) {
        // make a copy of the original data points
        const record = JSON.parse(JSON.stringify(data));

        // initialize the svg
        let width = window.innerWidth * 0.56,
            height = window.innerWidth * 0.42;
        let node_size = 55;

        var svg = d3
            .select("#filtering-bubbles")
            .append("svg")
            .attr("height", height)
            .attr("width", width);

        // implement the filtering function
        function impl_filter(indicator) {
            svg.selectAll(".circleContainer").remove();
            svg.selectAll("circle").remove();
            svg.selectAll("text").remove();

            var elem_updated = svg
                .selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("class", "circleContainer");

            elem_updated
                .append("circle")
                .style("cursor", (d) => (d.level < 3 ? "pointer" : "auto"))
                .attr("r", 30)
                .on("click", function (d) {
                    return 1;
                });

            elem_updated
                .append("text")
                .attr("text-anchor", "middle")
                .text(() => "100");

            var simulation = d3
                .forceSimulation()
                .force("x", d3.forceX(width / 2))
                .force("y", d3.forceY(height / 2))
                .force("collision", d3.forceCollide().radius(node_size))
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
    });
});
