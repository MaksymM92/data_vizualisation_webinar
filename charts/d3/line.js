import lineData from '../data/line-data-d3.js'

// Selecting the element
const element = document.getElementById('d3-line-chart');

// Setting dimensions
const margin = {top: 40, right: 30, bottom: 7, left: 50},
  width = 900 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// Adding helper functions to make the line look nice
const createGradient = function(select) {
  const gradient = select
    .select('defs')
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '0%')
    .attr('y1', '100%')
    .attr('x2', '0%')
    .attr('y2', '0%');

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('style', 'stop-color:#da6e2a;stop-opacity:0.05');

  gradient.append('stop')
    .attr('offset', '100%')
    .attr('style', 'stop-color:#da6e2a;stop-opacity:.5');
}

const createGlowFilter = function(select) {
  const filter = select
    .select('defs')
    .append('filter')
    .attr('id', 'glow')

  filter.append('feGaussianBlur')
    .attr('stdDeviation', '4')
    .attr('result', 'coloredBlur');

  const femerge = filter
    .append('feMerge');

  femerge.append('feMergeNode')
    .attr('in', 'coloredBlur');

  femerge.append('feMergeNode')
    .attr('in', 'SourceGraphic');
}

// Parsing timestamps
const parseTime = d3.timeParse('%Y/%m/%d');

const parsedData = lineData.map(item => (
  {
    values: item.values.map((val) => ({
      total: val.total,
      date: parseTime(val.date)
    }))
  }));

// Appending svg to a selected element
const svg = d3.select(element)
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', 300 + margin.top + margin.bottom)
  .attr("viewBox", `0 40 ${width + 80} ${height}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Setting X,Y scale ranges
const xScale = d3.scaleTime()
  .domain([
    d3.min(parsedData, (d) => d3.min(d.values, (v) => v.date)),
    d3.max(parsedData, (d) => d3.max(d.values, (v) => v.date))
  ])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([
    d3.min(parsedData, (d) => d3.min(d.values, (v) => v.total)),
    d3.max(parsedData, (d) => d3.max(d.values, (v) => v.total))
  ])
  .range([height, 0]);

// Appending <defs>
svg.append('defs');
svg.call(createGradient);
svg.call(createGlowFilter);

// Drawing line with inner gradient
// Adding functionality to make line curved
const line = d3.line()
  .x(function(d) {
    return xScale(d.date);
  })
  .y(function(d) {
    return yScale(d.total);
  })
  .curve(d3.curveCatmullRom.alpha(0.5));

// Drawing inner part of a line
svg.selectAll('.line')
  .data(parsedData)
  .enter()
  .append('path')
  .attr('d', function(d) {
    const lineValues = line(d.values).slice(1);
    const splitedValues = lineValues.split(',');

    return `M0,${height},${lineValues},l0,${height - splitedValues[splitedValues.length - 1]}`
  })
  .style('fill', 'url(#gradient)');

// Drawing a line
svg.selectAll('.line')
  .data(parsedData)
  .enter()
  .append('path')
  .attr('d', function(d) {
    return line(d.values)
  })
  .attr('stroke-width', '2')
  .style('fill', 'none')
  .style('filter', 'url(#glow)')
  .attr('stroke', '#ff6f3c');

// Adding the x Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale));

// Adding the y Axis
svg.append("g")
  .call(d3.axisLeft(yScale));
