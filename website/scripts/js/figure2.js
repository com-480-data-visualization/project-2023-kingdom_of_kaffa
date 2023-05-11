
// All the roasteries wih recommmnedation and price take from /dataset/kofio_dataset/price_rating_rec_clean.csv
class Figure2 {

  constructor(data, innerWidth, innerHeight) {
    this.data = data
    this.innerWidth = innerWidth
    this.innerHeight = innerHeight
    this.xaxis_value = "Rating"
    this.yaxis_value = "Price"
    this.brand_value = "All"
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

  init() {
    this.setMainPlot()
    this.setDropDownListeners()
  }

  setDropDownListeners() {
    $("#fig2-yaxis").on("change", event => {
      this.updateYaxis($(event.target).val())
      this.updateMainPlot()
    });

    $("#fig2-xaxis").on("change", event => {
      this.updateXaxis($(event.target).val())
      this.updateMainPlot()
    });

    $("#fig2-brand").on("change", function () {
      console.log($(this).val());
    });
  }


  setRoasteryToColor() {
    return d3.scaleOrdinal()
      .domain(this.roasteries)
      .range(this.colors)
  }

  updateXaxis(xaxis_value) {
    this.xaxis_value = xaxis_value
    this.x.domain([d3.min(this.data, d => { return parseFloat(d[this.xaxis_value]) }) * 0.8, d3.max(this.data, d => { return parseFloat(d[this.xaxis_value]) })])
    this.xaxis.transition().duration(1000).call(d3.axisBottom(this.x))
  }

  updateYaxis(yaxis_value) {
    this.yaxis_value = yaxis_value
    this.y.domain([0, d3.max(this.data, d => { return parseFloat(d[this.yaxis_value]) }) * 1.1])
    this.yaxis.transition().duration(1000).call(d3.axisLeft(this.y))
  }

  updateMainPlot() {
    this.svg.selectAll("circle")
      .data(this.data)
      .transition()
      .duration(1000)
      .attr("cx", d => this.x(d[this.xaxis_value]))
      .attr("cy", d => this.y(d[this.yaxis_value]))
  }

  setMainPlot() {

    const margin = { top: 10, right: 20, bottom: 10, left: 10 };

    // const svgViewbox = this.svg.node().getBoundingClientRect();

    this.svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    this.width = this.innerWidth - margin.left - margin.right;
    this.height = this.innerHeight - margin.top - margin.bottom;

    this.x = d3.scaleLinear()
      .domain([d3.min(this.data, d => { return parseFloat(d[this.xaxis_value]) }) * 0.8, d3.max(this.data, d => { return parseFloat(d[this.xaxis_value]) })])
      .range([0, this.width]);

    this.y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => { return parseFloat(d[this.yaxis_value]) }) * 1.1])
      .range([this.height, 0]);

    this.xaxis = this.svg.append("g")
      .attr("transform", `translate(20, ${this.height})`)
      .call(d3.axisBottom(this.x));

    this.yaxis = this.svg.append("g")
      .attr("transform", "translate(20,0)")      // This controls the vertical position of the Axis
      .call(d3.axisLeft(this.y));

    this.svg.append('g')
      .selectAll("dot")
      .data(this.data)
      .join("circle")
      .attr("cx", d => this.x(d.Rating))
      .attr("cy", d => this.y(d.Price))
      .attr("r", 20)
      .style("fill", d => { return this.roasteryToColor(d.Roastery); })
      .style("opacity", "0.7")
      .attr("stroke", d => { return this.roasteryToColor(d.Roastery); })
  }

}


$(document).ready(function () {
  d3.json("../dataset/kofio_dataset/price_rating_rec_clean.json").then(function (data) {
    let fig2 = new Figure2(data, window.innerWidth, window.innerHeight * 0.8)
    fig2.init()
  })


})

