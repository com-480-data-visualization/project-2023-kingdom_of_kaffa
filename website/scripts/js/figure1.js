// function setSlider(width, height, data_map) {
//     const data = Array.from(
//         { length: 7 },
//         (_, i) => new Date(1990 + i * 5, 10, 3)
//     );
//     let dateFormat = d3.timeFormat("%Y");

//     let slider = d3
//         .sliderBottom()
//         .min(data[0])
//         .max(data[6])
//         .step(5000 * 60 * 60 * 24 * 365)
//         .width(width * 0.95)
//         .tickValues(data)
//         .tickFormat(d3.timeFormat("%Y"))
//         .ticks(7)
//         .default(data[0])
//         .on("onchange", (val) => {
//             transitionMap(data_map, (dateFormat(val) - 1990) / 5);
//         });

//     const g = d3
//         .select("#map_slider_figure1")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")
//         .attr("transform", "translate(30,30)");

//     g.call(slider);
// }

// function setMap(width, height, geojson) {
//     // Select map svg and set size
//     const svg = d3
//         .select("#svg_map_figure1")
//         .attr("width", width)
//         .attr("height", height);

//     let mouseOver = function (d) {
//         d3.selectAll(".Country")
//             .transition()
//             // .duration(200)
//             .style("opacity", 0.5);
//         d3.select(this)
//             .transition()
//             // .duration(200)
//             .style("opacity", 1);
//         // .style("stroke", "black")
//     };

//     let mouseLeave = function (d) {
//         d3.selectAll(".Country").transition().duration(200).style("opacity", 1);
//         d3.select(this)
//             .transition()
//             .duration(200)
//             .style("stroke", "#fff")
//             .style("stroke-width", "1");
//     };

//     const projection = d3
//         .geoMercator()
//         .scale(170)
//         .center([0, 20])
//         .translate([width / 2, height / 2]);

//     const path = d3.geoPath().projection(projection);
//     const color_legend = d3
//         .scaleLinear()
//         .domain([0, 3492660000])
//         .range(["#eacaae", "#643100"]);

//     svg.selectAll("path")
//         .data(geojson.features)
//         .enter()
//         .append("path")
//         .attr("d", path)
//         .style("fill", function (d) {
//             const value = d["properties"]["1990/91"];
//             if (value) {
//                 return color_legend(d["properties"]["1990/91"]);
//             } else {
//                 return "#ccc";
//             }
//         })
//         .style("stroke", "#fff")
//         .style("stroke-width", "1")
//         .attr("class", function (d) {
//             return "Country";
//         })
//         .on("mouseover", mouseOver)
//         .on("mouseleave", mouseLeave);
// }

// function transitionMap(data, i) {
//     const color_legend = d3
//         .scaleLinear()
//         .domain([0, 3492660000])
//         .range(["#eacaae", "#643100"]);

//     const years = [
//         "1990/91",
//         "1995/96",
//         "2000/01",
//         "2005/06",
//         "2010/11",
//         "2015/16",
//         "2019/20",
//     ];

//     const svg = d3.select("#svg_map_figure1");
//     svg.selectAll("path")
//         .data(data.features)
//         .transition()
//         .delay(100)
//         .duration(1000)
//         .style("fill", function (d) {
//             const value = d["properties"][years[i]];
//             if (value) {
//                 return color_legend(d["properties"][years[i]]);
//             } else {
//                 return "#ccc";
//             }
//         });
// }

$(document).ready(function (){
    // d3.json(
    //     "../dataset/coffee_dataset/countries_production.geo.json"
    // ).then(function (data) {
    //     setMap(
    //         window.innerWidth * 0.85,
    //         window.innerHeight * 0.7,
    //         data
    //     );
    //     setSlider(window.innerWidth * 0.6, 100, data);
    // });
    console.log(1);
    const element = document.querySelector('#fig1-svg');

    const width = element.offsetWidth;

    const heightPercentage = 66;
    const height = (width * heightPercentage) / 100;
    console.log(height);

    element.style.height = height + 'px';

})

