const r0 = 230; // inner radius
const r1 = r0 * 1.03; // outer radius
const fade = 0.2;
const duration = 1000;

var colorScale = d3.scaleOrdinal()
  .range(['#fdc62f', '#ff8e8e', '#ea4242', '#5ac0f7', '#7E8DDB', '#3bb273', '#f27c07', '#6c80e8', '#956cff', '#ffabab', '#42e2ea', '#ea42ad', '#ffb1e3', '#88ff88', '#c490e4', '#b9b973', '#63e3c6', '#a5b9f5', '#f7c97e', '#e1f78e', '#ff8b8b','#EB9ECF','#EF7774']);

var color = (i) => colorScale(i);

// var color = (i) => d3.interpolateRainbow(shuffled[i] / names.length);
const arc = d3.arc().innerRadius(r0).outerRadius(r1);
const ribbon = d3.ribbon().radius(r0-10);

var svg, container, groupsContainer, groups, names, matrix, shuffled;
var isClicked = false;

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
    "Neutral",
    "Sweet",
    "Spicy",
    "Savory",
    "Nutty",
    "Floral"
];

const PULLREQUESTMATRIX = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,3,0,11,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,42,13,0,38,0,0,0,13],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0],
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
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3]
];

function updateCoffeeInfo(data){
  console.log(data);
  document.getElementById('fig4_coffee_title').innerHTML = `<h3>${data.name} Coffee</h3>`;
  document.getElementById('fig4_coffee_des').querySelector("text").innerHTML = data.description;

  let flavors = "";
  data.flavor.forEach((f) => {
    flavors += `<div class="food-item active"><img src="image/pairing-icon/${f.toLowerCase()}.png"><p>${f}</p></div>`;
  });
  document.getElementById('flavor-contain').innerHTML = flavors;

  let foods = "";
  Object.entries(data.food).forEach(([foodName, imgSrc]) => {
    foods += `<div class="food-item active"><img src="${imgSrc}"><p>${foodName}</p></div>`;
  });
  document.getElementById('food-contain').innerHTML = foods;
}

function undateFlavorInfo(){

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
          .on("click",clickHandler);
  
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
          .attrTween("transform", angleTween);
  
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
          .on("click", clickHandler)
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
              return d.angle > 0 ? 1 : 0;
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
      if (!isClicked){
        groupFocus(datum.index);
        groupTooltip(event, datum);
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
  
  function groupTooltip(event, datum) {
      var index = datum.index;
      var name = names[index].split(" ")[0];
      var total = 0;
  
      for (var i = 0; i < names.length; i++) {
          total += matrix[i][index];
      }
  
      var text = `${name} received ${datum.value} PR reviews and gave ${total}`;
  
      tooltip
          .text(text)
          .style("left", event.pageX - 34 + "px")
          .style("top", event.pageY - 12 + "px");
  }
  
  function unfocus() {
      chords.style("opacity", 1);
      groups.style("opacity", 1);
  }
  
  function chordMouseMove(event, datum) {
      if (!isClicked){
        var srcIdx = datum.source.index;
        var tgtIdx = datum.target.index;
  
        chordFocus(srcIdx, tgtIdx);
        chordTooltip(srcIdx, tgtIdx, event);
      }
  }
  
  function chordTooltip(srcIdx, tgtIdx, event) {
      var sourceName = names[srcIdx].split(" ")[0];
      var targetName = names[tgtIdx].split(" ")[0];
      var text1 = `${sourceName} reviewed ${matrix[tgtIdx][srcIdx]} of ${targetName}'s PRs`;
      var text2 = `${targetName} reviewed ${matrix[srcIdx][tgtIdx]} of ${sourceName}'s PRs`;
  
      tooltip
          .text(`${text1}\n${text2}`)
          .style("left", event.pageX - 34 + "px")
          .style("top", event.pageY - 12 + "px");
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
      .style("display", "inline");
  
  function mouseover() {
      if (!isClicked){
        tooltip.style("display", "inline");
      }
  }
  
  function mouseout() {
      if (!isClicked){
        tooltip.style("display", "none");
        unfocus();
      }
  }
  
  function clickHandler(event, datum) {
    isClicked = !isClicked;
    if (isClicked){
      let index = datum.index;
      if (index < 15){
        console.log(index);
        updateCoffeeInfo(data[index.toString()]);
      }
    }
  }


    setNames(NAMES);
    init(PULLREQUESTMATRIX);
  })
});