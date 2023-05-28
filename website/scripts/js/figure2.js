
// All the brands wih recommmnedation and price take from /dataset/kofio_dataset/price_rating_rec_clean.csv
const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
const toTitleCaseClean = (phrase) => {
  return phrase.toLowerCase().replace(/ /g, "_").replace('.', "_").replace("'", "_")
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
    // this.brand_data = brand_data
    this.original_data = data
    this.xaxis_value = "Rating"
    this.yaxis_value = "Price"
    this.selected_brands = []
    this.circle_radius = 25
    this.roasteryToColor = this.setRoasteryToColor()
    this.is_about_set = false
    this.svg = d3.select("#fig2-plot")
      .append("svg")
      .attr("width", "100%")
      .attr("height", innerHeight)

    this.addGlow("small_glow", 1)
    this.addGlow("extra_glow", 5)
    this.addGradient("small", "93%")
    this.addGradient("extra", "80%")


    const margin = { top: 10, right: 20, bottom: 10, left: 20 };
    const svgViewbox = this.svg.node().getBoundingClientRect();
    this.width = svgViewbox.width - margin.left - margin.right;
    this.height = svgViewbox.height - margin.top - margin.bottom;
  }


  addGradient(level, radius) {
    let brandGradients = this.svg.append("defs").selectAll("radialGradient")
      .data(brands)
      .enter().append("radialGradient")
      //Create a unique id per "planet"
      .attr("id", function (d) { return level + "_gradient-" + toTitleCaseClean(d); })

    //Then the actual color almost halfway
    brandGradients.append("stop")
      .attr("offset", radius)
      .attr("stop-color", (d) => {
        return this.roasteryToColor(d);
      });

    //Finally a darker color at the outside
    brandGradients.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", (d) => {
        return d3.rgb(this.roasteryToColor(d)).darker(0.7);
      });
  }

  addGlow(glow_id, glow) {
    let defs = this.svg.append("defs");

    //Filter for the outside glow
    var filter = defs.append("filter")
      .attr("id", glow_id);
    filter.append("feGaussianBlur")
      .attr("stdDeviation", glow)
      .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");
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
      this.updateXaxis(this.xaxis_value);
      this.setGraph();
    });

    $("#fig2-xaxis").on("change", event => {
      this.updateXaxis($(event.target).val());
      this.updateYaxis(this.yaxis_value);
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
  updateYDomain() {
    const y_max = d3.max(this.plot_data, d => { return parseFloat(d[this.yaxis_value]) })
    const y_min = d3.min(this.plot_data, d => { return parseFloat(d[this.yaxis_value]) })
    let y_buf = y_max / this.circle_radius
    return [-y_buf + y_min, y_max + y_buf];
  }

  updateXDomain() {
    const x_max = d3.max(this.plot_data, d => { return parseFloat(d[this.xaxis_value]) })
    const x_min = d3.min(this.plot_data, d => { return parseFloat(d[this.xaxis_value]) })
    let x_buf = x_max / this.circle_radius
    return [-1.5 * x_buf + x_min, x_max + x_buf * 1];
  }

  updateXaxis(xaxis_value) {
    this.xaxis_value = xaxis_value
    this.x.domain(this.updateXDomain())
    this.svg.selectAll(".axis--x").transition().duration(500).call(d3.axisBottom(this.x))
  }

  updateYaxis(yaxis_value) {
    this.yaxis_value = yaxis_value


    this.y.domain(this.updateYDomain())
    this.svg.selectAll(".axis--y").transition().duration(500)
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
  }

  updateCoffeeInfo(hovered_circle) {
    function updateBrand() {
      document.getElementById('fig2_brand_name').querySelector("text").innerHTML = hovered_circle["Roastery"] //<span style='color:${colors[brands.indexOf(hovered_circle["Roastery"])]}'>`<i class='fa fa-circle'></i></span> `
      document.getElementById('fig2_brand_image').src = "image/brand-logo/" + hovered_circle["Roastery"].toLowerCase().replace(/ /g, "_").replace('.', "_") + '_thumb.png'
      document.getElementById('fig2_brand_image').style.background = colors[brands.indexOf(hovered_circle["Roastery"])]
      let country_code = brands_country[brands.indexOf(hovered_circle["Roastery"])];
      document.getElementById('fig2_brand_country_image').src = "image/flags/" + country_code + '.png'
      document.getElementById('fig2_brand_coffee').querySelector("text").textContent = hovered_circle["Brand Coffee count"]
      document.getElementById('fig2_brand_rating').querySelector("text").textContent = hovered_circle["Brand Review"] + '/5.0'
      document.getElementById('fig2_brand_recommended').querySelector("text").textContent = Math.round(parseFloat(hovered_circle["Brand Recommended"])) + '%'
      document.getElementById('fig2_brand_about').textContent = hovered_circle["Brand About"]

    }

    function updateCoffeeProduct() {
      document.getElementById('fig2_coffee_name').querySelector("text").textContent = toTitleCase(hovered_circle["Item Name"].split('-')[0])
      document.getElementById('fig2_price').querySelector("text").textContent = hovered_circle["Price"]
      document.getElementById('fig2_rating').querySelector("text").textContent = hovered_circle["Rating"] + '/5.0'
      document.getElementById('fig2_recommended').querySelector("text").textContent = Math.round(parseFloat(hovered_circle["Recommended"])) + '%'
      document.getElementById('fig2_coffee_origin').textContent = hovered_circle["Coffee Origin"]
    }

    updateBrand();
    updateCoffeeProduct();
  }

  setMainPlot() {
    const margin = { top: 10, right: 20, bottom: 10, left: 20 };

    this.svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    this.x = d3.scaleLinear()
      .domain(this.updateXDomain())
      .range([0, this.width]);

    this.y = d3.scaleLinear()
      .domain(this.updateYDomain())
      .range([this.height - this.circle_radius, this.circle_radius * 1.5]);

    this.svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(${margin.left}, ${this.height})`)
      .call(d3.axisBottom(this.x));

    this.svg.append('g')
      .attr("class", "axis axis--y")
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

  setCircleEffects(nodes, opacity, circle_radius, glow, gradient) {

    nodes.style("opacity", opacity)
      .style("filter", `url(#${glow}_glow)`)
      .style("fill", function (d) {
        return `url(#${gradient}_gradient-` + toTitleCaseClean(d.Roastery) + ")";
      })
      .attr("r", circle_radius);
  }

  setGraph() {
    this.plot_data = this.original_data.filter(d => { return this.selected_brands.includes(d.Roastery) })
    // Remove all the circles from the plot
    this.svg.selectAll("circle")
      .transition()
      .duration(500)
      .attr("r", 0)
      .remove()
      .end()
      .then(() => {
        let onclick = false
        let onclick_roastery = "";
        // Add new circles to the graph
        let nodes = this.svg.select("g")
          .selectAll("circle")
          .data(this.plot_data)
          .join("circle")
          .attr("cx", d => this.x(d[this.xaxis_value]))
          .attr("cy", d => this.y(d[this.yaxis_value]))
          .attr("r", 0)

        this.setCircleEffects(nodes, 0.7, 0, "small", "small")


        nodes
          .on("mouseover", (e) => {
            if (!onclick || (onclick && e.target.__data__.Roastery === onclick_roastery)) {

              if (!this.is_about_set) {   // TODO: there shoulf be a better way todo this
                this.is_about_set = true
                document.getElementById("fig2_coffee_brand_info").innerHTML = document.getElementById("fig2_after_circle").innerHTML
              }
              this.updateCoffeeInfo(e.target.__data__)
              this.setCircleEffects(d3.select(e.currentTarget).raise(), 1, 40, "extra", "extra")
            }
          })
          .on("mouseout", (e) => {
            if (!onclick) {
              this.setCircleEffects(d3.select(e.currentTarget), 0.7, 25, "small", "small")
            }
            else if (onclick && e.target.__data__.Roastery === onclick_roastery) {
              this.setCircleEffects(d3.select(e.currentTarget), 1, 40, "small", "small")
            }
          })
          .transition()
          .duration(500)
          .ease(d3.easeBounceOut)
          .attr("r", 25);

        this.svg.on("click", (e) => {
          var target = e.target;

          // Add effect for all productts from the same brand
          if (target.tagName === "circle") {
            this.setCircleEffects(nodes, 0.4, 25, "small", "small")
            this.setCircleEffects(nodes.filter((n) => { return n.Roastery === target.__data__.Roastery })
              .raise(), 1, 40, "extra", "small")
            onclick = true;
            onclick_roastery = target.__data__.Roastery;
          }
          // Remove effect if clicked on chart
          else if (target.tagName === "svg") {
            onclick = false;
            onclick_roastery = ""
            this.setCircleEffects(nodes, 0.7, 25, "small", "small")
          }
        })
      });
  }
}


$(document).ready(function () {
  Promise.all([
    d3.json("../dataset/kofio_dataset/brand_coffee_combined.json"),
    // d3.json('../dataset/kofio_dataset/kofio_brand_dataset.json')
  ]).then(function ([data01]) {
    let fig2 = new Figure2(data01, window.innerHeight * 0.8)
    fig2.init()

  })

})

