
// All the brands wih recommmnedation and price take from /dataset/kofio_dataset/price_rating_rec_clean.csv
const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const code_to_country = {
  'cz': "Czech Republic",
  'no': "Norway",
  'de': "Germany",
  'gb': "Great Britain",
  'it': "Italy",
  'se': "Sweden",
  'pl': "Poland",
  'sv': "Slovenia",
  'nl': "Netherlands"
};

const brands = ['The naughty dog', 'Candycane Coffee', 'DAK Coffee Roasters', 'HAYB Speciality Coffee', "Father's Coffee Roastery", 'Industra Coffee', 'The Barn', 'Square Mile', 'Gardelli Coffee', 'Beansmith.s', 'Dark Woods Coffee', 'Main Lane Coffee Roasters', 'Nordbeans', 'Good Beans', 'Concept Coffee Roasters', 'Morgon Coffee Roasters', 'BeBerry Coffee', 'Coffea Circulor', 'Dos Mundos', 'Doubleshot', 'Fiftybeans'];

const brands_country = ['cz', 'cz', 'nl', 'pl', 'cz', 'cz', 'de', 'gb', 'it', 'cz', 'gb', 'de', 'cz', 'nl', 'sk', 'se', 'cz', 'no', 'cz', 'cz', 'cz'];

const colors = ['#fdc62f', '#ff8e8e', '#ea4242', '#5ac0f7', '#5ac0f7', '#3bb273', '#f27c07', '#6c80e8', '#956cff', '#ffabab', '#42e2ea', '#ea42ad', '#ffb1e3', '#88ff88', '#c490e4', '#b9b973', '#63e3c6', '#a5b9f5', '#f7c97e', '#e1f78e', '#ff8b8b'];

class Figure2 {

  constructor(data, innerHeight) {
    this.plot_data = data
    this.original_data = data
    this.xaxis_value = "Rating"
    this.yaxis_value = "Price"
    this.selected_brands = []
    this.circle_radius = 20
    this.roasteryToColor = this.setRoasteryToColor()
    this.is_about_set = false
    this.svg = d3.select("#fig2-plot")
      .append("svg")
      .attr("width", "100%")
      .attr("height", innerHeight)

    const margin = { top: 10, right: 20, bottom: 10, left: 20 };
    const svgViewbox = this.svg.node().getBoundingClientRect();
    this.width = svgViewbox.width - margin.left - margin.right;
    this.height = svgViewbox.height - margin.top - margin.bottom;
  }

  hoverCircle = (data) => {
    this.updateCoffeeInfo(data.target.__data__);
    d3.select(data.this)
      .style("stroke", "black")
      .style("stroke-width", 10);
  }

  init() {
    this.setDropDownListeners()
    this.setMainPlot()
    this.setBrands()
    this.setSelectors()
    // this.setDropDownListeners()
  }

  setDropDownListeners() {
    $("#fig2-yaxis").on("change", event => {
      this.updateYaxis($(event.target).val());
      this.setGraph();
    });

    $("#fig2-xaxis").on("change", event => {
      this.updateXaxis($(event.target).val());
      this.setGraph();
    });

    $('#fig2-brand').on('changed.bs.select', (event, clickedIndex, isSelected, previousValue) => {
      this.setSelectedBrands(event, clickedIndex, isSelected);
      this.setGraph();
    });
  }

  setSelectedBrands(event, clickedIndex, isSelected) {
    let selectedOptionsLength = $('#fig2-brand option:selected').length
    if (selectedOptionsLength == 0) {
      // remove all points
      this.selected_brands = []
    }
    else if (selectedOptionsLength == brands.length) {
      // add all points
      this.selected_brands = [...brands]
    }
    else {
      let optionValue = $(event.target).find('option').eq(clickedIndex).val();
      if (isSelected) {
        // Add value to the list
        this.selected_brands.push(optionValue)
      } else {
        // Remove value from the list
        this.selected_brands.splice(this.selected_brands.indexOf(optionValue), 1)
      }
    }
  }

  setBrands() {
    let brand_select = document.getElementById("fig2-brand");

    brands.forEach((brand) => {
      let option = document.createElement("option");
      option.value = brand;
      option.setAttribute('data-content', `<span style='color:${colors[brands.indexOf(brand)]}'><i class='fa fa-circle'></i></span> ` + brand);
      brand_select.add(option);
    });
  }

  setSelectors() {
    $('select').selectpicker(); // not the clean way, should do it somewhere else
    $('#fig2-brand').selectpicker('selectAll');
  }

  setRoasteryToColor() {
    return d3.scaleOrdinal()
      .domain(brands)
      .range(colors)
  }

