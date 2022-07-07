import barData from '../data/bar-data-d3.js';

// Selecting the element
const element = document.getElementById('d3-bar-chart');

// Setting dimensions
const margin = {top: 40, right: 20, bottom: 50, left: 50},
  width = 900 - margin.left - margin.right,
  height = 480 - margin.top - margin.bottom;

// Setting X,Y scale ranges
const xScale = d3.scaleBand()
  .range([0, width])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .range([height, 0]);

// Appending svg to a selected element
const svg = d3.select(element).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("viewBox", `0 40 ${width + 80} ${height}`)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Formatting the data
barData.forEach(function (d) {
  d.value = +d.value;
});

// Scaling the range of the data in the domains
xScale.domain(barData.map(function (d) {
  return d.name;
}));
yScale.domain([0, d3.max(barData, function (d) {
  return d.value;
})]);

// Appending the rectangles for the bar chart
svg.selectAll(".bar")
  .data(barData)
  .enter().append("rect")
  .attr("x", function (d) {
    return xScale(d.name);
  })
  .attr("width", xScale.bandwidth())
  .attr("y", function (d) {
    return yScale(d.value);
  })
  .attr("height", function (d) {
    return height - yScale(d.value);
  })
  .style("fill", "#ff6f3c");

// Adding the x Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale));

// Adding the y Axis
svg.append("g")
  .call(d3.axisLeft(yScale));
