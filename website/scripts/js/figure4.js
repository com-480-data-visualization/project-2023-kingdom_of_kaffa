const r0 = 210; // inner radius
const r1 = r0 * 1.07; // outer radius
const fade = 0.2;
const duration = 1000;
var chosen_idx = -1;
var src_idx = -1, tgt_idx = -1;

var colorScale = d3.scaleOrdinal()
  .range(['#EAD8C6','#C0AA9B','#F1C3C1', '#AD6D52', '#864C40', '#70342B', '#7F2730', '#592D22', '#B47C5F', '#CD693E', '#A04339', '#D99F98']);

var color = (i) => colorScale(i);

const arc = d3.arc().innerRadius(r0).outerRadius(r1);
const ribbon = d3.ribbon().radius(r0-15);

var svg, container, groupsContainer, groups, names, matrix, shuffled;
var isClicked = false;

var groupClicked = false, chordClicked = false;

function shuffleIndices(num) {
  var j, x, i;
  var arr = Array.from(Array(num).keys());

  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }

  return arr;
}


const NAMES = [
    "Kenya",
    "Ethiopia",
    "Uganda",
    "Yemen",
    "Tanzania",
    "Brazil",
    "Costa Rica",
    "Colombia",
    "El Salvador",
    "Guatemala",
    "Mexico",
    "Peru",
    "Nicaragua",
    "Honduras",
    "Indonesia",
    "Fruity",
    "Chocolate",
    "Wheaty",
    "Sweet",
    "Spicy",
    "Savory",
    "Nutty",
    "Floral"
];

