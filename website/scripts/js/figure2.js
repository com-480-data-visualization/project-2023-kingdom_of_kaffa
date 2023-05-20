
// All the roasteries wih recommmnedation and price take from /dataset/kofio_dataset/price_rating_rec_clean.csv
class Figure2 {

  constructor(data, innerWidth, innerHeight) {
    this.plot_data = data
    this.original_data = data
    this.innerWidth = innerWidth
    this.innerHeight = innerHeight
    this.xaxis_value = "Rating"
    this.yaxis_value = "Price"
    this.brand_value = "All"
    this.circle_radius = 20
    this.roasteries = ['The naughty dog',
      'Candycane Coffee',
      'DAK Coffee Roasters',
      'HAYB Speciality Coffee',
      "Father's Coffee Roastery",
      'Industra Coffee',
      'The Barn',
      'Square Mile',
      'Gardelli Coffee',
      'Beansmith.s',
      'Dark Woods Coffee',
      'Main Lane Coffee Roasters',
      'Nordbeans',
      'Good Beans',
      'Concept Coffee Roasters',
      'Morgon Coffee Roasters',
      'BeBerry Coffee',
      'Coffea Circulor',
      'Dos Mundos',
      'Doubleshot',
      'Fiftybeans']

    this.colors = ['#fdc62f', '#ff8e8e', '#ea4242', '#5ac0f7', '#5ac0f7', '#3bb273', '#f27c07', '#6c80e8', '#956cff', '#ffabab', '#42e2ea', '#ea42ad', '#ffb1e3', '#88ff88', '#c490e4', '#b9b973', '#63e3c6', '#a5b9f5', '#f7c97e', '#e1f78e', '#ff8b8b'];
    this.roasteryToColor = this.setRoasteryToColor()
    this.svg = d3.select("#fig2-plot")
      .append("svg")
      .attr("width", "100%")
      .attr("height", innerHeight)
  }

  hoverCircle = (data) => {
    this.updateCoffeeInfo(data.target.__data__);
    console.log(data)
    d3.select(data.this)
    .style("stroke", "black")
    .style("stroke-width", 10);
  }

  init(){
    this.setDropDownListeners()
    this.setMainPlot()
    this.setBrands()
  }

  setDropDownListeners(){
    $("#fig2-yaxis").on("change", event => {
      this.updateYaxis($(event.target).val());
      this.updateMainPlot();
    });

    $("#fig2-xaxis").on("change", event => {
      this.updateXaxis($(event.target).val());
      this.updateMainPlot();
    });

    $("#fig2-brand").on("change", event => {
      this.updateBrand($(event.target).val());
      this.updateMainPlot();
    });
  }

  setBrands() {
    let brand_select = document.getElementById("fig2-brand");
    this.roasteries.forEach((brand) => {
      let option = document.createElement("option");
      option.value = brand;
      option.text = brand;
      brand_select.add(option);
    });
  }

  setRoasteryToColor() {
    return d3.scaleOrdinal()
      .domain(this.roasteries)
      .range(this.colors)
  }

  updateBrand(brand_value) {
    this.brand_value = brand_value;
  }

  updateXaxis(xaxis_value) {
    this.xaxis_value = xaxis_value
    this.x.domain([0, d3.max(this.plot_data, d => { return parseFloat(d[this.xaxis_value])})])
    this.svg.select("#xaxis").transition().duration(1000).call(d3.axisBottom(this.x))
  }

  updateYaxis(yaxis_value) {
    this.yaxis_value = yaxis_value
    this.y.domain([0, d3.max(this.plot_data, d => { return parseFloat(d[this.yaxis_value]) })])
    this.svg.selectAll("#yaxis").transition().duration(1000).call(d3.axisLeft(this.y))
  }

  updateMainPlot() {

    // Filter all elements on the chosen brand
    if (this.brand_value === "All") {// is it correct comaprison?
      this.plot_data = this.original_data
    }
    else {
      this.plot_data = this.original_data.filter(d => { return d.Roastery == this.brand_value })
    }

    // Remove all the circles from the plot
    this.svg.selectAll("circle")
      .transition()
      .duration(500)
      .attr("r", 0)
      .remove()
      .on("end", () => {
        // Add new circles to the graph
        this.svg.select("g")
          .selectAll("circle")
          .data(this.plot_data)
          .join("circle")
          .attr("cx", d => this.x(d[this.xaxis_value]))
          .attr("cy", d => this.y(d[this.yaxis_value]))
          .attr("r", 0)
          .style("fill", d => this.roasteryToColor(d.Roastery))
          .style("opacity", "0.7")
          .attr("stroke", d => this.roasteryToColor(d.Roastery))
          .on("mouseover", function(data) {
            Figure2.updateCoffeeInfo(data.target.__data__)
            d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 10);
          })
          .on("mouseout", function() {
            d3.select(this)
            .style("stroke-width", 0);
          })
          .transition()
          .duration(500)
          .ease(d3.easeBounceOut)
          .attr("r", 20)
      });

  }
  static updateCoffeeInfo(hovered_circle){
    document.getElementById('fig2_price').querySelector("text").textContent = hovered_circle["Price"]
    document.getElementById('fig2_rating').querySelector("text").textContent = hovered_circle["Rating"]
    document.getElementById('fig2_recommended').querySelector("text").textContent = hovered_circle["Recommended"]
  }

  setMainPlot() {

    const margin = { top: 10, right: 20, bottom: 10, left: 20 };

    this.svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const svgViewbox = this.svg.node().getBoundingClientRect();
    this.width = svgViewbox.width - margin.left - margin.right;
    this.height = svgViewbox.height - margin.top - margin.bottom;

    // const xaxis_/right = 
    this.x = d3.scaleLinear()
      .domain([0, d3.max(this.plot_data, d => { return parseFloat(d[this.xaxis_value])})])
      .range([0, this.width]);


    this.y = d3.scaleLinear()
      .domain([0, d3.max(this.plot_data, d => { return parseFloat(d[this.yaxis_value]) })])
      .range([this.height, 0]);

    this.svg.append("g")
      .attr("id","xaxis")
      .attr("transform", `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.x));

    this.svg.append("g")
      .attr("id","yaxis")
      .attr("transform", `translate(20,0)`)      // This controls the vertical position of the Axis
      .call(d3.axisLeft(this.y));
    // 
    this.svg.append('g')
      .selectAll("circle")
      .data(this.plot_data)
      .join("circle")
      .attr("cx", d => this.x(d.Rating))
      .attr("cy", d => this.y(d.Price))
      .attr("r", 20)
      .style("fill", d => { return this.roasteryToColor(d.Roastery); })
      .style("opacity", "0.7")
      .attr("stroke", d => { return this.roasteryToColor(d.Roastery); })
      .on("mouseover", function(data, idx) {
        Figure2.updateCoffeeInfo(data.target.__data__)
        d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", 10);
      })
      .on("mouseout", function() {
        d3.select(this)
        .style("stroke-width", 0);
      });

  }
}


$(document).ready(function () {

  d3.json("../dataset/kofio_dataset/price_rating_rec_clean.json").then(function (data) {
    let fig2 = new Figure2(data, window.innerWidth * 0.7, window.innerHeight * 0.8)
    fig2.init()
  })


})

