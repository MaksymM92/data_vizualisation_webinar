import data from '../data/pieData.js'

const element = document.getElementById('d3-chart');

// setting up dimensions and margins
const width = 400;
const height = 400;
const margin = 10;

// setting up the radius of the pie
const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select(element)
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("style", "margin-top: -32px !important")
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// setting up the color scale
const color = d3.scaleOrdinal()
  .domain(data)
  .range(["#6b5b95", "#feb236", "#d64161"]);

// setting up the position of each group on the pie:

const pie = d3.pie()
  .value(function (d) {
    return d[1].value;
  })
const data_ready = pie(Object.entries(data))

// building arcs
const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// building the pie chart
svg
  .selectAll('slices')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arcGenerator)
  .attr('fill', function (d) {
    return (color(d.data[1].name))
  })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

// adding titles to pie slices
svg
  .selectAll('slices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function (d) {
    return d.data[1].name
  })
  .attr("transform", function (d) {
    return "translate(" + arcGenerator.centroid(d) + ")";
  })
  .style("text-anchor", "middle")
  .style("font-size", 20)
