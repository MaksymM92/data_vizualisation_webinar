import data from '../data/pieData.js'

// Selecting the element
const element = document.getElementById('animated-pie-chart');

// Setting dimensions
const margin = 10,
  width = 400,
  height = 400;

// Setting the radius of the pie
const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select(element)
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("style", "margin-top: -32px !important")
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Setting the color scale
const color = d3.scaleOrdinal()
  .domain(data)
  .range(["#ef7758", "#1c4e80", "#a5d8dd"]);

// Setting the position of each group on the pie
const pie = d3.pie()
  .value(function (d) {
    return d[1].value;
  });

const data_ready = pie(Object.entries(data));

// Building arcs
const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

// Building arcs for hover
const arcHover = d3.arc()
  .innerRadius(0)
  .outerRadius(radius + 10);

// Building the pie chart
svg.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arcGenerator)
  .attr('stroke', '#fff')
  .attr('fill', function (d) {
    return (color(d.data[1].name))
  })

  // Adding hover effect
  .on("mouseover", function (event, d) {

    d3.select(this)
      .transition()
      .attr("d", arcHover)
      .duration(200);

    // Adding tooltip
    d3.select("#tooltip")
      .transition()
      .duration(200)
      .style("left", event.pageX + "px")
      .style("top", event.pageY + "px")
      .style("opacity", 1)
      .select("#value")
      .text(d.value);
  })

  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .attr("d", arcGenerator)
      .duration(500);

    d3.select("#tooltip")
      .style("opacity", 0);
  });

// Adding titles to pie slices
svg.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function (d) {
    return d.data[1].name;
  })
  .attr("transform", function (d) {
    return "translate(" + arcGenerator.centroid(d) + ")";
  })
  .style("text-anchor", "middle")
  .style("fill", "#fff")
  .style("font-size", 20)
;

