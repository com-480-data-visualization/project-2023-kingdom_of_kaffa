
function setMap(width, height, datapull) {
  console.log(datapull)
    const margin = {top: 10, right: 30, bottom: 10, left: 30};
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
    const projection = d3.geoMercator()
                      .rotate([-11, 0])
                      .scale(1)
                      .translate([0, 0]);
    const path = d3.geoPath().projection(projection);
    const svg = d3.select('#figure1')
                 .append('svg')
                 .attr('viewBox', '0 0 300 300')
                 .attr('preserveAspectRatio', 'xMidYMid')
                 .style('max-width', 1200)
                 .style('margin', 'auto')
                 .style('display', 'flex');

    const b = path.bounds(datapull),
    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0]  [1]) / height),
    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
    projection.scale(s).translate(t);
    svg.selectAll('path')
      .data(datapull.features)
      .enter()
      .append('path')
      .attr('d', path)
  }