const PULLREQUESTMATRIX = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,3,0,11,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,42,13,0,38,0,0,0,13],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,3,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,22,0,30,0,0,17,4],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,7,0,9,0,0,3,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,12,0,42,0,0,6,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,0,7,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,2,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,2,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,4,0,11,0,0,2,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,4,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,6,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,4,0,10,0,0,2,3],
    [3,2,3,3,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,2,0,3,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,2,2,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0],
    [3,2,1,3,3,3,3,3,3,3,0,2,2,2,2,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,3,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

function updateCoffeeInfo(data){
  console.log(data);
  d3.selectAll(".fig4-info-table")
    .style("border-color", data.color);
  d3.selectAll('#fig4_coffee_title').text(data.name+" Coffee");
  d3.selectAll('#fig4_coffee_des').text(data.description);

  let flavors = "";
  data.flavor.forEach((f) => {
    flavors += `<div class="flavor-icon"><img src="image/pairing-icon/${f.toLowerCase()}.png"><p>${f}</p></div>`;
  });
  d3.select('#flavor-contain').html(flavors);

  let foods = "";
  Object.entries(data.food).forEach(([foodName, imgSrc]) => {
    foods += `<div class="food-icon"><img src="${imgSrc}"><p>${foodName}</p></div>`;
  });
  d3.select('#food-contain').html(foods);

  d3.selectAll("#fig4_coffee_title")
    .style("background-color", data.color);
}

function updateFlavorInfo(data){
  console.log(data);
  d3.selectAll('#fig4_flavor_title').text(data.name+' Flavor');
  d3.selectAll('#fig4_flavor_des').text(data.description);

  let flavors = "";
  console.log(data.varieties);
  data.varieties.forEach((f) => {
    flavors += `<div class="flavor-icon">${f}</div>`;
  });
  d3.selectAll('#typical-flavor').html(flavors);

  let foods = "";
  Object.entries(data.food).forEach(([foodName, imgSrc]) => {
    foods += `<div class="food-icon"><img src="${imgSrc}"><p>${foodName}</p></div>`;
  });
  d3.selectAll('#typical-food').html(foods);

  d3.selectAll("#fig4_flavor_title")
    .style("background-color", data.color);
  d3.selectAll(".fig4-info-table")
    .style("border-color", data.color);
}

$(document).ready(function () {
  d3.json("../dataset/kofio_dataset/pairing.json").then(function (data) {
    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(1);
      return (t) => arc(i(t));
  }
  
  function ribbonTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(1);
      return (t) => ribbon(i(t));
  }
  
  function angleTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(1);
      return (t) => angle(i(t));
  }
  
  function angle(a) {
      return `rotate(${(a.angle * 180) / Math.PI - 90})
                    translate(${r0 + 26})
                    ${a.angle > Math.PI ? "rotate(180)" : ""}`;
  }
  
  function setNames(data) {
      names = data;
      shuffled = shuffleIndices(names.length);
  }
  
  function chordKey(data) {
      return data.source.index < data.target.index
          ? data.source.index + "-" + data.target.index
          : data.target.index + "-" + data.source.index;
  }
  
  function init(data) {
      matrix = data;
      svg = d3
          .select("#pairing-viz")
          .append("svg")
          .attr("width", 800)
          .attr("height", 800)
          .append("g")
          .attr("transform", "translate(400,400)");

      //Container for the gradients
      var defs = svg.append("defs");

      //Filter for the outside glow
      var filter = defs.append("filter")
          .attr("id","glow");
      filter.append("feGaussianBlur")
          .attr("stdDeviation","3.5")
          .attr("result","coloredBlur");
      var feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
          .attr("in","coloredBlur");
      feMerge.append("feMergeNode")
          .attr("in","SourceGraphic");

      container = svg.append("g").attr("class", "container");
  
      groupsContainer = container.append("g").attr("class", "groupsContainer");
  
      var chord = d3
          .chord()
          .padAngle(0.0) // padding between entities (black arc)
          .sortSubgroups(d3.descending)(matrix);
  
      chord.groups.forEach(function (g) {
          g.endAngle = g.startAngle;
          g.value = 0;
      });
  
      var groupsUpdate = groupsContainer
          .selectAll(".group")
          .data(chord.groups, (x) => x.index);
  
      groups = groupsUpdate.enter().append("g").attr("class", "group");
  
      groups
          .append("path")
          .style("fill", (d) => color(d.index))
          .style("stroke", (d) => color(d.index))
          .style("stroke-width", 0.5)
          .transition()
          .duration(10)
          .attrTween("d", arcTween);
  
      groups
          .on("mouseover", mouseover)
          .on("mousemove", groupMouseMove)
          .on("mouseout", mouseout)
          .on("click",groupClickHandler);
  
      groups
          .append("text")
          .attr("class", "label")
          .each(function (d) {
              d.angle = (d.startAngle + d.endAngle) / 2;
          })
          .attr("dy", ".3em")
          .attr("text-anchor", function (d) {
              return d.angle > Math.PI ? "end" : null;
          })
          .attr("transform", function (d) {
              return `rotate(${(d.angle * 180) / Math.PI - 90})
                            translate(${r0 + 26})
                            ${d.angle > Math.PI ? "rotate(180)" : ""}`;
          })
          .text(function (d, i) {
              return names[i];
          })
          .style("opacity", 0)
          .transition()
          .duration(duration)
          .attrTween("transform", angleTween)
          .style("cursor", "pointer");;
  
      /*** CHORDS ***/
      chordsContainer = container.append("g").attr("class", "chordContainer");
  
      chord.forEach(function (c) {
          c.source.endAngle = c.source.startAngle;
          c.target.endAngle = c.target.startAngle;
      });
  
      var chordsUpdate = chordsContainer.selectAll("path").data(chord, chordKey);
  
      chords = chordsUpdate.enter().append("path").attr("class", "chord");
  
      chords
          .style("fill", (d) => color(d.source.index))
          .style("stroke-width", 0.5)
          .transition()
          .duration(duration)
          .attrTween("d", ribbonTween);
  
      chords
          .on("click", chordClickHandler)
          .on("mouseover", mouseover)
          .on("mousemove", chordMouseMove)
          .on("mouseout", mouseout);
  
      setTimeout(() => update(matrix), 0);
  }
  
  function update(matrix) {
  
      chord = d3.chord().padAngle(0.0).sortSubgroups(d3.descending)(matrix);
  
      var groupUpdate = d3
          .selectAll(".group")
          .data(chord.groups, function (d) {
              return d.index;
          })
          .style("display", function (d) {
              return d.value ? "block" : "none";
          });
  
      groupUpdate
          .select("path")
          .transition()
          .duration(duration)
          .attrTween("d", arcTween);
  
      groups
          .select("text")
          .each(function (d) {
              d.angle = (d.startAngle + d.endAngle) / 2;
          })
          .style("opacity", function (d) {
              return d.angle > 0 ? 0.9 : 0;
          })
          .attr("dy", ".3em")
          .attr("text-anchor", function (d) {
              return d.angle > Math.PI ? "end" : null;
          })
          .transition()
          .duration(duration)
          .attrTween("transform", angleTween);
  
      var chordsUpdate = chordsContainer.selectAll("path").data(chord, chordKey);
  
      chordsUpdate.exit().remove();
  
      var chordEnter = chordsUpdate
          .enter()
          .append("path")
          .attr("class", "chord")
          .style("fill", (d) => color(d.source.index))
          .style("stroke-width", 0.5);
  
      chords = chordEnter.merge(chordsUpdate);
  
      chordEnter.transition().duration(duration).attrTween("d", ribbonTween);
  
      chordEnter
          .on("mouseover", mouseover)
          .on("mousemove", chordMouseMove)
          .on("mouseout", mouseout);
  
      chordsUpdate
          .transition()
          .duration(duration)
          .attrTween("d", ribbonTween)
          .style("stroke", (d) => color(d.source.index))
          .style("fill", (d) => color(d.source.index))
          .style("stroke-opacity", 0);
  }
  
  function groupMouseMove(event, datum) {
      d3.select(this).style("cursor", "pointer");
      if (!isClicked){
        groupFocus(datum.index);
      }
  }
  
  function groupFocus(index) {
      var highlight = [];
  
      for (var i = 0; i < matrix.length; i++) {
          if (i == index || matrix[index][i] > 0 || matrix[i][index] > 0) {
              highlight.push(i);
          }
      }
  
      groups.style("opacity", function (d, i) {
          return highlight.includes(i) ? 1 : fade;
      });
  
      chords.style("opacity", function (d, i) {
          return index == d.source.index || index == d.target.index ? 1 : fade;
      });
  }
  
  function unfocus() {
      chords.style("opacity", 0.8);
      groups.style("opacity", 0.9);
  }
  
  function clearFocus() {
    chords.style("opacity", 0.8);
    groups.style("opacity", 0.9);
    isClicked = false;
    groupClicked = false;
    chordClicked = false;
    document.getElementById("coffee-food-pairing-info").innerHTML = document.getElementById("fig4_refresh").innerHTML;
  }

  function groupClickHandler(event, datum) {
    if (groupClicked && datum.index==chosen_idx) {
      clearFocus();
    } else {
        isClicked = true;
        groupClicked = true;
        chosen_idx = datum.index;
        clickUpdataInfo(chosen_idx);
        d3.select(this).style("cursor", "pointer");
        groupFocus(datum.index);
    }
  }

  function chordClickHandler(event, datum) {
    if (chordClicked && datum.source.index==src_idx && datum.target.index==tgt_idx) {
      clearFocus();
    } else {
      chordClicked = true;
      isClicked = true;
      src_idx = datum.source.index;
      tgt_idx = datum.target.index;
      clickUpdataInfo(src_idx);
      chordFocus(datum.source.index, datum.target.index);
    }
  }

  function chordMouseMove(event, datum) {
    d3.select(this).style("cursor", "pointer");
      if (!isClicked){
        var srcIdx = datum.source.index;
        var tgtIdx = datum.target.index;
  
        chordFocus(srcIdx, tgtIdx);
      }
  }
  
  function chordFocus(srcIdx, tgtIdx) {
      groups.style("opacity", function (d, i) {
          return i == srcIdx || i == tgtIdx ? 1 : fade;
      });
  
      chords.style("opacity", function (d, i) {
          return srcIdx == d.source.index && tgtIdx == d.target.index ? 1 : fade;
      });
  }
  
  var tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("display", "inline-block");
  
  function mouseover() {
      if (!isClicked){
        tooltip.style("display", "inline-block");
      }
  }
  
  function mouseout() {
      if (!isClicked){
        tooltip.style("display", "none");
        unfocus();
      }
  }
  
  function clickUpdataInfo(index) {
    if (index < 15){
    updateCoffeeInfo(data[index.toString()]);
    document.getElementById("coffee-food-pairing-info").innerHTML = document.getElementById("fig4_after_click_coffee").innerHTML
    } else {
    updateFlavorInfo(data[index.toString()]);
    document.getElementById("coffee-food-pairing-info").innerHTML = document.getElementById("fig4_after_click_flavor").innerHTML
    }
  }

    setNames(NAMES);
    init(PULLREQUESTMATRIX);
  })
});