const myChart = echarts.init(document.getElementById('echart-line-chart'), null, {
  width: 1200,
  height: 500
});

const option = {
  xAxis: {
    type: 'category',
    data: ['Value 1', 'Value 2', 'value 3', 'Value 4', 'Value 5', 'Value 6', 'Value 7']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};

myChart.setOption(option);