  updateXaxis(xaxis_value) {
    this.xaxis_value = xaxis_value
    let x_buf = d3.max(this.plot_data, d => { return parseFloat(d[this.xaxis_value]) }) / this.circle_radius
    this.x.domain([-1 * x_buf, d3.max(this.plot_data, d => { return parseFloat(d[this.xaxis_value]) }) + x_buf * 2])
    this.svg.select("#xaxis").transition().duration(500).call(d3.axisBottom(this.x))
  }

  updateYaxis(yaxis_value) {
    this.yaxis_value = yaxis_value
    this.y.domain([0, d3.max(this.plot_data, d => { return parseFloat(d[this.yaxis_value]) })])
    this.svg.selectAll("#yaxis").transition().duration(500)
      .call(d3.axisRight(this.y)
        .tickSize(this.width))
      .call(g => g.select(".domain")
        .remove())
      .call(g => g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2"))
      .call(g => g.selectAll(".tick text")
        .attr("x", 4)
        .attr("dy", -4))
  }

  static updateCoffeeInfo(hovered_circle) {
    function updateBrand(){
      document.getElementById('fig2_brand_name').querySelector("text").innerHTML = `<span style='color:${colors[brands.indexOf(hovered_circle["Roastery"])]}'><i class='fa fa-circle'></i></span> ` + hovered_circle["Roastery"]
      document.getElementById('fig2_brand_image').src = "image/brand-logo/" + hovered_circle["Roastery"].toLowerCase().replace(/ /g, "_").replace('.', "_") + '_thumb.png'
      let country_code = brands_country[brands.indexOf(hovered_circle["Roastery"])];
      // document.getElementById('fig2_brand_country_image').src = "image/flags/" + country_code + '.png'
      document.getElementById('fig2_brand_country_name').textContent = code_to_country[country_code]
    }

    function updateCoffee_product(){
      document.getElementById('fig2_coffee_name').querySelector("text").textContent = toTitleCase(hovered_circle["Item Name"].split('-')[0])
      document.getElementById('fig2_price').querySelector("text").textContent = hovered_circle["Price"]
      document.getElementById('fig2_rating').querySelector("text").textContent = hovered_circle["Rating"] + '/5.0'
      document.getElementById('fig2_recommended').querySelector("text").textContent = Math.round(parseFloat(hovered_circle["Recommended"])) + '%'
      document.getElementById('fig2_origin_country_name').textContent = hovered_circle["Coffee Origin"]
    }

    updateBrand();
    updateCoffee_product();
  }

  setMainPlot() {
    const margin = { top: 10, right: 20, bottom: 10, left: 20 };

    this.svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    let x_buf = d3.max(this.plot_data, d => { return parseFloat(d[this.xaxis_value]) }) / this.circle_radius
    this.x = d3.scaleLinear()
      .domain([-1 * x_buf, d3.max(this.plot_data, d => { return parseFloat(d[this.xaxis_value]) }) + x_buf * 2])
      .range([0, this.width]);

    this.y = d3.scaleLinear()
      .domain([0, d3.max(this.plot_data, d => { return parseFloat(d[this.yaxis_value]) })])
      .range([this.height - this.circle_radius * 2, this.circle_radius]);

    this.svg.append("g")
      .attr("id", "xaxis")
      .attr("transform", `translate(${margin.left}, ${this.height})`)
      .call(d3.axisBottom(this.x));

    this.svg.append('g')
      .attr("id", "yaxis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisRight(this.y)
        .tickSize(this.width))
      .call(g => g.select(".domain")
        .remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-dasharray", "2,2"))
      .call(g => g.selectAll(".tick text")
        .attr("x", 4)
        .attr("dy", -4))

    this.setGraph()
  }
 
  setGraph(){
      this.plot_data = this.original_data.filter(d => { return this.selected_brands.includes(d.Roastery) })
      let is_about_set = this.is_about_set
      // Remove all the circles from the plot
      this.svg.selectAll("circle")
      .transition()
      .duration(500)
      .attr("r", 0)
      .remove()
      .end()
      .then(() => {
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
          .on("mouseover", function (data) {
            if(!is_about_set){   // TODO: there shoulf be a better way todo this
              is_about_set = true
              document.getElementById("fig2_coffee_brand_info").innerHTML = document.getElementById("fig2_after_circle").innerHTML
            }
            Figure2.updateCoffeeInfo(data.target.__data__)
            d3.select(this)
            .attr("r", 35)
            .style("opacity", "1")
          })
          .on("mouseout", function () {
            d3.select(this)
            .attr("r", 25)
              .style("opacity", "0.7")
          })
          .transition()
          .duration(500)
          .ease(d3.easeBounceOut)
          .attr("r", 25)
      });
      this.is_about_set = is_about_set
  }
}


$(document).ready(function () {
  d3.json("../dataset/kofio_dataset/price_rating_rec_clean.json").then(function (data) {
    let fig2 = new Figure2(data, window.innerHeight * 0.8)
    fig2.init()
  })


})

